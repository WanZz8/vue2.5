import httpUtils from '../config/http'
import address from './address.config'

const Market = {
  template: query => {
    return httpUtils.get(address.market.template, {
      query: query
    })
  },
  getDetail: query => {
    return httpUtils.get(address.market.marketDetail, {
      query: query
    })
  },
  getOneGoods: data => {
    return httpUtils.get(`/apis/futures/v2/market/${data.commodityCode}/${data.contractCode}`)
  },
  getMarketCharts: (data) => {
    return httpUtils.get(`/apis/futures/v2/market/${data.params.commodityCode}/${data.params.contractCode}/minsline`, {
      query: data.query
    })
  },
  getMarketChartDay: (data) => {
    return httpUtils.get(`/apis/futures/v2/market/${data.params.commodityCode}/${data.params.contractCode}/dayline`, {
      query: data.query
    })
  },
  getBusinessInfo: query => {
    return httpUtils.get(address.buy.getBusiness, {
      query: query
    })
  },
  submitsOrder: params => {
    return httpUtils.post(address.buy.submitOrder, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  submitsIntegralOrder: params => {
    return httpUtils.post(address.buy.submitIntegralOrder, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  submitImitateOrders: params => {
    return httpUtils.post(address.buy.submitImitateOrder, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  entrustsOrder: params => {
    return httpUtils.post(address.buy.entrustOrder, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  simulationOrder: params => {
    return httpUtils.post(address.buy.submitSimulationOrder, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  },
  Sub_appointImitateOrder: params => {
    return httpUtils.post(address.buy.submitAppointImitateOrder, {
      data: params,
      options: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    })
  }
}

export default Market
