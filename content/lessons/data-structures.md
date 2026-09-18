# ![ico-35 study] {{p1}}

{{p2}}
{{p3}}

{{p4}}
{{p5}}
{{p6}}
{{p7}}
{{p8}}

{{p9}}

{{p10}}
{{p11}}

{{p12}}

{{p13}}

{{p14}}

~~~js
var students = group
~~~

{{p15}}
{{p16}}

@@@@
![](slogans/reference-is-a-lockpick.svg)
{{p17}}
@@@@

{{p18}}
{{p19}}
{{p20}}
{{p21}}

_________________________________________________

## ![ico-30 icon] {{common.c23}}

{{p22}}

{{p23}}
{{p24}}
{{p25}}

{{p26}}

{{p27}}

~~~js
var array = [3.14, false, 'mother', null, undefined]
~~~

{{p28}}
{{p29}}
{{p30}}
{{p31}}
{{p32}}
{{p33}}
{{p34}}

{{p35}}

~~~js
array[2]
~~~

{{p36}}
{{p37}}

| 0    | 1     | 2        | 3    | 4         |
| 3.14 | false | 'mother' | null | undefined |

{{p38}}

~~~console
'mother'
~~~

{{p39}}
{{p40}}

~~~js
array[4] = 'father'
~~~

{{p41}}

~~~console
► (5) [3.14, false, 'mother', null, 'father']
~~~

___________________________________

{{p42}}

~~~js
var collection = array
~~~

{{p43}}

{{p44}}

{{p45}}

~~~js
collection[3] = 'brother'
~~~

{{p46}}

~~~js
array
~~~

~~~console
► (5) [3.14, false, 'mother', 'brother', 'father']
~~~

{{p47}}
{{p48}}

### ![ico-25 icon] length

{{p49}}

{{p50}}

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

{{p51}}

{{p52}}
{{p53}}
{{p54}}
{{p55}}
{{p56}}
{{p57}}
{{p58}}

{{p59}}

◘◘![ico-25 cap] 5◘◘

~~~js
var human = {
  name: 'Frodo',
  age: 35,
  employed: true
}
~~~

{{p60}}

{{p61}}
{{p62}}

~~~js
human.name
~~~

~~~console
'Frodo'
~~~

{{p63}}

~~~js
human['name']
~~~

~~~console
'Frodo'
~~~

{{p64}}

{{p65}}

~~~js
var propName = 'name'
~~~

{{p66}}

~~~js
human[propName]
~~~

~~~console
'Frodo'
~~~

{{p67}}

~~~js
human.hobby = ['sport', 'reading']
~~~

{{p68}}

~~~console
▼ {name: 'Frodo', age: 35, employed: true, hobby: Array(2)}
    age: 35
    employed: true
    hobby: (2) ['sport', 'reading']
    name: "Frodo"
  ► [[Prototype]]: Object
~~~

{{p69}}

{{p70}}

~~~js
delete human.hobby
~~~

{{p71}}

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
