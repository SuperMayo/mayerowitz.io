<script lang="ts">
    import '../app.css';

    export let click : boolean = false;
</script>

<style lang="postcss">
    .burger-line {
        @apply bg-black rounded h-[3px] transition-all duration-500 w-full absolute;
    }
</style>



<div role="button" class="flex flex-col justify-between w-8 h-two overflow-hidden relative"
    on:click={() => click = !click} on:keypress={() => click = !click} tabindex=-1>
    <div class ={`burger-line  ${click ? 'delay-[50ms]' : ''}`}/>
    <div class ={`burger-line  ${click ? 'delay-[100ms]' : 'top-1/4'}`}/>
    <div class ={`burger-line  ${click ? 'delay-[150ms]' : 'top-2/4'}`}/>
</div>
