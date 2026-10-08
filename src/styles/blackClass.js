export const blackClass = `
.black  {
  background-color: #000;
  color:  #dde;
  font-family:  Monospace, monospace, Monaco, Roboto, Arial;
  font-size:  0.8rem;
  overflow-y: auto;
  padding: 16px;
}

/*
 * Three accents for a word on the black ground.
 *
 * Each is one name carrying the whole look — colour, weight and slant
 * together — so a highlight is a thing with a name rather than three
 * declarations that have to agree. The class can be written by hand; inside a
 * black block the emphasis already in the text picks it up on its own, which
 * is why none of the seventy highlights across the course had to be edited:
 *
 *   _слово_       amber   — the quiet one, a term being named
 *   **слово**     orange  — the loud one, a word being stressed
 *   **_слово_**   blue    — both marks, and the strongest of the three
 *
 * Outside a black block the same markup stays plain bold and italic: these
 * colours are legible on #000 and would be shouting on the page.
 */
.accent-amber,
.black em {
  color: #fa0;
  font-weight: 400;
  font-style: italic;
}

.accent-orange,
.black b {
  color: #f50;
  font-weight: 700;
  font-style: normal;
}

/* Both marks together, and more specific than either, so it wins. */
.accent-blue,
.black b em,
.black em b {
  color: #09b;
  font-weight: 700;
  font-style: italic;
}

.black .console-func-symbol:before {
  content: 'ƒ';
  color: #f74;
}
.black .console-collapsed:before {
  content: '►';
  color: #ddd;
}
.black .console-expanded:before {
  content: '▼';
  color: #ddd;
}
.black .console-calculated:before {
  content: '(...)';
  color: #ddd;
}

.black .console-keys {
  color: #7af;
}

.black .console-values {
  color: #a9f;
}

.black .console-prototype {
  color: #aaa;
}

.black .console-prototype-value {
  color: #eee;
}
`
