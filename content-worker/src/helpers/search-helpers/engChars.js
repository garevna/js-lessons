export function engChars (string) {
  return string.split('')
    .filter(char => char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122)
    .length
}
