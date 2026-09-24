/**
 * The content-hash map: which version of each cached resource is current.
 *
 * It used to be a module compiled into this worker, which meant every lesson
 * file was part of the build. Editing one word of one page rewrote
 * service-worker.js, and a commit fixing a typo carried a rebuilt bundle with
 * it. Lesson files are content; content must not change a bundle.
 *
 * So it is fetched from public/versions.json, written by
 * config-service-worker.js. Fetched, not imported — and re-read now and then,
 * because a worker that is already installed would otherwise go on checking
 * pages against the map it started with.
 *
 * no-store on purpose: the HTTP cache holding an old map is exactly the
 * problem this file exists to solve.
 *
 * When it cannot be had — offline, or the file not deployed yet — the answer
 * is null, and every caller treats that as "no opinion" rather than as "out of
 * date". Offline, that is what keeps the cached course readable.
 */

/** Long enough that a burst of requests shares one fetch; short enough that a
 *  deploy is noticed without reloading the tab twice. */
const MAX_AGE = 60000

let loading = null
let loadedAt = 0

const load = () => {
  const base = location.pathname.replace('service-worker.js', '')

  return fetch(`${location.origin}${base}versions.json`, { cache: 'no-store' })
    .then(response => response.ok ? response.json() : null)
    .then(map => {
      // A failed read must not be remembered for a minute: forget it now and
      // the next request tries again.
      if (!map) loadedAt = 0
      return map
    })
    .catch(() => { loadedAt = 0; return null })
}

export const versions = () => {
  if (loading && Date.now() - loadedAt < MAX_AGE) return loading

  loadedAt = Date.now()
  loading = load()

  return loading
}
