# ![ico-30 bash] # BASH

**Bourne-Again SHell**

{{p1}}
{{p2}}
{{p3}}

{{p4}}

____________________________________________________

## ![ico-25 bash] CR | LF

{{p5}}
{{p6}}

{{p7}}
{{p8}}
| UNIX (Linux)      | LF                      |
| OS X              | LF                      |
| Mac               | CR                      |

{{p9}}

{{p10}}

____________________________________________________

## ![ico-25 bash] Commands

### ![ico-20 bash] echo

{{p11}}

••echo 'my name is Irina'••

{{p12}}

••echo 'my name is Irina' > sample.txt••

{{p13}}

____________________________________________________

### ![ico-20 bash] cat

{{p14}}
{{p15}}
{{p16}}

![ico-20 cap] ** 1**

••$ cat > sample.txt••

{{p17}}
{{p18}}
{{p19}}

![ico-20 cap] ** 2**

••$ cat file1.txt file2.txt file3.txt > sample.txt••

{{p20}}
{{p21}}

{{p22}}

![](illustrations/git-bash-cat.png)

{{p23}}

![](illustrations/git-bash-cat-1.png)

____________________________________________________

### ![ico-20 bash] touch

{{p24}}
{{p25}}
{{p26}}
{{p27}}

![ico-20 cap] ** 3**

••$ touch samle.txt••

{{p28}}

{{p29}}

{{p30}}

![ico-20 cap] ** 4**

••$ touch samle.txt  -c••

____________________________________________________

### ![ico-20 bash] stat

{{p31}}

~~~console
$ stat  sample.txt
  touch  sample.txt
  stat  sample.txt
~~~

••$ touch  sample.txt••

![](illustrations/git-bash-stat-1.png)


{{p32}}
^^• Access^^
^^• Modify^^
^^• Change^^
{{p33}}
{{p34}}

____________________________________________________

{{p35}}


{{p36}}

~~~console
$ stat  sample.txt
  touch  sample.txt  -a
  stat  sample.txt
~~~

{{p37}}

••$ touch  sample.txt  -a••

![](illustrations/git-bash-stat-2.png)

{{p38}}

{{p39}}

{{p40}}

{{p41}}
{{p42}}

••$ touch sample.txt -r file1.txt••

{{p43}}

{{p44}}
{{p45}}
{{p46}}
{{p47}}

![](illustrations/git-bash-stat-3.png)

____________________________________________________
