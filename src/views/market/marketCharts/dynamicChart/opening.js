import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      sockList: {
        openPrice: 0,
        hightPrice: 0,
        lowPrice: 0,
        closePrice: 0,
        upDropPrice: 0,
        upDropSpeed: 0
      }
    }
  },
  props: {
    stockMarket: {
      type: [Array, Object],
      default: []
    }
  },
  watch: {
    stockMarket(nData) {
      this.sockList.openPrice = nData[25]
      this.sockList.hightPrice = nData[26]
      this.sockList.lowPrice = nData[27]
      this.sockList.closePrice = nData[28]
      this.sockList.upDropPrice = nData[23] - nData[28]
      this.sockList.upDropSpeed = (nData[23] - nData[28]) / nData[28] * 100
    }
  },
  computed: {
    ...mapGetters(['buyBussInfo'])
  },
  methods: {
    toFixedRandom(num) {
      let y = String(num).indexOf('.') + 1
      let count = String(num).length - y
      if (y > 0 && count <= 5) {
        return num
      } else {
        return num.toFixed(1)
      }
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
