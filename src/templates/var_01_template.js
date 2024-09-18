const { liveDemoColors } = require('../configs').default

export const var_01_template = `
  <p class="prompt-input">
    <span style="visibility: hidden; color: ${liveDemoColors.var}">var</span>
    <span style="visibility: hidden; color: ${liveDemoColors.name}">alpha</span>
    <span style="visibility: hidden; color: ${liveDemoColors.equal}"> = </span>
    <span style="visibility: hidden; color: ${liveDemoColors.number}">10</span>
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
      <span style="color: ${liveDemoColors.name}">alpha</span>
    </span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span style="color: ${liveDemoColors.numberOut}">10</span>
    </span>
  </p>

  <p>
    <span class="prompt-input"  style="visibility: hidden;" />
    <span style="visibility: hidden; color: ${liveDemoColors.var}">var</span>
    <span style="visibility: hidden; color: ${liveDemoColors.name}">provider</span>
    <span style="visibility: hidden; color: ${liveDemoColors.equal}"> = </span>
    <span style="visibility: hidden; color: ${liveDemoColors.string}">'Google'</span>
  </p>

  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span style="color: ${liveDemoColors.undefined}">undefined</span>
    </span>
  </p>

  <p>
    <span style="visibility: hidden;">
      <span class="prompt-input" />
      <span style="color: ${liveDemoColors.name}">provider</span>
    </span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span style="color: ${liveDemoColors.stringOut}">'Google'</span>
    </span>
  </p>

  <p>
    <span class="prompt-input"  style="visibility: hidden;" />
    <span style="visibility: hidden; color: ${liveDemoColors.var}">var</span>
    <span style="visibility: hidden; color: ${liveDemoColors.name}">test</span>
    <span style="visibility: hidden; color: ${liveDemoColors.equal}"> = </span>
    <span style="visibility: hidden; color: ${liveDemoColors.boolean}">false</span>
  </p>

  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span style="color: ${liveDemoColors.undefined}">undefined</span>
    </span>
  </p>

  <p>
    <span style="visibility: hidden;">
      <span class="prompt-input" />
      <span style="color: ${liveDemoColors.name}">test</span>
    </span>
  </p>

  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span style="color: ${liveDemoColors.numberOut}">false</span>
    </span>
  </p>
`
