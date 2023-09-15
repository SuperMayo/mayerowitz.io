<script>
  import Blob from "$lib/Blob/Blob.svelte";
  import metadata from "../data/metadata";
  const links = metadata.externalLinks
</script>

<main class = "mx-auto text-justify max-w-xl font-mono md:mt-five mt-one">
    <Blob />
    <div class="px-5">
    <p class="text-left">Hi, I’m <span class="text-lg font-bold text-transparent
      bg-clip-text bg-gradient-to-br transition-all duration-1000 ease-in-out
    from-teal-500 via-teal-600 to-red-400 bg-[length:200%_200%] bg-[position:0%_0%]
      hover:bg-[position:100%_100%]">Antoine Mayerowitz</span>.</p>
    <p>
      I'm a French data scientist, currently living in Paris. I hold
      a PhD in economics. My current focus is on data science,
      interactive web stories, and generative design.
    </p>
    <p>
      You can also find me there:
      <br/>
      {#each Object.entries(links) as [key, value], index (key)}
        <a href={value} target="_blank">{key}</a>{#if index < Object.entries(links).length-1}<span>&thinsp;/&thinsp;</span>{/if}
      {/each}
    </p>
    <p>
      Want to discuss? <a href="mailto:antoine@mayerowitz.io" class="text-black"><u>Want to hire me?</u></a>
      Send an email to antoine@mayerowitz.io
    </p>
  </div>
</main>