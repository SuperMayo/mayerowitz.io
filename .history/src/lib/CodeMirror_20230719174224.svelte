<script>
    import {onMount, onDestroy, createEventDispatcher} from 'svelte';
    import {EditorState} from "@codemirror/state"
    import {EditorView, keymap} from "@codemirror/view"
    import {defaultKeymap} from "@codemirror/commands"

    let dom;

    onMount(() => {
        const dispatch = createEventDispatcher();
        const state = EditorState.create({
            doc: "function main() {\n  return \"Hello world!\";\n}",
            extensions: [keymap.of(defaultKeymap)]
        });
        const view = new EditorView({
            state,
            parent: dom
        });
        dispatch("view", view);
    });
</script>

<div class="codemirror">
</div>

