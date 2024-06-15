export const getLessonTemplate = (lessonTitle, lessonId) => `
<div id="${lessonId}" class="lesson-menu-item">
  <small class="icon"></small>
  <b style="cursor: pointer">${lessonTitle}</b>
</div>
<ul id="${lessonId || lessonTitle}-sublevel" class="sub-level"></ul>
`
