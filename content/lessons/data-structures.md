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

@@@@
![](images/reference-is-a-lockpick.svg)
{{s1.p16}}
@@@@

{{s1.p17}}
{{s1.p18}}
{{s1.p19}}
{{s1.p20}}

_________________________________________________

## ![ico-30 icon] {{common.c23}}

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

| 0    | 1     | 2        | 3    | 4         |
| 3.14 | false | 'mother' | null | undefined |

{{s2.p17}}

~~~console
'mother'
~~~

{{s2.p18}}
{{s2.p19}}

~~~js
array[4] = 'father'
~~~

{{s2.p20}}

~~~console
► (5) [3.14, false, 'mother', null, 'father']
~~~

___________________________________

{{s2.p21}}

~~~js
var collection = array
~~~

{{s2.p22}}

{{s2.p23}}

{{s2.p24}}

~~~js
collection[3] = 'brother'
~~~

{{s2.p25}}

~~~js
array
~~~

~~~console
► (5) [3.14, false, 'mother', 'brother', 'father']
~~~

{{s2.p26}}
{{s2.p27}}

### ![ico-25 icon] length

{{s2.p28}}

{{s2.p29}}

~~~js
collection.length
~~~

~~~console
5
~~~

_________________________________________

### ![ico-25 hw] Tests

◘◘![ico-20 hw] 1◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
~~~

→→→ students[1] | 'Piter', 'Madelin', 'Gregory', null, undefinded | Madelin →→→

◘◘![ico-20 hw] 2◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
~~~

→→→ students[3] | 'Piter', 'Madelin', 'Gregory', null, undefinded | undefinded →→→

◘◘![ico-20 hw] 3◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = students
group[3] = 'Frodo'
~~~

→→→ students[3] | 'Piter', 'Madelin', 'Gregory', 'Frodo', null, undefinded | Frodo →→→

◘◘![ico-20 hw] 4◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = []
group[3] = students[0]
~~~

→→→ group.length | 0, 1, 2, 3, 4, undefinded | 4 →→→

◘◘![ico-20 hw] 5◘◘

~~~js
var  students = ['Piter', 'Madelin', 'Gregory']
var group = []
group[0] = students
~~~

→→→ group.length | 0, 1, 2, 3 | 1→→→

◘◘![ico-20 hw] 6◘◘

~~~js
var  students = ['Frodo', 'Stephan', 'Madelin', 'Helen']
var hello = 'Hi ' + students[1] + '!'
~~~

→→→ hello | 'Hi !', 'Hi Frodo!', 'Hi Stephan!', 'Hi Madelin!', 'Hi Helen!' | Hi Stephan!→→→

_____________________________________________________________

## ![ico-25 icon] {{common.c18}}

{{s3.p1}}

{{s3.p2}}
{{s3.p3}}
{{s3.p4}}
{{s3.p5}}
{{s3.p6}}
{{s3.p7}}
{{s3.p8}}

{{s3.p9}}

◘◘![ico-25 cap] 5◘◘

~~~js
var human = {
  name: 'Frodo',
  age: 35,
  employed: true
}
~~~

{{s3.p10}}

{{s3.p11}}
{{s3.p12}}

~~~js
human.name
~~~

~~~console
'Frodo'
~~~

{{s3.p13}}

~~~js
human['name']
~~~

~~~console
'Frodo'
~~~

{{s3.p14}}

{{s3.p15}}

~~~js
var propName = 'name'
~~~

{{s3.p16}}

~~~js
human[propName]
~~~

~~~console
'Frodo'
~~~

{{s3.p17}}

~~~js
human.hobby = ['sport', 'reading']
~~~

{{s3.p18}}

~~~console
▼ {name: 'Frodo', age: 35, employed: true, hobby: Array(2)}
    age: 35
    employed: true
    hobby: (2) ['sport', 'reading']
    name: "Frodo"
  ► [[Prototype]]: Object
~~~

{{s3.p19}}

{{s3.p20}}

~~~js
delete human.hobby
~~~

{{s3.p21}}

________________________________________________________

### ![ico-25 hw] Tests

◘◘![ico-20 hw] 1◘◘

~~~js
var memo = [1, false, 4.8, 'Google', [0, 1]]
~~~

→→→ typeof memo[4] | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 2◘◘

~~~js
var memo = [1, false, 4.8, 'Google', { name: 'Figaro' }]
~~~

→→→ typeof memo[4] | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 3◘◘

~~~js
var memo = [1, false, 4.8, 'Google', { name: 'Figaro' }]
~~~

→→→ typeof memo[4].name | 'string', 'number', 'boolean', 'object', undefinded | string →→→

◘◘![ico-20 hw] 4◘◘

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ typeof list | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 5◘◘

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ typeof list[0] | 'string', 'number', 'boolean', 'object', undefinded | object →→→

◘◘![ico-20 hw] 5◘◘

~~~js
var list = [{ name: 'Google' }, { name: 'Mozilla' }, { name: 'Microsoft' }, { name: 'Apple' }]
~~~

→→→ typeof list[0].name | 'string', 'number', 'boolean', 'object', undefinded | string →→→

◘◘![ico-20 hw] 6◘◘

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

→→→ students.group | 'Dev-05', 'Programming', 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | Dev-05 →→→

◘◘![ico-20 hw] 7◘◘

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

→→→ students[1] | 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | undefinded →→→

◘◘![ico-20 hw] 8◘◘

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

→→→ students.names[1] | 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | Helen Surmot →→→

◘◘![ico-20 hw] 9◘◘

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

→→→ students[4].name | 'Piter Clark', 'Helen Surmot', 'Pavel Farios', 'Alex Figa', 'Gregory Trump', undefinded | Gregory Trump →→→

◘◘![ico-20 hw] 10◘◘

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

→→→ students[4].homeworks[1] | 7, 10, 8, 4, 5, 9, undefinded | 5 →→→

________________________________________________________

[![ico-20 link] MDN](external/mdn-data-structures)
