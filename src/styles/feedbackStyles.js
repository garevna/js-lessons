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
    --feedback-accent: #0a7b8c;
    --feedback-answer: #f2fbf6;
    font-family: var(--main-font, system-ui, sans-serif);
  }

  /* The button sits out of the way of the lesson and of the menu: bottom
     right, above the fold, and it never covers the code examples. */
  .open {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 18px;
    border: none;
    border-radius: 24px;
    background: var(--feedback-accent);
    color: #fff;
    font: inherit;
    font-size: 15px;
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(20, 40, 60, .25);
    transition: transform .15s, box-shadow .15s;
  }

  .open:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(20, 40, 60, .3); }

  /* An answer arrived while the reader was away. */
  .open .badge {
    display: none;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    border-radius: 10px;
    background: #ffd23f;
    color: #203040;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
  }

  .open.has-answers .badge { display: inline-block; }

  .panel {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 41;
    display: none;
    flex-direction: column;
    width: min(420px, calc(100vw - 32px));
    max-height: min(640px, calc(100vh - 48px));
    border-radius: 14px;
    background: #fff;
    color: var(--feedback-ink);
    box-shadow: 0 18px 48px rgba(20, 40, 60, .28);
    overflow: hidden;
  }

  .panel.open { display: flex; }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid var(--feedback-line);
  }

  header h3 { margin: 0; font-size: 16px; font-weight: 600; }

  .close {
    border: none;
    background: none;
    color: var(--feedback-soft);
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
  }

  .body { overflow-y: auto; padding: 14px 16px; }

  .intro { margin: 0 0 14px; color: var(--feedback-soft); font-size: 14px; line-height: 1.45; }

  /* A question with its answers under it - the shape the server returns and
     the shape this has to read as: a thicket of alternating messages is
     exactly what nesting them avoids. */
  .question {
    margin-bottom: 14px;
    padding: 10px 12px;
    border: 1px solid var(--feedback-line);
    border-radius: 10px;
  }

  .question > .meta {
    display: flex;
    gap: 8px;
    margin-bottom: 6px;
    color: var(--feedback-soft);
    font-size: 12px;
  }

  .question > p { margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap; }

  .reply {
    margin-top: 10px;
    padding: 10px 12px;
    border-left: 3px solid var(--feedback-accent);
    border-radius: 0 8px 8px 0;
    background: var(--feedback-answer);
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .reply .meta { margin-bottom: 4px; color: var(--feedback-soft); font-size: 12px; }

  label { display: block; margin-bottom: 4px; color: var(--feedback-soft); font-size: 13px; }

  input, textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 9px 11px;
    border: 1px solid var(--feedback-line);
    border-radius: 8px;
    color: inherit;
    font: inherit;
    font-size: 14px;
    resize: vertical;
  }

  input:focus, textarea:focus { outline: 2px solid var(--feedback-accent); outline-offset: -1px; }

  textarea { min-height: 96px; }

  .send {
    width: 100%;
    padding: 11px;
    border: none;
    border-radius: 8px;
    background: var(--feedback-accent);
    color: #fff;
    font: inherit;
    font-size: 15px;
    cursor: pointer;
  }

  .send[disabled] { opacity: .6; cursor: default; }

  .status { margin: 10px 0 0; font-size: 13px; line-height: 1.4; }
  .status.bad { color: #b3261e; }
  .status.good { color: #1b7a43; }

  @media (max-width: 520px) {
    .open { right: 12px; bottom: 12px; }
    .panel { right: 8px; left: 8px; bottom: 8px; width: auto; }
  }
`

export const feedbackStyles = minifier(rawSource)
