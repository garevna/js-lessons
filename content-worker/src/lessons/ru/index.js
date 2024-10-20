const context = require.context('./', false)

console.log('CONTEXT:/n', context)

const moduleNames = context.keys().filter(key => key !== './' && key !== './index' && key !== './index.js')

console.log(moduleNames)

const modules = Object.assign({}, ...moduleNames.map(name => ({ [name.split('./').join('').split('.js').join('')]: context(name) })))

console.log(modules)

export default Object.assign({}, ...Object.keys(modules).map(key => ({ [key]: modules[key][key] })))
