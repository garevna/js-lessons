# ![ico-50 study] curl

{{s0.p1}}

[![ico-50 curl]](https://curl.se/docs/tutorial.html)

{{s0.p2}}

{{s0.p3}}

_______________________

## ![ico-25 icon] {{s1.h1}}

{{s1.p1}}

••![ico-25 bash] $ curl https://github.com••

![](illustrations/curl-01.png)


••![ico-25 bash] $ curl https://garevna.github.io/js-samples/js/index08.js••

![](illustrations/curl-02.png)


## ![ico-25 icon] {{s2.h1}}

^^^[-O]

{{s2.p1}}

••![ico-25 bash] $ curl  -O  https://garevna.github.io/js-samples/js/index08.js••

![](illustrations/curl-03.png)

{{s2.p2}}

![](illustrations/curl-04.png)

^^^

^^^[-o]

{{s2.p3}}

••![ico-25 bash] $ curl  -o  index-1.html  https://garevna.github.io/js-samples/index.html••

![](illustrations/curl-05.png)

{{s2.p4}}

![](illustrations/curl-06.png)

^^^

{{s2.p5}}
{{s2.p6}}

__________________

^^^[-d]

{{s2.p7}}

••![ico-25 bash] $ curl -d  "name=garevna&subject=testing"  http://httpbin.org/post••

![](illustrations/curl-07.png)

{{s2.p8}}

••"Content-Type": "application/x-www-form-urlencoded"••

{{s2.p9}}

••"name=garevna&subject=testing"••

{{s2.p10}}

^^^

^^^[-H]

{{s2.p11}}

{{s2.p12}}

{{s2.p13}}

••Content-Type: application / x-www-form-urlencoded••

{{s2.p14}}

{{s2.p15}}

••![ico-25 bash] $ curl -d '{ name:Irina }'  -H  'Content-Type: application/json'  http://httpbin.org/post••

{{s2.p16}}
{{s2.p17}}
{{s2.p18}}

![](illustrations/curl-08.png)

________________________

{{s2.p19}}

{{s2.p20}}

••![ico-25 bash] curl -d @index.html -H 'Content-Type: text/plain' http://httpbin.org/post••

![](illustrations/curl-09.png)

^^^

^^^[-u]

{{s2.p21}}

{{s2.p22}}

••![ico-25 bash] $ curl http://name:passwd@machine.domain/full/path/to/file••

{{s2.p23}}

••![ico-25 bash] $ curl --user garevna:garevna -d @index.html -H 'Content-Type: text/plain' http://httpbin.org/post••

^^^
