const { minifier } = require('../helpers').default

const rawSource = `
  /* The page's own "* { box-sizing: border-box }" does not cross a shadow
     boundary, and without it an input at width:100% is wider than the panel
     by its padding - which showed up as a scrollbar along the bottom. */
  *, *::before, *::after { box-sizing: border-box; }

  /* No caret in the fields, and nothing selectable in them.
     ---------------------------------------------------------------------
     The main menu's own stylesheet starts with "* { user-select: none }" -
     reasonable for a menu, where a drag should not paint the items blue.
     This widget is an element of that tree, so the rule matches its host,
     and user-select is inherited: the value crosses into this shadow root
     and reaches the inputs. Chrome's answer to an unselectable editable
     field is to hide its caret, so clicking into the textarea looked like
     nothing happened at all.
     A box-sizing rule does not cross a shadow boundary; an inherited
     property does. It has to be said again, here, for the panel. */
  .panel, .panel * {
    user-select: text;
    -webkit-user-select: text;
  }

  .open, .close, .send {
    user-select: none;
    -webkit-user-select: none;

    /* Safari flashes a grey block over whatever is tapped. On a round icon
       and a full-width button it reads as a rendering fault. */
    -webkit-tap-highlight-color: transparent;
  }

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
     carries the words.

     "open" is this button and nothing else. The panel's open state is
     "shown" for a reason: while it was also called "open", every rule here
     landed on the panel as well. line-height: 0 was inherited into the
     fields through font: inherit, which gave the caret in the textarea a
     line box of no height - a field that could be typed into with nothing
     to show that it was. The hover rule turned the whole panel's text
     yellow and scaled it by 8%. One shared word. */
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

  /* The icon is 30px in a top bar shared with the donate widget, and there
     is no room to make it bigger. The area it answers to can grow without
     it: a transparent pad, laid over nothing, taking the taps that land
     just beside the mark. */
  .open::after { content: ''; position: absolute; inset: -8px; }

  /* An answer arrived while the reader was away. */
  .open .badge {
    display: none;
    position: absolute;
    top: -4px;
    right: -8px;
    min-width: 20px;
    height: 20px;
    padding: 0 4px;
    border-radius: 10px;
    background: #f50;
    color: #fff;
    font-family: var(--font-family, system-ui, sans-serif);
    font-size: 11px;
    font-weight: bold;
    line-height: 20px;
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

    /* As tall as what is in it, and no taller: an empty form is a short
       panel, a long conversation a tall one. The cap is only so that a
       grown thread cannot push the Send button off the screen - until it
       is reached, nothing scrolls and nothing is cut. */
    height: max-content;
    max-height: min(620px, calc(100vh - 100px));

    /* 100vh on a phone is the window with the address bar counted as if it
       were not there, so a panel sized by it runs under the bottom bar of
       Safari. dvh is the height actually on screen. Said second: a browser
       that does not know the unit keeps the line above. */
    max-height: min(620px, calc(100dvh - 100px));
    padding: 16px 20px 20px;

    /* 8px here, 8px on the donate popup, 8px on every button and field in
       both: one widget opens them, and corners that disagree read as two
       different programs. */
    border-radius: 8px;
    background: #fff;
    color: var(--feedback-ink);

    /* Said here rather than left to whatever the page has: the panel is a
       sheet of text and a form, and it should not depend on the leading of
       the bar it happens to hang from. */
    line-height: 1.5;
    box-shadow: 0 16px 48px rgba(10, 20, 30, .35);
    overflow: hidden;
  }

  .panel.shown { display: flex; }

  /* The corner, not beside the heading. */
  .close {
    position: absolute;
    top: 8px;
    right: 8px;

    /* A fingertip is about nine millimetres; 28px is under that, and the
       × sits in the corner, where a miss closes nothing and scrolls the
       page instead. The glyph is unchanged - only the box around it. */
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 8px;
    background: none;
    color: var(--feedback-soft);
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
  }

  .close:hover { background: #f2f5f7; color: var(--feedback-ink); }

  /* The rule under the heading earns its place: the form below scrolls, and
     without a line to pass under, a half-cut label reads as a broken panel
     instead of as content that carries on above. */
  h3 {
    margin: 12px 0 16px;
    padding: 8px 32px 20px 0;
    font-size: 18px;
    font-weight: 600;
  }

  .body {
    overflow-y: auto;
    overflow-x: hidden;
    /* Momentum scrolling inside the panel on iOS 12 and earlier; newer
       Safari does it anyway and ignores the line. */
    -webkit-overflow-scrolling: touch;
    /* A flick that reaches the end of this box must not carry on into the
       lesson behind the panel. */
    overscroll-behavior: contain;
  }

  /* Previous messages live under the form; a rule keeps them from reading as
     part of it. */
  .thread:not(:empty) {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--feedback-line);
  }

  /* A message with its answers under it - the shape the server returns, and
     the shape this has to read as. */
  .message {
    margin-bottom: 12px;
    padding: 12px 16px;
    border: 1px solid var(--feedback-line);
    border-radius: 8px;
  }

  .message > .meta {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
    color: var(--feedback-soft);
    font-size: 12px;
  }

  .message > p { margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap; }

  .reply {
    margin-top: 8px;
    padding: 8px 12px;
    border-left: 4px solid var(--feedback-accent);
    border-radius: 0 8px 8px 0;
    background: var(--feedback-answer);
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
  }

  .reply .meta { margin-bottom: 4px; color: var(--feedback-soft); font-size: 12px; }

  /* Three fields one under another: the gap between a label and its own
     field has to be visibly smaller than the gap to the next label, or the
     caption reads as belonging to the box above it. 6 against 16. */
  label {
    display: block;
    margin: 8px 0 12px;
    color: var(--feedback-soft);
    font-size: 13px;
  }

  input, textarea {
    width: 100%;
    margin-bottom: 16px;
    padding: 12px 16px;

    /* Safari on iOS draws its own field - rounded, with an inner shadow -
       and ignores half of what is set here until the appearance is taken
       away from it. */
    -webkit-appearance: none;
    appearance: none;

    border: 1px solid var(--feedback-line);
    border-radius: 8px;

    /* The text is ink; the accent is only the caret, where a thin bright
       line is exactly what is wanted. */
    color: var(--feedback-ink);
    caret-color: var(--feedback-accent);
    font: inherit;
    font-size: 14px;

    /* The caret in a textarea is as tall as the line box. "font: inherit"
       takes the line-height along with the family, so an ancestor with a
       line-height of zero leaves nothing to draw. Spelled out here, after
       the shorthand, it cannot be inherited away again. */
    line-height: 1.45;
    resize: vertical;
  }

  /* Firefox dims the placeholder on its own, so the opacity has to be said. */
  ::placeholder { color: var(--feedback-soft); opacity: 1; }

  /* Chrome paints a filled-in field pale yellow and keeps it that colour
     through every background declaration; an inset shadow the size of the
     field is the only thing that covers it, and the text colour of an
     autofilled field has its own property. */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px #fff inset;
    -webkit-text-fill-color: var(--feedback-ink);
    caret-color: var(--feedback-accent);
  }

  input:focus, textarea:focus { outline: 2px solid var(--feedback-accent); outline-offset: -1px; }

  /* A field whose text is under 16px makes Safari on iOS zoom the page when
     it is tapped - and it never zooms back, so the reader is left on a site
     one and a half times too wide, with a panel hanging off the edge. 16px
     is the whole cure. Touch screens only: on a desktop 14 reads better. */
  @media (pointer: coarse) {
    input, textarea { font-size: 16px; }
  }

  /* cursor: text was here against the pointer the panel inherited from the
     icon's rules; that is gone now, and a textarea has the right cursor of
     its own. */
  textarea { min-height: 84px; margin-bottom: 20px; }

  .send {
    width: 100%;
    padding: 24px 0;
    border: none;
    border-radius: 8px;
    background: var(--feedback-accent);
    color: #fff;
    font: inherit;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }

  .send:hover { background: #0ac; }
  .send[disabled] { opacity: .6; cursor: default; }

  .status { margin: 8px 0 0; font-size: 13px; line-height: 1.4; }
  .status.bad { color: #b3261e; }
  .status.good { color: #1b7a43; }

  @media screen and (max-width: 520px) {
    .panel {
      right: 8px;
      left: 8px;
      top: 64px;
      width: auto;
      max-height: calc(100vh - 88px);
      max-height: calc(100dvh - 88px);
    }
  }

  /* A short window - a laptop with a browser half the screen, or a phone in
     landscape. The air above is what has to go first; the air between the
     fields is what made the form readable in the first place. */
  @media screen and (max-height: 640px) {
    .panel { top: 56px; max-height: calc(100vh - 72px); max-height: calc(100dvh - 72px); }
    textarea { min-height: 64px; }
  }
`

export const feedbackStyles = minifier(rawSource)
