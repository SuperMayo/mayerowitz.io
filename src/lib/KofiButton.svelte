<script>
    import { onDestroy, onMount } from "svelte";

    export let backgroundColor = "#e40400";
    export let textColor = "#fff";
    export let text = "Support me";

    let script;

    onMount(() => {
        script = document.createElement("script");
        script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
        script.onload = () => {
            kofiWidgetOverlay.draw("antoinemayerowitz", {
                type: "floating-chat",
                "floating-chat.donateButton.text": text,
                "floating-chat.donateButton.background-color": backgroundColor,
                "floating-chat.donateButton.text-color": textColor,
                "floating-chat.cssId": "kofiwidget",
            });
        };
        document.head.appendChild(script);
    });

    onDestroy(() => {
        if (script && script.parentNode) {
            script.parentNode.removeChild(script); // Remove the script element when the component is destroyed
        }
    });
</script>
