<script lang="ts">
    import "../app.css"
    export let zoom : Boolean = false;
</script>

<div on:click={() => zoom = !zoom}
    class = {`transition-all duration-200 ${zoom ? 'absolute w-full left-0' : ''}`}>
    <slot/>
</div>