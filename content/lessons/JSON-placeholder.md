## ![ico-30 hw] json-placeholder

{{p1}}

![](https://garevna.github.io/a-level-js-lessons/src/icons/json-placeholder-logo.png)

[JSONPlaceholder](https://jsonplaceholder.typicode.com/)

{{p2}}

{{p3}}

{{p4}}

_____________________________

{{p5}}

^^^[JSONPlaceholder endpoints]

![](https://lh4.googleusercontent.com/kLZ2AUHmxj_tGElT44CKZEDXYqZ9fKOUbciuV5XDf-tRnKiPT0njS1rJnurGUEI7QGfFLNL6UYRa-noaqWmZ1QcUG_7bKBAYWMSLntBIcA-Kop3T3W-y4w1e-moZvWG-ndn0IPJwtWAOmlE)

^^^
_________________________________________________

{{p6}}

~https://jsonplaceholder.typicode.com/posts~

{{p7}}

{{p8}}

{{p9}}

{{p10}}

{{p11}}

____________________________________________

### ![ico-25 cap] curl

{{p12}}

{{p13}}
~~~console
$ curl https://jsonplaceholder.typicode.com/comments?postId=1
~~~

![](https://lh6.googleusercontent.com/RRQtfUSawytMqnSDIF4k8wpz1oDzkM8-RxWqBR3XN5PR18HS3jOfGfAyNVYe587xnJL0NoPfy7V1MbovDbOpPuJ0nFj0O-LZinvj2dmdBb1yLKFtRwMcKf7tXimuD0nEB0ZECxD7oPr7liU)

_____________________________________________

### ![ico-25 cap] fetch

{{p14}}

~~~js
fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
  .then(response => response.json())
  .then(json => console.log(json))
~~~

![](https://lh6.googleusercontent.com/tQof5aM48ME-v6g1l-4gkfE2v2WYqinFGYyarEsCdKNvAxfQLjY02h9VffWTvVqk1QlkMxpy14ZNhbCTnVxTzIdMb-5-CYM4zgEVzXQUdodp0UUFx5SMozubZ-1kmTRdly-mS03cSBVGDQ8)
