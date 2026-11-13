const { minifier } = require('../helpers').default

const rawSource = `
  /* The page's own "* { box-sizing: border-box }" does not cross a shadow
     boundary, and without it an input at width:100% is wider than the panel
     by its padding - which showed up as a scrollbar along the bottom. */
  *, *::before, *::after { box-sizing: border-box; }

  :host {
    --feedback-ink: #203040;
    --feedback-soft: #6a7a88;
    --feedback-line: #dce4ea;
    --feedback-accent: #09b;
    --feedback-answer: #f1f9fc;
    font-family: var(--font-family, system-ui, sans-serif);
  }

  /* An icon, no caption: this sits in the top bar beside the donate widget,
     where there is room for a mark and none for a sentence. The tooltip
     carries the words. */
  .open {
    display: block;
    padding: 0;
    border: none;
    background: none;
    color: #fa0;
    line-height: 0;
    cursor: pointer;
    position: relative;
    transition: color .2s, transform .15s;
  }

  .open:hover { color: #fc6; transform: scale(1.08); }

  /* An answer arrived while the reader was away. */
  .open .badge {
    display: none;
    position: absolute;
    top: -4px;
    right: -6px;
    min-width: 17px;
    height: 17px;
    padding: 0 4px;
    border-radius: 9px;
    background: #f50;
    color: #fff;
    font-family: var(--font-family, system-ui, sans-serif);
    font-size: 11px;
    font-weight: bold;
    line-height: 17px;
    text-align: center;
  }

  .open.has-answers .badge { display: block; }

  .panel {
    position: fixed;
    top: 76px;
    right: 24px;
    z-index: 600;
    display: none;
    flex-direction: column;
    width: min(400px, calc(100vw - 24px));
    max-height: min(620px, calc(100vh - 100px));
    padding: 14px 16px 16px;
    border-radius: 12px;
    background: #fff;
    color: var(--feedback-ink);
    box-shadow: 0 18px 48px rgba(10, 20, 30, .35);
    overflow: hidden;
  }

  .panel.open { display: flex; }

  /* The corner, not beside the heading. */
  .close {
    position: absolute;
    top: 6px;
    right: 8px;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 14px;
    background: none;
    color: var(--feedback-soft);
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
  }

  .close:hover { background: #f2f5f7; color: var(--feedback-ink); }

  h3 {
    margin: 0 0 12px;
    padding-right: 32px;
    font-size: 17px;
    font-weight: 600;
  }

  .body { overflow-y: auto; overflow-x: hidden; }

  /* Previous messages live under the form; a rule keeps them from reading as
     part of it. */
  .thread:not(:empty) {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--feedback-line);
  }

  /* A message with its answers under it - the shape the server returns, and
     the shape this has to read as. */
  .message {
    margin-bottom: 12px;
    padding: 9px 11px;
    border: 1px solid var(--feedback-line);
    border-radius: 9px;
  }

  .message > .meta {
    display: flex;
    gap: 6px;
    margin-bottom: 5px;
    color: var(--feedback-soft);
    font-size: 12px;
  }

  .message > p { margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap; }

  .reply {
    margin-top: 9px;
    padding: 9px 11px;
    border-left: 3px solid var(--feedback-accent);
    border-radius: 0 8px 8px 0;
    background: var(--feedback-answer);
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .reply .meta { margin-bottom: 3px; color: var(--feedback-soft); font-size: 12px; }

  label {
    display: block;
    margin-bottom: 3px;
    color: var(--feedback-soft);
    font-size: 13px;
  }

  input, textarea {
    width: 100%;
    margin-bottom: 9px;
    padding: 8px 10px;
    border: 1px solid var(--feedback-line);
    border-radius: 7px;
    color: inherit;
    font: inherit;
    font-size: 14px;
    resize: vertical;
  }

  input:focus, textarea:focus { outline: 2px solid var(--feedback-accent); outline-offset: -1px; }

  textarea { min-height: 88px; }

  .send {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 7px;
    background: var(--feedback-accent);
    color: #fff;
    font: inherit;
    font-size: 15px;
    cursor: pointer;
  }

  .send:hover { background: #0ac; }
  .send[disabled] { opacity: .6; cursor: default; }

  .status { margin: 9px 0 0; font-size: 13px; line-height: 1.4; }
  .status.bad { color: #b3261e; }
  .status.good { color: #1b7a43; }

  @media screen and (max-width: 520px) {
    .panel { right: 8px; left: 8px; top: 64px; width: auto; max-height: calc(100vh - 88px); }
  }
`

export const feedbackStyles = minifier(rawSource)
