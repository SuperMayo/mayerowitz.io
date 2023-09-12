<script>
    import {onMount, onDestroy, createEventDispatcher} from 'svelte';
    import {EditorState} from "@codemirror/state"
    import {EditorView, keymap} from "@codemirror/view"
    import {defaultKeymap} from "@codemirror/commands"

    const dispatch = createEventDispatcher(); // Create event dispatcher to send events to parent component

    let dom; // DOM element to mount the editor to
    let _mounted = false
    onMount(() => {
        _mounted = true
        return () => { _mounted = false }
    })
    export let view = null; // Editor view
    export let doc; // Initial document to display in the editor

    /* Set this if you would like to listen to all transactions via `update` event. */
    export let verbose = false;

    /* Cached doc string so that we don't extract strings in bulk over and over. */
    let _docCached = null;

    const subscribers = new Set(); // Set of subscribers to the docStore

    export const docStore = {
        ready: () => (view !== null),
        subscribe(cb) {
            subscribers.add(cb)

            if (!this.ready()) {
            cb(null)
            } else {
            if (_docCached == null) {
                _docCached = view.state.doc.toString()
            }
            cb(_docCached)
            }

            return () => void subscribers.delete(cb)
        },
        set(newValue) {
            if (!_mounted) {
            throw new Error('Cannot set docStore when the component is not mounted.')
            }

            const inited = _initEditorView(newValue)
            if (!inited) _setText(newValue)
        },
    }

    // the view will be inited with the either doc (as long as that it is not `undefined`)
    // or the value in docStore once set
    function _initEditorView(initialDoc) {
        if (view !== null) {
            return false
        }

        view = new EditorView({
            doc: initialDoc,
            extensions,
            parent: dom,
            dispatch: _editorTxHandler,
        })
        return true
    }
</script>

<div class="codemirror" bind:this={dom}></div>

