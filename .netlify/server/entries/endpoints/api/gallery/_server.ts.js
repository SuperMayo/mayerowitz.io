import { j as json } from "../../../../chunks/index.js";
const fetchAllImages = async () => {
  const galleryFiles = /* @__PURE__ */ Object.assign({ "/static/gallery/2020.03.30_waves.png": () => import("../../../../chunks/2020.03.30_waves.js"), "/static/gallery/2020.04.23_crossings.png": () => import("../../../../chunks/2020.04.23_crossings.js"), "/static/gallery/2020.04.28_blackhole.png": () => import("../../../../chunks/2020.04.28_blackhole.js"), "/static/gallery/2020.05.03_variations.png": () => import("../../../../chunks/2020.05.03_variations.js"), "/static/gallery/2020.05.05_wiggles.png": () => import("../../../../chunks/2020.05.05_wiggles.js"), "/static/gallery/2020.05.10_superpositions.png": () => import("../../../../chunks/2020.05.10_superpositions.js"), "/static/gallery/2020.08.23_perturbations.png": () => import("../../../../chunks/2020.08.23_perturbations.js"), "/static/gallery/2020.09.06_rupture.png": () => import("../../../../chunks/2020.09.06_rupture.js"), "/static/gallery/2020.09.09_fabric.jpeg": () => import("../../../../chunks/2020.09.09_fabric.js"), "/static/gallery/2020.10.02_turbulance.jpg": () => import("../../../../chunks/2020.10.02_turbulance.js"), "/static/gallery/2020.10.27_tourbillons.jpg": () => import("../../../../chunks/2020.10.27_tourbillons.js"), "/static/gallery/2022.07.07_doors.png": () => import("../../../../chunks/2022.07.07_doors.js") });
  const iterableImages = Object.entries(galleryFiles);
  const allImages = await Promise.all(
    iterableImages.map(async ([path]) => {
      const date = path.split("/")[3].split("_")[0];
      const name = path.split("_")[1].split(".")[0];
      return {
        // Need to remove the /static/ part of the path
        src: path.split("/static")[1],
        date,
        name
      };
    })
  );
  return allImages;
};
const GET = async () => {
  let allImages = await fetchAllImages();
  allImages.sort((a, b) => a.date > b.date ? -1 : 1);
  return json(allImages);
};
export {
  GET
};
