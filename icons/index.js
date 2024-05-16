const context = require.context('./', false)

const iconNames = context.keys().filter(key => key !== './' && key !== './index' && key !== './index.js')

console.log(iconNames)

const icons = Object.assign({}, ...moduleNames.map(name => ({ [name.split('./').join('').split('.js').join('')]: context(name) })))

export default Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))
