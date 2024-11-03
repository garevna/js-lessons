export async function getFromRemote (url) {
  const response = await fetch(url).catch(error => {
    console.error(error)
    return null
  })

  if (!response.ok) {
    console.error('Failed to fetch:', response.url)
    return null
  }

  return response
}
