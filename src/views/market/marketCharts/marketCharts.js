import HeaderView from '@/components/layout/header'
import dynamicPrice from './dynamicPrice/dynamicPrice.vue'
import echartLink from './dynamicChart/lines.vue'
import productBay from './productBuy/productBuy.vue'
import dynamicBuy from './dynamicBuy/dynamicBuy'
import marketNav from './dynamicNav'
import progrees from '@/components/public/loading/load'
import tradeRule from '../tradeRule/'
import UUID from 'uuid'
import opening from './dynamicChart/openings.vue'
import { command, msg } from '@/assets/js/proto-helper'
import { mapActions, mapGetters } from 'vuex'
import { setSession, getNotSession, getNoLocal } from '@/utils/storage'
import {MessageBox, Toast} from 'mint-ui'
export default {
  components: {
    HeaderView,
    dynamicPrice,
    echartLink,
    productBay,
    marketNav,
    dynamicBuy,
    progrees,
    opening,
    tradeRule
  },
  data() {
    return {
      navOnClickData: {
        navOnClickQuick: false,
        data: {}
      },
      stockHeight: 80 + 'px',
      stockMarket: {},
      getStockMarket: {},
      klineActive: 0,
      bgColor: {
        bodyColor: '',
        linkColor: '',
        aId: '',
        day: 0,
        fontColor: ''
      },
      linkData: [],
      dayData: [],
      drawLine: {
        time: '',
        data: '',
        type: 1
      },
      loadsh: false,
      loadsh2: false,
      timer: '',
      lastPrice: 0,
      lowPrice: 0,
      highPrice: 0,
      active: 0,
      scale: 0,
      marketColor: getNoLocal('bgColor'),
      tmpLineData: -1,
      point: 0,
      productBayShow: true,
      title: 0,
      flat: false,
      toast: null
    }
  },
  computed: {
    ...mapGetters([
      'marketList',
      'sockets',
      'historyData',
      'navList',
      'chartMask',
      'singleGoods',
      'dynamicPosit',
      'positList',
      'buyBussInfo'
    ]),
    getLastPrice() {
      if (this.navList.length > 0) {
        for (let i = 0; i < this.navList.length; i++) {
          if (
            this.navList[i].commodityCode === this.$route.query.commodityCode
          ) {
            this.lastPrice = this.navList[0].lastPrice
          }
        }
      }
    }
  },
  created() {
    this.loadsh = true
    this.changeBg(this.marketColor)
  },
  beforeDestroy() {
    console.log('销毁图表')
    this.$refs.trade.removeChart()
    this.toast && this.toast.close()
  },
  mounted() {
    const _that = this
    if (
      !this.$route.query.tpCode ||
      !this.$route.query.CommodityName ||
      !this.$route.query.commodityCode ||
      !this.$route.query.contractCode
    ) {
      _that.$router.push({
        path: '/market'
      })
      return
    }
    const das = {
      commodityCode: this.$route.query.commodityCode,
      contractCode: this.$route.query.contractCode
    }
    this.getGoods(das)
    this.getChartHistory(das)
    this.detection()
    this.$refs.trade.startNewChart(this.$route.query.CommodityName, 1)
  },
  methods: {
    ...mapActions(['openLink', 'canlcaAlls', 'getOnegoods']),
    // 开启行情导航
    checkOrder() {
      this.navOnClickData.navOnClickQuick = !this.navOnClickData.navOnClickQuick
      this.navOnClickData.data = this.stockMarket
    },
    // 关闭行情导航
    closeMask(val) {
      this.navOnClickData.data = val.commodityData
      this.navOnClickData.navOnClickQuick = val.closeMask
    },
    showFromDyBuy(val) {
      this.productBayShow = val.status
      this.title = val.win
    },
    closeFromDyBuy(val) {
      this.productBayShow = val
    },
    // socket
    detection() {
      const _that = this
      if (!this.sockets) {
        _that.chartWebSocket(
          _that.$route.query.contractCode,
          _that.$route.query.commodityCode
        )
        return false
      }
      if (
        this.sockets.ws.readyState === 0 ||
        this.sockets.ws.readyState === 2 ||
        this.sockets.ws.readyState === 3
      ) {
        _that.chartWebSocket(
          _that.$route.query.contractCode,
          _that.$route.query.commodityCode
        )
        return false
      }
    },
    // socket
    chartWebSocket(contractCode, commodityCode) {
      const _that = this
      if (typeof WebSocket === 'undefined') {
        MessageBox.alert('您的浏览器不支持socket')
      } else {
        let message = new msg.MessageBase()
        message.setClientid(UUID.v1())
        message.setCmd(command.CommandType.PUSH_DATA)
        message.setRequesttype(1)
        message.setData(`${contractCode}&${commodityCode}`)
        let bytes = message.serializeBinary()
        if (this.sockets && this.sockets.ws.readyState === 1) {
          this.$store.dispatch('closeScoket')
          setTimeout(function() {
            _that.openLink(bytes)
          }, 250)
        } else {
          this.openLink(bytes)
        }
      }
    },
    /** 切换 */
    onItemClick(e, index) {
      this.active = index
      this.loadsh = true
      if (e.target.className) {
        this.loadsh = false
        return false
      }
      let das = {
        commodityCode: this.$route.query.commodityCode,
        contractCode: this.$route.query.contractCode
      }
      if (index === 0) {
        this.klineActive = 0
        this.getChartHistory(das)
        this.$refs.trade.setChartResolution('1', 3)
        this.$refs.trade.createStudy()
      } else if (index === 1) {
        this.klineActive = 1
        this.loadsh = false
        this.stockHeight = 100 + 'px'
      } else if (index === 2) {
        this.klineActive = 0
        this.linkData = []
        this.getChartDay({
          params: {
            commodityCode: das.commodityCode,
            contractCode: das.contractCode
          }
        })
      } else if (index === 3) {
        this.klineActive = 0
        this.getChartHistory(das, {
          mins: 1
        })
        this.$refs.trade.setChartResolution('1', 1)
        this.$refs.trade.createStudy(1)
      } else if (index === 4) {
        this.klineActive = 0
        this.getChartHistory(das, {
          mins: 5
        })
        this.$refs.trade.setChartResolution('5', 1)
        this.$refs.trade.createStudy(1)
      } else if (index === 5) {
        this.klineActive = 0
        this.getChartHistory(das, {
          mins: 15
        })
        this.$refs.trade.setChartResolution('15', 1)
        this.$refs.trade.createStudy(1)
      }
    },
    // 获取图表历史数据
    getChartHistory(c, d) {
      const _that = this
      this.linkData = []
      let das = {
        params: {
          commodityCode: !c ? '' : c.commodityCode,
          contractCode: !c ? '' : c.contractCode
        },
        query: d
      }
      _that.loadsh = true
      _that.loadsh2 = false
      this.stockHeight = 90 + 'px'
      setSession('chartTimer', d)
      _that.$store.dispatch('showMasks')
      this.$store
        .dispatch('getHistoryData', das)
        .then(res => {
          _that.loadsh = false
          _that.$store.dispatch('closeMasks')
          if (res.status) {
            let data = res.data
            let time
            let date
            if (data && data.length) {
              data.forEach(e => {
                date = new Date(e.timeStr.replace(/\-/g, '/'))
                time = new Date(date).getTime()
                this.linkData.push({
                  close: e.closePrice,
                  open: e.openPrice,
                  high: e.highPrice,
                  low: e.lowPrice,
                  volume: e.volume,
                  time: time,
                  totalVolume: e.endTotalQty
                })
              })
            }
            return false
          }
        })
        .catch(err => {
          this.$store.dispatch('closeMasks')
          this.loadsh = false
          this.loadsh2 = true
          this.toast = Toast({
            message: err,
            position: 'middle',
            duration: 1500
          })
        })
    },
    // 获取日K
    getChartDay(das) {
      this.loadsh2 = false
      this.$refs.trade.setChartResolution('1D', 1)
      this.$refs.trade.createStudy(1)
      this.$store
        .dispatch('getHistoryDay', das)
        .then(res => {
          if (res && res.status) {
            let das = res.data
            this.loadsh = false
            let time
            let date
            if (das && das.length) {
              das.forEach(e => {
                date = new Date(e.timeStr.replace(/\-/g, '/'))
                time = new Date(date).getTime()
                this.linkData.push({
                  close: e.closePrice,
                  open: e.openPrice,
                  high: e.highPrice,
                  low: e.lowPrice,
                  volume: e.volume,
                  time: time
                })
              })
            }
          }
        })
        .catch(err => {
          this.loadsh = false
          this.loadsh2 = true
          this.toast = Toast({
            message: err,
            position: 'middle',
            duration: 1500
          })
        })
    },
    // 导航切换之后处理
    marketChart(item) {
      this.$refs.trade.removeChart()
      this.active = 0
      const _that = this
      let t = getNotSession('chartTimer')
      let d = t === 'undefined' ? undefined : JSON.parse(t)
      let qc = {
        commodityCode: item.params.commodityCode,
        contractCode: item.params.contractCode
      }
      _that.getGoods(qc)
      _that.getChartHistory(qc, d)
      this.$refs.trade.startNewChart(this.$route.query.CommodityName, 1)
      if (this.sockets.ws.readyState === 1) {
        this.$store.dispatch('closeScoket')
        setTimeout(() => {
          _that.chartWebSocket(qc.contractCode, qc.commodityCode)
        }, 300)
      }
      if (this.sockets.ws.readyState === 0) {
        this.$store.dispatch('closeScoket')
        setTimeout(() => {
          _that.chartWebSocket(qc.contractCode, qc.commodityCode)
        }, 300)
      }
    },
    // 关闭加载
    close_fall() {
      const timer = getNotSession('chartTimer')
      let das = {
        commodityCode: this.$route.query.commodityCode,
        contractCode: this.$route.query.contractCode
      }
      let d = timer === 'undefined' ? undefined : JSON.parse(timer)
      if (timer === 'undefined') {
        this.getChartHistory(das)
      } else {
        this.getChartHistory(das, d)
      }
    },
    // 返回上一步
    goBack() {
      let tpCode = getNotSession('marketId') || this.$route.query.tpCode
      this.$router.push({
        path: `/market/list/${tpCode}`
      })
    },
    // 截取时间
    fromalTime(t) {
      if (!t) {
        return false
      }
      return t.split(' ')[1].substring(3, 5)
    },
    // 获取单个商品行情
    getGoods(das) {
      this.getOnegoods(das)
    },
    toTradeRule() {
      this.flat = true
    },
    removeLeft(val) {
      this.flat = val
    },
    // 背景更改
    changeBg(bgData) {
      switch (bgData) {
        case 'theme-Red':
          this.bgColor.bodyColor = '#DD2727'
          this.bgColor.linkColor = '#DD2727'
          this.bgColor.aId = '#F5E5C1'
          this.bgColor.day = 0
          this.bgColor.fontColor = '#666666'
          break
        case 'theme-Orange':
          this.bgColor.bodyColor = '#FF5000'
          this.bgColor.linkColor = '#FF5000'
          this.bgColor.aId = '#F5E5C1'
          this.bgColor.day = 0
          this.bgColor.fontColor = '#666666'
          break
        case 'theme-Gary':
          this.bgColor.bodyColor = '#1e1e1e'
          this.bgColor.linkColor = '#cbba1e'
          this.bgColor.aId = '#1e1e1e'
          this.bgColor.day = 1
          this.bgColor.fontColor = '#cccccc'
          break
        default:
          this.bgColor.bodyColor = '#6b89fe'
          this.bgColor.linkColor = '#6b89fe'
          this.bgColor.aId = '#F5E5C1'
          this.bgColor.day = 0
          this.bgColor.fontColor = '#666666'
          break
      }
    }
  },
  // beforeDestroy() {
  //   this.$refs.trade.removeChart()
  //   window.getBarTimer && clearTimeout(window.getBarTimer)
  // },
  // 路由离开
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'buy') {
      this.$store.dispatch('closeScoket')
    }
    next()
  },
  watch: {
    // 颜色
    marketColor(newData) {
      this.changeBg(newData)
    },
    // 行情变化
    marketList(newDatas) {
      let data = msg.MessageBase.deserializeBinary(newDatas).array[5]
      if (data) {
        this.stockMarket = data
        let date = new Date(data[0].replace(/\-/g, '/'))
        let r = {
          close: data[23] * 1,
          high: data[26] * 1,
          low: data[27] * 1,
          open: data[25] * 1,
          time: date.getTime(),
          volume: 0,
          totalVolume: data[30] * 1
        }
        this.$store.dispatch('getChangePosit', data)
        if (this.linkData.length) {
          let socketDas = this.linkData[this.linkData.length - 1]
          let date = new Date(data[0].replace(/\-/g, '/'))
          let scoketDate = socketDas.time
          let chartDate = date.getTime()
          if (this.tmpLineData === -1) {
            this.tmpLineData = socketDas.totalVolume
          }
          if (chartDate - scoketDate >= 60 * 1000) {
            r.volume = data[30] * 1 - this.tmpLineData
            this.tmpLineData = data[30] * 1
            this.linkData.push(r)
          } else {
            r.time = socketDas.time
            r.volume = data[30] * 1 - this.tmpLineData
            this.linkData.pop()
            this.linkData.push(r)
          }
        }
      }
    },
    sockets(newData) {
      this.sockets.onreconnect = e => {
        console.log('reconnecting..')
      }
    }
  }
}
