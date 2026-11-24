/**
 * The same page, with the fact that it arrived via a redirect forgotten.
 *
 * Cloudflare Pages does not serve a .html address: it answers 308 and sends
 * the browser to the same name without the extension, so /maps/course.html
 * becomes /maps/course. Followed normally that is invisible. Followed inside
 * a worker it is fatal: a navigation — a tab, or an iframe — is fetched with
 * redirect mode "manual", and handing respondWith a response that followed a
 * redirect anyway is refused. The page gets ERR_FAILED and the browser says
 * the site may have moved permanently, which, in its way, is true.
 *
 * GitHub Pages serves the .html address directly, which is why the same build
 * is fine there and not here.
 *
 * The body is the body either way; only the flag is in the way. So the
 * response is built again from its own bytes, status and headers, and the
 * flag does not come with them.
 */
export async function unredirected (response) {
  if (!response || !response.redirected) return response

  const { status, statusText, headers } = response

  return new Response(await response.blob(), { status, statusText, headers })
}
