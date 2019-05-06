import {
  CHANGETHEME,
  GETIMGCODE,
  GETPHCODE,
  SHOWLOADING,
  HIDELOADING,
  GETSERVICE,
  GETNOTICE,
  GETPUBLICKEY,
  CURRENT
} from './types'
import {
  setLocal,
  getNoLocal,
  setSession,
  getSession,
  setForage,
  getForage
} from '@/utils/storage'
export const state = {
  currentSkin: 'theme-default',
  imgCode: '',
  phCode: '',
  loading: false,
  merchantInfo: getSession('merchantInfo'),
  getNoticeData: '',
  key: getNoLocal('myKey')
}

// let Base64 = require('js-base64').Base64

export const mutations = {
  [CHANGETHEME](state, flag) {
    // setLocal('bgColor', flag)
    setForage('bgColor', flag)
    state.currentSkin = flag
  },
  [CURRENT](state) {
    getForage('bgColor').then(res => {
      state.currentSkin = !res ? 'theme-default' : res
    })
  },
  [GETIMGCODE](state, val) {
    if (val !== 'error' && val) {
      state.imgCode = val.data
    }
  },
  [GETPHCODE](state, val) {
    if (val !== 'error' && val) {
      state.phCode = val.data
    }
  },
  [GETSERVICE](state, val) {
    if (val.status) {
      setSession('merchantInfo', val.data)
      state.merchantInfo = val.data
    }
  },
  [GETNOTICE](state, val) {
    if (val.status) {
      state.getNoticeData = val.data
    }
  },
  [GETPUBLICKEY](state, val) {
    if (val.status) {
      setLocal('myKey', val.data)
      state.key = val.data
    }
  },
  [SHOWLOADING](state) {
    state.loading = true
  },
  [HIDELOADING](state) {
    state.loading = false
  }
}
export const getters = {
  currentSkins: state => state.currentSkin,
  imgCode: state => state.imgCode,
  phCode: state => state.phCode,
  merchantInfo: state => state.merchantInfo,
  getNoticeData: state => state.getNoticeData,
  loading: state => state.loading,
  key: state => state.key
}
