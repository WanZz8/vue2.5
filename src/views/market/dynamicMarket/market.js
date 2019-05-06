import HeaderView from '@/components/layout/header'
import BScroll from '@/components/public/bScroll/bScrolls'
import UUID from 'uuid'
import {
  command,
  msg
} from '@/assets/js/proto-helper'
import Skeleton from './skeleton'
import {
  mapActions,
  mapGetters
} from 'vuex'
import {
  setSession,
  getNotSession
} from '@/utils/storage'
import {
  Toast
} from 'mint-ui'
import {
  setTimeout
} from 'timers'
export default {
  name: 'market-list',
  components: {
    HeaderView,
    BScroll,
    Skeleton
  },
  data() {
    return {
      scrollX: true,
      isShowBox: false,
      childrenClass: '.list-cycle',
      changeClass: '',
      active: 0,
      selected: '',
      websock: null,
      errorSetInerval: '',
      list: [{
        commodityCode: 0,
        lastPrice: 0,
        upDropSpeed: 0
      }],
      items: [],
      templateName: '',
      obj: {}
    }
  },
  computed: {
    ...mapGetters(['marketList', 'sockets', 'navList', 'navTitle'])
  },
  watch: {
    marketList: {
      handler(newData) {
        let data = msg.MessageBase.deserializeBinary(newData).array[6]
        if (!data || !data.length) {
          return false
        } else {
          let self = this
          for (let i = 0; i < self.list.length; i++) {
            if (data[0] && data[0][1]) {
              if (
                self.list[i].commodityCode === data[0][1] &&
                self.list[i].status !== 2 &&
                self.list[i].contractCode === data[0][2]
              ) {
                self.list[i].lastPrice = data[0][3]
                self.list[i].upDropSpeed =
                  (data[0][3] - data[0][7]) / data[0][7]
                break
              }
            }
          }
          self.list.push({})
          self.list.pop()
        }
      },
      deep: true
    },
    sockets(newData) {
      // const _that = this
      this.sockets.onreconnect = e => {
        console.log('reconnecting..')
      }
      this.sockets.onerror = e => {
        console.log('connect err')
      }
    }
  },
  created() {
    this.templateName = window.sessionStorage.getItem('templateName')
  },
  mounted() {
    this.getSessMarket()
  },
  methods: {
    ...mapActions(['getMarket', 'openLink']),
    getUpPrice(upDropSpeed) {
      let num
      if (upDropSpeed === undefined || upDropSpeed === 'NaN') {
        num = '- -'
      } else {
        num = (upDropSpeed * 100).toFixed(2) + '%'
      }
      num = num === Infinity ? '- -' : num
      return num
    },
    getLowerPirce(lastPrice, openPrice) {
      let m
      if (
        lastPrice === undefined ||
        lastPrice === 'NaN' ||
        (openPrice === undefined || openPrice === 'NaN')
      ) {
        m = '- -'
      } else {
        m = ((lastPrice - openPrice) / openPrice).toFixed(2) + '%'
      }
      m = m === Infinity ? '- -' : m
      return m
    },
    // 切换
    toggle(i, v) {
      this.active = i
      this.selected = v
    },
    // 下拉刷新
    refresh(done) {
      let paramsId = this.$route.params.id
      this.pagesContract({
        templateCode: paramsId
      }, done)
      setSession('marketId', paramsId)
      this.$store.dispatch('closeScoket')
    },
    // 请求
    pagesContract(val, done) {
      const _that = this
      this.getMarket(val)
        .then(rs => {
          if (rs.status) {
            _that.items = _that.navTitle
            _that.list = _that.navList
            setTimeout(() => {
              _that.isShowBox = true
            }, 20)
            if (done !== '') {
              done()
            }
            _that.toggle(0, this.items[0])
            _that.initWebSocket()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 开启soket
    initWebSocket() {
      const _that = this
      if (typeof WebSocket === 'undefined') {
        Toast('您的浏览器不支持socket')
      } else {
        let message = new msg.MessageBase()
        message.setClientid(UUID.v1())
        message.setCmd(command.CommandType.PUSH_DATA)
        message.setRequesttype(2)
        let bytes = message.serializeBinary()
        if (this.sockets) {
          if (
            this.sockets.ws.readyState === 2 ||
            this.sockets.ws.readyState === 3
          ) {
            this.$store.dispatch('closeScoket')
            setTimeout(function () {
              _that.openLink(bytes)
            }, 250)
          }
        } else {
          this.openLink(bytes)
        }
      }
    },
    // 跳转行情页
    checkMarket(e, item) {
      if (item.status === 3) {
        Toast({
          message: '该商品异常',
          duration: 2000
        })
        return
      }
      // const das = {
      //   templateCode: this.$route.params.id,
      //   commodityCode: item.commodityCode
      // }
      // this.$store.dispatch('getBusInfo', das)
      this.$router.push({
        path: '/market/charts',
        query: {
          tpCode: this.$route.params.id,
          CommodityName: item.CommodityName,
          commodityCode: item.commodityCode,
          contractCode: item.contractCode,
          priceDecimalPlaces: item.priceDecimalPlaces
        }
      })
    },
    // 判断缓存
    getSessMarket() {
      let paramsId = this.$route.params.id
      let getSessionParams = getNotSession('marketId')
      if (getSessionParams !== paramsId || this.navList.length === 0) {
        this.pagesContract({
          templateCode: paramsId
        }, '')
        setSession('marketId', paramsId)
      } else {
        this.initWebSocket()
        this.items = this.navTitle
        this.list = this.navList
        this.toggle(0, this.items[0])
      }
    },
    goBack() {
      this.$router.push({
        name: 'market'
      })
    }
  },
  // 结束soket
  destroyed() {
    this.$store.dispatch('closeScoket')
  }
}
