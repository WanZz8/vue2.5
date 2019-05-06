import httpUtils from '../config/http'
import address from './address.config'

const Trade = {
  findCashEntrust: query => {
    return httpUtils.get(address.trade.findCashEntrust, {
      query: query
    })
  },
  findIntegralEntrust: query => {
    return httpUtils.get(address.trade.findIntegralEntrust, {
      query: query
    })
  },
  findImitateEntrust: query => {
    return httpUtils.get(address.trade.findImitateEntrust, {
      query: query
    })
  },
  finCashPosit: query => {
    return httpUtils.get(address.trade.finCashPosit, {
      query: query
    })
  },
  finIntegralPosit: query => {
    return httpUtils.get(address.trade.finIntegralPosit, {
      query: query
    })
  },
  findImitatePosit: query => {
    return httpUtils.get(address.trade.findImitatePosit, {
      query: query
    })
  },
  closeCashEntrust: params => {
    return httpUtils.post(address.trade.closeCashEntrust, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  closeIntegralEntrust: params => {
    return httpUtils.post(address.trade.closeIntegralEntrust, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  closeImitatelEntrust: params => {
    return httpUtils.post(address.trade.closeImitateEntrust, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  casehBackHand: params => {
    return httpUtils.post(address.trade.casehBackHand, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  IntegralBackHand: params => {
    return httpUtils.post(address.trade.scoreBackHand, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  ImitateBackHand: params => {
    return httpUtils.post(address.trade.imitateBackHand, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  canlceCash: params => {
    return httpUtils.post(address.trade.canlceCash, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  canlceIntegral: params => {
    return httpUtils.post(address.trade.canlceScore, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  canlceOneImitate: params => {
    return httpUtils.post(address.trade.canlceImitate, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  canlcaAll: params => {
    return httpUtils.post(address.trade.canlcaAll, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  canlcaScoreAll: params => {
    return httpUtils.post(address.trade.canlcaAllScore, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  canlcaImitateAll: params => {
    return httpUtils.post(address.trade.canlcaAllImitate, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  updateLossPion: params => {
    return httpUtils.post(address.trade.updateLossPion, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  updateLossScorePion: params => {
    return httpUtils.post(address.trade.updateScoreLossPion, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  updateLossImitatePion: params => {
    return httpUtils.post(address.trade.updateImitateLossPion, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  findCashSettle: query => {
    return httpUtils.get(address.trade.findCashSettle, {
      query: query
    })
  },
  findCashSettleSingle: query => {
    return httpUtils.get(address.trade.singleCashSettle, {
      query: query
    })
  },
  findIntegralSettle: query => {
    return httpUtils.get(address.trade.findScoreSettle, {
      query: query
    })
  },
  singleIntegralSettle: query => {
    return httpUtils.get(address.trade.findIntegralSettles, {
      query: query
    })
  },
  searchImitateSettle: query => {
    return httpUtils.get(address.trade.findImitateSettle, {
      query: query
    })
  },
  searchsingleImitateSettle: query => {
    return httpUtils.get(address.trade.singleImitateSettle, {
      query: query
    })
  }
}

export default Trade
