export async function getFromRemote (url) {
  const response = await fetch(url).catch(error => {
    console.error(error)
    return null
  })

  // The catch above turns a failed request into null, and the line below read
  // .ok off it — so a request that failed threw a TypeError rather than
  // answering "nothing". The throw escapes into respondWith, where it counts
  // as an error against the worker and leaves the page with a dead request.
  if (!response) return null

  if (!response.ok) {
    console.error('Failed to fetch:', response.url)
    return null
  }

  return response
}
