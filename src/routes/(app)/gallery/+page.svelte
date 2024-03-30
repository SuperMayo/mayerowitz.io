<script>
    import { onMount } from 'svelte';
    import ImageWrapper from '$lib/ImageWrapper.svelte';
    export let data;
    let imageData = data.imageData;
    import mediumZoom from 'medium-zoom'

    onMount(() => {
        mediumZoom('img');
    });
</script>


<main>
    {#each imageData as image}
            <ImageWrapper left_label={image.date} right_label={image.name} maxWidth="xl">
                <img class="w-full m-auto drop-shadow-xl rounded-sm
                    hover:scale-[1.05] hover:drop-shadow-2xl transition-all duration-500"
                    loading="lazy" src={image.src} alt={image.name}/>
            </ImageWrapper>
    {/each}
</main>