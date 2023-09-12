<script lang="ts">
    import '../app.css';

    export let click : boolean = false;
</script>

<style lang="postcss">
    .burger-line {
        @apply bg-black rounded h-[3px] transition-all duration-500 w-full absolute;
    }

    .mid {
        @apply w-0;
    }
</style>



<div role="button" class="flex flex-col justify-between w-8 h-two overflow-hidden relative"
    on:click={() => click = !click} on:keypress={() => click = !click} tabindex=-1>
    <div class ={`burger-line right-0 ${click ? 'delay-[50ms] left' : ''}`}/>
    <div class ={`burger-line top-1/4  ${click ? 'delay-[100ms] mid right-0' : 'right-0'}`}/>
    <div class ={`burger-line top-2/4  ${click ? 'delay-[150ms] right' : ''}`}/>
</div>
