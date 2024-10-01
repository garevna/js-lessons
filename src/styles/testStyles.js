const { minifier } = require('../helpers').default

const rawSource = `
* { outline: none; }
fieldset {
  background: #333;
  color: #fff;
  padding: 8px 16px 32px 32px;
  margin-left: -0px;
  border-radius: 4px;
  border: none;
  /* box-shadow: 4px 4px 8px #0009; */
  font-size: 14px;
}
tr {
  margin: 12px 16px 32px 0;
}
td {
  vertical-align: middle;
}
h4 {
  border: solid 1px #ddd;
  padding: 8px 12px;
  background: #ddd;
  color: #000;
  font-family: var(--font-family);
  border-radius: 4px;
  letter-spacing: 1.4px;
  width: calc(100% - 48px);
}
#result {
  position: relative;
  bottom: 0px;
  border-radius: 4px;
  right: calc(48px - 100%);
  width: 32px;
  height: 32px;
  border: solid 2px #999;
}

label {
  line-height: 24px;
}
input[type="radio"] {
  appearance: none;
  border-radius: 20%;
  width: 20px;
  height: 20px;
  border: 3px solid #fa0;
  box-sizing: border-box;
  transition: 0.2s all linear;
  margin-right: 8px;
  position: relative;
  top: 4px;
  cursor: pointer;
}

.success-result, .failure-result {
  border-radius: 4px;
  width: 48px;
  height: 48px;
}

.success-result:before, .failure-result:before {
  display: inline-block;
  font-size: 32px;
}

.success-result {
  border: solid 1px #090;
}

.success-result:before {
  content: '✅';
  margin: -8px 0px 0 -6px;
}

.failure-result {
  background: #900;
  border: solid 1px #fa0;
}

.failure-result:before {
  content: '✖';
  color: #fa0;
  margin: -7px 8px 0 3px;
}
`

export const testStyles = minifier(rawSource)
