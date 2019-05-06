import * as types from './types.js'
import publicMethod from '@/api/market'
import publicMethods from '@/api/trade'
import deposit from '@/api/deposit'
// import config from '@/config/basic.config'
import Websockets from 'websocket-heartbeat-js'
import {
  getSession
} from '@/utils/storage'
import {
  state
} from './mutations'

// 行情页面的状态树
export default {
  getTemplate: ({
    commit
  }, val) => {
    return new Promise((resolve, reject) => {
      publicMethod.template(val).then(res => {
        commit(types.GETTEMPLATE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取行情
  getMarket: ({
    commit
  }, val) => {
    return new Promise((resolve, reject) => {
      publicMethod.getDetail(val).then(res => {
        commit(types.GETMARKETNAV, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 打开socket
  openLink: ({
    commit
  }, v) => {
    const t = getSession('merchantInfo') ? getSession('merchantInfo').merchantSetting.publishDomain : ''
    const u = window.location.protocol
    const t1 = (u === 'https:' ? 'wss://' : 'ws://') + t + '/ws'
    const option = {
      url: t1, // 动态的读取
      pingTimeout: 15000,
      pongTimeout: 15000,
      reconnectTimeout: 15000
    }
    commit(types.SETSOCKET, new Websockets(option))
    if (state.websock.ws.readyState === 0) {
      state.websock.onopen = (e) => {
        state.websock.ws.binaryType = 'arraybuffer'
        if (state.websock.ws.readyState === 1) {
          state.websock.send(v)
        }
        console.log('connect success')
      }
    }
    state.websock.onmessage = evt => {
      commit(types.GETMARKETDATA, evt)
    }
  },
  // 获取图表历史数据
  getHistoryData: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.getMarketCharts(das).then(res => {
        commit(types.GETHISTORYDATA, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取图表天的历史数据
  getHistoryDay: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.getMarketChartDay(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 取止盈止损值
  getBusInfo: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.getBusinessInfo(das).then(res => {
        resolve(res)
        commit(types.GETBUSSINFO, res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 市价购买(现金)
  goSubmitOrder: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.submitsOrder(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 市价购买(积分)
  IntegralOrder: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.submitsIntegralOrder(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 市价购买(模拟)
  ImitateOrder: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.submitImitateOrders(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 指定价购买(现金)
  goEntrustsOrder: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.entrustsOrder(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 指定价购买(积分)
  goSimulationOrder: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.simulationOrder(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 指定价购买(模拟)
  goImitateOrder: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.Sub_appointImitateOrder(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取单个商品数据
  getOnegoods: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.getOneGoods(das).then(res => {
        commit(types.GETSINGLEGOODS, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取银行卡
  tradeBalances: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      deposit
        .getBalance()
        .then(result => {
          commit(types.GETMARKETBANLANCE, result)
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // 获取单个商品持仓状态
  getSinglePosit: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethods.finCashPosit(das).then(res => {
        commit(types.GETSINGLEPOSTI, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 处理单个商品浮动盈亏
  getChangePosit: ({
    commit
  }, das) => {
    commit(types.GETCHANGEPOSTI, das)
  },
  showMasks: ({
    commit
  }) => {
    commit(types.SHOWMASKS)
  },
  closeMasks: ({
    commit
  }) => {
    commit(types.HIDEMASKS)
  },
  closeScoket: ({
    commit
  }) => {
    commit(types.CLOSESOCKET)
  }
}
