import * as types from './types.js'
import publicMethod from '@/api/trade'

export default {
  // 现金所有请求
  // 首次现金委托
  getEntrustList: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findCashEntrust(das).then(res => {
        commit(types.GETENTRUST, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 追加现金委托
  pageEntrustList: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findCashEntrust(das).then(res => {
        commit(types.GETPAGEENTRUST, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 取消现金委托
  sendCloseEntrust: ({commit}, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.closeCashEntrust(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 现金持仓
  getCashPosit: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.finCashPosit(das).then(res => {
        commit(types.GETCASEPOSIT, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 追加现金持仓
  // addCashPosit: ({
  //   commit
  // }, das) => {
  //   return new Promise((resolve, reject) => {
  //     publicMethod.finCashPosit(das).then(res => {
  //       commit(types.ADDCASEPOSIT, res)
  //       resolve(res)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },
  // 现金反手
  backHand: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.casehBackHand(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 现金单个平仓
  eveningUp: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.canlceCash(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 一键平仓现金所有
  canlcaAlls: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.canlcaAll(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 现金结算
  getSettle: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findCashSettle(das).then(res => {
        commit(types.GETSETTLE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 现金结算追加
  getAddSettle: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findCashSettle(das).then(res => {
        commit(types.GETADDSETTLE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取单个现金结算
  getSettleSingle: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findCashSettleSingle(das).then(res => {
        commit(types.SENDSINGLESETTLE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 更新现金止盈止损
  updateLossPions: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.updateLossPion(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 积分所有请求
  // 积分委托
  getIntegralEntrust: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findIntegralEntrust(das).then(res => {
        commit(types.GETENTRUST, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 追加积分委托
  addIntegralEntrust: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findIntegralEntrust(das).then(res => {
        commit(types.GETPAGEENTRUST, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 取消积分委托
  sendIntegralEntrust: ({commit}, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.closeIntegralEntrust(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 一键平仓积分所有
  canlca_ScoreAlls: ({commit}, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.canlcaScoreAll(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 积分持仓
  getIntegralPosit: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.finIntegralPosit(das).then(res => {
        commit(types.GETCASEPOSIT, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 积分反手
  backHandIntegral: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.IntegralBackHand(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 积分单个平仓
  eveningUpIntegral: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.canlceIntegral(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 积分结算
  getIntegralSettle: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findIntegralSettle(das).then(res => {
        commit(types.GETSETTLE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 积分结算追加
  getAddIntegralSettle: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findIntegralSettle(das).then(res => {
        commit(types.GETADDSETTLE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取单个积分结算
  getIntegralSettleSingle: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.singleIntegralSettle(das).then(res => {
        commit(types.SENDSINGLESETTLE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 更新积分止盈止损
  updateLossPionsScore: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.updateLossScorePion(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 模拟所有请求
  // 模拟委托
  getImitateEntrust: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findImitateEntrust(das).then(res => {
        commit(types.GETENTRUST, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 追加模拟委托
  addImitateEntrust: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findImitateEntrust(das).then(res => {
        commit(types.GETPAGEENTRUST, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 取消模拟委托
  sendImitateEntrust: ({
    commit
  }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.closeImitatelEntrust(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 一键平仓模拟所有
  canlcaImitateAlls: ({commit}, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.canlcaImitateAll(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 模拟持仓
  getImitatePosit: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.findImitatePosit(das).then(res => {
        commit(types.GETCASEPOSIT, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 模拟反手
  backHandImitate: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.ImitateBackHand(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 模拟单个平仓
  eveningUpImitate: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.canlceOneImitate(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 模拟结算
  getImitateSettle: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.searchImitateSettle(das).then(res => {
        commit(types.GETSETTLE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 模拟结算追加
  getAddImitateSettle: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.searchImitateSettle(das).then(res => {
        commit(types.GETADDSETTLE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取单个模拟结算
  getImitateSettleSingle: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.searchsingleImitateSettle(das).then(res => {
        commit(types.SENDSINGLESETTLE, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 更新模拟止盈止损
  updateLossPionsImitate: ({ commit }, das) => {
    return new Promise((resolve, reject) => {
      publicMethod.updateLossImitatePion(das).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  lossBox: ({
    commit
  }, das) => {
    commit(types.DISBOX, das)
  },
  isIntegrals: ({
    commit
  }, das) => {
    commit(types.ISINTEGRAL, das)
  }
}
