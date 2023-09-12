import fs from 'fs';
import path from 'path';

const fetchAllImages = async () => {
  const galleryFiles = import.meta.glob('/src/static/gallery/*.*');
  const iterableImages = Object.entries(galleryFiles);

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
  return json(sortedImages);
}