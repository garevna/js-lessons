/**
 * ~~~tests … ~~~ — a block of questions, shown one at a time.
 *
 *   ~~~tests
 *   →→→ Number('5') | 5, '5', NaN | 5 →→→
 *   →→→ Number('') | 0, NaN, undefined | 0 →→→
 *   ~~~
 *
 * A lesson writes questions two ways and means different things by them. One
 * standing after the paragraph it checks is part of the lesson and belongs
 * where it is. A block at the end is a quiz: thirty-one of them closed
 * Explicit-type-conversion, 9500 pixels of it, two thirds of the page.
 *
 * Which is which was guessed at first, from whether the questions happened to
 * be adjacent — and that turned two neighbours in the lesson about loops into
 * a quiz nobody had asked for. The fence says it instead.
 *
 * A fence word rather than a block pattern of its own, for the same reason as
 * ~~~demo: every pattern in pageRegExpr is another chance to match more than
 * it meant to, and one of them spent months eating test questions off a page.
 */
export function createTestSeries (fragment, title) {
  const start = fragment.search(String.fromCharCode(10))
  const body = fragment.slice(start + 1, fragment.length - 3)

  const tests = body
    .split('\n')
    .filter((line) => /→{3}/.test(line))
    .map((line) => this.parseLine(line))
    .filter((element) => element.tagName === 'TEST-COMPONENT')

  const series = document.createElement('test-series')
  if (title) series.setAttribute('header', title)

  // Filled after it is on the page, so the questions are laid out where they
  // will be seen and the stage has a height to open to.
  this.main.appendChild(series)
  series.fill(tests)

  return series
}
