<script lang="ts">
    import "../app.csss"
    export let zoom : Boolean = false;
</script>

<div on:click={() => zoom = !zoom} class = {`${zoom ? 'scale-150' : ''}`}>
    <slot/>
</div>