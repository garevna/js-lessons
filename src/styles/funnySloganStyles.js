const { minifier } = require('../helpers').default

const rawSource = `
  .slogan-container {
    display: inline-block;
    margin: 16px 0 32px 32px;
    transition: all .5s;
    font-family: var(--slogan-font);
    font-weight: bold;
    text-align: right;
  }

  @keyframes shrink-jump {
    10%, 20% {
      transform: scale(1, .7) translate(0, 0);
      opacity: 1;
    }

    45% {
      transform: scale(1) translate(0, -80px);
      opacity: 0.5;
    }

    50% {
      transform: scale(1) translate(0, 60px);
      opacity: 0.2;
    }

    80% {
      transform: scale(1) translate(0, 0);
      opacity: 1;
    }
  }
`

export const funnySloganStyles = minifier(rawSource)
