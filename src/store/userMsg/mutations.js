import {
  setLocal
} from '@/utils/storage'
import {
  REALNAME,
  SETFUNDPASS,
  CHANGEPASS,
  FUNDSPHONECODE,
  PASSPHONECODE,
  USERDETAILS
} from './types'

export const state = {
  userMsg: '',
  sec_info: '' // 存放用户的信息
}

export const mutations = {
  [REALNAME](state, info) {
    if (info && info.status) {
      state.userMsg = info.data
    }
  },
  [SETFUNDPASS](state, info) {
    if (info && info.status) {
      console.log(info)
    }
  },
  [PASSPHONECODE](state, info) {
    if (info && info.status) {
      console.log(info)
    }
  },
  [FUNDSPHONECODE](state, info) {
    if (info && info.status) {
      console.log(info)
    }
  },
  [CHANGEPASS] (state, info) {
    if (info && info.status) {
      console.log(info)
    }
  },
  [USERDETAILS] (state, info) {
    if (info && info.status) {
      state.sec_info = info.data
      if (info.data) {
        setLocal('isUserVierity', info.data.isUserVierity)
        setLocal('isSetFundPass', info.data.isSetFundPass)
      }
    }
  }
}

export const getters = {
  userMsg: state => state.userMsg,
  sec_info: state => state.sec_info
}
