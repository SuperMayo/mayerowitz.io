<script lang="ts">
    import data from './research.yaml';
    import Layout from '$lib/Layout.svelte';
    import Paper from '$lib/Paper.svelte';
</script>

<Layout>
    <h2>{data.wp.heading}</h2>
    <ul>
        {#each data.wp.items  as item}
            <Paper title={item.title} abstract={item.abstract} />
        {/each}
    </ul>
    <h2>{data.book.heading}</h2>
    <ul>
        {#each data.book.items  as item}
            <Paper title={item.title} abstract={item.abstract} />
        {/each}
    </ul>
</Layout>
    <!-- <Presentation>
        <h2>{p.wp.heading}</h2>
        <List>
          {p.wp.items.map((item) => (
            <li>
            <a href={item.url}  rel="noopener noreferrer" target="_blank">
              {item.title}</a> {item.authors}. Updated: {item.date}.
          </li>
          )
          )
        }
        </List>
        <h2>{p.book.heading}</h2>
        <List>
          {p.book.items.map((item) => (
            <li>
            <a href={item.url}  rel="noopener noreferrer" target="_blank">
              {item.title}</a> {item.authors}. <i>{item.book}</i>, {item.year}.
          </li>
          )
          )
        }
        </List>
        <h2>{p.wip.heading}</h2>
        <List>
        {p.wip.items.map((item) => <li> {item} </li>)}
        </List>
      </Presentation> -->