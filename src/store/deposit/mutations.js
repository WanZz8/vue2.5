import {
  GETBALANCE,
  CHANNELLIST,
  GETTIMELIST,
  GETRECORD,
  ADDGETRECORD,
  WITHDRAW,
  ADDGETWITHDRAW,
  GETTRADERECORD,
  GETWITHDRAW,
  BANKLISTID,
  QUERYBANKLIST,
  ADDBANKLIST,
  REMOVEBANK,
  GETTRADETYPE,
  ADDGETTRADERECORD
} from './types'
import {
  setSession,
  getSession,
  setLocal,
  getLocal
} from '@/utils/storage'
import utils from '@/utils/'
export const state = {
  allbalance: [],
  balance: 0,
  channellist: [], // 充值渠道
  record: [], // 充值记录
  recordTotal: 0,
  tradeRecord: [], // 交易明细
  tradeTotal: 0,
  withDrawRecord: [], // 提现记录
  withDrawTotal: 0,
  underwayRecord: [], // 进行中
  fundRecord: [], // 充值成功
  banklistId: getSession('banklistId') || [], // 添加银行卡的ID
  banklist: [], // 已添加银行卡列表
  getTradeDetailType: getLocal('tradeDetailType'), // 交易明细类型
  timeList: [] // 时间
}

export const mutations = {
  [GETBALANCE](state, val) {
    if (val && val.status) {
      if (val.data && val.data.length) {
        const balance = val.data.filter(e => e.walletType === 1)
        state.balance = balance[0]
        let banlances = val.data.map((item, idx) => {
          if (item.walletType === 1) {
            item.name = '现金'
            item.oIndex = 0
          }
          if (item.walletType === 2) {
            item.name = '积分'
            item.oIndex = 1
          }
          if (item.walletType === 3) {
            item.name = '模拟'
            item.oIndex = 2
          }
          return item
        })
        state.allbalance = banlances
      }
    }
  },
  [CHANNELLIST](state, val) {
    if (val && val.status) {
      let data = val.data
      if (data.length) {
        state.channellist = data
      }
    }
  },
  // [GETDEPOSIT](state, val) {
  // if (val !== 'error' && val) {
  //   console.log(val)
  // }
  //   console.log(val)
  // },
  [WITHDRAW](state, val) {
    if (val !== 'error' && val) {
      console.log(val)
    }
  },
  [BANKLISTID](state, val) { // 获取银行卡列表ID
    if (val && val.status) {
      if (val.data && val.data.length) {
        state.banklistId = val.data
        setSession('banklistId', val.data)
      }
    }
  },
  [QUERYBANKLIST](state, val) { // 已添加银行卡
    if (val && val.status) {
      if (val.data && val.data.length) {
        state.banklist = val.data
      } else {
        state.banklist = []
      }
    }
  },
  [ADDBANKLIST](state, val) {
    if (val && val.status) {}
  },
  [REMOVEBANK](state, val) {
    if (val && val.status) {
      //
    }
  },
  [GETRECORD](state, val) {
    let das = val.data
    state.record = das.result
  },
  [ADDGETRECORD](state, val) {
    let das = val.data
    state.record = state.record.concat(das.result)
  },
  [GETTRADERECORD](state, val) {
    if (val.status) {
      state.tradeRecord = val.data.result
    }
  },
  [ADDGETTRADERECORD](state, val) {
    let das = val.data
    state.tradeRecord = state.tradeRecord.concat(das.result)
  },
  [GETWITHDRAW](state, val) {
    let das = val.data
    state.withDrawRecord = das.result
  },
  [ADDGETWITHDRAW](state, val) {
    let das = val.data
    state.withDrawRecord = state.withDrawRecord.concat(das.result)
  },
  [GETTRADETYPE](state, val) {
    let das = val.data
    let all = [{
      description: '全部',
      level: 1,
      typeId: 0,
      typeName: 'ALL1'
    },
    {
      description: '全部',
      level: 2,
      typeId: 0,
      typeName: 'ALL2'
    }, {
      description: '全部',
      level: 3,
      typeName: 'ALL3',
      typeId: 0
    }
    ]
    if (val.status) {
      all = all.concat(das)
      state.getTradeDetailType = all
      setLocal('tradeDetailType', all)
      return
    }
    state.getTradeDetailType = []
  },
  [GETTIMELIST](state) {
    let list = []
    let das = {}
    let oneDay = utils.time('0', Date.now()) + ' ' + '23:59:59'
    for (let i = 1; i <= 3; i++) {
      if (i === 1) {
        das = {
          startTimes: utils.getBeforeNow(1, new Date()),
          endTimes: new Date(oneDay).toISOString(),
          name: '当天',
          date: 1,
          status: 0
        }
        list = list.concat(das)
      }
      if (i === 2) {
        das = {
          startTimes: utils.getBeforeNow(7, new Date()),
          endTimes: new Date(oneDay).toISOString(),
          name: '一周',
          date: 7,
          status: 1
        }
        list = list.concat(das)
      }
      if (i === 3) {
        das = {
          startTimes: utils.getBeforeNow(30, new Date()),
          endTimes: new Date(oneDay).toISOString(),
          name: '一个月',
          date: 30,
          status: 2
        }
        list = list.concat(das)
      }
    }
    state.timeList = list
  }
}

export const getters = {
  allbalance: state => state.allbalance,
  balance: state => state.balance,
  channellist: state => state.channellist,
  record: state => state.record,
  recordTotal: state => state.recordTotal,
  tradeRecord: state => state.tradeRecord,
  tradeTotal: state => state.tradeTotal,
  withDrawRecord: state => state.withDrawRecord,
  withDrawTotal: state => state.withDrawTotal,
  underwayRecord: state => state.underwayRecord,
  fundRecord: state => state.fundRecord,
  banklistId: state => state.banklistId,
  banklist: state => state.banklist,
  getTradeDetailType: state => state.getTradeDetailType,
  timeList: state => state.timeList
}
