import {
  GETTEMPLATE,
  SETSOCKET,
  GETMARKETDATA,
  GETMARKETNAV,
  GETHISTORYDATA,
  GETBUSSINFO,
  CLOSESOCKET,
  SHOWMASKS,
  HIDEMASKS,
  GETMARKETBANLANCE,
  GETSINGLEGOODS,
  GETSINGLEPOSTI,
  GETCHANGEPOSTI
} from './types'
import {
  setSession
} from '@/utils/storage'

export const state = {
  templates: [],
  marketNavTitle: [],
  marketNavlist: [],
  websock: null,
  marketList: [],
  chartNavList: [],
  historyData: [],
  buyBussInfo: [],
  chartMask: false,
  tradeBanlance: 0,
  singleGoods: {},
  sumPosit: 0,
  positList: [],
  dynamicPosit: 0
}

export const mutations = {
  [GETTEMPLATE](state, val) {
    if (!val.status) return
    state.templates = val.data
  },
  [GETMARKETNAV](state, rs) {
    const res = !rs ? rs : rs.data
    state.chartNavList = res
    if (!res) {
      return
    }
    const das = []
    if (state.marketNavlist.length > 0) {
      state.marketNavTitle = []
      state.marketNavlist = []
    }
    for (var i = 0; i < res.length; i++) {
      if (!das[res[i].productType]) {
        var arr = []
        arr.push(res[i])
        das[res[i].productType] = arr
      } else {
        das[res[i].productType].push(res[i])
      }
    }
    for (let k in das) {
      state.marketNavTitle = state.marketNavTitle.concat(k)
      das[k].map(x => {
        x.upDropSpeed = ((x.lastPrice - x.openPrice) / x.openPrice).toFixed(2)
        return x
      })
      state.marketNavlist = state.marketNavlist.concat(das[k])
    }
  },
  [SETSOCKET](state, sockets) {
    state.websock = sockets
  },
  [GETMARKETDATA](state, item) {
    state.marketList = item.data
  },
  [GETHISTORYDATA](state, item) {
    state.historyData = item.data
  },
  [GETBUSSINFO](state, val) {
    if (val.status) {
      state.buyBussInfo = val.data
      setSession('buyBussInfo', val.data)
    }
  },
  [CLOSESOCKET](state) {
    if (state.websock !== null) {
      state.websock.close()
      console.log('close socket')
    }
  },
  [SHOWMASKS](state) {
    state.chartMask = true
  },
  [HIDEMASKS](state) {
    state.chartMask = false
  },
  [GETSINGLEGOODS](state, rs) {
    if (!rs) {
      return
    }
    if (rs.status) {
      state.singleGoods = rs.data
    }
  },
  [GETMARKETBANLANCE](state, res) {
    let das = res.data
    if (state.buyBussInfo) {
      for (let i in das) {
        if (das[i].walletType === 1 && state.buyBussInfo.walletType === 1) {
          state.tradeBanlance = das[i].amountUseable
          return
        }
        if (das[i].walletType === 2 && state.buyBussInfo.walletType === 2) {
          state.tradeBanlance = das[i].amountUseable
          return
        }
        if (das[i].walletType === 3 && state.buyBussInfo.walletType === 3) {
          state.tradeBanlance = das[i].amountUseable
          return
        }
      }
    }
  },
  [GETSINGLEPOSTI](state, res) {
    if (res.status === false) return
    const list = res.data.list
    if (list.length !== 0) {
      state.positList = list
      return false
    }
    state.positList = []
  },
  [GETCHANGEPOSTI](state, res) {
    if (!state.positList.length) {
      state.dynamicPosit = 0
      return false
    }
    let list = state.positList
    let pointNum = 0
    for (let i = 0; i < list.length; i++) {
      let item = list[i]
      if (item.commodityCode === res[1]) {
        if (item.tradeType === 1) {
          let riseStocke = res[13] * 1
          let rise = (((riseStocke - item.orderPrice) * item.integerPrecision) / (item.pointBeatFloat * item.integerPrecision) * item.pointPrice) * item.tradeModelRate * item.tradeHands * item.targetCurrencyRatio
          item.floatProfit = rise.toFixed(0)
        } else {
          let fallStocke = res[3] * 1
          let fall = (((item.orderPrice - fallStocke) * item.integerPrecision) / (item.pointBeatFloat * item.integerPrecision) * item.pointPrice) * item.tradeModelRate * item.tradeHands * item.targetCurrencyRatio
          item.floatProfit = fall.toFixed(0)
        }
        pointNum += item.floatProfit * 1
      }
    }
    state.dynamicPosit = pointNum
  }
}
export const getters = {
  templates: state => state.templates,
  sockets: state => state.websock,
  navTitle: state => state.marketNavTitle,
  navList: state => state.marketNavlist,
  marketList: state => state.marketList,
  chartNavList: state => state.chartNavList,
  historyData: state => state.historyData,
  buyBussInfo: state => state.buyBussInfo,
  chartMask: state => state.chartMask,
  singleGoods: state => state.singleGoods,
  positList: state => state.positList,
  dynamicPosit: state => state.dynamicPosit,
  tradeBanlance: state => state.tradeBanlance
}
