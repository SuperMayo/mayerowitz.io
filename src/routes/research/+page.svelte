<script lang="ts">
    import data from './research.yaml';
    import Paper from '$lib/Paper.svelte';
</script>

<main>
    <h2>{data.wp.heading}</h2>
    <ul>
        {#each data.wp.items  as item}
            <li>
            <Paper title={item.title} abstract={item.abstract}
                authors = {item.authors} year={item.year}
                journal = {item.journal} url={item.url}
                cite = {item.cite}/>
            </li>
        {/each}
    </ul>
    <h2>{data.book.heading}</h2>
    <ul>
        {#each data.book.items  as item}
            <li>
            <Paper title={item.title} abstract={item.abstract}
                authors = {item.authors} year={item.year}
                journal = {item.journal} url={item.url}
                cite = {item.cite}/>
            </li>
        {/each}
    </ul>
    <h2>{data.wip.heading}</h2>
    <ul>
        {#each data.wip.items  as item}
            <li>
            <Paper title={item.title} abstract={item.abstract}
            authors = {item.authors} year={item.year}
            url={item.url}/>
            </li>
        {/each}
    </ul>
</main>