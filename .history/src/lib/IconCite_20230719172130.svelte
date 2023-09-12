<script lang="ts">
    export let active: Boolean = false;
</script>

<svg viewBox="0 0 15 16" class={`w-4 align-bottom fill-none duration-700 transition-all ${active ? 'stroke-beige' : 'stroke-teal-700'}`}>
    <path d="M6.5 3.5H1.5V8.5H3.75L1.75 12.5H4.75L6.5 9V3.5zM13.5 3.5H8.5V8.5H10.75L8.75 12.5H11.75L13.5 9V3.5z"></path></svg>