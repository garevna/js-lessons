# JS lessons

[**start**](https://garevna.github.io/js-lessons)

## Description

Symbols ◧ or ◨ will be substituted with logical operator **||**.

Content delivery system is controlled with content-worker.

### images

**`![](illustrations/dog.png)`** - the image file images/lessons/dog.png

**`![](images/car.gif)`** - the image file images/car.gif
____________________________________________________

### slider

!![illustrations/flowchart-sequence.svg, illustrations/flowchart-branching.svg, illustrations/flowchart-circle.svg]
____________________________________________________

### icons

We use icon-worker for icons.

**Request** to worker should be an object `{ route, iconList }`.

**route** is required and may be '**main-menu**', '**menu**', '**page**' or '**spoiler**'.

**iconList** is not required.

If you don't send **iconList** to worker then only default icons for this route will be in response/

**Response from worker will be the object `{ route, iconList, response }`.

**response** will be the array of objects

```js
{
  [key]: getIcon(key)
}
```

Available keys:

['house', 'home', 'mag', 'search', 'err', 'error', 'warn', 'warning', 'close', 'negation', 'icon', 'cap', 'coffee', 'link', 'link-ico', 'dir', 'folder-open', 'opened', 'hw', 'mortar_board', 'study', 'pin', 'pushpin', 'exclamation', 'yes', 'question', 'open-in-new', 'page-next', 'page-previous', 'sand-watch', 'paper', 'file', 'smile', 'emotion', 'require', 'point_up', 'good', 'exelent', 'thumbsup', 'hourglass', 'wait', 'clock', 'white_check_mark',
'mail', 'speach_balloon', 'speach-balloon', 'git-ver', 'google-maps', 'slider-button', 'draw-io', 'main-menu-icon', 'expanded-main-menu-icon', 'active-main-menu-icon', 'active-expanded-main-menu-icon', 'menu-icon-image', 'menu-symbol']

#### Using icons

**`![](icons/octocat.png)`** - the image file icons/octocat.png

**`![ico-70 octocat]`** - icon <img width="70" src="data:image/png;base64,..." />

**`![ico-50 octocat]`** - icon <img width="50" src="data:image/png;base64,..." />

**`![ico-40 octocat]`** - icon <img width="40" src="data:image/png;base64,..." />

**`![ico-35 octocat]`** - icon <img width="35" src="data:image/png;base64,..." />

**`![ico-30 octocat]`** - icon <img width="30" src="data:image/png;base64,..." />

**`![ico-25 octocat]`** - icon <img width="25" src="data:image/png;base64,..." />

**`![ico-20 octocat]`** - icon <img width="20" src="data:image/png;base64,..." />

_____________________________________

### Slogans

`☼☼☼ Don't make the console blush for you ☼☼☼.`

![](https://garevna.github.io/js-samples/pictures/slogan.png)

________________________

### Tests
```
◘◘** 1**◘◘

→→→ [].reduce(Math.pow) | TypeError, null, NaN, 0 | TypeError →→→
```

![](https://garevna.github.io/js-samples/pictures/tests.png)
_________________________

### Console demo with template

§§§§ Demo | boolean_01_template §§§§

___________________________________________________

### Links

**Internal**

`[►►►Принцип работы►►►](page/Array-iteration-methods-theory.md)`

**External**

`[![ico-30 hw] Tests](test/assignments)`

`[![ico-30 hw] Quiz](quiz/arrowFunctions)`

_____________________________________________

**You may use this templates for links:**

`[%%%w3schools%%%](external/w3-comparison)`

`[:::Sandbox example:::](https://plnkr.co/edit/jsH8XKmc0B6g4q8iPZBf?p=preview/)`

`[►►►Boolean►►►](page/Boolean)`

`[◄◄◄Variables and data types◄◄◄](page/var)`


![](https://garevna.github.io/js-samples/images/links.png)
