<script lang="ts">
    import Button from '$lib/Button.svelte'
    import TextIcon from "$lib/TextIcon.svelte";
    import { fade, slide } from 'svelte/transition'
    import IconCite from "$lib/IconCite.svelte";

    export let title: string;
    export let url: string = '';
    export let authors: string = '';
    export let year: string = '';
    export let abstract: string = '';
    export let journal: string = '';
    export let cite: string = '';

    let showAbstract = false;
    let hoverCite = false;
    let citeLabel = "BiBTeX"
    
    const copyCiteToClipboard = (cite: string) => {
        navigator.clipboard.writeText(cite);
    }
</script>

<div class="mb-one">
    <div class = "flex flex-row pb-quarter">
        <div class = " flex border-black flex-col">
            <div>
                {#if url}
                <a href={url} rel="noopener noreferrer" target="_blank">
                    {title}</a>
                {:else}
                    {title}
                {/if}
                {#if authors}
                    {authors}
                {/if}
            </div>
            <div>
                <p class="text-sm font-mono font-thin">
                    {journal}{#if year && journal}, {year} {/if}
                </p>
            </div>
        </div>
    </div>
    <p>
    {#if abstract}
        <Button
        on:click={() => showAbstract = !showAbstract}
        active={showAbstract}>
            <TextIcon rotate = {showAbstract}>+</TextIcon>abstract
        </Button>
    {/if}
    {#if cite}
        <Button
            on:mouseover={() => hoverCite = true}
            on:mouseout={() => {hoverCite = false; citeLabel = "BiBTeX"}}
            on:blur={() => {citeLabel = "BiBTeX"}}
            on:click={() => {copyCiteToClipboard(cite); citeLabel = "copied!"}}
            >
            <TextIcon alignMiddle = {true}><IconCite active = {hoverCite}/></TextIcon>
            {citeLabel}
        </Button>
    {/if}
    </p>
    {#if showAbstract}
        <div 
            transition:slide={{duration: 500}}
            class = "border-l-2 border-teal-700 p-half -mt-1">
        <p class = "text-sm text-mono max-w-lg text-justify drop-shadow-xlpl-3"
        transition:fade={{duration: 500, delay: 250}}
        >{abstract}</p>
        </div>
    {/if}
</div>



