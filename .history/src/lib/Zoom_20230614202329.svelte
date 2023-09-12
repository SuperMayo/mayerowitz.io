<script lang="ts">
    import "../app.css"
    export let zoom : Boolean = false;
</script>

<div on:click={() => zoom = !zoom}
    class = {`transition-all duration-200 ${zoom ? 'w-full m-auto' : ''}`}>
    <slot/>
</div>