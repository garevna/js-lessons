export function parseTextFragment (textFragment) {
  const lines = textFragment.length ? textFragment.split('\n') : []
  lines.forEach(line => line.length ? this.main.appendChild(this.parseLine(line)) : null)
}
