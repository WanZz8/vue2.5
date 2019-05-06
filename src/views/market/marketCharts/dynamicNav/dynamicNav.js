import BScroll from '@/components/public/bScroll/bScrolls'
import {
  getNotSession,
  setSession
} from '@/utils/storage'
import {
  mapGetters
} from 'vuex'
import {
  Toast
} from 'mint-ui'
export default {
  components: {
    BScroll
  },
  props: {
    navOnClickData: {
      type: [Object, Array],
      default: {
        navOnClickQuick: false,
        data: {}
      }
    }
  },
  computed: {
    ...mapGetters(['navList', 'chartNavList']),
    // 循环导航
    charNavr() {
      let map = {}
      let dest = []
      if (!this.chartNavList) return
      if (this.chartNavList.length !== 0) {
        for (let i = 0; i < this.chartNavList.length; i++) {
          let c = this.chartNavList[i]
          if (!map[c.productType]) {
            dest.push({
              title: c.productType,
              list: [c]
            })
            map[c.productType] = c
          } else {
            for (let j = 0; j < dest.length; j++) {
              let dj = dest[j]
              if (dj.title === c.productType) {
                dj.list.push(c)
                break
              }
            }
          }
        }
        return dest
      }
    }
  },
  data() {
    return {
      commodityNav: {}
    }
  },
  created() {
    if (!this.$route.query.tpCode && !getNotSession('marketId')) {
      return false
    }
    if (this.navList.length <= 0) {
      this.setChartsNav()
    }
  },
  // watch: {
  //   'navOnClickData.navOnClickQuick': {
  //     handler(n) {
  //       const _that = this
  //       setTimeout(() => {
  //         _that.$refs.market_scroll._afterPullDown()
  //       }, 200)
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    // 关闭遮罩
    emitData(item) {
      this.$emit('closeMask', item)
    },
    // 收缩
    mask_onClick() {
      this.commodityNav.closeMask = false
      this.commodityNav.commodityData = {}
      this.emitData(this.commodityNav)
    },
    // 行情切换
    select_Commodity(e, item) {
      if (item.status === 3) {
        Toast({
          message: '该商品异常',
          duration: 2000
        })
        return
      }
      this.commodityNav.closeMask = false
      this.commodityNav.commodityData = item
      this.emitData(this.commodityNav)
      this.$router.push({
        path: '/market/charts',
        query: {
          tpCode: this.$route.query.tpCode || getNotSession('marketId'),
          CommodityName: item.CommodityName,
          commodityCode: item.commodityCode,
          contractCode: item.contractCode,
          priceDecimalPlaces: item.priceDecimalPlaces
        }
      })
      let das = {
        params: {
          commodityCode: item.commodityCode,
          contractCode: item.contractCode
        }
      }
      // const data = {
      //   templateCode: this.$route.query.tpCode,
      //   commodityCode: item.commodityCode
      // }
      // this.$store.dispatch('getBusInfo', data)
      this.$emit('marketChart', das)
      // this.$store.dispatch('showLoading')
      // this.$store.dispatch('getHistoryData', das).then(res => {
      //   _that.$store.dispatch('hideLoading')
      //   if (res.status) {
      //     _that.$emit('marketChart', res.data)
      //   }
      // }).catch(err => {
      //   _that.$store.dispatch('hideLoading')
      //   return err
      // })
    },
    // 发请求
    setChartsNav() {
      setSession('charNav', 1)
      this.$store.dispatch('getMarket', {
        templateCode: this.$route.query.tpCode || getNotSession('marketId')
      })
    }
  }
}
