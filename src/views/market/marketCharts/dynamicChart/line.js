import '@/utils/charting_library/charting_library.min.js'
// import '@/utils/charting_library/jquery-1.11.2.min.js'
import { line, volume } from '@/utils/charting_library/config.js'
import Datafeeds from '@/utils/charting_library/datafeed'
import {
  mapGetters
} from 'vuex'
export default {
  props: {
    linkData: {
      type: Array,
      default: () => {
        return []
      }
    },
    dayData: {
      type: Array,
      default: () => {
        return []
      }
    },
    bgColor: {
      type: Object,
      default: {
        bodyColor: '#6b89fe',
        linkColor: '#6b89fe',
        aId: '#F5E5C1',
        day: 0,
        fontColor: '#666666'
      }
    }
  },
  data() {
    return {
      option: {},
      myChart1: '',
      styles: '',
      widget: null,
      datafeeds: new Datafeeds(this),
      symbol: null,
      interval: 1,
      cacheData: {},
      lastTime: null,
      getBarTimer: null,
      isLoading: true,
      chart: null,
      // 当前图表分辨率
      curResoluTion: '3',
      // 当前图表类型
      chartType: 3,
      charData: {},
      // 屏幕高度
      screenHeight: 0,
      point: 0,
      study: []
    }
  },
  computed: {
    ...mapGetters(['historyData', 'buyBussInfo']),
    getSymbol() {
      this.point = this.$route.query.priceDecimalPlaces
      return this.point
    },
    getLength() {
      return this.historyData ? this.historyData.length : 0
    },
    // 当前窗口高度
    chartHeight() {
      if (!this.full) {
        return this.screenHeight - 325
      } else {
        return this.screenHeight - 28
      }
    }
  },
  watch: {
    linkData: {
      handler(newData, oldData) {
        const ticker = `${this.symbol}-${this.interval}`
        this.charData[ticker] = newData
        if (this.chartType === 3) {
          if (newData.length > this.getLength) {
            this.datafeeds.barsUpdater.updateData()
          }
          // if (newData.length && oldData.length && newData.length === this.getLength) {
          //   if (newData[newData.length - 1].time === oldData[oldData.length - 1].time) {
          //     this.datafeeds.barsUpdater.updateData()
          //   }
          // }
        }
      },
      deep: true
    },
    dayData: {
      handler(newData, oldName) {
        const ticker = `${this.symbol}-${this.interval}`
        this.charData[ticker] = newData
      },
      deep: true
    }
  },
  mounted() {
    // 获取屏幕高度
    this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight
  },
  beforeDestroy() {
    // this.removeChart()
  },
  methods: {
    startNewChart(symbol, interval) {
      if (!this.widget) {
        const WGChart = window.TradingView.widget
        let Widget = new WGChart({
          symbol: symbol,
          interval: interval,
          // fullscreen: true,
          container_id: 'mountNode',
          datafeed: this.datafeeds,
          width: '100%',
          preset: 'mobile',
          height: this.chartHeight,
          // library_path: '/static/charting_library/',
          timezone: 'Asia/Shanghai',
          locale: 'zh',
          debug: false,
          charts_storage_url: 'http://saveload.tradingview.com',
          charts_storage_api_version: '1.1',
          user_id: '',
          theme: 'light',
          overrides: line,
          studies_overrides: volume,
          disabled_features: [
            'use_localstorage_for_settings',
            'header_saveload',
            'header_screenshot',
            'header_settings',
            'header_compare',
            'header_undo_yellowo',
            'timeframes_toolbar',
            'timeframes_toolbar',
            'remove_library_container_border',
            'border_around_the_chart',
            'display_market_status',
            'show_logo_on_all_charts',
            'show_chart_property_page',
            'panel_context_menu',
            'widget_logo',
            'left_toolbar',
            'header_widget',
            'timeframes_toolbar',
            'edit_buttons_in_legend',
            'context_menus',
            'control_bar',
            'volume_force_overlay'
          ],
          enabled_features: [
            'study_templates',
            'keep_left_toolbar_visible_on_small_screens',
            'side_toolbar_in_fullscreen_mode',
            'property_pages'
          ]
        })
        Widget.MAStudies = []
        Widget.selectedIntervalButton = null
        this.widget = Widget
        this.symbol = symbol
        this.interval = interval
      }
    },
    setChartResolution(e, type) {
      if (!e) return
      this.curResoluTion = e
      this.chartType = type || 1
      this.widget.chart().setChartType(this.chartType) // 切换图表类型
      this.widget.chart().setResolution(e) // 切换图表周期 例如 5分钟 10分钟
    },
    createStudy(id) {
      if (this.widget.MAStudies.length > 0) {
        this.widget.MAStudies.forEach((value, idx, arr) => {
          this.widget.chart().removeEntity(this.widget.MAStudies[idx])
        })
        this.widget.MAStudies = []
        this.$set(this.widget, 'MAStudies', [])
      }
      if (!this.widget.MAStudies.length && id) {
        const lines = [5, 10, 20, 40]
        const colors = [
          'rgb(242,0,249)',
          'rgb(55,125,189)',
          'rgb(251,111,12)',
          'rgb(118,32,211)'
        ]
        lines.map((item, i) => {
          this.widget.chart().createStudy(
            'Moving Average',
            !0,
            !1,
            [lines[i], 'close', 0],
            id => {
              this.$set(this.widget.MAStudies, this.widget.MAStudies.length, id)
            },
            {'plot.color': colors[i]}
          )
        })
      }
    },
    removeChart() {
      if (this.widget) {
        this.datafeeds.unsubscribeBars('_1')
        this.widget = null
      }
      this.getBarTimer && clearTimeout(this.getBarTimer)
      window.getBarTimer && clearTimeout(window.getBarTimer)
    },
    getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback) {
      const ticker = `${this.symbol}-${this.interval}`
      rangeStartDate = rangeStartDate - 86400
      if (this.charData[ticker] && this.charData[ticker].length) {
        const newBars = []
        this.charData[ticker].forEach(item => {
          if (item.time >= rangeStartDate * 1000 && item.time <= rangeEndDate * 1000) {
            newBars.push(item)
          }
        })
        onLoadedCallback(newBars)
      } else {
        const self = this
        self.getBarTimer = setTimeout(function () {
          self.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate, onLoadedCallback)
        }, 50)
      }
    }
  }
}
