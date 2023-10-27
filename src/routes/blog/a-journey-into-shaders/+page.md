---
title: "A Journey Into Shaders"
slug: a-journey-into-shaders
subtitle: "Part I: The blob"
date: "2023-10-27"
readingTime: 20
category: "computer graphics"
tags: ["CG", "interactive"] 
published: true
SEO_description: | 
    I finally decided to learn shaders. If you're curious about what shaders are and how they work, this article is for you. We'll start with the basics and build a simple blob from scratch.
---

<script>
    import CssBlob from "./css_blob.svelte";
    import { onMount } from 'svelte';
    import { Canvas, T } from "@threlte/core";
    import {Clock} from "three";
    import {cpp} from "@codemirror/lang-cpp";

    // Import custom components
    import Details from "$lib/Details.svelte";
    import Uniforms from "./uniforms";
    import Slider from "$lib/Slider.svelte";
    import Shader from "$lib/Shader.svelte";
    import CodeBlock from "$lib/CodeBlock.svelte";
    import ImageWrapper from "$lib/ImageWrapper.svelte";

    // Import SVG illustrations
    import FragmentShaderSVG from "./lib/fragmentShaderSVG.svelte";

    // Images
    import GpuNvidia from "./assets/gpu_nvidia_anim.gif";
    import CpuNvidia from "./assets/cpu_nvidia_anim.gif";

    // Import the fragment shaders
    import FirstFrag from "./fragments/first.frag?raw";
    import SimpleSDF from "./fragments/simpleSDF.frag?raw";
    import FinalFrag from "./fragments/final.frag?raw";
    import StepFrag from "./fragments/step.frag?raw";
    import CircleFrag from "./fragments/circleFunction.frag?raw";
    import BlendFrag from "./fragments/blending.frag?raw";
    import Blob01Frag from "./fragments/blob01.frag?raw";
    import DitherFrag from "./fragments/dithering.frag?raw";
    import SDFIllustration from "./lib/SDFIllustration.svelte";
    import SDF from "./fragments/SDF.frag?raw";
    import CombiningFrag from "./fragments/combining.frag?raw";

    // Define the vertex shader
    const vertexShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif
     varying vec2 vUv;
     void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0 );
        }
    `
    let uniforms = Uniforms;
    uniforms.resolution.value.x = 300;
    uniforms.resolution.value.y = 300;
    uniforms.u_mouse.value.x = 0;
    uniforms.u_mouse.value.y = 0;
    let clock = new Clock();

    onMount(() => {
        clock.start();
        setInterval(() => {
            uniforms.time.value = clock.getElapsedTime();
        }, 1000/60);
    })

    function handleMouseMove(e) {
        var rect = e.target.getBoundingClientRect();
        uniforms.u_mouse.value.x = e.clientX - rect.left;
        uniforms.u_mouse.value.y = e.clientY - rect.top;
    }

    console.log(GpuNvidia)
</script>

> *This article is interactive: you can play with the code and sliders to interact with the shaders. Enjoy!*

What if I told you that it could takes just few lines of code to create graphics as simple as gradients or as complex as rain effects? Welcome to the world of shaders!

I've been fascinated by shaders for a couple of years. but each time I attempted to dive into the subject, I felt like I was learning to read and write all over again -- it was overwhelming.
When I transitioned this website to [Svelte](https://kit.svelte.dev/), I saw an opportunity to replace a simple CSS animation on my homepage with a shader-based animation. The original CSS animation manipulated the `border-radius` property to produce a calm and minimalist animation, illustrated below.

<div class = "py-one">
<CssBlob/>
</div>

You might wonder why I would bother re-doing something that already exists. Well, it's because the simplicity of the task seemed like the perfect stepping stone—challenging, yet manageable. Plus, having recently defended my PhD, I finally had the time to delve into this passion project!

I hear about shaders all the time, when scrolling generative artists on <strike>twitter</strike> X, when I want to change the look of Minecraft, or even when I want to train an AI ([CUDA](https://blogs.nvidia.com/blog/2012/09/10/what-is-cuda-2/) is basically an API for shaders). So now it's the time to demystify this damn thing and start writing one of my own! In this article, you'll join me on my journey as we explore the world of *fragment* shaders, making it as approachable as possible for a beginner with basic understanding in programing.

> For anyone looking for an in-depth introduction to shaders, I highly recommend  [The Book of Shaders](https://thebookofshaders.com/)

## Shaders: the good, the bad and the ugly

If you're into video games, you've likely heard of shaders. They're the magic behind enhancing [lighting](https://lettier.github.io/3d-game-shaders-for-beginners/normal-mapping.html), conjuring up [special effects](https://webglfundamentals.org/webgl/lessons/webgl-fog.html), and even generating [cartoonish looks](https://en.wikipedia.org/wiki/Cel_shading) (yes, that's why there's a 'shade' in 'cel shading'). In a way, shaders is what makes modern games look so good when compared to their '90s counterparts. But what exactly is a shader?

Let's start simple: A shader is a small program running on your GPU that takes, at the very least, pixel coordinates as input and spits out a color as output. The reason why they are so popular in video games and computer graphics is that they are *extremly* fast. Their secret sauce? *Parallelization*. These programs are designed to work on multiple pixels at the same time, making them ridiculously efficient.

<ImageWrapper right_label="The CPU, smart but slow" maxWidth={50}>
<img src={CpuNvidia} alt="A robot drawing through iterative splash of paint."/>
</ImageWrapper>

<ImageWrapper right_label="The GPU, dumb and fast" maxWidth={50}>
<img src={GpuNvidia} alt="Hundreds of pipes spitting paint in a fraction of a second to draw the Joconde"/>
</ImageWrapper>

> Side Note: Shaders come in different dialects. For this article, I'll focus on the OpenGL Shading Language (GLSL), mainly because it's browser-friendly!

This incredible power comes, however, at some costs: Shaders have to be *compact* and *low-level*. This means you can't lean on high-level abstractions or import libraries to do the heavy lifting (\* [laugh in javascript](https://medium.com/frontendweb/find-how-many-packages-we-need-to-run-a-react-hello-world-app-695fbb755af7) \*). Moreover, their parallel nature makes them *memoryless* and *stateless*. This translates to: "You can't store or share data between pixels or shader executions." These constraints make shaders a tough nut to crack, especially if you've been pampered by high-level languages (guilty as charged).

## Coordinates is All You Need

Shaders transform pixel coordinates into colors, encoded in RGBA—each channel ranging from 0 to 1. (It is also possible to manipulate [vertex positions](https://shader-tutorial.dev/basics/vertex-shader/), but this topic is left as an exercise to the reader).
Typically, coordinates are normalized between 0 and 1. In this coordinate space, (0, 0) is the lower left corner, and (1, 1) is the upper right. These coordinates are commonly referred to as [st or uv](https://stackoverflow.com/questions/10568390/difference-between-uv-and-st-texture-coordinates) by convention.
Now, let's imagine you want to write the simplest shader: a gradient where the red component increases from left to right and the green component ascends from bottom to top. That is, find the function f(x,y) in the following illustration:

<FragmentShaderSVG/>

Sure, it might appear too basic, but think of it as a prime playground to get cozy with shader syntax. Go ahead, check out the implementation below and tinker with it -— how about changing the gradient from black to blue?

<Shader fragmentShader={FirstFrag} vertexShader={vertexShader} editor={true} legend="A shader. Impressive?"/>

<Details summary="Hint">
    To get a blue gradient, replace line 10 with 
    <code>gl_FragColor = vec4(0.0, 0.0, st.x, 1.0);</code>
</Details>

There are a few interesting things to note here about the syntax:
- **Inputs**: We can declare input to the shaders that can be *varying* or *uniform*. Varying variables are different for each pixel, while uniform variables are the same for all pixels. Here, we declare a varying variable `vUv`, which is a 2D vector representing the position of the pixel on a plane. It is declared as `varying` because the value is different for each pixel on the screen.
- **Coordinates Origin**: Take note, the origin of UV space is at the lower-left corner. If you're used to SVG or HTML canvas, this might feel like driving on the other side of the road.
- **Built-in types**: Just like C, shaders demand type declaration. You'll come across a range of types suited for vectors and matrices—think `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, and the list goes on.
- **Swizzling**: Accessing elements of a vector? Easy, just use the dot notation (vec2(1, 2).x gives you 1). Want to slice and dice your vector? Use the xy notation (vec4(1, 2, 3, 4).xy returns vec2(1, 2)). If you're working with colors, feel free to use the `myvector.rgba` syntax -- This is entirely up to you.
- **Output**: There's no return statement. The color for each pixel is determined by the value of `gl_FragColo` at the end of the `main()` function.

