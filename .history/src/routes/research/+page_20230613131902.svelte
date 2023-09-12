<script lang="ts">
    import { onMount } from 'svelte';
    import { load } from 'js-yaml';
    import { promises as fs } from 'fs';
    import { join } from 'path';
  
    let data = {};
  
    onMount(async () => {
      const filePath = join('research.yaml'); // Update this path as needed
      const fileContents = await fs.readFile(filePath, 'utf8');
      data = load(fileContents);
    });
  </script>