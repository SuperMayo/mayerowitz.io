<script lang="ts">
    import data from './research.yaml';
    import Layout from '$lib/Layout.svelte';
</script>

<Layout>
    <h2>{data.title}</h2>
    <ul>
        {#each data.
    </ul>
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
</Layout>