export const pageSymbols = [
  {
    symb: '••',
    reg: '••',
    tag: ['<figure class="black">', '</figure>']
  },
  {
    symb: '◘◘',
    reg: '◘◘',
    tag: ['<figure class="bordered">', '</figure>']
  },
  {
    symb: '**',
    reg: '\\*\\*',
    tag: ['<b>', '</b>']
  },
  {
    symb: '_',
    reg: '_',
    tag: ['<em>', '</em>'],
    // Italic needs word boundaries, because an underscore is also a letter
    // in the code the lessons quote. Paired naively, __proto__ renders as an
    // empty <em> followed by stray underscores, and a URL with
    // pikachu_2_by_name in it goes italic in the middle. The markers must sit
    // outside a word on both sides, with something between them that is not
    // an underscore.
    pattern: /(?<![\p{L}\p{N}_])_(?!\s)[^_\n]+(?<!\s)_(?![\p{L}\p{N}_])/gu
  },
  {
    symb: '○○',
    reg: '○○',
    tag: ['<div class="slogan">', '</div>']
  },
  {
    symb: '~',
    reg: '~',
    tag: ['<code style="background-color:#eef; color: #059">', '</code>']
  },
  {
    symb: '^^',
    reg: '\\^\\^',
    tag: ['<small>', '</small>']
  },
  {
    symb: '↑↑',
    reg: '↑↑',
    tag: ['<sup style="color: #09b">', '</sup>']
  },
  {
    symb: '↓↓',
    reg: '↓↓',
    tag: ['<sub style="color: #fa0">', '</sub>']
  },
  {
    symb: ':::',
    reg: ':::',
    tag: ['<button class="cap">', '</button>']
  },
  {
    symb: '%%%',
    reg: '%%%',
    tag: ['<button class="link-ico">', '</button>']
  },
  {
    symb: '►►►',
    reg: '►►►',
    tag: ['<button class="page-next">', '</button>']
  },
  {
    symb: '◄◄◄',
    reg: '◄◄◄',
    tag: ['<button class="page-previous">', '</button>']
  }
]
