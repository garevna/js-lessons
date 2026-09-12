export const var_NaN_template = `
  <p class="prompt-input">
    <span style="visibility: hidden" class="default">NaN</span>
    <span style="visibility: hidden" class="math">===</span>
    <span style="visibility: hidden" class="default">NaN</span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>
  <p>
    <span style="visibility: hidden">
      <span class="prompt-output" />
      <span class="boolean-out">false</span>
    </span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>

  <p>
    <span class="prompt-output" style="visibility: hidden;" />
    <span style="visibility: hidden" class="default">NaN</span>
    <span style="visibility: hidden" class="math">==</span>
    <span style="visibility: hidden" class="default">NaN</span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>
  <p>
    <span style="visibility: hidden">
      <span class="prompt-output" />
      <span class="boolean-out">false</span>
    </span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>

  <p>
    <span class="prompt-output" style="visibility: hidden;" />
    <span style="visibility: hidden" class="default">NaN</span>
    <span style="visibility: hidden" class="math">==</span>
    <span style="visibility: hidden" class="default">undefined</span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span class="boolean-out">false</span>
    </span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>

  <p>
    <span class="prompt-output" style="visibility: hidden;" />
    <span style="visibility: hidden" class="default">isNaN(</span>
    <span style="visibility: hidden" class="string">'5'</span>
    <span style="visibility: hidden" class="default">)</span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span class="boolean-out">false</span>
    </span>
  </p>
   <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>

  <p>
    <span class="prompt-output" style="visibility: hidden;" />
    <span style="visibility: hidden" class="default">isNaN(</span>
    <span style="visibility: hidden" class="string">'abc'</span>
    <span style="visibility: hidden" class="default">)</span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span class="boolean-out">true</span>
    </span>
  </p>
   <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>

  <p>
    <span class="prompt-output" style="visibility: hidden;" />
    <span style="visibility: hidden" class="default">Number.</span>
    <span style="visibility: hidden" class="console">isNaN(</span>
    <span style="visibility: hidden" class="string">'abc'</span>
    <span style="visibility: hidden" class="default">)</span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span class="boolean-out">false</span>
    </span>
  </p>
   <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>

  <p>
    <span class="prompt-output" style="visibility: hidden;" />
    <span style="visibility: hidden" class="default">Number.</span>
    <span style="visibility: hidden" class="console">isNaN(</span>
    <span style="visibility: hidden" class="string">'abc'</span>
    <span style="visibility: hidden" class="math">/</span>
    <span style="visibility: hidden" class="number">2</span>
    <span style="visibility: hidden" class="default">)</span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span class="boolean-out">true</span>
    </span>
  </p>
   <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>

  <p>
    <span class="prompt-output" style="visibility: hidden;" />
    <span style="visibility: hidden" class="default">Number.</span>
    <span style="visibility: hidden" class="console">isNaN(</span>
    <span style="visibility: hidden" class="default">undefined</span>
    <span style="visibility: hidden" class="default">)</span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span class="boolean-out">false</span>
    </span>
  </p>
   <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>

  <p>
    <span class="prompt-output" style="visibility: hidden;" />
    <span style="visibility: hidden" class="default">Number.</span>
    <span style="visibility: hidden" class="console">isNaN(</span>
    <span style="visibility: hidden" class="default">undefined</span>
    <span style="visibility: hidden" class="math">-</span>
    <span style="visibility: hidden" class="number">0</span>
    <span style="visibility: hidden" class="default">)</span>
  </p>
  <p>
    <span style="visibility: hidden" class="hr"></span>
  </p>
  <p>
    <span style="visibility: hidden;">
      <span class="prompt-output" />
      <span class="boolean-out">true</span>
    </span>
  </p>
`