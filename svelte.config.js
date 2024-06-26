import adapter from "@sveltejs/adapter-netlify";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [
        vitePreprocess(),
        mdsvex({
            extensions: ["md", "svx"],
            layout: "./src/lib/PostLayout.svelte",
        }),
    ],

    alias: {
        src: "src/",
    },

    ssr: {
        noExternal: ["three"],
    },

    extensions: [".svelte", ".md", ".svx"],

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: null,
            strict: true,
        }),
        alias: {
            src: "/src",
        },
    },
};

export default config;
