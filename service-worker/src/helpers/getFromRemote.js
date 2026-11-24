/**
 * no-store, because there must be only one cache.
 *
 * This worker decides what is current: it keeps a copy, and it checks that
 * copy against versions.json. The browser's own HTTP cache sits in front of
 * all that and obeys nobody — Cloudflare Pages serves the bundles with
 * max-age=14400, so for four hours after a deploy a plain fetch here is
 * answered from that cache with the previous build, and never reaches the
 * network at all.
 *
 * What made it worse than a slow update: the bytes came back stale, and this
 * worker then filed them under the version the map says is current. The copy
 * was wrong and stamped correct, so the check passed from then on and the old
 * build stayed until some later deploy changed the hash again. A renamed menu
 * item deployed, verified on the server, and did not appear in the browser.
 *
 * Lesson files are served with max-age=0 and were never affected, which is
 * why this hid for so long: content updated, code did not.
 */
export async function getFromRemote (url) {
  const response = await fetch(url, { cache: 'no-store' }).catch(error => {
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
