# ![ico-30 bash] # BASH

**Bourne-Again SHell**

{{s0.p1}}
{{s0.p2}}
{{s0.p3}}

{{s0.p4}}

____________________________________________________

## ![ico-25 bash] CR | LF

{{s0.p5}}
{{s0.p6}}

{{s0.p7}}
{{s0.p8}}
| UNIX (Linux)      | LF                      |
| OS X              | LF                      |
| Mac               | CR                      |

{{s0.p9}}

{{s0.p10}}

____________________________________________________

## ![ico-25 bash] Commands

### ![ico-20 bash] echo

{{s0.p11}}

••echo 'my name is Irina'••

{{s0.p12}}

••echo 'my name is Irina' > sample.txt••

{{s0.p13}}

____________________________________________________

### ![ico-20 bash] cat

{{s0.p14}}
{{s0.p15}}
{{s0.p16}}

![ico-20 cap] ** 1**

••$ cat > sample.txt••

{{s0.p17}}
{{s0.p18}}
{{s0.p19}}

![ico-20 cap] ** 2**

••$ cat file1.txt file2.txt file3.txt > sample.txt••

{{s0.p20}}
{{s0.p21}}

{{s0.p22}}

![](illustrations/git-bash-cat.png)

{{s0.p23}}

![](illustrations/git-bash-cat-1.png)

____________________________________________________

### ![ico-20 bash] touch

{{s0.p24}}
{{s0.p25}}
{{s0.p26}}
{{s0.p27}}

![ico-20 cap] ** 3**

••$ touch samle.txt••

{{s0.p28}}

{{s0.p29}}

{{s0.p30}}

![ico-20 cap] ** 4**

••$ touch samle.txt  -c••

____________________________________________________

### ![ico-20 bash] stat

{{s0.p31}}

~~~console
$ stat  sample.txt
  touch  sample.txt
  stat  sample.txt
~~~

••$ touch  sample.txt••

![](illustrations/git-bash-stat-1.png)


{{s0.p32}}
^^• Access^^
^^• Modify^^
^^• Change^^
{{s0.p33}}
{{s0.p34}}

____________________________________________________

{{s0.p35}}


{{s0.p36}}

~~~console
$ stat  sample.txt
  touch  sample.txt  -a
  stat  sample.txt
~~~

{{s0.p37}}

••$ touch  sample.txt  -a••

![](illustrations/git-bash-stat-2.png)

{{s0.p38}}

{{s0.p39}}

{{s0.p40}}

{{s0.p41}}
{{s0.p42}}

••$ touch sample.txt -r file1.txt••

{{s0.p43}}

{{s0.p44}}
{{s0.p45}}
{{s0.p46}}
{{s0.p47}}

![](illustrations/git-bash-stat-3.png)

____________________________________________________
