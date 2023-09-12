<script lang="ts">
    export let min: number = 0;
    export let max: number = 100;
    export let step: number = 1;
    export let vallue: number = 0;
</script>


<input type="range" min={min} max={max} bind:value={value} class="slider" id="myRange">