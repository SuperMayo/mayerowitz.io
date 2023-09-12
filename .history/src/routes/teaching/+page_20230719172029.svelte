<script>
    import teachings from "./teaching";
</script>

<main>
    {#each teachings as {course, institution, ressources}}
        <div>
            <h2>{course} - {institution}</h2>
            {#each ressources as {title, elements}}
            {#if title}<h3>{title}</h3>{/if}
                <ul>
                    {#each elements as {name, link, supplementLink, supplementName}}
                    <li>
                            <a href={link} rel="noopener noreferrer" target="_blank">
                                {name}
                            </a>
                            {#if supplementLink}
                                &nbsp; - &nbsp;
                                <a href={supplementLink} rel="noopener noreferrer" target="_blank">
                                {supplementName}
                                </a>
                            {/if}
                    </li>
                    {/each}
                </ul>
            {/each}
        </div>
    {/each}
</main>

