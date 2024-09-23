import { getIcon } from './getIcon'

export function getIconList (iconNameList) {
  return iconNameList && Array.isArray(iconNameList)
    ? iconNameList.reduce((res, key) => Object.assign(res, { [key]: getIcon(key) }), {})
    : {}
}
