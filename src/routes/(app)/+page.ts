import type { Post } from "$lib/Types";

export async function load({ fetch }) {
    const response = await fetch("api/posts");
    const posts: Post[] = await response.json();
    return { posts };
}
