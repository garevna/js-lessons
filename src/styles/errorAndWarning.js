export const errorAndWarning = `
.error-message, .warning-message {
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
}

.error-message {
  background: #843;
  color: #fee;
  background-image: url(--error);
  background-repeat: no-repeat;
  background-size: 16px 14px;
  background-position-y: center;
}

.warning-message {
  background: #550;
  color: #fea;
  background-image: url(--warning);
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position-y: center;
}

.error-message:before, .warning-message:before {
  content: '►';
  display: inline-block;
  padding: 1.5px 4px 0;
  margin-right: 8px;
  margin-left: 20px;
  margin-top: 8px;
  color: #bbb;
  font-size: 14px;
  font-weight: bold;
}
`
