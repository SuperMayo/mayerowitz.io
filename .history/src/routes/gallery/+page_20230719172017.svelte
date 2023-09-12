<script>
    import { onMount } from 'svelte';
    //import imageData from "./_imageData";
    export let data;
    let imageData = data.imageData;
    import mediumZoom from 'medium-zoom'

    onMount(() => {
        mediumZoom('img');
    });
</script>


<main>
    {#each imageData as image}
            <div class = "max-w-[500px] w-full m-auto py-six">
                <img class="w-full m-auto drop-shadow-xl rounded-sm
                    hover:scale-[1.05] hover:drop-shadow-2xl transition-all duration-500"
                    loading="lazy" src={image.src} alt={image.name}/>
                <div class = "pt-half flex justify-between flex-row">
                    <span class = "font-mono">{image.date}</span>
                    <span class = "font-mono">{image.name}</span>
                </div>
            </div>
    {/each}
</main>