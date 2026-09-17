# ![ico-50 study] curl

{{p1}}

[![ico-50 curl]](https://curl.se/docs/tutorial.html)

{{p2}}

{{p3}}

_______________________

## ![ico-25 icon] {{p4}}

{{p5}}

••![ico-25 bash] $ curl https://github.com••

![](illustrations/curl-01.png)


••![ico-25 bash] $ curl https://garevna.github.io/js-samples/js/index08.js••

![](illustrations/curl-02.png)


## ![ico-25 icon] {{p6}}

^^^[-O]

{{p7}}

••![ico-25 bash] $ curl  -O  https://garevna.github.io/js-samples/js/index08.js••

![](illustrations/curl-03.png)

{{p8}}

![](illustrations/curl-04.png)

^^^

^^^[-o]

{{p9}}

••![ico-25 bash] $ curl  -o  index-1.html  https://garevna.github.io/js-samples/index.html••

![](illustrations/curl-05.png)

{{p10}}

![](illustrations/curl-06.png)

^^^

{{p11}}
{{p12}}

__________________

^^^[-d]

{{p13}}

••![ico-25 bash] $ curl -d  "name=garevna&subject=testing"  http://httpbin.org/post••

![](illustrations/curl-07.png)

{{p14}}

••"Content-Type": "application/x-www-form-urlencoded"••

{{p15}}

••"name=garevna&subject=testing"••

{{p16}}

^^^

^^^[-H]

{{p17}}

{{p18}}

{{p19}}

••Content-Type: application / x-www-form-urlencoded••

{{p20}}

{{p21}}

••![ico-25 bash] $ curl -d '{ name:Irina }'  -H  'Content-Type: application/json'  http://httpbin.org/post••

{{p22}}
{{p23}}
{{p24}}

![](illustrations/curl-08.png)

________________________

{{p25}}

{{p26}}

••![ico-25 bash] curl -d @index.html -H 'Content-Type: text/plain' http://httpbin.org/post••

![](illustrations/curl-09.png)

^^^

^^^[-u]

{{p27}}

{{p28}}

••![ico-25 bash] $ curl http://name:passwd@machine.domain/full/path/to/file••

{{p29}}

••![ico-25 bash] $ curl --user garevna:garevna -d @index.html -H 'Content-Type: text/plain' http://httpbin.org/post••

^^^
