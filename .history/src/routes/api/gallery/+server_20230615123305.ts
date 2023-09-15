import { json } from '@sveltejs/kit';

const fetchAllImages = async () => {
  const galleryFiles = import.meta.glob('/static/gallery/*.*');
  const iterableImages = Object.entries(galleryFiles);
  console.log(iterableImages);
  const allImages = await Promise.all(
    iterableImages.map(async ([path]) => {
      const date = path.split('_')[0];
      const name = path.split('_')[1].split('.')[0];
    
      return {
        src: path,
        date: date,
        name: name
      }
    })
  )

  return allImages;
}

export const GET = async () => {
  let allImages = await fetchAllImages();
  const sortedImages = allImages.sort((a, b) => (a.date > b.date) ? -1 : 1);
  return json(allImages);
}