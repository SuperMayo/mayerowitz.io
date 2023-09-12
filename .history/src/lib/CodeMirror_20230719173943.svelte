<script>
    import {onMount, onDestroy, createEventDispatcher} from 'svelte';
    import {EditorView} from "@codemirror/view";
    import {basicSetup} from "codemirror";

    let dom;
</script>

<div class="codemirror" bind:this={dom}>
</div>

