import { json } from "@sveltejs/kit";
import type { Post } from "$lib/Types";

async function getPosts() {
    let posts: Post[] = [];

    const paths = {
        ...import.meta.glob("/src/routes/**/blog/**/+page**", { eager: true }),
    };

    for (const path in paths) {
        const file = paths[path];
        const slug = path.split("/")[5].split("/+page")[0];
        const standalone = path.includes("(standalone)");

        if (file && typeof file === "object" && "metadata" in file && slug) {
            const metadata = file.metadata as Post;
            if (metadata.published) {
                // Add the slug to the metadata if you wish
                metadata.slug = slug;
                posts.push(metadata);
            }
            metadata.standalone = standalone;
        }
    }

    posts = posts.sort(
        (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
    );

    return posts;
}

export async function GET() {
    const posts = await getPosts();
    return json(posts);
}

