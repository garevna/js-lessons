export function uaChars (string) {
  return ruChars (string) + string.split('')
    .filter(char => ['ґ', 'є', 'ї', 'і'].includes(char))
    .length
}
