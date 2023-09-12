<script lang="ts">
    export let rotate: Boolean = false;
    export let alignMiddle: Boolean = false;
</script>

<style>
    div {
        font-size : 1rem
    }
</style>

<div class = {`inline-block transition-transform duration-200 ease-in-out
    font-bold mr-1
    ${alignMiddle? 'align-middle' : ''}
    ${rotate ? 'rotate-45' : ''}`} >
    <slot/>
</div>