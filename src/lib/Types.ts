export type Categories = "sveltekit" | "svelte";

export type BasePost = {
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    date: string;
    published: boolean;
    external: false;
    standalone: boolean;
};

export type ExternalPost = BasePost & {
    external: true;
    externalUrl: string;
};

export type Post = BasePost | ExternalPost;

