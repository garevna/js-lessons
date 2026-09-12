# ![ico-35 study] {{s1.h1}}

{{s1.p1}}
{{s1.p2}}

{{s1.p3}}
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}
{{s1.p7}}

{{s1.p8}}

{{s1.p9}}
{{s1.p10}}

{{s1.p11}}

{{s1.p12}}

{{s1.p13}}

~~~js
var students = group
~~~

{{s1.p14}}
{{s1.p15}}

{{s1.p16}}
![](images/reference-is-a-lockpick.svg)
{{s1.p17}}
{{s1.p18}}

{{s1.p19}}
{{s1.p20}}
{{s1.p21}}
{{s1.p22}}

_________________________________________________

## ![ico-30 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}
{{s2.p3}}
{{s2.p4}}

{{s2.p5}}

{{s2.p6}}

~~~js
var array = [3.14, false, 'mother', null, undefined]
~~~

{{s2.p7}}
{{s2.p8}}
{{s2.p9}}
{{s2.p10}}
{{s2.p11}}
{{s2.p12}}
{{s2.p13}}

{{s2.p14}}

~~~js
array[2]
~~~

{{s2.p15}}
{{s2.p16}}

{{s2.p17}}
{{s2.p18}}

{{s2.p19}}

~~~console
'mother'
~~~

{{s2.p20}}
{{s2.p21}}

~~~js
array[4] = 'father'
~~~

{{s2.p22}}

~~~console
► (5) [3.14, false, 'mother', null, 'father']
~~~

___________________________________

{{s2.p23}}

~~~js
var collection = array
~~~

{{s2.p24}}

{{s2.p25}}

{{s2.p26}}

~~~js
collection[3] = 'brother'
~~~

{{s2.p27}}

~~~js
array
~~~

~~~console
► (5) [3.14, false, 'mother', 'brother', 'father']
~~~

{{s2.p28}}
{{s2.p29}}

### ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

~~~js
collection.length
~~~

~~~console
5
~~~

_________________________________________

### ![ico-25 hw] {{s4.h1}}

{{s4.p1}}

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
~~~

→→→ {{s4.quiz1}} | {{s4.quizVariants1}} | {{s4.quizAnswer1}} →→→

{{s4.p2}}

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
~~~

→→→ {{s4.quiz2}} | {{s4.quizVariants2}} | {{s4.quizAnswer2}} →→→

{{s4.p3}}

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = students
group[3] = 'Frodo'
~~~

→→→ {{s4.quiz3}} | {{s4.quizVariants3}} | {{s4.quizAnswer3}} →→→

{{s4.p4}}

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = []
group[3] = students[0]
~~~

→→→ {{s4.quiz4}} | {{s4.quizVariants4}} | {{s4.quizAnswer4}} →→→

{{s4.p5}}

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = []
group[0] = students
~~~

→→→ {{s4.quiz5}} | {{s4.quizVariants5}} | {{s4.quizAnswer5}}→→→

{{s4.p6}}

~~~js
var  students = ['Frodo', 'Stephan', 'Madelin', 'Helen']
var hello = 'Hi ' + students[1] + '!'
~~~

→→→ {{s4.quiz6}} | {{s4.quizVariants6}} | {{s4.quizAnswer6}}→→→

_____________________________________________________________

## ![ico-25 icon] {{s5.h1}}

{{s5.p1}}

{{s5.p2}}
{{s5.p3}}
{{s5.p4}}
{{s5.p5}}
{{s5.p6}}
{{s5.p7}}
{{s5.p8}}

{{s5.p9}}

{{s5.p10}}

~~~js
var human = {
  name: 'Frodo',
  age: 35,
  employed: true
}
~~~

{{s5.p11}}

{{s5.p12}}
{{s5.p13}}

~~~js
human.name
~~~

~~~console
'Frodo'
~~~

{{s5.p14}}

~~~js
human['name']
~~~

~~~console
'Frodo'
~~~

{{s5.p15}}

{{s5.p16}}

~~~js
var propName = 'name'
~~~

{{s5.p17}}

~~~js
human[propName]
~~~

~~~console
'Frodo'
~~~

{{s5.p18}}

~~~js
human.hobby = ['sport', 'reading']
~~~

{{s5.p19}}

~~~console
▼ {name: 'Frodo', age: 35, employed: true, hobby: Array(2)}
    age: 35
    employed: true
    hobby: (2) ['sport', 'reading']
    name: "Frodo"
  ► [[Prototype]]: Object
