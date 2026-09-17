# ![ico-50 git-ver] Git

@@@@

{{p1}}
![](illustrations/Linus-Torvalds.jpg)
(2005)
{{p2}}

@@@@

_______________________________________________________________________________

{{p3}}
{{p4}}
{{p5}}
{{p6}}
{{p7}}

{{p8}}
{{p9}}

{{p10}}
_______________________________________________________________________________

^^^[{{p11}}]

{{p12}}
{{p13}}
{{p14}}

{{p15}}
{{p16}}
{{p17}}

{{p18}}
{{p19}}
{{p20}}
{{p21}}

{{p22}}

{{p23}}
{{p24}}
{{p25}}
{{p26}}
(**~pull~** = **~fetch~** + **~merge~**)
{{p27}}
{{p28}}
{{p29}}

^^^

____________________________________________________

## ![ico-30 icon] {{p30}}

{{p31}}
{{p32}}
{{p33}}
{{p34}}

{{p35}}

@@@@

[![ico-40 atom] Atom](https://atom.io/)
[![ico-50 sublime] SublimeText](https://www.sublimetext.com/)

@@@@

{{p36}}
[%%%Installing git%%%](https://gitforwindows.org/)
{{p37}}

{{p38}}

[%%%![ico-70 github]%%%](https://github.com/)
{{p39}}

{{p40}}

____________________________________________________

## ![ico-30 bash] Git BASH

{{p41}}
(**CLI** - _command line interpreter_)

{{p42}}

{{p43}}

••![ico-20 bash] $ mkdir <folder name>••

{{p44}}

![](illustrations/git-bash-cd.png)

{{p45}}
{{p46}}

{{p47}}
{{p48}}

••![ico-20 bash] $ git init••

![](illustrations/git-bash-init.png)

{{p49}}
{{p50}}
{{p51}}

{{p52}}
{{p53}}

______________________________________________________

### ![ico-20 bash] git config

{{p54}}

{{p55}}

{{p56}}
••![ico-20 bash] $ git config --global user.email <email>••

{{p57}}
{{p58}}
{{p59}}
{{p60}}
{{p61}}
{{p62}}

{{p63}}

![](illustrations/git-bash-config.png)

____________________________________________________

### ![ico-20 bash] git branch

{{p64}}

{{p65}}

••![ico-20 bash] $ git branch  &lt;branch name>••

{{p66}}

••![ico-20 bash] $ git checkout &lt;branch name>••

{{p67}}

••![ico-20 bash] $ git  checkout  -b  &lt;branch name>••

{{p68}}

••![ico-20 bash] $ git  checkout  -b  develop••

{{p69}}

••![ico-20 bash] $ git branch --delete  &lt;branch name>••

{{common.c6}}

••![ico-20 bash] $ git branch -d  &lt;branch name>••

{{p70}}

{{p71}}

••![ico-20 bash] $ git checkout develop••
••![ico-20 bash] $ git merge master••

{{p72}}
{{p73}}
{{p74}}
{{p75}}

{{p76}}

••![ico-20 bash] $ git branch --list••

{{p77}}

![](illustrations/git-branch-list.png)

^^^[{{p78}}]

{{p79}}

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

{{p80}}

~~~html
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD      и       =======
~~~

{{p81}}

{{p82}}
{{p83}}

{{p84}}
{{p85}}

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

{{p86}}

••![ico-20 bash] $ git add index.html••
••![ico-20 bash] $ git commit -m "Merge fixed conflict"••

^^^
______________________________________________________

# ![ico-50 git] github

{{p87}}
{{p88}}
{{p89}}

______________________________________________________

{{p90}}
![](illustrations/create-github-repo.png)

{{p91}}
{{p92}}

_________________________________________________________

## ![ico-25 hw]  {{common.c3}} 1

{{p93}}
{{p94}}
{{p95}}
{{p96}}
{{p97}}
{{p98}}
{{p99}}
{{p100}}

![ico-20 bash] **git clone**

{{p101}}

{{p102}}
{{p103}}
{{p104}}
{{p105}}

![](illustrations/github-new-repo.png)

{{p106}}

![](illustrations/github-copy-repo-link.png)

{{p107}}
{{p108}}
{{p109}}

••![ico-20 bash]$ cd  z:/home/common••

{{p110}}

••![ico-20 bash]$ git clone https://github.com/garevna/students_homeworks.git••

{{p111}}

![](illustrations/git-clone.png)

{{p112}}

![](illustrations/git-clone-result.png)

{{p113}}
{{p114}}
{{p115}}

{{p116}}

{{p117}}

![](illustrations/git-clone-readme.png)

__________________________________________________

![ico-20 bash] **git status**

{{p118}}
{{p119}}
{{p120}}

{{p121}}

![](illustrations/git-status-1.png)

_____________________________

![ico-20 bash] **git add**

{{p122}}
{{p123}}
{{p124}}
{{p125}}
{{p126}}

••![ico-20 bash]$ git add README.md••

{{common.c6}}

••![ico-20 bash]$ git add * ••

{{p127}}

![](illustrations/git-add-1.png)

_____________________________

![ico-20 bash] **git commit**

{{p128}}

{{p129}}

••![ico-20 bash]$ git commit -m "first commit:  README.md added"••

![](illustrations/git-commit-1.png)

{{p130}}

{{p131}}
{{p132}}
{{p133}}

{{p134}}

••"nothing to commit, working directory clean"••

{{p135}}

__________________________

![ico-20 bash] **git remote**

{{p136}}
{{p137}}
{{p138}}
{{p139}}
{{p140}}
{{p141}}
{{p142}}
{{p143}}

{{p144}}

![](illustrations/git-remote-1.png)

___________________________

![ico-20 bash] **git push**

{{p145}}
{{p146}}
{{p147}}

••![ico-20 bash]$ git push origin master••

{{p148}}
{{p149}}

••![ico-20 bash]$ git push origin master:gh-pages••

![](illustrations/git-push-1.png)

{{p150}}

{{p151}}
{{p152}}
{{p153}}

{{p154}}

![](illustrations/git-push-2.png)

__________________________

![ico-20 bash] **git log**

{{p155}}

{{p156}}

![](illustrations/git-log.png)

__________________________________________________________________________

## ![ico-25 hw] {{common.c3}} 2

{{p157}}
{{p158}}
{{p159}}
{{p160}}
{{p161}}

![ico-20 bash] **git init**

{{p162}}

{{p163}}

{{p164}}
{{p165}}
{{p166}}
{{p167}}
{{p168}}
{{p169}}
{{p170}}

![](illustrations/git-init-2.png)

__________________________

{{p171}}

••![ico-20 bash]$ mkdir assets••

{{p172}}
{{p173}}
{{p174}}
{{p175}}
{{p176}}

![](illustrations/git-status-2.png)

__________________________

{{p177}}
{{p178}}

{{p179}}

![](illustrations/git-add-2.png)

![ico-20 bash] **git rm --cached**

{{p180}}

••![ico-20 bash]$ git rm --cached  assets/style.css••

{{p181}}

![](illustrations/git-rm.png)

__________________________

![ico-20 bash] **git commit**

{{p182}}

••![ico-20 bash]$ git commit -m "Test creating remote repo from  local"••

{{p183}}
{{p184}}
{{p185}}
{{p186}}

![](illustrations/git-commit-2.png)

{{p187}}
{{p188}}

{{p189}}

![ico-20 bash] **git remote add**

{{p190}}
{{p191}}

••![ico-20 bash]$ git remote add origin test https://github.com/garevna/test.git••

{{p192}}
{{p193}}

![](illustrations/git-remote-2.png)

__________________________

![ico-20 bash] **git push**

{{p194}}

••![ico-20 bash]$ git push test master••

__________________________________________________________________________

# ![ico-30 git] {{p195}}

{{p196}}
{{p197}}

{{p198}}

••![ico-20 bash]$ ls -al ~/.ssh••

{{p199}}

{{p200}}

••![ico-20 bash]$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"••

{{p201}}

••Enter passphrase (empty for no passphrase):••
••Enter same passphrase again:••

{{p202}}

{{p203}}
{{p204}}

••![ico-20 bash]$ eval $(ssh-agent -s)••

{{p205}}

{{p206}}

{{p207}}

{{p208}}

••![ico-20 bash]$ ssh-add ~/.ssh/id_rsa••

{{p209}}
{{p210}}

{{p211}}

{{p212}}

{{p213}}

{{p214}}

••![ico-20 bash]$ clip < ~/.ssh/id_rsa.pub••

{{p215}}

@@@@
{{p216}}
![](illustrations/git-ssh-1.png)
@@@@

{{p217}}
^^^[Settings]
![](illustrations/git-ssh-2.png)
^^^

@@@@
{{p218}}
![](illustrations/git-ssh-3.png)
@@@@

{{p219}}

{{p220}}

{{p221}}

![](illustrations/git-ssh-4.png)

__________________________________________________________________________

# ![ico-30 hw] Homework

^^^[Homework]
{{p222}}

{{p223}}
{{p224}}

{{p225}}

{{p226}}

{{p227}}

{{p228}}

{{p229}}

^^^

_____________________________________________

[%%%GIT%%%](https://githowto.com/)
