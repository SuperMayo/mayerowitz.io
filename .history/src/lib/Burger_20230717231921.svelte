<script lang="ts">
    import '../app.css';

    export let click : boolean = false;
</script>

<style lang="postcss">
    .burger {
        @apply top-1/2 left-0 w-8 h-1 absolute bg-black transition-all duration-1000 scale-100;

        &::before, &::after {
            @apply w-8 h-1 absolute bg-black left-0 rotate-0 transition-all scale-100;
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
        @apply scale-0;
        &::before {
            @apply delay-100 rotate-45 top-0 scale-100;
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
