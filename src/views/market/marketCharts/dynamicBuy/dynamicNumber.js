import t from '@/utils/'
import quickBuy from './quickBuyIn'
import {
  mapGetters
} from 'vuex'
import {
  getLocal
} from '@/utils/storage'
import {Toast} from 'mint-ui'
export default {
  name: 'quickNumber',
  components: {
    quickBuy
  },
  props: {
    stockMarket: {
      type: [Array, Object],
      required: true
    },
    navOnClickData: {
      type: [Object, Array],
      default: {
        navOnClickQuick: false,
        data: {}
      }
    },
    singleGoods: {
      type: [Array, Object],
      required: true
    }
  },
  watch: {
    stockMarket(newD) {
      this.sockList.lastPrice = newD[23] * 1
      this.sockList.buyNumber = newD[8]
      this.sockList.sellNumber = newD[18]
      this.sockList.upDropPrice = newD[23] - newD[28]
      this.sockList.upDropSpeed = (newD[23] - newD[28]) / newD[28] * 100
      this.sockList.buyPrice = Number(newD[13])
      this.sockList.sellPrice = Number(newD[3])
    },
    singleGoods(nDatas) {
      this.sockList.lastPrice = nDatas.lastPrice
      this.sockList.buyNumber = nDatas.askSize
      this.sockList.sellNumber = nDatas.bidSize
      this.sockList.upDropPrice = nDatas.lastPrice - nDatas.openPrice
      this.sockList.upDropSpeed = (nDatas.lastPrice - nDatas.openPrice) / nDatas.openPrice * 100
      this.sockList.buyPrice = nDatas.askPrice
      this.sockList.sellPrice = nDatas.bidPrice
    },
    'navOnClickData.navOnClickQuick': {
      handler(n, o) {
        if (n) {
          this.buyVisible = false
        }
      },
      deep: true
    }
  },
  data() {
    return {
      timer: t.time('0', Date.now()),
      buyVisible: false,
      singleOrderDatail: {},
      tradeModel: {},
      sockList: {
        lastPrice: 0,
        buyNumber: 0,
        sellNumber: 0,
        upDropPrice: 0,
        upDropSpeed: 0,
        buyPrice: 0,
        sellPrice: 0,
        toast: null
      }
    }
  },
  computed: {
    ...mapGetters(['buyBussInfo', 'chartMask']),
    ofDay() {
      return t.isWeekEnd(this.timer)
    }
  },
  methods: {
    // 打开闪电下单
    radiusHandle() {
      this.buyVisible = !this.buyVisible
      this.singleOrderDatail = this.$refs.child.buyData
    },
    // 买多
    buyMuch() {
      const _that = this
      this.tradeModel = this.$refs.child.model_moneys
      if (_that.buyVisible) {
        let walletNum = 0
        if (_that.singleOrderDatail.walletType === 1) {
          walletNum = 1
        }
        if (_that.singleOrderDatail.walletType === 2) {
          walletNum = 2
        }
        if (_that.singleOrderDatail.walletType === 3) {
          walletNum = 3
        }
        _that.nowBuyMuch(walletNum)
        return
      }
      const das = {
        status: false,
        win: 1
      }
      this.$emit('showBuyMenu', das)
    },
    // 现金买多
    nowBuyMuch(n) {
      let data = {
        orderType: n,
        tradeModel: this.tradeModel.type,
        tradeType: 1,
        price: this.sockList.buyPrice
      }
      this.toast && this.toast.close()
      this.placeAnOrder(data)
    },
    // 买空
    buyLess() {
      const _that = this
      this.tradeModel = this.$refs.child.model_moneys
      if (this.buyVisible) {
        let walletNum = 0
        if (_that.singleOrderDatail.walletType === 1) {
          walletNum = 1
        }
        if (_that.singleOrderDatail.walletType === 2) {
          walletNum = 2
        }
        if (_that.singleOrderDatail.walletType === 3) {
          walletNum = 3
        }
        _that.nowBuyLess(walletNum)
        return
      }
      const das = {
        status: false,
        win: 0
      }
      this.$emit('showBuyMenu', das)
    },
    // 卖空
    nowBuyLess(n) {
      let data = {
        orderType: n,
        tradeModel: this.tradeModel.type,
        tradeType: 2,
        price: this.sockList.sellPrice
      }
      this.toast && this.toast.close()
      this.placeAnOrder(data)
    },
    // 订单公共方法
    placeAnOrder(data) {
      if (data.price === 0) {
        this.toast = Toast({
          message: '请等待最新价',
          duration: 2000
        })
        return false
      }
      let das = {
        lossAmount: this.$refs.child.stopLossMoney,
        tradeHands: this.$refs.child.numLen,
        profitAmount: this.$refs.child.profitMoney,
        orderType: data.orderType,
        merchantCode: getLocal('userInfo').merchantCode,
        templateCode: this.$route.query.tpCode,
        commodityCode: this.$route.query.commodityCode,
        contractCode: this.$route.query.contractCode,
        tradeModel: data.tradeModel,
        tradeType: data.tradeType,
        orderPrice: data.price
      }
      if (das.orderType === 1) {
        this.cashOrderBuy(das)
        return false
      }
      if (das.orderType === 2) {
        this.IntegralOrderBuy(das)
        return false
      }
      if (das.orderType === 3) {
        this.ImitateOrder(das)
        return false
      }
    },
    // 现金下单
    cashOrderBuy(das) {
      const _that = this
      _that.$store.dispatch('showLoading')
      _that.$store.dispatch('goSubmitOrder', das).then(res => {
        _that.$store.dispatch('hideLoading')
        if (res.status) {
          this.toast = Toast({
            message: '下单成功',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 300
          })
        }
      }).catch(err => {
        _that.$store.dispatch('hideLoading')
        this.toast = Toast({
          message: err,
          position: 'middle',
          duration: 500
        })
      })
    },
    // 模拟下单
    ImitateOrder(das) {
      const _that = this
      _that.$store.dispatch('showLoading')
      _that.$store.dispatch('ImitateOrder', das).then(res => {
        _that.$store.dispatch('hideLoading')
        if (res.status) {
          this.toast = Toast({
            message: '下单成功',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 300
          })
        }
      }).catch(err => {
        _that.$store.dispatch('hideLoading')
        this.toast = Toast({
          message: err,
          position: 'middle',
          duration: 500
        })
      })
    },
    // 积分下单
    IntegralOrderBuy(das) {
      const _that = this
      _that.$store.dispatch('showLoading')
      _that.$store.dispatch('IntegralOrder', das).then(res => {
        _that.$store.dispatch('hideLoading')
        if (res.status) {
          this.toast = Toast({
            message: '下单成功',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 300
          })
        }
      }).catch(err => {
        _that.$store.dispatch('hideLoading')
        this.toast = Toast({
          message: err,
          position: 'middle',
          duration: 500
        })
      })
    },
    // 精度
    formatPoint(price) {
      let point = this.buyBussInfo.priceDecimalPlaces
      if (price && point) {
        return price.toFixed(point)
      } else {
        return price
      }
    }
  },
  beforeDestroy() {
    this.toast && this.toast.close()
  }
}