~~~

{{s5.p20}}

{{s5.p21}}

~~~js
delete human.hobby
~~~

{{s5.p22}}

________________________________________________________

### ![ico-25 hw] {{s6.h1}}

{{s6.p1}}

~~~js
var memo = [1, false, 4.8, 'Google', [0, 1]]
~~~

→→→ {{s6.quiz1}} | {{s6.quizVariants1}} | {{s6.quizAnswer1}} →→→

{{s6.p2}}

~~~js
var memo = [1, false, 4.8, 'Google', { name: 'Figaro' }]
~~~

→→→ {{s6.quiz2}} | {{s6.quizVariants2}} | {{s6.quizAnswer2}} →→→

{{s6.p3}}

~~~js
var memo = [1, false, 4.8, 'Google', { name: 'Figaro' }]
~~~

→→→ {{s6.quiz3}} | {{s6.quizVariants3}} | {{s6.quizAnswer3}} →→→

{{s6.p4}}

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ {{s6.quiz4}} | {{s6.quizVariants4}} | {{s6.quizAnswer4}} →→→

{{s6.p5}}

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ {{s6.quiz5}} | {{s6.quizVariants5}} | {{s6.quizAnswer5}} →→→

{{s6.p6}}

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ {{s6.quiz6}} | {{s6.quizVariants6}} | {{s6.quizAnswer6}} →→→

{{s6.p7}}

~~~js
var  students = {
  group: 'Dev-05',
  course: 'Programming',
  names: [
    'Piter Clark',
    'Helen Surmot',
    'Pavel Farios',
    'Alex Figa',
    'Gregory Trump'
  ]
}
~~~

→→→ {{s6.quiz7}} | {{s6.quizVariants7}} | {{s6.quizAnswer7}} →→→

{{s6.p8}}

~~~js
var  students = {
  group: 'Dev-05',
  course: 'Programming',
  names: [
    'Piter Clark',
    'Helen Surmot',
    'Pavel Farios',
    'Alex Figa',
    'Gregory Trump'
  ]
}
~~~

→→→ {{s6.quiz8}} | {{s6.quizVariants8}} | {{s6.quizAnswer8}} →→→

{{s6.p9}}

~~~js
var  students = {
  group: 'Dev-05',
  course: 'Programming',
  names: [
    'Piter Clark',
    'Helen Surmot',
    'Pavel Farios',
    'Alex Figa',
    'Gregory Trump'
  ]
}
~~~

→→→ {{s6.quiz9}} | {{s6.quizVariants9}} | {{s6.quizAnswer9}} →→→

{{s6.p10}}

~~~js
var  students = [
  {
    name: 'Piter Clark',
    homeworks: [10, 7, 8, 5, 9, 6, 4, 8, 7]
  },
  {
    name: 'Helen Surmot',
    homeworks: [5, 4, 7, 6, 8, 7, 7, 6, 8]
  },
  {
    name: 'Pavel Farios',
    homeworks: [9, 8, 9, 10, 7, 7, 8, 6, 8]
  },
  {
    name: 'Alex Figa',
    homeworks: [4, 5, 4, 6, 7, 5, 6, 7, 8]
  },
  {
    name: 'Gregory Trump',
    homeworks: [3, 5, 4, 6, 5, 7, 6, 6, 7]
  }
]
~~~

→→→ {{s6.quiz10}} | {{s6.quizVariants10}} | {{s6.quizAnswer10}} →→→

{{s6.p11}}

~~~js
var  students = [
  {
    name: 'Piter Clark',
    homeworks: [10, 7, 8, 5, 9, 6, 4, 8, 7]
  },
  {
    name: 'Helen Surmot',
    homeworks: [5, 4, 7, 6, 8, 7, 7, 6, 8]
  },
  {
    name: 'Pavel Farios',
    homeworks: [9, 8, 9, 10, 7, 7, 8, 6, 8]
  },
  {
    name: 'Alex Figa',
    homeworks: [4, 5, 4, 6, 7, 5, 6, 7, 8]
  },
  {
    name: 'Gregory Trump',
    homeworks: [3, 5, 4, 6, 5, 7, 6, 6, 7]
  }
]
~~~

→→→ {{s6.quiz11}} | {{s6.quizVariants11}} | {{s6.quizAnswer11}} →→→

________________________________________________________

{{s6.p12}}
