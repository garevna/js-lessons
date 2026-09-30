const { minifier } = require('../helpers').default

/**
 * The header is a flex row: how far along on the left, how it is going on the
 * right. The two scores are squares with a ground of their own, the shape the
 * demo button already uses, and they are kept 12px apart so they read as two
 * numbers rather than one.
 *
 * The stage is as tall as the tallest card and holds them all, stacked in the
 * same place; the one being answered slides up and out and the next arrives
 * from below. It is only movement — the questions themselves are the same
 * elements they always were.
 */
const rawSource = `
:host { display: block; margin: 16px 0; }

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px 8px;
}

.counter {
  font-family: var(--main-font);
  font-size: .95rem;
  color: #079;
}

.score { display: flex; gap: 12px; }

.score span {
  display: inline-block;
  min-width: 34px;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-family: var(--main-font);
  font-size: 1rem;
  text-align: center;
  box-shadow: -1px -1px 2px #00000070;
}

.right { background: #090; }
.wrong { background: #c00; }

.stage {
  position: relative;
  overflow: hidden;
  transition: height .35s ease-in-out;
}

.slot {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transform: translateY(40px);
  transition: transform .35s ease-in-out, opacity .35s ease-in-out;
  pointer-events: none;
}

.slot.current {
  position: relative;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* Answered: up and out of the way. */
.slot.gone {
  opacity: 0;
  transform: translateY(-40px);
}

.summary {
  background: #333;
  color: #eee;
  border-radius: 4px;
  padding: 16px 24px;
  font-family: var(--main-font);
}

.summary h4 { margin: 0 0 12px; font-size: 1.1rem; }

.missed {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: baseline;
  padding: 6px 0;
  border-top: solid 1px #555;
  font-size: .9rem;
}

.missed .q { flex: 1 1 100%; font-family: monospace; color: #ddd; }
.missed .was { color: #f88; text-decoration: line-through; }
.missed .is { color: #9d9; }

.again {
  margin-top: 16px;
  border: 0;
  border-radius: 4px;
  background: #f50;
  color: white;
  padding: 6px 14px;
  font-family: var(--main-font);
  font-size: .95rem;
  cursor: pointer;
  box-shadow: -1px -1px 2px #00000070;
}

.again:hover { background: #f83; }
`

export const testSeriesStyles = minifier(rawSource)
