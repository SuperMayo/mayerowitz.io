// scripts/generateImageList.js
const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '../static/gallery');

fs.readdir(galleryDir, (err, files) => {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  const imageData = files.map(file => ({ src: `/gallery/${file}` }));

  fs.writeFileSync(
    path.join(__dirname, '../src/routes/gallery/_imageData.js'),
    `export default ${JSON.stringify(imageData, null, 2)};`
  );
});
