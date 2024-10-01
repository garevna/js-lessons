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
      <div class="search-wrapper">
        <input id="search-input">
        <div class="search-icon"></div>
        <div id="search-result"></div>
      </div>

      <a id="go-to" href="${location.href.split('?')[0]}" class="go-to-home"></a>
      <hr>
    </ul>
  </div>
</aside>

<donate-component size="48" id="top-donate" />
`
