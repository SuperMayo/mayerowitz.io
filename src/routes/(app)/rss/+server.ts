import type { Post } from "$lib/Types";
import type { RequestHandler } from "@sveltejs/kit";

import metadata from "$lib/data/metadata";

export const prerender = true;

const url = metadata.url;
const author = metadata.author;
const feedTitle = "Antoine Mayerowitz - Blog";
const feedDescription = "It involves data.";
const feedLink = url + "/rss";
// Feed is rendered at build time
const feedUpdated = new Date();

export const GET: RequestHandler = async (event) => {
    const res = await event.fetch(`/api/posts`);
    const data: Post[] = await res.json();
    const body = xml(data);
    const newres = new Response(body);
    newres.headers.set("Content-Type", "application/rss+xml");
    return newres;
};

const xml = (posts: Post[]) => `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${feedTitle}</title>
    <link href="${feedLink}" rel="self"/>
    <link href="${feedLink}"/>
    <id>${feedLink}/</id>
    <updated>${feedUpdated.toISOString()}</updated>
    <author>
      <name>${author}</name>
    </author>
    <subtitle>${feedDescription}</subtitle>
    <generator>JavaScript</generator>
${posts
    .map(
        (post: Post) =>
            `    <entry>
        <title>${post.title}</title>
        <link href="${url}/blog/${post.slug}/"/>
        <id>${url}/blog/${post.slug}/</id>
        <updated>${new Date(post.date).toISOString()}</updated>
        <published>${new Date(post.date).toISOString()}</published>
        <content type="html"><![CDATA[${post.SEO_description}]]></content>
      </entry>`,
    )
    .join("\n")}
  </feed>`;
