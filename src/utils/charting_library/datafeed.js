import Dataupdater from './dataUpdater'
class Datafeeds {
  constructor(vue) {
    this.self = vue
    this.barsUpdater = new Dataupdater(this)
  }
  onReady(callback) {
    return new Promise((resolve, reject) => {
      let configuration = this.defaultConfiguration()
      if (this.self.getConfig) {
        configuration = Object.assign(this.defaultConfiguration(), this.self.getConfig())
      }
      resolve(configuration)
    }).then(data => callback(data))
  }
  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    return new Promise((resolve, reject) => {
      let symbolInfo = this.defaultSymbol()
      let num
      if (this.self.getSymbol) {
          num = this.self.getSymbol
      }
      if (num) {
        symbolInfo = Object.assign(this.defaultSymbol(), {pricescale: Math.pow(10, num)})
      }
      resolve(symbolInfo)
    }).then(data => onSymbolResolvedCallback(data)).catch(err => onResolveErrorCallback(err))
  }
  getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onDataCallback, onErrorCallback) {
    const onLoadedCallback = data => {
      data && data.length ? onDataCallback(data, { noData: true }) : onDataCallback([], { noData: true })
    }
    this.self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)
  }

  /**
   * 订阅K线数据。图表库将调用onRealtimeCallback方法以更新实时数据
   * @param {*Object} symbolInfo 商品信息
   * @param {*String} resolution 分辨率
   * @param {*Function} onRealtimeCallback 回调函数
   * @param {*String} subscriberUID 监听的唯一标识符
   * @param {*Function} onResetCacheNeededCallback (从1.7开始): 将在bars数据发生变化时执行
   */
  subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
    this.barsUpdater.subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback)
  }
  unsubscribeBars(subscriberUID) {
    this.barsUpdater.unsubscribeBars(subscriberUID)
  }

  defaultConfiguration() {
    return {
      supports_search: false,
      supports_group_request: false,
      supported_resolutions: ['1', '5', '15', '30', '60', '1D', '2D', '3D', '1W', '1M'],
      supports_marks: true,
      supports_timescale_marks: true,
      supports_time: true
    }
  }

  defaultSymbol() {
    return {
      'name': '',
      'timezone': 'Asia/Shanghai',
      'minmov': 1,
      'minmov2': 0,
      'pointvalue': 1,
      'fractional': false,
      'session': '24x7',
      'has_intraday': true,
      'has_no_volume': false,
      // 设置是否支持周月线
      'has_daily': true,
      // 设置是否支持周月线
      'has_weekly_and_monthly': true,
      'description': '',
      'pricescale': 1,
      'ticker': '',
      'supported_resolutions': ['1', '5', '15', '30', '60', '1D', '2D', '3D', '1W', '1M']
    }
  }
}

export default Datafeeds
