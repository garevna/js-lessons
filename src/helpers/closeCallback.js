export function closeCallback (event) {
  event.target.icon.className = 'icon'

  let index = 0

  for (const option of event.target.querySelectorAll('li.sub-level-item')) {
    setTimeout(function () {
      option.remove()
    }.bind(this), 40 * index++)
  }

  this.textElement.className = 'lesson-menu-item'
  event.target.active = false
}
