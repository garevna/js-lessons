const { minifier } = require('../helpers').default

const rawSource = `
  .donate-shadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border: none;
    background: #0007;
    display: none;
  }

  .donate-popup {
    position: fixed;
    transform: translate(50%, 50%);
    left: calc(50vw - 360px);
    top: calc(50vh - 480px);
    width: 360px;
    height: 480px;
    box-sizing: border-box;
    background: #fbfbfb;
    border: solid 1px #999;
    padding: 40px 24px 24px 24px;
    border-radius: 4px;
    box-shadow: 8px 8px 12px #0007;
    transition: all .5s;
    z-index: 505;
    opacity: 0;
    display: none;
  }

  img  { border: none; vertical-align: middle; margin: 0 12px; }
  .donate-popup p {
    color: #777;
    font-size: 14px;
    margin: 0;
    line-height: 1.5;
    padding: 4px 16px 0px 0px;
  }

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
