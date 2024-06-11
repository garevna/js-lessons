const { minifier } = require('../helpers').default

const rawSource = `
  img  { border: none; vertical-align: middle; margin: 0 12px; }
  h5, h6 { color: #999; }

  .close-button {
    position: absolute;
    top: 4px;
    right: 8px;
    color: #777;
    font-size: 24px;
    cursor: pointer;
  }

  table { border-collapse: collapse; }
  tr { border-bottom: solid 1px #ddd; }
  td { vertical-align: middle; padding: 16px 0; }
`

export const donateStyles = minifier(rawSource)
