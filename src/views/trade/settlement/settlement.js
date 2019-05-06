import {
  mapActions,
  mapGetters
} from 'vuex'
import {
  setSession
} from '@/utils/storage'
import noData from '@/components/public/noData/noData'
import {
  Decimal
} from 'decimal.js'
import {
  Toast
} from 'mint-ui'
let moment = require('moment')
export default {
  name: 'settlement',
  props: {
    tab: {
      type: String,
      default: ''
    }
  },
  components: {
    noData
  },
  data() {
    return {
      // 可以进行上拉
      allLoaded: false,
      // 是否自动触发上拉函数
      wrapperHeight: 0,
      checkedValue: 0,
      page: 1,
      pageSize: 10,
      pageSum: 0,
      historyPoint: 1,
      timer: {},
      go_refresh: false,
      list: [{
        value: 0,
        label: '今天'
      }, {
        value: 7,
        label: '最近一周'
      }, {
        value: 30,
        label: '最近一个月'
      }],
      obj: {
        1: '持仓中',
        2: '已结算',
        3: '结算失败'
      },
      load_More: false
    }
  },
  watch: {
    tab() {
      this.numberHeight()
    }
  },
  computed: {
    ...mapGetters(['settleList', 'isIntegral'])
  },
  mounted() {
    this.numberHeight()
  },
  methods: {
    ...mapActions([
      'getSettle',
      'getAddSettle',
      'getIntegralSettle',
      'getAddIntegralSettle',
      'getImitateSettle',
      'getAddImitateSettle'
    ]),
    checkDetail(item) {
      this.$router.push({
        path: `/trade/detail/${item.orderNo}`
      })
    },
    // 下拉刷新
    refresh(done) {
      if (this.isIntegral === 0) {
        this.refreshCash(done)
        return
      }
      if (this.isIntegral === 1) {
        this.refreshScore(done)
        return
      }
      if (this.isIntegral === 2) {
        this.refreshImitate(done)
      }
    },
    // 刷新现金
    refreshCash(done) {
      this.getSettle({
        pageNo: 1,
        pageSize: 10,
        pastDay: this.checkedValue
      }).then(res => {
        this.page = 1
        this.pageSize = 10
        this.pageSum = res.data.pages
        done()
      }).catch(() => {
        done()
      })
    },
    // 刷新积分
    refreshScore(done) {
      this.getIntegralSettle({
        pageNo: 1,
        pageSize: 10,
        pastDay: this.checkedValue
      }).then(res => {
        this.page = 1
        this.pageSize = 10
        this.pageSum = res.data.pages
        done()
      }).catch(() => {
        done()
      })
    },
    // 刷新模拟
    refreshImitate(done) {
      this.getImitateSettle({
        pageNo: 1,
        pageSize: 10,
        pastDay: this.checkedValue
      }).then(res => {
        this.page = 1
        this.pageSize = 10
        this.pageSum = res.data.pages
        done()
      }).catch(() => {
        done()
      })
    },
    // 加载更多
    infinite(done) {
      switch (this.isIntegral) {
        case 0:
          this.addCash_Infinite(done)
          break
        case 1:
          this.addScoreInfinite(done)
          break
        case 2:
          this.addImitateInfinite(done)
          break
        default:
      }
    },
    // 加载更多现金结算
    addCash_Infinite(done) {
      const _that = this
      if (_that.page !== _that.pageSum && this.load_More) {
        _that.page += 1
        _that.getAddSettle({
          pageNo: _that.page,
          pageSize: 10,
          pastDay: _that.checkedValue
        }).then(res => {
          _that.pageSum = res.data.pages
          done()
        }).catch(err => {
          Toast({
            message: err.msg,
            position: 'middle',
            duration: 1500
          })
        })
      } else {
        done(true)
      }
    },
    // 加载更多积分结算
    addScoreInfinite(done) {
      const _that = this
      if (this.page !== this.pageSum && this.load_More) {
        _that.page += 1
        _that.getAddIntegralSettle({
          pageNo: _that.page,
          pageSize: 10,
          pastDay: _that.checkedValue
        }).then(res => {
          _that.pageSum = res.data.pages
          done()
        }).catch(err => {
          Toast({
            message: err.msg,
            position: 'middle',
            duration: 1500
          })
        })
      } else {
        done(true)
      }
    },
    // 加载更多模拟结算
    addImitateInfinite(done) {
      const _that = this
      if (this.page !== this.pageSum && this.load_More) {
        _that.page += 1
        _that.getAddImitateSettle({
          pageNo: _that.page,
          pageSize: 10,
          pastDay: _that.checkedValue
        }).then(res => {
          _that.pageSum = res.data.pages
          done()
        }).catch(err => {
          Toast({
            message: err.msg,
            position: 'middle',
            duration: 1500
          })
        })
      } else {
        done(true)
      }
    },
    // 进入加载
    loadFrist() {
      if (this.isIntegral === 0) {
        this.cashSettle()
        return
      }
      if (this.isIntegral === 1) {
        this.integralSettle()
        return
      }
      if (this.isIntegral === 2) {
        this.imitateSettle()
      }
    },
    // 进入加载现金结算
    cashSettle() {
      this.$store.dispatch('showLoading')
      this.getSettle({
        pageNo: 1,
        pageSize: 10,
        pastDay: this.checkedValue
      }).then(res => {
        if (res && res.status) {
          this.$store.dispatch('hideLoading')
          this.numberHeight()
          this.pageSum = res.data.pages
          this.load_More = true
          this.page = 1
          this.pageSize = 10
        }
      }).catch(err => {
        this.$store.dispatch('hideLoading')
        Toast({
          message: err,
          position: 'middle',
          duration: 1500
        })
      })
    },
    // 进入加载积分结算
    integralSettle() {
      this.$store.dispatch('showLoading')
      this.getIntegralSettle({
        pageNo: 1,
        pageSize: 10,
        pastDay: this.checkedValue
      }).then(res => {
        if (res && res.status) {
          this.$store.dispatch('hideLoading')
          this.numberHeight()
          this.pageSum = res.data.pages
          this.load_More = true
          this.page = 1
          this.pageSize = 10
        }
      }).catch(err => {
        this.$store.dispatch('hideLoading')
        Toast({
          message: err,
          position: 'middle',
          duration: 1500
        })
      })
    },
    // 进入加载模拟结算
    imitateSettle() {
      this.$store.dispatch('showLoading')
      this.getImitateSettle({
        pageNo: 1,
        pageSize: 10,
        pastDay: this.checkedValue
      }).then(res => {
        this.$store.dispatch('hideLoading')
        this.numberHeight()
        this.pageSum = res.data.pages
        this.load_More = true
        this.page = 1
        this.pageSize = 10
      }).catch(err => {
        this.$store.dispatch('hideLoading')
        Toast({
          message: err,
          position: 'middle',
          duration: 1500
        })
      })
    },
    timers(type, t) {
      let updateTime = moment(t * 1000).format('YYYY-MM-DD HH:mm:ss')
      return updateTime
    },
    // 单选框
    checkoutType(item) {
      let day = item.value
      setSession('historyPoint', day)
      this.checkedValue = day
      this.loadFrist(day)
    },
    // 计算高度
    numberHeight() {
      if (this.$refs.wrapper_settlement) {
        this.wrapperHeight =
          document.documentElement.clientHeight -
          this.$refs.wrapper_settlement.getBoundingClientRect().top
      }
    },
    // 专门处理精度问题
    fixNumLen0(m, n, x) { // x, n, x, y代表四个参数
      let num = new Decimal(m).mul(n).mul(x)
      return num
    },
    fixNumLen1(m, n, x, y) { // x, n, x, y代表四个参数
      let num = (new Decimal(m).mul(n).mul(x)).mul(y)
      return num
    }
  }
}