So even with our super simple example, you can already feel the power of shaders. Without it, an equivalent result would have required a loop over all the pixels of the canvas — 90000 in this case — just to create this gradient. But this is just the beginning; shaders could do so much more than that.

## One Step() Beyond

Now, to reproduce my original animation, I need to draw shapes with salient edges. While this may seem trivial, it is not. Forget about a handy drawCircle() function. Instead, we turn to our ever-reliable friends: math and trigonometry.

To create something like a disk, consider each pixel's distance to the disk's center. This distance calculation could be done using the Pythagorean theorem, however, we also have a built-in function for that: `distance(vec2 p1, vec2 p2)`. If you map this distance to the color of the pixel, you will get a circular gradient.

But wait, you may anticipate, "a gradient is not a solid disk!" And you'd be right. The secret sauce for that is another built-in function: `step(float threshold, float value)`. The step() function takes in the distance and sharply transitions it into either 0 or 1, depending on whether the distance crosses a certain threshold.

<Shader fragmentShader={SimpleSDF} vertexShader={vertexShader}
    slider=true sliderDefaultValue={0} sliderMin={0} sliderMax={1} sliderStep={0.01}
    u_time={uniforms.time.value}
    sliderTitle="Slide to the right to apply the step() function"
    sliderMarkers={['<distance()', 'step()>']}
    editor={true}
    legend="Distance from (0.5,0.5)"/>

