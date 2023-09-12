export const load = async ({ fetch }) => {
    const response = await fetch(`/api/gallery`)
    const imagesData = await response.json()
  
    return {
      imagesData
    }
}