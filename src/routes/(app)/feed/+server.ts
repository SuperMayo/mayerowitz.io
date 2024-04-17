import type { Post } from "$lib/Types";
import type { RequestHandler } from "@sveltejs/kit";

import metadata from "$lib/data/metadata";

export const prerender = true;

const url = metadata.url;
const author = metadata.author;
const feedTitle = "Antoine Mayerowitz";
const feedDescription = "Latest articles by Antoine Mayerowitz";
const feedLink = url + "/feed";
// Feed is rendered at build time
const feedUpdated = new Date();

export const GET: RequestHandler = async (event) => {
    const res = await event.fetch(`/api/posts`);
    const data: Post[] = await res.json();
    const body = xml(data);
    const newres = new Response(body);
    newres.headers.set("Content-Type", "text/xml");
    return newres;
};

const xml = (posts: Post[]) => `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${feedTitle}</title>
    <updated>${feedUpdated.toISOString()}</updated>
    <subtitle>${feedDescription}</subtitle>
    <link href="${feedLink}" rel="self"/>
    <link href="${url}"/>
    <author>
      <name>${author}</name>
    </author>
    <generator>JavaScript</generator>
    <id>${url}/</id>
${posts
    .map(
        (post: Post) =>
            `<entry>
        <title>${post.title}</title>
        <link href="${url}/blog/${post.slug}"/>
        <id>${url}/blog/${post.slug}/</id>
        <published>${new Date(post.date).toISOString()}</published>
        <updated>${new Date(post.date).toISOString()}</updated>
        <summary>${post.SEO_description}</summary>
      </entry>`,
    )
    .join("\n")}
  </feed>`;
