/**
 * The lines of a table, without the rule some writers put under the heading.
 *
 * This markup has no separator row — the first row is simply the first row —
 * but `| --- | --- |` is such a habit from Markdown that it gets written
 * anyway, and every cell of it went through parseLine, which reads three
 * dashes as a horizontal rule. The row came out as a line of little rules
 * inside the table.
 */
export function tableRows (fragment) {
  return (fragment.match(/.[^\n]*/g) || [])
    .filter((line) => line.trim().indexOf('|') === 0)
    .filter((line) => !/^\|[\s|:-]*\|$/.test(line.trim()))
}
