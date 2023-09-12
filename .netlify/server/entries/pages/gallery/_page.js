const load = async ({ fetch }) => {
  const response = await fetch(`/api/gallery`);
  const imageData = await response.json();
  return {
    imageData
  };
};
export {
  load
};
