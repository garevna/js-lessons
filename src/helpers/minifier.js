export const minifier = text => text
  .replace(/(^\s+|\s+$)/gm, '')
  .replace(/\s*{\s*/gm, '{')
  .replace(/\s*}\s*/gm, '}')
  .replace(/;\s*/gm, ';')
  .replace(/:\s*/gm, ':')
  .replace(/\s*>\s*/gm, '>')
