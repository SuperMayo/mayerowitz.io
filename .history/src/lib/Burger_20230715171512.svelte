<script lang="ts">
    import '../app.css';

    export let click : boolean = false;
</script>

<style lang="postcss">
    .burger-line {
        @apply top-1/2;
    }


</style>



<div role="button" class="flex flex-col justify-between w-8 h-two overflow-hidden relative"
    on:click={() => click = !click} on:keypress={() => click = !click} tabindex=-1>
    <div class ={`burger-line ${click ? 'active' : ''}`}/>
</div>