> Noticed those jagged edges, also known as aliasing, around the disk when applying `step()`? That’s because the transition from 0 to 1 is a bit too abrupt. The solution is another built-in function called `smoothstep(float t_start, float t_end, float x)`, which—as you might guess—smooths things out.

You may find it initially challenging, but this method of shaping with distance is your Swiss Army knife for crafting the mind-blowing shaders you often stumble upon online. So let's dive a bit deeper into it!

## Signed Distance Functions (SDF)

When you think of shapes, it's natural to imagine them as a series of connected points. But here's a twist: you can also represent shapes in terms of their distance to other points in space. This is where *Signed Distance Functions* (SDFs) come into play. Why "signed," you ask? The distance is signed because it can be negative if the point is inside the shape.

To start off, let's revisit the circle we created earlier and adapt it using SDFs. The key is to determine a function that calculates the distance from any given point in space to our circle. Starting simply, let's find the distance to the origin. In the image below, it becomes evident that the distance `d ` from the origin to the circle is essentially the distance from the origin to the center of the circle `C` minus the radius `r`.

<SDFIllustration/>

This observation translates beautifully into a function:

```
float circleSDF(vec2 p, float r) {
    return length(p) - r;
}
```

> You can interpret this function in two ways. It either measures the distance from a point p to a circle centered at the origin, or the distance from the origin to the circle itself. It's all a matter of perspective!

