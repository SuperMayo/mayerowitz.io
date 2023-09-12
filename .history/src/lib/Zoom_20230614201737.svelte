<script lang="ts">
    export let zoom : Boolean = false;
</script>

<div on:click={() => zoom = !zoom}>
    <slot/>
</div>