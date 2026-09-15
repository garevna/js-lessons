# ![ico-30 icon] SOLID

{{s0.p1}}

• ^^Single responsibility^^
• ^^Open-closed^^
• ^^Liskov substitution^^
• ^^Interface segregation^^
• ^^Dependency inversion^^

____________________________________________

{{s0.p2}}

{{s0.p3}}

{{s0.p4}}

{{s0.p5}}

{{s0.p6}}

{{s0.p7}}

{{s0.p8}}

{{s0.p9}}

{{s0.p10}}

{{s0.p11}}

{{s0.p12}}

{{s0.p13}}

{{common.c167}}

{{s0.p15}}

{{s0.p16}}

{{s0.p17}}

{{s0.p18}}

{{s0.p19}}

{{s0.p20}}

{{s0.p21}}

{{s0.p22}}

{{s0.p23}}

__________________________________________________


## ![ico-25 icon] Single responsibility

{{s0.p24}}

{{s0.p25}}

{{s0.p26}}

{{s0.p27}}

{{s0.p28}}

{{s0.p29}}

{{s0.p30}}

{{s0.p31}}

{{s0.p32}}

{{s0.p33}}

{{s0.p34}}

_______________________________________________________


## ![ico-25 icon] Open-closed

{{s0.p35}}

{{s0.p36}}

{{s0.p37}}

◘◘![ico-25 cap] ** 1**◘◘

~~~js
class User {
  constructor (name) {
    this.name = name
  }
}

User.updateMethods = function (methodName, func) {
  this.prototype[methodName] = func
}

User.updateMethods('write', function (message) {
  console.log(`${this.name}: ${message}`)
})

const user = new User('Иван')
user.write('Hello!')
~~~

{{common.c36}}

~~~console
Иван: Hello!
~~~

{{s0.p39}}

{{s0.p40}}

~~~js
User.updateMethods('voyage', function (city) {
  console.log(`${this.name}: I visit ${city}`)
})
~~~

{{s0.p41}}

~~~js
user.voyage('London')
~~~

{{common.c36}}

~~~console
Иван: I visit London
~~~

{{s0.p43}}

____________________________________

## ![ico-25 icon] Liskov substitution

{{s0.p44}}

{{s0.p45}}

{{s0.p46}}

{{s0.p47}}

{{s0.p48}}

{{s0.p49}}

◘◘![ico-25 cap] ** 2**◘◘

~~~js
class RegisteredUser extends User {
  constructor (name, token) {
    super(name)
    const auth = token
    this.setIdentity(token)
    this.testIdentity = () => this.getIdentity() === auth
  }

  getIdentity () {
    const token = document.cookie.split('; ')
      .filter(item => item.indexOf('auth') === 0)[0]
    return token ? token.split('=')[1] : null
  }

  setIdentity (auth) {
    document.cookie = `auth=${auth}`
  }
}
~~~

{{s0.p50}}

~~~js
user = new RegisteredUser('Иван', 'xJgb-809/**1Bh')
~~~

{{s0.p51}}

______________________________________

## ![ico-25 icon] Interface segregation

{{s0.p52}}

{{s0.p53}}

{{s0.p54}}

{{s0.p55}}

{{s0.p56}}

{{s0.p57}}

{{s0.p58}}

{{s0.p59}}
{{s0.p60}}
{{s0.p61}}

{{s0.p62}}

{{s0.p63}}

{{s0.p64}}

◘◘![ico-25 cap] ** 3**◘◘

~~~js
const card = (function (pin) {
  let cash = 0
  const addCash = sum => cash += sum
  const changePin = newPin => pin = newPin
  const testPin = pincode => pin === pincode
  const showCash = () => console.log(`Cash: ${cash}`)
  const getMoney = sum => {
    cash -= sum
    console.log(`Get money: ${sum}`)
  }

  return function (operation, sum) {
    operation === 0
      ? addCash(sum)
      : testPin(prompt('Enter pincode'))
        ? operation === 1
          ? showCash()
          : operation === 2
            ? sum <= cash
              ? getMoney(sum)
              : console.warn('Insufficient cash')
            : changePin(prompt('Set your pincode'))
          : console.error('Invalide pincode')
  }
})(prompt('Set your pincode'))
~~~

{{s0.p65}}

{{s0.p66}}

◘◘![ico-25 cap] ** 4**◘◘

~~~js
const card = (function (pin) {
  let cash = 5000
  const changePin = () => pin = prompt('Set your pincode')
  const testPin = pincode => pin === prompt('Enter pincode')
  const pinError = () => console.error('Invalide pincode')
  const showMoney = () => console.log(`Cash: ${cash}`)
  const getMoney = sum => {
    if (sum <= 0) return 0
    if (sum > cash) {
      console.warn('Insufficient cash')
      return 0
    }
    cash -= sum
    console.log(`Get your money: ${sum}`)
    return sum
  }
        
  return {
    uppendCash: sum => cash += sum,
    showCash: () => testPin() ? showMoney() : pinError(),
    getCash: sum => testPin() ? getMoney(sum) : pinError(),
    changePincode: () => testPin() ? changePin() : pinError()
  }
})(prompt('Set your pincode'))
~~~

____________________________________________

## ![ico-25 icon] Dependency Invertion

{{s0.p67}}

{{s0.p68}}

{{s0.p69}}

{{s0.p70}}

{{s0.p71}}

~~~js
User.updateMethods('sedition', function (prop, val) {
    this.__proto__[prop] = val
})

user.sedition('badExample', 'You should not do this')
~~~

{{s0.p72}}

{{s0.p73}}

{{s0.p74}}

{{s0.p75}}

{{s0.p76}}

{{s0.p77}}

{{s0.p78}}

{{s0.p79}}

______________________________________________