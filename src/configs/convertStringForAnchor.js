const translation = {
  'А': 'a',
  'а': 'a',
  'Б': 'b',
  'б': 'b',
  'В': 'v',
  'в': 'v',
  'Г': 'h',
  'г': 'h',
  'Ґ': 'g',
  'ґ': 'g',
  'Д': 'd',
  'д': 'd',
  'Е': 'e',
  'е': 'e',
  'Є': 'ye',
  'є': 'ye',
  'Э': 'a',
  'э': 'a',
  'Ж': 'zh',
  'ж': 'zh',
  'З': 'z',
  'з': 'z',
  'И': 'y',
  'и': 'y',
  'І': 'i',
  'і': 'i',
  'Ї': 'yi',
  'ї': 'yi',
  'Й': 'i',
  'й': 'i',
  'К': 'k',
  'к': 'k',
  'Л': 'l',
  'л': 'l',
  'М': 'm',
  'м': 'm',
  'Н': 'n',
  'н': 'n',
  'О': 'o',
  'о': 'o',
  'П': 'p',
  'п': 'p',
  'Р': 'r',
  'р': 'r',
  'С': 's',
  'с': 's',
  'Т': 't',
  'т': 't',
  'У': 'u',
  'у': 'u',
  'Ф': 'f',
  'ф': 'f',
  'Х': 'kh',
  'х': 'kh',
  'Ц': 'ts',
  'ц': 'ts',
  'Ч': 'ch',
  'ч': 'ch',
  'Ш': 'sh',
  'ш': 'sh',
  'Щ': 'shch',
  'щ': 'shch',
  'Ь': 'ʹ',
  'ь': 'ʹ',
  'ы': 'i',
  'Ю': 'yu',
  'ю': 'yu',
  'Я': 'ya',
  'я': 'ya',
  '\'': '-',
  'ʹ': '-',
  '`': '-',
  ' ': '_',
  '()': ''
}

export function convertStringForAnchor (string) {
  return string.trim().split('')
    .map(char => translation[char] || char)
    .join('')
    .replaceAll('|', '_')
}
