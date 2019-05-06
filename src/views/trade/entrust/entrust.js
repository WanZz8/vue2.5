import noData from '@/components/public/noData/noData'
import {
  setTimeout
} from 'timers'
import {
  mapActions,
  mapGetters
} from 'vuex'
import {
  MessageBox, Toast
} from 'mint-ui'
import {
  msg
} from '@/assets/js/proto-helper'
let moment = require('moment')
export default {
  name: 'entrust',
  components: {
    noData
  },
  props: {
    tab: {
      type: String,
      default: ''
    }
  },
  watch: {
    tab() {
      this.conHeight()
    },
    entrustList: {
      handler(nDatas, oldDatas) {
        this.knowData = nDatas
      },
      deep: true
    },
    marketList(newDatas) {
      let data = msg.MessageBase.deserializeBinary(newDatas).array[6]
      if (!data || !data.length) {
        return false
      }
      for (let i = 0; i < this.knowData.length; i++) {
        if (this.knowData[i].commodityCode === data[0][1] &&
            this.knowData[i].tradeStatus === 1 &&
          this.knowData[i].contractCode === data[0][2]
        ) {
          this.knowData[i].lastPrice = data[0][3]
          // if (this.knowData[i].tradeType === 2) {
          //   this.knowData[i].lastPrice = data[0][10]
          // }
        }
      }
    }
  },
  data() {
    return {
      wrapperHeight: 0,
      page: 1,
      pageSize: 10,
      pageSum: 0,
      flat: true,
      knowData: [],
      enrtustData: [{
        lastPrice: 0
      }],
      cash_Timer: null,
      Integral_Timer: null,
      imitate_Timer: null,
      toast: null
    }
  },
  computed: {
    ...mapGetters(['entrustList', 'marketList', 'isIntegral'])
  },
  mounted() {
    this.top = 1
    this.bottom = 20
  },
  methods: {
    ...mapActions([
      'getEntrustList',
      'pageEntrustList',
      'sendCloseEntrust',
      'getIntegralEntrust',
      'addIntegralEntrust',
      'sendIntegralEntrust',
      'getImitateEntrust',
      'addImitateEntrust',
      'sendImitateEntrust'
    ]),
    scrollerToTop() {
      if (this.$refs.my_scroller) {
        this.$refs.my_scroller.scrollTo(0, 0, true)
      }
    },
    // 下拉刷新
    refresh(done) {
      if (this.isIntegral === 0) {
        this.refreshCash(done)
        return
      }
      if (this.isIntegral === 1) {
        this.refreshIntegral(done)
      }
      if (this.isIntegral === 2) {
        this.refreshImitate(done)
      }
    },
    // 刷新现金委托
    refreshCash(done) {
      const _that = this
      if (this.flat) {
        _that.getEntrustList({
          pageNo: 1,
          pageSize: 10
        }).then(res => {
          _that.conHeight()
          done()
        }).catch(err => {
          done()
          _that.toast = Toast({
            message: err.msg,
            duration: 1500
          })
        })
        _that.flat = false
        setTimeout(() => {
          _that.flat = true
        }, 1000)
      }
    },
    // 刷新积分委托
    refreshIntegral(done) {
      const _that = this
      if (this.flat) {
        _that.getIntegralEntrust({
          pageNo: 1,
          pageSize: 10
        }).then(res => {
          _that.conHeight()
          done()
        }).catch(err => {
          done()
          _that.toast = Toast({
            message: err.msg,
            duration: 1500
          })
        })
        _that.flat = false
        setTimeout(() => {
          _that.flat = true
        }, 1000)
      }
    },
    // 刷新模拟委托
    refreshImitate(done) {
      const _that = this
      if (this.flat) {
        _that.getImitateEntrust({
          pageNo: 1,
          pageSize: 10
        }).then(res => {
          _that.conHeight()
          done()
        }).catch(err => {
          done()
          _that.toast = Toast({
            message: err.msg,
            duration: 1500
          })
        })
        _that.flat = false
        setTimeout(() => {
          _that.flat = true
        }, 1000)
      }
    },
    // 上拉加载
    infinite(done) {
      switch (this.isIntegral) {
        case 0:
          this.addCashInfinite(done)
          break
        case 1:
          this.addIntegral(done)
          break
        case 2:
          this.add_ImitateEntrust(done)
          break
        default:
      }
    },
    // 加载现金委托
    addCashInfinite(done) {
      const _that = this
      if (this.page !== this.pageSum) {
        _that.page += 1
        _that.pageEntrustList({
          pageNo: _that.page,
          pageSize: 10
        }).then(res => {
          _that.pageSum = res.data.pages
          _that.bottom = _that.bottom + 10
          done()
        }).catch(err => {
          _that.toast = Toast({
            message: err.msg,
            duration: 1500
          })
        })
      } else {
        done(true)
      }
    },
    // 加载积分委托
    addIntegral(done) {
      const _that = this
      if (this.page !== this.pageSum) {
        _that.page += 1
        _that.addIntegralEntrust({
          pageNo: _that.page,
          pageSize: 10
        }).then(res => {
          _that.pageSum = res.data.pages
          _that.bottom = _that.bottom + 10
          done()
        }).catch(err => {
          _that.toast = Toast({
            message: err.msg,
            duration: 1500
          })
        })
      } else {
        done(true)
      }
    },
    // 加载模拟委托
    add_ImitateEntrust(done) {
      const _that = this
      if (this.page !== this.pageSum) {
        _that.page += 1
        _that.addImitateEntrust({
          pageNo: _that.page,
          pageSize: 10
        }).then(res => {
          _that.pageSum = res.data.pages
          _that.bottom = _that.bottom + 10
          done()
        }).catch(err => {
          _that.toast = Toast({
            message: err.msg,
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
        // this.$store.dispatch('showLoading')
        this.cashLoad()
        return
      }
      if (this.isIntegral === 1) {
        // this.$store.dispatch('showLoading')
        this.integralLoad()
        return
      }
      if (this.isIntegral === 2) {
        // this.$store.dispatch('showLoading')
        this.ImitateLoad()
      }
    },
    // 进入现金加载
    cashLoad() {
      this.getEntrustList({
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        this.clearAllTimer()
        // this.$store.dispatch('hideLoading')
        if (this && this._isDestroyed) return
        this.conHeight()
        this.page = 1
        this.pageSize = 10
        this.pageSum = res.data.pages
        this.cash_Timer = setInterval(() => {
          this.cashLoad()
        }, 5000)
      }).catch(() => {
        // this.$store.dispatch('hideLoading')
        this.clearAllTimer()
        if (this && this._isDestroyed) return
        this.cash_Timer = setInterval(() => {
          this.cashLoad()
        }, 5000)
      })
    },
    // 进入积分加载
    integralLoad() {
      this.getIntegralEntrust({
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        this.clearAllTimer()
        // this.$store.dispatch('hideLoading')
        if (this && this._isDestroyed) return
        this.conHeight()
        this.page = 1
        this.pageSize = 10
        this.pageSum = res.data.pages
        this.Integral_Timer = setInterval(() => {
          this.integralLoad()
        }, 5000)
      }).catch(() => {
        // this.$store.dispatch('hideLoading')
        this.clearAllTimer()
        if (this && this._isDestroyed) return
        this.Integral_Timer = setInterval(() => {
          this.integralLoad()
        }, 5000)
      })
    },
    // 进入模拟加载
    ImitateLoad() {
      this.getImitateEntrust({
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        this.clearAllTimer()
        // this.$store.dispatch('hideLoading')
        if (this && this._isDestroyed) return
        this.conHeight()
        this.page = 1
        this.pageSize = 10
        this.pageSum = res.data.pages
        this.imitate_Timer = setInterval(() => {
          this.ImitateLoad()
        }, 5000)
      }).catch(() => {
        // this.$store.dispatch('hideLoading')
        this.clearAllTimer()
        if (this && this._isDestroyed) return
        this.imitate_Timer = setInterval(() => {
          this.ImitateLoad()
        }, 5000)
      })
    },
    // 取消委托
    cancel_entrust(e, item) {
      let das = {
        orderNo: item.orderNo
      }
      if (this.isIntegral === 0) {
        this.cancel_entrust_cash(das)
        return
      }
      if (this.isIntegral === 1) {
        this.cancel_entrust_integral(das)
        return
      }
      if (this.isIntegral === 2) {
        this.cancel_entrust_imitate(das)
      }
    },
    // 取消现金委托
    cancel_entrust_cash(das) {
      const _that = this
      MessageBox.confirm('确定取消委托?').then(action => {
        if (action) {
          _that.$store.dispatch('showLoading')
          _that.sendCloseEntrust(das).then(res => {
            if (res.status) {
              _that.$store.dispatch('hideLoading')
              MessageBox.alert('取消委托成功').then(action => {
                if (action) {
                  _that.loadFrist()
                }
              })
            }
          }).catch(err => {
            _that.$store.dispatch('hideLoading')
            _that.toast = Toast({
              message: err.msg,
              duration: 1500
            })
          })
        }
      }).catch(() => {})
    },
    // 取消积分委托
    cancel_entrust_integral(das) {
      const _that = this
      MessageBox.confirm('确定取消委托?').then(action => {
        if (action) {
          _that.$store.dispatch('showLoading')
          _that.sendIntegralEntrust(das).then(res => {
            if (res.status) {
              _that.$store.dispatch('hideLoading')
              MessageBox.alert('取消委托成功').then(action => {
                if (action) {
                  _that.loadFrist()
                }
              })
            }
          }).catch(err => {
            _that.$store.dispatch('hideLoading')
            _that.toast = Toast({
              message: err.msg,
              duration: 1500
            })
          })
        }
      }).catch(() => {})
    },
    // 取消模拟委托
    cancel_entrust_imitate(das) {
      const _that = this
      MessageBox.confirm('确定模拟委托?').then(action => {
        if (action) {
          _that.$store.dispatch('showLoading')
          _that.sendImitateEntrust(das).then(res => {
            if (res.status) {
              _that.$store.dispatch('hideLoading')
              MessageBox.alert('取消委托成功').then(action => {
                if (action) {
                  _that.loadFrist()
                }
              })
            }
          }).catch(err => {
            _that.$store.dispatch('hideLoading')
            _that.toast = Toast({
              message: err.msg,
              duration: 1500
            })
          })
        }
      }).catch(() => {})
    },
    timer(type, t) {
      let updateTime = moment(t * 1000).format('YYYY-MM-DD HH:mm:ss')
      return updateTime
    },
    conHeight() {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_entrust.getBoundingClientRect().top
    },
    clearAllTimer() {
      this.toast && this.toast.close()
      clearInterval(this.cash_Timer)
      this.cash_Timer = null
      clearInterval(this.Integral_Timer)
      this.Integral_Timer = null
      clearInterval(this.imitate_Timer)
      this.imitate_Timer = null
    }
  },
  beforeDestroy() {
    this.clearAllTimer()
  }
}
