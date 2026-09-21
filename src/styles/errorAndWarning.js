const errorBefore = `url`

export const errorAndWarning = `
.error-message, .warning-message {
  font-family: monospace;
  font-size: 0.8rem;
  border-radius: 4px;
  padding: 0px 8px 4px;
  margin: -4px 0;
  text-wrap: wrap;
}

.error-message {
  background: #533;
  color: #fee;
  /* background-image: url(--error); */
}

.warning-message {
  background: #550;
  color: #ffc;
  background-image: url(--warning);
}

.error-message:before, .warning-message:before {
  content: '   ►';
  display: inline-block;
  background-size: 13px 13px !important;
  background-position: 4px 6px !important;
  background-repeat: no-repeat !important;
  padding: 4px 0 0 0;
  margin-right: 8px;
}
.error-message:before {
  background-image: url(--error);
}
.warning-message:before {
  background-image: url(--warning);
}
`

