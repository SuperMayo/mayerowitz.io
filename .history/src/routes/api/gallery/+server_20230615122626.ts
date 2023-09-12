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

export const GET = () => {
  let data = imageData();
  return new Response({
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}