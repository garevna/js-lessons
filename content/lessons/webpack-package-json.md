## ![ico-25 webpack] {{s1.h1}}

### ![ico-20 webpack] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

◘◘![ico-20 file] package.json◘◘

~~~js
"scripts": {
  "dev": "webpack --mode development ./js/script.js --output ./build/index.js --watch",
  "build": "webpack --mode production ./js/script.js --output ./build/index.js --watch"
}
~~~

![](https://lh4.googleusercontent.com/t3HMzsLvURk-jymxhIhITlzHUVfrkuS1UagnldLwLccys2iZH8rBOFWdLf16gh1UqinQ8gjibPgIlqkp5PvYtAaC0hBwA32nscUHScKfZGFdgiWJHwMOyP7NU70qhWGZF87lOjmc7TfY4L8)

{{s2.p6}}

{{s2.p7}}
{{s2.p8}}

{{s2.p9}}

![](https://lh4.googleusercontent.com/mzuMRK4yXEhLJ1AW0sBaSswsz35bNA9srOzeQQx0EjWI2xUK7zzeADS9SdFh7g2heeuuBAQLMQYNI4xvVuiVOak-GOMQ88SpmSYE4ERCcYvRtFxg8prqo1pOyl5vy-mDY__8weNvaQ-wXhw)

______________________________________________________________________

### ![ico-20 webpack] {{s3.h1}}

{{s3.p1}}

••![ico-20 bash] npm run dev••

{{s3.p2}}

••![ico-20 bash] npm run build••

{{s3.p3}}

{{s3.p4}}
_______________________________________________________________________

••![ico-20 bash] npm run dev --watch••

{{s3.p5}}
{{s3.p6}}

{{s3.p7}}

◘◘![ico-20 file] script.js◘◘

~~~js
import promise from './promise.js'

promise.then(response => document.querySelector('.sampleClass').innerText += response)

document.body
  .appendChild(document.createElement('img')
  .src = 'https://sites.google.com/site/eternalfallout/alienhead-detailed.jpg'
~~~

{{s3.p8}}
{{s3.p9}}
{{s3.p10}}

{{s3.p11}}