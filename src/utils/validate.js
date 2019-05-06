export function isvalidUsername(str) {
  const userRegexp = /^[a-zA-Z0-9_-]{5,16}$/
  return userRegexp.test(str.trim())
}

export function isvalidPhone(str) {
  const phoneRegexp = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return phoneRegexp.test(str)
}

export function isvalidPssword(str) {
  const userRegexp = /^[a-zA-Z0-9_-]{6,16}$/
  return userRegexp.test(str)
}

/* 合法uri */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 合法邮箱 */
export function validateEmail(email) {
  const urlregex = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/g
  return urlregex.test(email)
}
/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 中英文姓名
export function validateName(str) {
  const reg = /^([\u4E00-\u9FFF]|[a-z]){2,11}$/g
  return reg.test(str)
}
// 中文姓名
export function validateChinaName(str) {
  const reg = /^([\u4E00-\u9FFF]){2,11}$/g
  return reg.test(str)
}

// 身份证号
export function validateCardNo(str) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(str)
}
