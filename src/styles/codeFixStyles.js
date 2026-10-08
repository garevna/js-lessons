const { minifier } = require('../helpers').default

/**
 * The editor is the point of the component, so it is given the room: full
 * width, monospace, and as many rows as the code has lines. A code box the
 * reader may only read is styled by Rainbow; this one is a textarea, which
 * cannot be highlighted without replacing it with an editor, so it is plain —
 * and plain is honest about what it is.
 *
 * The frame the code runs in is never shown. What the reader sees of the run
 * is the list of checks underneath.
 */
const rawSource = `
* { outline: none; box-sizing: border-box; }

:host { display: block; margin: 16px 0; }

figure.fix {
  margin: 0;
  padding: 16px;
  background: #333;
  color: #fff;
  border-radius: 4px;
}

.task {
  font-family: var(--main-font);
  font-size: 1rem;
  line-height: 1.5;
  color: #000;
  background: #ddd;
  border-radius: 4px;
  padding: 10px 14px;
  margin-bottom: 14px;
}

.editor {
  display: block;
  width: 100%;
  resize: vertical;
  font-family: Monospace, monospace;
  font-size: .9rem;
  line-height: 1.5;
  tab-size: 2;
  color: #fff;
  background: #1e1e1e;
  border: solid 1px #4a4a4a;
  border-radius: 4px;
  padding: 12px 14px;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
}

.editor:focus { border-color: #fa0; }

.sandbox {
  display: none;
}

.bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.bar button {
  padding: 8px 18px;
  border: none;
  border-radius: 4px;
  font-family: var(--main-font);
  font-size: .95rem;
  color: #fff;
  cursor: pointer;
  box-shadow: -1px -1px 2px #00000070;
}

button.run { background: #079; }
button.run:hover { background: #09b; }

button.undo { background: #555; }
button.undo:hover { background: #666; }

/* Pushed to the far end, where the score in a series of questions also sits. */
.score {
  margin-left: auto;
  padding: 4px 10px;
  border-radius: 4px;
  font-family: var(--main-font);
  font-size: 1rem;
  color: #fff;
}

.score.full { background: #090; }
.score.part { background: #a60; }
.score.none { background: #c00; }

.report { margin-top: 14px; }

/* What the code threw before any check could run — a syntax error, or a line
   that died on the way. Shown first because nothing below it means anything
   until it is fixed. */
.failure {
  margin: 0 0 10px;
  padding: 8px 12px;
  border-radius: 4px;
  background: #600;
  border-left: solid 3px #f55;
  font-family: Monospace, monospace;
  font-size: .9rem;
  color: #fff;
}

.line {
  display: grid;
  grid-template-columns: 22px 1fr auto;
  gap: 10px;
  align-items: baseline;
  padding: 7px 10px;
  border-radius: 4px;
  font-family: var(--main-font);
  font-size: .95rem;
  line-height: 1.45;
}

.line + .line { margin-top: 6px; }

.passed { background: #063; }
.failed { background: #3a3a3a; }

.mark:before { font-size: 1rem; }
.passed .mark:before { content: '✔'; color: #0f0; }
.failed .mark:before { content: '✖'; color: #f66; }

.points {
  font-family: Monospace, monospace;
  font-size: .9rem;
  white-space: nowrap;
}

.passed .points { color: #0f0; }
.failed .points { color: #999; }

/* Only when a check itself blew up, which usually means the code never got
   far enough to make what the check was looking for. */
.why {
  margin: 4px 0 0 32px;
  font-family: Monospace, monospace;
  font-size: .85rem;
  color: #f99;
}

@media (max-width: 600px) {
  figure.fix { padding: 12px; }
  .bar { flex-wrap: wrap; }
  .score { margin-left: 0; }
}
`

export const codeFixStyles = minifier(rawSource)
