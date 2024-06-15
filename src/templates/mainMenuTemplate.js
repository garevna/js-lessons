export const mainMenuTemplate = `
<graphic-header></graphic-header>
<svg-nav-panel></svg-nav-panel>
<aside>
  <div id="menuToggle">
    <input type="checkbox" />
    <span></span>
    <span></span>
    <span></span>
    <ul id="menu">
      <div class="search-wrapper">
        <div class="search-icon"></div>
        <input id="search-input">
        <div id="search-result"></div>
      </div>

      <h3>
        <a href="${location.href.split('?')[0]}" class="go-to-home"></a>
      </h3>
      <hr>
    </ul>
  </div>
</aside>
`
