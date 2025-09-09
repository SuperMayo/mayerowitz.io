export type Categories = "sveltekit" | "svelte";

export type CommonPostFields = {
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    date: string;
    published: boolean;
    standalone: boolean;
    SEO_description: string;
};

export type InternalPost = CommonPostFields & {
    external: false;
};

export type ExternalPost = CommonPostFields & {
    external: true;
    externalUrl: string;
};

export type Post = InternalPost | ExternalPost;
