export const mainMenuTemplate = `
<div id="main-menu-shadow"></div>
<!-- <graphic-header></graphic-header> -->
<svg-nav-panel></svg-nav-panel>

<aside>
  <div id="menuToggle">
    <input type="checkbox" />
    <span></span>
    <span></span>
    <span></span>
    <ul id="menu">
      <search-component></search-component>
      <a id="go-to-home" href="${location.href.split('?')[0]}" class="go-to-home"></a>

      <!-- The whole course in one picture. It belongs here rather than on a
           lesson: this menu is what the reader opens to find their way
           about the course, and the map answers the same question in the
           other way. Available from the start page too, which a lesson's
           own map is not. -->
      <a id="course-map-link" class="course-map"></a>

      <hr>
    </ul>
  </div>
</aside>

<!-- One button where the donate button and the message button used to stand
     side by side: it opens a choice between them. See author-widget.js. -->
<author-widget size="48" id="top-author"></author-widget>
`
