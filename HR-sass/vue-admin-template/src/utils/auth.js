import Cookies from 'js-cookie'

const TokenKey = 'hr-sass'
const timeStampKey = 'timestamp-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return localStorage.getItem(timeStampKey)
}

export function setTimeStamp() {
  return localStorage.setItem(timeStampKey, +new Date())
}

const timeOut = 3600
export function isTimeOut() {
  const beforeTimeStamp = getTimeStamp()
  if (!beforeTimeStamp) return false
  const nowTimeStamp = new Date()
  return (nowTimeStamp - beforeTimeStamp) / 1000 > timeOut
}


export function getID() {
    return Cookies.get(IDKey)
  }