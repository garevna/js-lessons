# ![ico-30 icon] SOLID

{{p1}}

• ^^Single responsibility^^
• ^^Open-closed^^
• ^^Liskov substitution^^
• ^^Interface segregation^^
• ^^Dependency inversion^^

____________________________________________

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

{{p15}}

{{p16}}

{{p17}}

{{p18}}

{{p19}}

{{p20}}

{{p21}}

{{p22}}

{{p23}}

__________________________________________________


## ![ico-25 icon] Single responsibility

{{p24}}

{{p25}}

{{p26}}

{{p27}}

{{p28}}

{{p29}}

{{p30}}

{{p31}}

{{p32}}

{{p33}}

{{p34}}

_______________________________________________________


## ![ico-25 icon] Open-closed

{{p35}}

{{p36}}

{{p37}}

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

{{topic.t9}}

~~~console
Иван: Hello!
~~~

{{p38}}

{{p39}}

~~~js
User.updateMethods('voyage', function (city) {
  console.log(`${this.name}: I visit ${city}`)
})
~~~

{{p40}}

~~~js
user.voyage('London')
~~~

{{topic.t9}}

~~~console
Иван: I visit London
~~~

{{p41}}

____________________________________

## ![ico-25 icon] Liskov substitution

{{p42}}

{{p43}}

{{p44}}

{{p45}}

{{p46}}

{{p47}}

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

{{p48}}

~~~js
user = new RegisteredUser('Иван', 'xJgb-809/**1Bh')
~~~

{{p49}}

______________________________________

## ![ico-25 icon] Interface segregation

{{p50}}

{{p51}}

{{p52}}

{{p53}}

{{p54}}

{{p55}}

{{p56}}

{{p57}}
{{p58}}
{{p59}}

{{p60}}

{{p61}}

{{p62}}

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

{{p63}}

{{p64}}

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

{{p65}}

{{p66}}

{{p67}}

{{p68}}

{{p69}}

~~~js
User.updateMethods('sedition', function (prop, val) {
    this.__proto__[prop] = val
})

user.sedition('badExample', 'You should not do this')
~~~

{{p70}}

{{p71}}

{{p72}}

{{p73}}

{{p74}}

{{p75}}

{{p76}}

{{p77}}

______________________________________________