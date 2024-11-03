Rainbow.extend('javascript', [
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
