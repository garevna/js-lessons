const { copyrightText, copyrightSign, footerSlogan, serviceWorkerVersion, serviceWorkerDate } = require('../configs').default

export const footerTemplate = `
<footer>
  <div id="donate-button" class="donate-button">
    <donate-component size="64"></donate-component>
  </div>
  <div id="copyright-text" class="footer-text">
    <small> ${copyrightText} <br><br> ${copyrightSign} </small>
  </div>
  <div id="author-photo" class="footer-picture">
    <figure class="overshadow">
      <div class="overshadow__shadow">
        <div class="overshadow__text">${copyrightSign}</div>
      </div>
    </figure>
  </div>
  <funny-slogan id="slogan-donate" text="${footerSlogan}"></funny-slogan>
  <div class="service-worker-version-number">
    ${serviceWorkerVersion} | ${serviceWorkerDate}
  </div>
</footer>
`
