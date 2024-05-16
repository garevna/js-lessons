export const getLessonTemplate = lessonId => `
<input type="radio" id="${lessonId}" name="lessons">
<label for="${lessonId}">
  <div class = "icon"></div>
  <b>${lessonId}</b>
</label>
<ul class="sub-level"></ul>
`
