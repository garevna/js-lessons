export function ruChars (string) {
  return string.split('')
    .filter(char => char.charCodeAt(0) >= 1072 && char.charCodeAt(0) <= 1103)
    .length
}
