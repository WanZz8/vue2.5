import CryptoJS from 'crypto-js'
// rsa加密库
import {
  JSEncrypt
} from 'jsencrypt'
export default {
  // 格式化时间戳
  time: (v, nows) => {
    const now = new Date(nows)
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const hour = now.getHours()
    const minute = now.getMinutes()
    const second = now.getSeconds()
    const montStr = month < 10 ? '0' + month : month
    const dayStr = date < 10 ? '0' + date : date
    const hourStr = hour < 10 ? '0' + hour : hour
    const mStr = minute < 10 ? '0' + minute : minute
    const sStr = second < 10 ? '0' + second : second
    const noHourse =
      v === '0' ? year + '/' + montStr + '/' + dayStr : year + '/' + montStr + '/' + dayStr + ' ' + hourStr + ':' + mStr + ':' + sStr
    return noHourse
  },
  // 判断周末
  isWeekEnd: timer => {
    if ('天一二三四五六'.charAt(new Date(timer).getDay()) === '天') {
      return false
    }
    if ('天一二三四五六'.charAt(new Date(timer).getDay()) === '六') {
      return false
    }
    return true
  },
  // 精度判断
  toFixedRandom: num => {
    let y = String(num).indexOf('.') + 1
    let count = String(num).length - y
    if (y > 0 && count <= 5) {
      return num
    } else {
      return num.toFixed(1)
    }
  },
  // 图表精度
  Randoms: num => {
    let y = String(num).indexOf('.') + 1
    let count = String(num).length - y
    if (y > 0 && count <= 5) {
      return num.toFixed(count) * 1
    } else {
      return num.toFixed(1)
    }
  },
  // 获取其它天数
  getBeforeNow(t, d) {
    let year = ''
    let mon = ''
    let day = ''
    let times = ''
    let hour = ''
    let minute = ''
    let second = ''
    let s = ''
    if (t === 1) {
      times = d.getTime()
      hour = d.getHours()
      minute = d.getMinutes()
      second = d.getSeconds()
      s = parseInt((times - hour * 3600 * 1000 - minute * 60 * 1000 - second * 1000) / 1000) * 1000
    }
    if (t === 7) {
      d = +d - 1000 * 60 * 60 * 24 * 6
    }
    if (t === 30) {
      d = +d - 1000 * 60 * 60 * 24 * 29
    }
    if (t === 7 || t === 30) {
      d = new Date(d)
      year = d.getFullYear()
      mon = d.getMonth() + 1
      day = d.getDate()
      hour = d.getHours()
      minute = d.getMinutes()
      second = d.getSeconds()
      let sc = year + '/' + (mon < 10 ? ('0' + mon) : mon) + '/' + (day < 10 ? ('0' + day) : day) + ' ' + '00:00:00'
      s = Date.parse(sc)
    }
    return new Date(s).toISOString()
  },
  getYearDate() {
    let d = new Date()
    let strYear = d.getFullYear() - 1
    let strDay = d.getDate()
    let strMonth = d.getMonth() + 1
    if (strMonth < 10) {
      strMonth = '0' + strMonth
    }
    if (strDay < 10) {
      strDay = '0' + strDay
    }
    return strYear + '-' + strMonth + '-' + strDay
  },
  encrypt(data, key) {
    let keys = CryptoJS.enc.Latin1.parse(key)
    let ivs = CryptoJS.enc.Latin1.parse('123456789abcdef0')
    let encrypted = CryptoJS.AES.encrypt(data, keys, {
      iv: ivs,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return encrypted.toString()
  },
  decrypt(word, key) {
    let keys = CryptoJS.enc.Latin1.parse(key)
    let ivs = CryptoJS.enc.Latin1.parse('123456789abcdef0')
    let decrypt = CryptoJS.AES.decrypt(word, keys, {
      iv: ivs,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).toString(CryptoJS.enc.Utf8)
    return decrypt
  },
  rsaEncrypt(publicKey, data) {
    var jse = new JSEncrypt()
    jse.setPublicKey(publicKey)
    return jse.encrypt(data)
  },
  // 获取16位字符串
  ramdomString(len) {
    const data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let nums = ''
    for (let i = 0; i < len; i++) {
      const r = parseInt(Math.random() * 61)
      nums += data[r]
    }
    return nums
  }
}
