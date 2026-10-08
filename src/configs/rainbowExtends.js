Rainbow.extend('javascript', [
  /*
   * A private name, and it has to come first.
   *
   * Rainbow's generic language reads # as the start of a line comment — it is
   * one in Python, in Ruby, in a shell — so every #private was greyed out from
   * the hash to the end of the line, taking the rest of the line with it.
   * Eleven of them on the lesson about classes alone. ES2022 gave JavaScript
   * the same character for the opposite meaning.
   *
   * A letter is required after the hash, so #000 inside 'solid #000' is left to
   * the colour rule that already handles it.
   *
   * This pattern alone is not enough: where two patterns start at the same
   * place Rainbow keeps the longer match, so the comment rule still won
   * `this.#status = status`. The rule itself is edited by tools/rainbow-patch.js
   * — npm run rainbow — and this gives the name its own class once it is free.
   */
  {
    name: 'variable.private',
    pattern: /#[A-Za-z_$][\w$]*/g
  },
  {
    name: 'keyword',
    pattern: /var |let |const |class |function|function *|function*|return |continue|break/g
  },
  {
    name: 'keyword.magic',
    pattern: /yield|async |await /g
  },
  {
    name: 'method-name',
    pattern: /then|catch/g
  },
  {
    name: 'template-literal',
    pattern: /(\$\{.+\})/g
  },
  {
    name: 'support.method',
    pattern: /getElementById|getElementsByName|getElementsByTagName|getElementsByClassName|querySelector|querySelectorAll|createElement|createTextNode|createComment|createAttribute|createDocumentFragment|appendChild/g
  },
  {
    name: 'console-methods',
    pattern: /console|log|warn|dir|console.log|console.warn|console.dir|console.time|console.timeEnd|console.table/g
  }
])
