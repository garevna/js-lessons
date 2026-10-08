/**
 * What the console prints in red and in yellow.
 *
 * The icon is drawn by :before, which pins it once at the top left. It was
 * also set on the block itself, where it had no size, no position and no
 * no-repeat to hold it — so it tiled, and a one-line warning came out as a row
 * of thirty warning triangles with the text behind them. The same line had
 * already been commented out for .error-message; this removes the other one.
 */
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
}

.warning-message {
  background: #550;
  color: #ffc;
}

.error-message:before, .warning-message:before {
  content: '   ►';
  /*
   * The three spaces are what holds the icon's 13 pixels, and they only hold
   * anything where white space is kept. On the page the panel is a <pre> and
   * they were; inside a console demo it is a <p>, where leading spaces
   * collapse away — so the icon, pinned at 4px, was drawn straight on top of
   * the ► and the mark came out as two triangles in one place.
   */
  white-space: pre;
  display: inline-block;
  background-size: 13px 13px !important;
  background-position: 0px 6px !important;
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
