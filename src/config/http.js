import axios from 'axios'

import {
  Toast
} from 'mint-ui'
import {
  getNoLocal,
  clearALLlocal,
  getSession
} from '@/utils/storage'
import utils from '@/utils'
import axiosConfig from './axios.config'
import Queue from 'simple-promise-queue'
import Qs from 'qs'
import store from '../store'

Queue.setPromise(require('bluebird'))
const queue = (window.queue = new Queue({
  concurrency: 3,
  autoStart: true,
  timeout: 10 * 1000
}))

// 创建axios实例
const service = axios.create(axiosConfig)

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token !== '' || getNoLocal('token')) {
      const token = !store.getters.token ? getNoLocal('token') : store.getters.token
      // config.headers['Accept'] = 'application/json'
      config.headers['Authorization'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

const reqError = (msg) => {
  Toast({
    message: msg,
    position: 'middle',
    duration: 3000
  })
  clearALLlocal()
  window.location.replace('/')
  // window.location.reload()
}

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === false) {
      if (res.errorCode === 'LOGIN_INVALID') {
        store.dispatch('hideLoading')
        reqError(res.msg)
        return
      }
      if (!res.msg) {
        return
      }
      store.dispatch('hideLoading')
      Toast({
        message: res.msg,
        position: 'middle',
        duration: 3000
      })
    }
    return Promise.resolve(res)
  },
  error => {
    store.dispatch('hideLoading')
    const data = '系统繁忙,请稍后再试'
    const errors = !error.response ? data : error.response.data
    return Promise.reject(errors)
  }
)

const mathQuery = options => {
  const newOptions = {
    headers: {}
  }
  if (options) {
    newOptions.headers = Object.assign(options.headers, {
      'Content-Type': options.headers['Content-Type'] || 'application/json'
    })
  } else {
    newOptions.headers = {
      'Content-Type': 'application/json'
    }
  }
  return newOptions
}

export default {
  get: (url, params = {}, config = {}) => {
    const {
      query
    } = params
    let queryString = ''
    if (query) {
      queryString = `${url}?${Qs.stringify(query)}`
    } else {
      queryString = url
    }
    return queue.pushTask((resolve, reject) => {
      service.get(queryString, config).then(ret => {
        resolve(ret)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post: (url, params = {}) => {
    const {
      data
    } = params
    let das = typeof data === 'string' ? data : JSON.stringify(data)
    let key = store.getters.key || getNoLocal('myKey')
    let ramdom = utils.ramdomString(16)
    let aesPass = utils.encrypt(das, ramdom)
    let rsaPass = utils.rsaEncrypt(key, ramdom)
    let opt = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'key': rsaPass,
        'merchantCode': !getSession('merchantInfo') ? '' : getSession('merchantInfo').merchantCode
      }
    }
    return service.post(url, aesPass, mathQuery(opt))
  },
  put: (url, params = {}) => {
    const {
      data
    } = params
    let das = typeof data === 'string' ? data : JSON.stringify(data)
    let key = store.getters.key || getNoLocal('myKey')
    let ramdom = utils.ramdomString(16)
    let aesPass = utils.encrypt(das, ramdom)
    let rsaPass = utils.rsaEncrypt(key, ramdom)
    let opt = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'key': rsaPass
      }
    }
    return service.put(url, aesPass, mathQuery(opt))
  },
  del: (url, params = {}) => {
    const {
      data
    } = params
    let queryString = ''
    if (data) {
      queryString = `${url}?${Qs.stringify(data)}`
    } else {
      queryString = url
    }
    return service.delete(queryString)
  }
}
