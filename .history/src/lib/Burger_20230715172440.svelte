<script lang="ts">
    import '../app.css';

    export let click : boolean = false;
</script>

<style lang="postcss">
    .burger {
        @apply top-1/2 left-0 w-full h-[6px] absolute bg-black;

        &::before, &::after {
            @apply w-full h-[6px] absolute bg-black left-0;
            content: '';
        }

        &::before {
            top: -10px;
        }

        &::after {
            bottom: -10px;
        }
    }


</style>



<div role="button" class="flex flex-col justify-between w-8 h-two overflow-hidden relative"
    on:click={() => click = !click} on:keypress={() => click = !click} tabindex=-1>
    <div class ={`burger ${click ? 'active' : ''}`}/>
</div>
