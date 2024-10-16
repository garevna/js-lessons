export const blackClass = `
.black  {
  background-color: #000;
  color:  #dde;
  padding:  0 12px;
  margin:  12px 0;
  font-family:  Monospace, monospace, Monaco, Roboto, Arial;
  font-size:  0.8rem;
  line-height:  1.8;
  overflow-y: auto;
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
