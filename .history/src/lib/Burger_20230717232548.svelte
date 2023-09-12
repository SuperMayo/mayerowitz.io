<script lang="ts">
    import '../app.css';

    export let click : boolean = false;
</script>

<style lang="postcss">
    .burger {
        @apply top-1/2 left-0 w-8 h-1 absolute bg-black transition-all duration-500　rounded-sm;

        &::before, &::after {
            @apply w-8 h-1 absolute bg-black left-0 rotate-0 transition-all;
            content: '';
        }
        &::before {
            top: -10px;
        }
        &::after {
            bottom: -10px;
        }
    }

    .burger.active {
        @apply w-0;
        &::before {
            @apply delay-200 rotate-45 top-0;
        }
        &::after {
            @apply delay-100 -rotate-45 bottom-0;
        }
    }

</style>



<div role="button" class="flex flex-col justify-between w-8 h-two overflow-hidden relative"
    on:click={() => click = !click} on:keypress={() => click = !click} tabindex=-1>
    <div class ={`burger ${click ? 'active' : ''}`}/>
</div>
