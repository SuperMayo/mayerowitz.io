import fs from 'fs';
import path from 'path';

const galleryDir = path.join(process.cwd(), 'static/gallery');

const imageData = fs.readdirSync(galleryDir).map(file => ({
  src: `/gallery/${file}`,
  date: file.split('_')[0],
  name: file.split('_')[1].split('.')[0]
}));

export function GET() {
  return {
    body: JSON.stringify(imageData.sort().reverse()),
    headers: {
      'Content-Type': 'application/json'
    }
  };
}