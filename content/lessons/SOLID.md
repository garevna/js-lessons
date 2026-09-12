# ![ico-30 icon] {{s1.h1}}

{{s1.p1}}

{{s1.p2}}
{{s1.p3}}
{{s1.p4}}
{{s1.p5}}
{{s1.p6}}

____________________________________________

{{s1.p7}}

{{s1.p8}}

{{s1.p9}}

{{s1.p10}}

{{s1.p11}}

{{s1.p12}}

{{s1.p13}}

{{s1.p14}}

{{s1.p15}}

{{s1.p16}}

{{s1.p17}}

{{s1.p18}}

{{s1.p19}}

{{s1.p20}}

{{s1.p21}}

{{s1.p22}}

{{s1.p23}}

{{s1.p24}}

{{s1.p25}}

{{s1.p26}}

{{s1.p27}}

{{s1.p28}}

__________________________________________________


## ![ico-25 icon] {{s2.h1}}

{{s2.p1}}

{{s2.p2}}

{{s2.p3}}

{{s2.p4}}

{{s2.p5}}

{{s2.p6}}

{{s2.p7}}

{{s2.p8}}

{{s2.p9}}

{{s2.p10}}

{{s2.p11}}

_______________________________________________________


## ![ico-25 icon] {{s3.h1}}

{{s3.p1}}

{{s3.p2}}

{{s3.p3}}

{{s3.p4}}

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

{{s3.p5}}

~~~console
Иван: Hello!
~~~

{{s3.p6}}

{{s3.p7}}

~~~js
User.updateMethods('voyage', function (city) {
  console.log(`${this.name}: I visit ${city}`)
})
~~~

{{s3.p8}}

~~~js
user.voyage('London')
~~~

{{s3.p9}}

~~~console
Иван: I visit London
~~~

{{s3.p10}}

____________________________________

## ![ico-25 icon] {{s4.h1}}

{{s4.p1}}

{{s4.p2}}

{{s4.p3}}

{{s4.p4}}

{{s4.p5}}

{{s4.p6}}

{{s4.p7}}

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

{{s4.p8}}

~~~js
user = new RegisteredUser('Иван', 'xJgb-809/**1Bh')
~~~

{{s4.p9}}

______________________________________

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

{{s5.p11}}

{{s5.p12}}

{{s5.p13}}

{{s5.p14}}

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

{{s5.p15}}

{{s5.p16}}

{{s5.p17}}

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

## ![ico-25 icon] {{s6.h1}}

{{s6.p1}}

{{s6.p2}}

{{s6.p3}}

{{s6.p4}}

{{s6.p5}}

~~~js
User.updateMethods('sedition', function (prop, val) {
    this.__proto__[prop] = val
})

user.sedition('badExample', 'You should not do this')
~~~

{{s6.p6}}

{{s6.p7}}

{{s6.p8}}

{{s6.p9}}

{{s6.p10}}

{{s6.p11}}

{{s6.p12}}

{{s6.p13}}

______________________________________________