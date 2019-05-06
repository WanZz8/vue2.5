import t from '@/utils/'
import {
  mapGetters
} from 'vuex'
// 精度问题
import {Decimal} from 'decimal.js'
export default {
  name: 'dynamicPrice',
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
      let m = new Decimal(newD[23]).sub(newD[28]).toNumber()
      this.sockList.upDropPrice = m
      let n = new Decimal(m).div(newD[28]).toNumber()
      let x = new Decimal(n).mul(100).toNumber()
      this.sockList.upDropSpeed = x
      this.sockList.buyPrice = Number(newD[13])
      this.sockList.sellPrice = Number(newD[3])
    },
    singleGoods(nDatas) {
      this.sockList.lastPrice = nDatas.lastPrice
      this.sockList.buyNumber = nDatas.askSize
      this.sockList.sellNumber = nDatas.bidSize
      let m = new Decimal(nDatas.lastPrice).sub(nDatas.openPrice).toNumber()
      this.sockList.upDropPrice = m
      let n = new Decimal(m).div(nDatas.openPrice).toNumber()
      let x = new Decimal(n).mul(100).toNumber()
      this.sockList.upDropSpeed = x
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
        sellPrice: 0
      }
    }
  },
  computed: {
    ...mapGetters(['buyBussInfo']),
    getCloseTime() {
      let time = this.buyBussInfo
      return time.closeTime ? time.closeTime : ''
    }
  },
  methods: {
  // 跳转到持仓
    linkToPosition() {
      this.$router.push('/trade?id=1')
    },
    // 精度
    formatPoint(price) {
      let point = this.buyBussInfo.priceDecimalPlaces
      if (price && point) {
        price = parseFloat(price)
        return price.toFixed(point)
      } else {
        return price
      }
    }
  }
}
