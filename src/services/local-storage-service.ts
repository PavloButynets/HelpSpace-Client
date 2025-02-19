import { HelpSpace } from '~/constants/common'
import { LocalStorage } from '~/types'

const getLocalObject = () => {
  try {
    return JSON.parse(
      localStorage.getItem(HelpSpace) ?? 'null'
    ) as LocalStorage | null
  } catch (error) {
    localStorage.removeItem(HelpSpace)
    return null
  }
}

export const getFromLocalStorage = <K extends keyof LocalStorage>(
  name: K
): LocalStorage[K] | null => {
  const localObject = getLocalObject()

  if (!localObject) {
    return null
  }

  return localObject[name]
}

export const setToLocalStorage = <K extends keyof LocalStorage>(
  name: K,
  item: LocalStorage[K]
) => {
  const localObject = getLocalObject() || {}

  localObject[name] = item
  localStorage.setItem(HelpSpace, JSON.stringify(localObject))
}

export const removeFromLocalStorage = <K extends keyof LocalStorage>(
  name: K
) => {
  const localObject = getLocalObject()
  if (localObject) {
    delete localObject[name]
    localStorage.setItem(HelpSpace, JSON.stringify(localObject))
  }
}
