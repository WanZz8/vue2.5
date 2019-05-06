import HeaderView from '@/components/layout/header'
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  Decimal
} from 'decimal.js'
import {
  Toast
} from 'mint-ui'
let moment = require('moment')
export default {
  name: 'settlementDetail',
  components: {
    HeaderView
  },
  data() {
    return {
      closeType: {
        1: '手动平仓',
        2: '达到止损',
        3: '达到止盈',
        4: '日内平仓',
        5: '合约到期'
      }
    }
  },
  computed: {
    ...mapGetters(['settleData', 'isIntegral'])
  },
  mounted() {
    this.getSettleData()
  },
  methods: {
    ...mapActions([
      'getSettleSingle',
      'getIntegralSettleSingle',
      'getImitateSettleSingle'
    ]),
    goBack() {
      this.$router.push({
        path: '/trade?id=2'
      })
    },
    getSettleData() {
      const das = {
        orderNo: this.$route.params.id
      }
      if (this.isIntegral === 0) {
        this.$store.dispatch('showLoading')
        this.getSettleSingle(das).then(res => {
          this.$store.dispatch('hideLoading')
        }).catch(err => {
          this.$store.dispatch('hideLoading')
          Toast({
            message: err,
            position: 'middle',
            duration: 1500
          })
        })
      }
      if (this.isIntegral === 1) {
        this.$store.dispatch('showLoading')
        this.getIntegralSettleSingle(das).then(res => {
          this.$store.dispatch('hideLoading')
        }).catch(err => {
          this.$store.dispatch('hideLoading')
          Toast({
            message: err,
            position: 'middle',
            duration: 1500
          })
        })
      }
      if (this.isIntegral === 2) {
        this.$store.dispatch('showLoading')
        this.getImitateSettleSingle(das).then(res => {
          this.$store.dispatch('hideLoading')
        }).catch(err => {
          this.$store.dispatch('hideLoading')
          Toast({
            message: err,
            position: 'middle',
            duration: 1500
          })
        })
      }
    },
    timer(type, t) {
      let updateTime = moment(t * 1000).format('YYYY-MM-DD HH:mm:ss')
      return updateTime
    },
    fixNumLena(m, n, x) {
      if (m !== undefined && n !== undefined && x !== undefined) {
        let num = new Decimal(m).mul(n).mul(x)
        return num.toNumber()
      }
    },
    fixNumLenb(m, n, x, y) {
      if (m !== undefined && n !== undefined && x !== undefined && y !== undefined) {
        let num = new Decimal(m).mul(n).mul(x).mul(y).toNumber()
        return num
      }
    },
    fixNumLenc(m, n, x, y, z) {
      if (m !== undefined && n !== undefined && x !== undefined && y !== undefined && z !== undefined) {
        let num = new Decimal(m).mul(n).mul(x).mul(y).mul(z).toFixed(2)
        return num
      }
    },
    fixNumLenadd(a, b) {
      let num = Decimal.add(a, b)
      return num
    },
    fixNumLend(a, b, c, d, e) {
      if (a && a !== undefined &&
        b && b !== undefined &&
        c && c !== undefined &&
        d && d !== undefined &&
        e && e !== undefined) {
        let n = Decimal.add(a, b)
        let m = new Decimal(c).mul(d).mul(e).mul(n).toFixed(2)
        return m
      }
    }
  }
}
