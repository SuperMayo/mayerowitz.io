<script lang="ts">
    import "../app.css"

    export let active: Boolean = false;
</script>

<button on:click on:mouseover on:focus on:mouseout on:blur
    class = {`border-teal-700 border-2 px-half py-0 rounded-none
        hover:text-beige hover:bg-teal-600
        text-xs
        drop-shadow-md uppercase hover:rotate-1
        transition-all duration-700 ease-in-out
        font-bold shadow-md
        ${active ? "rotate-2 bg-teal-700 text-beige" : 'bg-beige text-teal-700'}`}>
    <slot/>
</button>

<!-- <button on:click
    class = "bg-gradient-to-r from-teal-700 to-beige text-black rounded-none text-xl font-bold shadow-2xl hover:from-beige hover:to-teal-700 p-3 transform rotate-1 hover:rotate-3 transition-all duration-700 ease-in-out font-mono">
    <slot/>
</button> -->



  