import fs from 'fs';
import path from 'path';

const imageData = () => {
  const galleryDir = path.join(process.cwd(), 'static/gallery');

  fs.readdir(galleryDir, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }
    
    const imageData = files.map(file => ({
        src: `/gallery/${file}`,
        date: file.split('_')[0],
        name: file.split('_')[1].split('.')[0]
      }))
    });
  return imageData;
}

export const GET = () => {
  return {
    body: JSON.stringify(imageData().sort().reverse()),
    headers: {
      'Content-Type': 'application/json'
    }
  };
}