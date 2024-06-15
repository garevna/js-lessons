let language = 'eng'

const available = ['eng', 'ua', 'ru']

export function lang (data) {
  if (!data) return language
  if (available.includes(data)) language = data
}
