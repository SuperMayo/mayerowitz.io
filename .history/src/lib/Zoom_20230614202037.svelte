<script lang="ts">
    import "../app.css"
    export let zoom : Boolean = false;
</script>

<div on:click={() => zoom = !zoom} class = {`transition-all duration-500${zoom ? 'scale-150' : ''}`}>
    <slot/>
</div>