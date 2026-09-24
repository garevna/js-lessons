/**
 * Never cached, always from the network.
 *
 * Both files describe the current state of the content rather than being
 * content themselves, and both are what the worker consults before deciding
 * anything — so a cached copy of either would keep the worker confidently
 * wrong. lessons/index.json says which pages exist and in which languages;
 * versions.json says which version of each resource is current. A few
 * kilobytes each: asking every time costs nothing worth saving.
 */
export const uncached = ['chrome-extension://', 'lessons/index.json', 'versions.json']
