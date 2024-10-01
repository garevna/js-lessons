export const getLessonTemplate = (title, ref) => `
<div id="${ref}" class="lesson-menu-item">
  ${title}
</div>
<ul id="${ref || title}-sublevel" class="sub-level"></ul>
`
