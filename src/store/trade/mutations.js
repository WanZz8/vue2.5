import {
  setLocal,
  getNoLocal
} from '@/utils/storage'
import {
  GETENTRUST,
  GETPAGEENTRUST,
  GETCASEPOSIT,
  GETSETTLE,
  GETADDSETTLE,
  SENDSINGLESETTLE,
  SINGLELOSS,
  DISBOX,
  ISINTEGRAL
} from './types'
export const state = {
  entrustList: [],
  holdingsList: [],
  settleList: [],
  settleData: {},
  singleLoss: {},
  disBox: false,
  isIntegral: !getNoLocal('switch') ? 0 : parseInt(getNoLocal('switch'))
}

export const mutations = {
  [GETENTRUST](state, rs) {
    if (rs.status) {
      let das = rs.data.list
      if (das && das.length) {
        state.entrustList = das
      } else {
        state.entrustList = []
      }
    }
  },
  [GETPAGEENTRUST](state, rs) {
    if (rs.status) {
      let das = rs.data.list
      das.map(item => {
        item.lastPrice = 0
        return item
      })
      state.entrustList = state.entrustList.concat(das)
    }
  },
  [GETCASEPOSIT](state, rs) {
    if (rs.status) {
      let das = rs.data.list
      if (das && das.length) {
        state.holdingsList = das
      } else {
        state.holdingsList = []
      }
    }
  },
  [GETSETTLE](state, res) {
    if (res.status) {
      state.settleList = res.data.list
    }
  },
  [GETADDSETTLE](state, res) {
    let das = res.data.list
    state.settleList = state.settleList.concat(das)
  },
  [SENDSINGLESETTLE](state, val) {
    state.settleData = val.data
  },
  [SINGLELOSS](state, val) {
    state.singleLoss = val
  },
  [DISBOX](state, val) {
    state.disBox = val
  },
  [ISINTEGRAL](state, val) {
    setLocal('switch', val)
    state.isIntegral = val
  }
}
export const getters = {
  entrustList: state => state.entrustList,
  holdingsList: state => state.holdingsList,
  singleLoss: state => state.singleLoss,
  settleList: state => state.settleList,
  settleData: state => state.settleData,
  disBox: state => state.disBox,
  isIntegral: state => state.isIntegral
}
