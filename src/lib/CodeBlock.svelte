<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import {oneDark} from "@codemirror/theme-one-dark";

    import Details from "$lib/Details.svelte";

    export let value : string = "";
    export let foldable : boolean = true;
    export let folded : boolean = true;
</script>

<Details enabled={foldable} summary="Code show/hide" open={!folded}>
<div class={`w-full m-auto my-half`}>
<CodeMirror
    bind:value
    extensions={[oneDark]} 
    styles={{
        "&": {
            padding: "5px",
            borderRadius: "10px",
            filter: "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
            fontSize: "0.8rem",
        },
        ".cm-content": {
            fontFamily: "'IBM Plex Mono'",
        },
        ".cm-gutters": {
            borderRadius: "10px",
        },
    }}
    {...$$restProps}
    >
</CodeMirror>
</div>
</Details>