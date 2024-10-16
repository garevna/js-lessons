const { createPath } = require('../').default

export function createSoundButton (line) {
  const filePath = line.split('](sounds/')[1].slice(0, -1)

  return Object.assign(document.createElement('audio'), {
    src: createPath('sounds', filePath),
    controls: true
  })
}
