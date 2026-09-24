/**
 * Which lesson pages exist, and in which languages.
 *
 * This is content, not code: it changes when a page is added, translated or
 * removed, and none of those should mean rebuilding the worker. So it is
 * fetched from public/lessons/index.json — written by build-content.js — and
 * not compiled in.
 *
 * Fetched once per worker start. A service worker restarts often, the file is
 * a few kilobytes, and it is on the "never cached" list, so a page that
 * appears is found without a deploy of the bundle.
 *
 * When it cannot be fetched — offline, or a half-finished local build — the
 * answer is null and callers are expected to give the reader the benefit of
 * the doubt. Being unable to say whether a page exists is not the same as
 * knowing it does not, and answering "404" to the second question when the
 * first was asked is how a working site looks broken.
 */

let loading = null

export const registry = () => {
  if (loading) return loading

  const base = location.pathname.replace('content.worker.js', '')
  const url = `${location.origin}${base}lessons/index.json`

  loading = fetch(url)
    .then(response => response.ok ? response.json() : null)
    .catch(() => null)

  return loading
}
