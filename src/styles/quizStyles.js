const { minifier } = require('../helpers').default

/**
 * The short-answer test is a row: question on the left, a verdict square on
 * the right, options under it as one-line labels. That layout is built for
 * fields a word long and falls apart when they are sentences — the verdict
 * square pushes the question into a column a third of the page wide.
 *
 * Here the question is a paragraph across the full width, and the options are
 * cards stacked under it. An option is a clickable card rather than a radio
 * and a label, because the text is three lines long and the whole of it should
 * be the target, not the 20px circle in front of it.
 *
 * The explanation is already in the page, laid out, and hidden. Revealing it
 * grows the card downwards and nothing above it moves, which matters inside
 * test-series: the stage measures its height from the card it is showing.
 */
const rawSource = `
* { outline: none; box-sizing: border-box; }

:host { display: block; margin: 16px 0; }

fieldset.quiz {
  position: relative;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 16px;
  margin: 0;
  font-size: 14px;
}

.question {
  font-family: var(--main-font);
  font-size: 1rem;
  line-height: 1.5;
  color: #000;
  background: #ddd;
  border: solid 1px #ddd;
  border-radius: 4px;
  padding: 10px 14px;
  /* Room for the verdict square, which is pinned to the top right corner. */
  padding-right: 72px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
}

.option {
  display: grid;
  /* The radio, then everything else. The explanation sits in the second
     column so it lines up under the text it belongs to, not under the dot. */
  grid-template-columns: 20px 1fr;
  gap: 4px 10px;
  align-items: start;
  padding: 8px 10px;
  border: solid 1px #4a4a4a;
  border-radius: 4px;
  background: #3a3a3a;
  transition: background .15s linear, border-color .15s linear;
}

.option:not(.locked):hover {
  background: #444;
  border-color: #fa0;
}

input[type="radio"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 3px solid #fa0;
  border-radius: 20%;
  margin: 2px 0 0;
  cursor: pointer;
  transition: .2s all linear;
}

input[type="radio"]:disabled { border-color: #999; }

label {
  font-family: var(--main-font);
  font-size: .95rem;
  line-height: 1.45;
  cursor: pointer;
}

.option.locked label { cursor: default; }

/* The explanation. Its own ground, so it reads as a remark about the option
   rather than as more of the option. */
.why {
  grid-column: 2;
  font-family: var(--main-font);
  font-size: .9rem;
  line-height: 1.5;
  color: #ddd;
  border-left: solid 3px #666;
  padding: 2px 0 2px 10px;
  margin-top: 4px;
}

.chosen-right { background: #063; border-color: #0a0; }
.chosen-right input[type="radio"] { border-color: #fff; background: #0c0; }
.chosen-right .why { border-left-color: #0c0; color: #fff; }

.chosen-wrong { background: #600; border-color: #c00; }
.chosen-wrong input[type="radio"] { border-color: #ff0; background: #f00; }
.chosen-wrong .why { border-left-color: #f55; color: #fff; }

/* The one that was right, shown after a wrong pick. Outlined rather than
   filled, so it is not mistaken for the option the reader chose. */
.was-right { border-color: #0a0; }
.was-right input[type="radio"] { border-color: #0c0; }
.was-right .why { border-left-color: #0c0; }

/* Inline code comes out of formatText with its colours written into the
   element: a pale box meant for a page of prose. On this ground it is a bright
   patch that outshines the sentence it sits in — the same reason a black block
   never uses ~ ~ either.

   No box at all, just the colour. A box also has to be broken when the line
   wraps, and const MyClass = class {} split across two lines is two padded
   rectangles with a gap down the middle. Colour alone wraps invisibly.

   !important because the colours arrive in a style attribute, which nothing
   else beats. The question keeps the pale box: it has a light ground. */
.option code,
.why code {
  background-color: transparent !important;
  color: #fa0 !important;
  padding: 0;
}

/* Only ever there inside a series, and only after an answer: it is what the
   reader presses when they have finished reading why. */
button.next {
  display: block;
  margin: 14px 0 0 auto;
  padding: 8px 18px;
  border: none;
  border-radius: 4px;
  background: #079;
  color: #fff;
  font-family: var(--main-font);
  font-size: .95rem;
  cursor: pointer;
  box-shadow: -1px -1px 2px #00000070;
}

button.next:hover { background: #09b; }

#result {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
}

.success-result, .failure-result { border-radius: 4px; }

.success-result:before, .failure-result:before {
  display: inline-block;
  font-size: 32px;
}

.success-result { border: solid 1px #090; }

.success-result:before {
  content: '✅';
  margin: 1px 0 0 5px;
}

.failure-result {
  background: #900;
  border: solid 1px #fa0;
}

.failure-result:before {
  content: '✖';
  color: #fa0;
  margin: 2px 0 0 11px;
}

@media (max-width: 600px) {
  fieldset.quiz { padding: 12px; }
  .question { padding-right: 14px; }
  #result { position: static; margin: 10px 0 0 auto; }
}
`

export const quizStyles = minifier(rawSource)
