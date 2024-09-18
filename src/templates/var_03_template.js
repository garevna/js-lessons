const { liveDemoColors } = require('../configs').default

export const var_03_template = `
<p class="prompt-input">
    <span style="visibility: hidden; color: ${liveDemoColors.var}">var</span>
    <span style="visibility: hidden; color: ${liveDemoColors.name}">showMustGoOn</span>
    <span style="visibility: hidden; color: ${liveDemoColors.equal}"> = </span>
    <span style="visibility: hidden; color: ${liveDemoColors.boolean}">true</span>
  </p>
  <p>
    <span style="visibility: hidden">
      <span class="prompt-output" />
      <span style="color: ${liveDemoColors.undefined}">undefined</span>
    </span>
  </p>
  <p>
    <span class="prompt-output" style="visibility: hidden;" />
    <span style="visibility: hidden; color: ${liveDemoColors.var}">var</span>
    <span style="visibility: hidden; color: ${liveDemoColors.name}">showmustgoon</span>
    <span style="visibility: hidden; color: ${liveDemoColors.equal}"> = </span>
    <span style="visibility: hidden; color: ${liveDemoColors.string}">'Win!'</span>
  </p>
  <p>
    <span style="visibility: hidden">
      <span class="prompt-output" />
      <span style="color: ${liveDemoColors.undefined}">undefined</span>
    </span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-input" />
      <span style="color: ${liveDemoColors.name}">showMustGoOn</span>
    </span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span style="color: ${liveDemoColors.numberOut}">true</span>
    </span>
  </p>

  <p>
    <span style="visibility: hidden;">
      <span class="prompt-input" />
      <span style="color: ${liveDemoColors.name}">showmustgoon</span>
    </span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span style="color: ${liveDemoColors.stringOut}">'Win!'</span>
    </span>
  </p>
`
