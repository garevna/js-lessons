const { minifier } = require('../helpers').default

const rawSource = `
.speech-baloon {
    stroke-linejoin:round;
    stroke-width:8px;
    stroke:#ddd;
    fill:#000;
  }
  .speech-baloon-text {
    font-family: var(--lang-switcher-font);
    fill: #fff;
    font-size: 200px;
  }
`

export const langSwitcherStyles = minifier(rawSource)
