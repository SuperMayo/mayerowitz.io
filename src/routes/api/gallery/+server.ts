import { json } from '@sveltejs/kit';

const fetchAllImages = async () => {
  const galleryFiles = import.meta.glob('/static/gallery/*.*');
  const iterableImages = Object.entries(galleryFiles);
  const allImages = await Promise.all(
    iterableImages.map(async ([path]) => {
      const date = path.split('/')[3].split('_')[0];
      const name = path.split('_')[1].split('.')[0];
    
      return {
        // Need to remove the /static/ part of the path
        src: path.split('/static')[1],
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