const { liveDemoColors } = require('../configs').default

export const var_02_template = `
<p class="prompt-input">
  <span style="visibility: hidden; color: ${liveDemoColors.var}">var</span>
  <span style="visibility: hidden; color: ${liveDemoColors.name}">$$$</span>
  <span style="visibility: hidden; color: ${liveDemoColors.equal}"> = </span>
  <span style="visibility: hidden; color: ${liveDemoColors.number}">15</span>
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
    <span style="color: ${liveDemoColors.name}">$$$</span>
  </span>
</p>
<p>
  <span style="visibility: hidden;">
    <span class="prompt-output" />
    <span style="color: ${liveDemoColors.numberOut}">15</span>
  </span>
</p>

<p>
  <span class="prompt-input"  style="visibility: hidden;" />
  <span style="visibility: hidden; color: ${liveDemoColors.var}">var</span>
  <span style="visibility: hidden; color: ${liveDemoColors.name}">___</span>
  <span style="visibility: hidden; color: ${liveDemoColors.equal}"> = </span>
  <span style="visibility: hidden; color: ${liveDemoColors.number}">20</span>
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
    <span style="color: ${liveDemoColors.name}">___</span>
  </span>
</p>
<p>
  <span style="visibility: hidden;">
    <span class="prompt-output" />
    <span style="color: ${liveDemoColors.stringOut}">20</span>
  </span>
</p>

<p>
  <span class="prompt-input"  style="visibility: hidden;" />
  <span style="visibility: hidden; color: ${liveDemoColors.name}">$$$</span>
  <span style="visibility: hidden; color: ${liveDemoColors.equal}"> + </span>
  <span style="visibility: hidden; color: ${liveDemoColors.name}">___</span>
</p>

<p>
  <span style="visibility: hidden;">
    <span class="prompt-output" />
    <span style="color: ${liveDemoColors.numberOut}">35</span>
  </span>
</p>
`
