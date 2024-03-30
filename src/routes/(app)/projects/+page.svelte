<script lang="ts">
    import projects from "./projects";
</script>

<main>
    <div>
        <h2>Generative Art</h2>
        <ul>
            {#each projects.generative as { name, link, description, date }}
                <li>
                    <a href={link} rel="noopener noreferrer" target="_blank">
                        {name}
                    </a>
                    <br />
                    <p class="font-mono text-sm font-thin">{date}. {description}</p>
                </li>
            {/each}
        </ul>
        <h2>Web</h2>
        <ul>
            {#each projects.web as { name, link, description, date }}
                <li>
                    <a href={link} rel="noopener noreferrer" target="_blank">
                        {name}
                    </a>
                    <br />
                    <p class="font-mono text-sm font-thin">{date}. {description}</p>
                </li>{/each}
        </ul>
    </div>
</main>

