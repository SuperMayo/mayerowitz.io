<script lang="ts">
    import "../app.css"
    import mediumZoom from 'medium-zoom'

    export let zoom : Boolean = false;
</script>

<div on:click={() => zoom = !zoom}
    class = {`transition-all duration-200 data-zoomable`} data-zoomable>
    <slot/>
</div>