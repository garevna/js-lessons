export const errorAndWarning = `
.error-message, .warning-message {
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
}

.error-message {
  background: #533;
  color: #fee;
  background-image: url(--error);
  background-repeat: no-repeat;
  background-size: 16px 14px;
  background-position: 4px center;
}

.warning-message {
  background: #550;
  color: #fea;
  background-image: url(--warning);
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: 4px center;
}

.error-message:before, .warning-message:before {
  content: '►';
  display: inline-block;
  padding: 1.5px 4px 0;
  margin-right: 8px;
  margin-left: 24px;
  margin-top: 4px;
  color: #bbb;
  font-size: 14px;
  font-weight: bold;
}
`
