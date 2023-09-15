import { json } from '@sveltejs/kit'
import type { Post } from '$lib/Types'

async function getPosts() {
	let posts: Post[] = []
  let slugs = []

  const paths = {
    ...import.meta.glob('/src/routes/blog/**/+page.md', {eager: true}),
    ...import.meta.glob('/src/routes/blog/**/+page.svx', {eager: true})
  };

  for (const path in paths) {
      const file = paths[path];
      const slug = path.split('/')[4].replace('/+page.(md|svx)', '');
  
      if (file && typeof file === 'object' && 'metadata' in file && slug) {
        const metadata = file.metadata as Post;
        if (metadata.published) {
          // Add the slug to the metadata if you wish
          metadata.slug = slug;
          posts.push(metadata);
        }
      }
    }
  
    posts = posts.sort((first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
    );
  
    return posts;
}

export async function GET() {
	const posts = await getPosts()
	return json(posts)
}