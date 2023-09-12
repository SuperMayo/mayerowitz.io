export const load = async ({ fetch }) => {
    const response = await fetch(`/api/gallery`)
    const posts = await response.json()
  
    return imageData
}