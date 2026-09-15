# ![ico-50 git-ver] Git

@@@@

{{s0.p1}}
![](illustrations/Linus-Torvalds.jpg)
(2005)
{{s0.p2}}

@@@@

_______________________________________________________________________________

{{s0.p3}}
{{s0.p4}}
{{s0.p5}}
{{s0.p6}}
{{s0.p7}}

{{s0.p8}}
{{s0.p9}}

{{s0.p10}}
_______________________________________________________________________________

^^^[{{s0.spoiler1}}]

{{s0.p11}}
{{s0.p12}}
{{s0.p13}}

{{s0.p14}}
{{s0.p15}}
{{s0.p16}}

{{s0.p17}}
{{s0.p18}}
{{s0.p19}}
{{s0.p20}}

{{s0.p21}}

{{s0.p22}}
{{s0.p23}}
{{s0.p24}}
{{s0.p25}}
(**~pull~** = **~fetch~** + **~merge~**)
{{s0.p26}}
{{s0.p27}}
{{s0.p28}}

^^^

____________________________________________________

## ![ico-30 icon] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}
{{s1.p3}}
{{s1.p4}}

{{s1.p5}}

@@@@

[![ico-40 atom] Atom](https://atom.io/)
[![ico-50 sublime] SublimeText](https://www.sublimetext.com/)

@@@@

{{s1.p6}}
[%%%Installing git%%%](https://gitforwindows.org/)
{{s1.p7}}

{{s1.p8}}

[%%%![ico-70 github]%%%](https://github.com/)
{{s1.p9}}

{{s1.p10}}

____________________________________________________

## ![ico-30 bash] Git BASH

{{s1.p11}}
(**CLI** - _command line interpreter_)

{{s1.p12}}

{{s1.p13}}

••![ico-20 bash] $ mkdir <folder name>••

{{s1.p14}}

![](illustrations/git-bash-cd.png)

{{s1.p15}}
{{s1.p16}}

{{s1.p17}}
{{s1.p18}}

••![ico-20 bash] $ git init••

![](illustrations/git-bash-init.png)

{{s1.p19}}
{{s1.p20}}
{{s1.p21}}

{{s1.p22}}
{{s1.p23}}

______________________________________________________

### ![ico-20 bash] git config

{{s1.p24}}

{{s1.p25}}

{{s1.p26}}
••![ico-20 bash] $ git config --global user.email <email>••

{{s1.p27}}
{{s1.p28}}
{{s1.p29}}
{{s1.p30}}
{{s1.p31}}
{{s1.p32}}

{{s1.p33}}

![](illustrations/git-bash-config.png)

____________________________________________________

### ![ico-20 bash] git branch

{{s1.p34}}

{{s1.p35}}

••![ico-20 bash] $ git branch  &lt;branch name>••

{{s1.p36}}

••![ico-20 bash] $ git checkout &lt;branch name>••

{{s1.p37}}

••![ico-20 bash] $ git  checkout  -b  &lt;branch name>••

{{s1.p38}}

••![ico-20 bash] $ git  checkout  -b  develop••

{{s1.p39}}

••![ico-20 bash] $ git branch --delete  &lt;branch name>••

{{common.c6}}

••![ico-20 bash] $ git branch -d  &lt;branch name>••

{{s1.p41}}

{{s1.p42}}

••![ico-20 bash] $ git checkout develop••
••![ico-20 bash] $ git merge master••

{{s1.p43}}
{{s1.p44}}
{{s1.p45}}
{{s1.p46}}

{{s1.p47}}

••![ico-20 bash] $ git branch --list••

{{s1.p48}}

![](illustrations/git-branch-list.png)

^^^[{{s1.spoiler1}}]

{{s1.p49}}

~~~html
&lt;html>
   &lt;head>
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
    <link type="text/css" rel="stylesheet" media="all" href="style.css" />
=======
    &lt;!-- no style -->
>>>>>>> master
   &lt;/head>
   &lt;body>
      &lt;h1>Hello, students!&lt;/h1>
   &lt;/body>
&lt;/html>
~~~

{{s1.p50}}

~~~html
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD      и       =======
~~~

{{s1.p51}}

{{s1.p52}}
{{s1.p53}}

{{s1.p54}}
{{s1.p55}}

~~~html
&lt;html>
   &lt;head>
      &lt;link type="text/css" rel="stylesheet" media="all" href="style.css" />
   &lt;/head>
   &lt;body>
      &lt;h1>Hello, students!&lt;/h1>
   &lt;/body>
&lt;/html>
~~~

{{s1.p56}}

••![ico-20 bash] $ git add index.html••
••![ico-20 bash] $ git commit -m "Merge fixed conflict"••

^^^
______________________________________________________

# ![ico-50 git] github

{{s1.p57}}
{{s1.p58}}
{{s1.p59}}

______________________________________________________

{{s1.p60}}
![](illustrations/create-github-repo.png)

{{s1.p61}}
{{s1.p62}}

_________________________________________________________

## ![ico-25 hw]  {{common.c3}} 1

{{s2.p1}}
{{s2.p2}}
{{s2.p3}}
{{s2.p4}}
{{s2.p5}}
{{s2.p6}}
{{s2.p7}}
{{s2.p8}}

![ico-20 bash] **git clone**

{{s2.p9}}

{{s2.p10}}
{{s2.p11}}
{{s2.p12}}
{{s2.p13}}

![](illustrations/github-new-repo.png)

{{s2.p14}}

![](illustrations/github-copy-repo-link.png)

{{s2.p15}}
{{s2.p16}}
{{s2.p17}}

••![ico-20 bash]$ cd  z:/home/common••

{{s2.p18}}

••![ico-20 bash]$ git clone https://github.com/garevna/students_homeworks.git••

{{s2.p19}}

![](illustrations/git-clone.png)

{{s2.p20}}

![](illustrations/git-clone-result.png)

{{s2.p21}}
{{s2.p22}}
{{s2.p23}}

{{s2.p24}}

{{s2.p25}}

![](illustrations/git-clone-readme.png)

__________________________________________________

![ico-20 bash] **git status**

{{s2.p26}}
{{s2.p27}}
{{s2.p28}}

{{s2.p29}}

![](illustrations/git-status-1.png)

_____________________________

![ico-20 bash] **git add**

{{s2.p30}}
{{s2.p31}}
{{s2.p32}}
{{s2.p33}}
{{s2.p34}}

••![ico-20 bash]$ git add README.md••

{{common.c6}}

••![ico-20 bash]$ git add * ••

{{s2.p36}}

![](illustrations/git-add-1.png)

_____________________________

![ico-20 bash] **git commit**

{{s2.p37}}

{{s2.p38}}

••![ico-20 bash]$ git commit -m "first commit:  README.md added"••

![](illustrations/git-commit-1.png)

{{s2.p39}}

{{s2.p40}}
{{s2.p41}}
{{s2.p42}}

{{s2.p43}}

••"nothing to commit, working directory clean"••

{{s2.p44}}

__________________________

![ico-20 bash] **git remote**

{{s2.p45}}
{{s2.p46}}
{{s2.p47}}
{{s2.p48}}
{{s2.p49}}
{{s2.p50}}
{{s2.p51}}
{{s2.p52}}

{{s2.p53}}

![](illustrations/git-remote-1.png)

___________________________

![ico-20 bash] **git push**

{{s2.p54}}
{{s2.p55}}
{{s2.p56}}

••![ico-20 bash]$ git push origin master••

{{s2.p57}}
{{s2.p58}}

••![ico-20 bash]$ git push origin master:gh-pages••

![](illustrations/git-push-1.png)

{{s2.p59}}

{{s2.p60}}
{{s2.p61}}
{{s2.p62}}

{{s2.p63}}

![](illustrations/git-push-2.png)

__________________________

![ico-20 bash] **git log**

{{s2.p64}}

{{s2.p65}}

![](illustrations/git-log.png)

__________________________________________________________________________

## ![ico-25 hw] {{common.c3}} 2

{{s3.p1}}
{{s3.p2}}
{{s3.p3}}
{{s3.p4}}
{{s3.p5}}

![ico-20 bash] **git init**

{{s3.p6}}

{{s3.p7}}

{{s3.p8}}
{{s3.p9}}
{{s3.p10}}
{{s3.p11}}
{{s3.p12}}
{{s3.p13}}
{{s3.p14}}

![](illustrations/git-init-2.png)

__________________________

{{s3.p15}}

••![ico-20 bash]$ mkdir assets••

{{s3.p16}}
{{s3.p17}}
{{s3.p18}}
{{s3.p19}}
{{s3.p20}}

![](illustrations/git-status-2.png)

__________________________

{{s3.p21}}
{{s3.p22}}

{{s3.p23}}

![](illustrations/git-add-2.png)

![ico-20 bash] **git rm --cached**

{{s3.p24}}

••![ico-20 bash]$ git rm --cached  assets/style.css••

{{s3.p25}}

![](illustrations/git-rm.png)

__________________________

![ico-20 bash] **git commit**

{{s3.p26}}

••![ico-20 bash]$ git commit -m "Test creating remote repo from  local"••

{{s3.p27}}
{{s3.p28}}
{{s3.p29}}
{{s3.p30}}

![](illustrations/git-commit-2.png)

{{s3.p31}}
{{s3.p32}}

{{s3.p33}}

![ico-20 bash] **git remote add**

{{s3.p34}}
{{s3.p35}}

••![ico-20 bash]$ git remote add origin test https://github.com/garevna/test.git••

{{s3.p36}}
{{s3.p37}}

![](illustrations/git-remote-2.png)

__________________________

![ico-20 bash] **git push**

{{s3.p38}}

••![ico-20 bash]$ git push test master••

__________________________________________________________________________

# ![ico-30 git] {{s4.h1}}

{{s4.p1}}
{{s4.p2}}

{{s4.p3}}

••![ico-20 bash]$ ls -al ~/.ssh••

{{s4.p4}}

{{s4.p5}}

••![ico-20 bash]$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"••

{{s4.p6}}

••Enter passphrase (empty for no passphrase):••
••Enter same passphrase again:••

{{s4.p7}}

{{s4.p8}}
{{s4.p9}}

••![ico-20 bash]$ eval $(ssh-agent -s)••

{{s4.p10}}

{{s4.p11}}

{{s4.p12}}

{{s4.p13}}

••![ico-20 bash]$ ssh-add ~/.ssh/id_rsa••

{{s4.p14}}
{{s4.p15}}

{{s4.p16}}

{{s4.p17}}

{{s4.p18}}

{{s4.p19}}

••![ico-20 bash]$ clip < ~/.ssh/id_rsa.pub••

{{s4.p20}}

@@@@
{{s4.p21}}
![](illustrations/git-ssh-1.png)
@@@@

{{s4.p22}}
^^^[Settings]
![](illustrations/git-ssh-2.png)
^^^

@@@@
{{s4.p23}}
![](illustrations/git-ssh-3.png)
@@@@

{{s4.p24}}

{{s4.p25}}

{{s4.p26}}

![](illustrations/git-ssh-4.png)

__________________________________________________________________________

# ![ico-30 hw] Homework

^^^[Homework]
{{s4.p27}}

{{s4.p28}}
{{s4.p29}}

{{s4.p30}}

{{s4.p31}}

{{s4.p32}}

{{s4.p33}}

{{s4.p34}}

^^^

_____________________________________________

[%%%GIT%%%](https://githowto.com/)