However, we're rarely interested in just the distance to the origin. We want the distance to _any_ point in the UV space. To achieve this, we merely translate the point `p` by the pixel's position `uv`. The SDF function then returns negative distances for pixels inside the circle and positive distances for those outside. These two realms are separated by the circle, where the distance is exactly zero.

What about shading this SDF to make it visually compelling? Simple. Apply the 1. - step() function to the distance. The pixels with negative distances (inside the circle) take the value 1, and those outside take the value 0. 

<Shader fragmentShader={SDF} vertexShader={vertexShader}
    slider=true sliderDefaultValue={0.2} sliderMin={0} sliderMax={0.5} sliderStep={0.01}
    u_time={uniforms.time.value}
    sliderTitle="Slide to the right to change the radius of the circle"
    sliderMarkers={['0', '0.5']}
    editor={true}
    legend="SDF are cool"/>

This article won't delve into the other shapes you can define with SDFs—though I strongly recommend this [comprehensive list](https://iquilezles.org/articles/distfunctions2d/) by Inigo Quilez for those curious minds. Instead, we'll focus on how to merge these individual shapes to craft our end-goal: a beautiful blob.

<!-- Fun title on combining, with a ref -->
## One and One Makes Another One

SDFs has some interesting properties, one of them is that it is especially easy to create new shapes with [boolean operations](https://en.wikipedia.org/wiki/Boolean_algebra#Diagrammatic_representations). To have the union of the two SDFs, you need to take the minimum of the two distances. For pixels that are in either of the two shapes (or in both), the min() will output a negative distance, and for pixels that are outside both shapes, the min() will output a positive distance. 

We end up with a new SDF that is negative inside the union of the two shapes, and positive outside. In the exemple below, I start by showing the two SDFs, one in red and one in green. With the slider, you can see the result of the union of the two shapes using the min() function.

<Shader fragmentShader={CombiningFrag} vertexShader={vertexShader}
    editor={true}
    slider=true sliderDefaultValue={0} sliderMin={0} sliderMax={1}
    sliderStep={0.01} sliderTitle="Slide to apply min() of the two SDFs"
    sliderMarkers={["<Disjointed", "Joined>"]}
    legend={'min(a,b) => a∨b'}/>


> Have you noticed that I used `1.-smoothstep()`? This is because `step()` (and `smoothstep()`) outputs 1 when the distance is **above** the threshold (*i.e* outside the disk). To get a positive value **inside** the shape, we need to invert the output.

Complex shapes — like a blob! — are thus the combination of many simple SDFs. Like legos, you have many simple SDFs (building blocks) that can be combined to any shape you want. That said, a blob is smooth and jelly-like, unlike the sharp angle at the junction of our two disks. Luckily, SDFs have one last magic property for us.

## Smooth operator
To create an appealing effect, we would like the shapes to blend smoothly together like in a lava lamp. However, the `min()` function is not smooth, it has sharp discontinuites when it transitions between two distances. Instead, we would prefer a function that smoothly shift from one distance to another. Luckily, this problem has already been solved and is unoriginally called [smooth minimum](https://iquilezles.org/articles/smin/). The function takes an additional argument to control the smoothing strengh (often denoted `k`).

<Shader fragmentShader={BlendFrag} vertexShader={vertexShader}
    editor={true}
    slider={true} sliderDefaultValue={0} sliderMin={0} sliderMax={1}
    sliderStep={0.01} sliderTitle="Slide to increase the smoothing factor"
    sliderMarkers={["<k=0", "k=1>"]}
    legend="Satisfying blending?"/>

## I Like to Move it

We can pass any arbitrary variable to our shader, much like the slider you've played with in this article. To get closer to our goal, we need to animate the circles. Doing so is as simple as feeding the shader with a time uniform that can then be used to defin the circles' positions. Here I generate my time uniform `u_time` through javascript and then use it as an input in my shader to control my SDFs. The shader will refresh 60 times per second by default, each time with a new `u_time` value, creating a smooth animation. With a few extra balls and a bit of parameter tweeking, we end up with a cute blobby shape.

> To make the blob oscillating, we can use periodic functions (e.g. sin,cos) to control each balls.

A metaball is a combination of multiple SDFs, to clean up our code, we can use a loop to combine them together, instead of manually updating the final distance variable like in our previous exemple. To further speed-up the process, we first define the centers of each balls, and then store it in an array that can be easily accessed in the loop to iteratively update the distance value. Pay attention to lines 40-43 in the code below.

<Shader fragmentShader={Blob01Frag} vertexShader={vertexShader}
    legend="It's a blob!"
    editor={true}
    u_time={uniforms.time.value}
    slider={true} sliderDefaultValue={1.} sliderMin={0.1} sliderMax={1.9}
    sliderStep={0.001} sliderTitle="Adjust the size of the metaballs"
    sliderMarkers={null}/>

And voila, our baby's born. You should now be ready to write some shaders of your own. If writing code is not your thing, you now have a better understanding of what's going under the hood of node-based editor in [Blender's shader nodes](https://docs.blender.org/manual/en/latest/render/shader_nodes/index.html) or [Unity's Shader Graph](https://unity.com/features/shader-graph).

This sad monochrome blob is functional but boring. Let's make it juicer!

## The Final Touch

To truly appreciate the magic of shaders, there's nothing like taking the wheel and manipulating the blob in real-time. This final section will guide you on how to introduce user interactivity into your shader. Essentially, you will learn how to let users control the position of a ball within the blob by using their mouse.

First things first: We'll use the mouse coordinates as a uniform input into the shader. This will allow real-time interaction with our creation.

<CodeBlock
    value = "uniform vec2 u_mouse;"
    lang={cpp()}
    foldable={false}
    editable={false}>
</CodeBlock>

Once the mouse coordinates are received, adding them to the array of ball centers will allow the user to interactively control a ball. As you see, it only takes one line of code to create interactivity!

<CodeBlock
    value = "vec2 centers[5] = vec2[5](c1,c2,c3,c4,u_mouse);"
    lang={cpp()}
    foldable={false}
    editable={false}>
</CodeBlock>

Next, it's just fun and iterations. To get to the final result, I extensively use the `mix(colorA, colorB, percent)` function. It's equivalent to if/else blocks when `percent` is a boolean. For example, to get red outside the metaball (where `metaball == 0`) and green within it, you can write. 

<CodeBlock
    value = "vec3 color = mix(
        vec3(1., 0., 0.), // Red 
        vec3(0., 1., 0.), // Green
        metaball)"
    lang={cpp()}
    foldable={false}
    editable={false}/>

Finally, we get this beauty

<Shader fragmentShader={FinalFrag} vertexShader={vertexShader}
    u_time={uniforms.time.value}
    mouseCapture={true}
    folded={true}
    editor={true}
    slider={false} sliderDefaultValue={1.} sliderMin={0.1} sliderMax={1.9}
    sliderStep={0.001} sliderTitle="Adjust the size of the metaballs"
    sliderMarkers={null}/>

That concludes this introduction. I'm glad I've finally learned to write shaders! This article barely scratches the surface of the basics, but there's no reason to be afraid anymore—neither for you nor for me. Stay tuned for future articles where we'll explore how to elevate this blob into the third dimension. In the meantime, feel free to experiment; you can change the color scheme or tweak the positions of the balls. For updates, you can follow me on [Twitter](https://twitter.com/AntoineMyrwtz).


## References

- [The book of shaders](https://thebookofshaders.com/)
- [Inigo Quilez](https://iquilezles.org/)
- [An introduction to Shader Art Coding (Youtube)](https://www.youtube.com/watch?v=f4s1h2YETNY)
- [Shadertoy](https://www.shadertoy.com/)

## Comments