import localforage from 'localforage'
export function isObject(x) {
  return x != null && x !== undefined && typeof x === 'object'
}

export const setSession = (keyName, val) => {
  let parsedVal
  if (isObject(val)) {
    parsedVal = JSON.stringify(val)
  } else {
    parsedVal = val
  }
  window.sessionStorage.setItem(keyName, parsedVal)
}
export const getSession = (keyName) => {
  const val = window.sessionStorage.getItem(keyName)
  if (val) {
    return JSON.parse(val)
  }
  return undefined
}
export const getNotSession = (keyName) => {
  const val = window.sessionStorage.getItem(keyName)
  return val
}
export const setLocal = (keyName, val) => {
  let parsedVal
  if (isObject(val)) {
    parsedVal = JSON.stringify(val)
  } else {
    parsedVal = val
  }
  window.localStorage.setItem(keyName, parsedVal)
}

export const getNoLocal = keyName => {
  const val = window.localStorage.getItem(keyName)
  if (val) {
    return val
  }
  return undefined
}

export const getLocal = keyName => {
  const val = window.localStorage.getItem(keyName)
  if (val) {
    return JSON.parse(val)
  }
  return undefined
}

export const each = fn => {
  for (let i = window.sessionStorage.length - 1; i >= 0; i--) {
    const key = window.sessionStorage.key(i)
    fn(getLocal(key), key)
  }
}

export const setForage = (keyName, val) => {
  localforage.setItem(keyName, val)
}
export const getForage = keyName => {
  return localforage.getItem(keyName)
}
export const reForage = keyName => {
  localforage.removeItem(keyName).then(res => {
    console.log('ok')
  }).catch(err => {
    return err
  })
}
export const removeLocal = keyName => window.localStorage.removeItem(keyName)
export const removeSession = keyName => window.sessionStorage.removeItem(keyName)
export const clearALLlocal = () => window.localStorage.clear()
export const clearALLsession = () => window.sessionStorage.clear()

export const removes = keys => {
  keys.forEach(key => {
    removeLocal(key)
  })
}
