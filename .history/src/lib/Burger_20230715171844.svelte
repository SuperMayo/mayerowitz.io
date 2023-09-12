<script lang="ts">
    import '../app.css';

    export let click : boolean = false;
</script>

<style lang="postcss">
    .burger {
        @apply top-1/2 left-1/4 w-full h-1 absolute bg-black;
    }

    .burger::before {
        top: -1/2;
    }

    .burger::after {
        top: 16px;
    }


</style>



<div role="button" class="flex flex-col justify-between w-8 h-two overflow-hidden relative"
    on:click={() => click = !click} on:keypress={() => click = !click} tabindex=-1>
    <div class ={`burger ${click ? 'active' : ''}`}/>
</div>
