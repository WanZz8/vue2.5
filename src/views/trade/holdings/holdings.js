import noData from '@/components/public/noData/noData'
import SetupLoss from './setUpStopLoss/index'
import Hub from '@/utils/hub'
import utils from '@/utils/'
import {msg} from '@/assets/js/proto-helper'
import {
  mapActions,
  mapGetters
} from 'vuex'
import {
  MessageBox, Toast
} from 'mint-ui'
import {
  Decimal
} from 'decimal.js'
let moment = require('moment')
export default {
  name: 'holdings',
  props: {
    tab: {
      type: String,
      default: ''
    }
  },
  components: {
    noData,
    SetupLoss
  },
  data() {
    return {
      wrapperHeight: 0,
      page: 1,
      pageSize: 20,
      pageSum: 0,
      flat: true,
      popupVisible: false,
      knowData: [],
      askPrices: 0,
      bidPrices: 0,
      updateLossPion: false,
      sumProfit: 0,
      cashTimer: null,
      IntegralTimer: null,
      imitateTimer: null,
      clickStatus: true,
      sum: 0,
      toast: null
    }
  },
  computed: {
    ...mapGetters([
      'marketList',
      'holdingsList',
      'getSettle',
      'isIntegral'
    ]),
    sumProfitNum() {
      if (this.knowData && this.knowData.length) {
        return this.sum
      }
    }
  },
  watch: {
    tab(nd) {
      this.numberHeight()
    },
    holdingsList: {
      handler(nDatas, oldDatas) {
        let x = 0; let y = 0
        for (let i = 0; i < nDatas.length; i++) {
          if (!nDatas[i].floatProfitRise) {
            if (nDatas[i].tradeType === 1) {
              let m = (nDatas[i].lastPrice * 1 - nDatas[i].orderPrice * 1) * nDatas[i].integerPrecision
              let n = nDatas[i].pointBeatFloat * nDatas[i].integerPrecision
              nDatas[i].floatProfitRise = (m / n) * nDatas[i].pointPrice * nDatas[i].tradeModelRate * nDatas[i].tradeHands
            }
            if (nDatas[i].tradeType === 2) {
              let m = (nDatas[i].lastPrice * 1 - nDatas[i].orderPrice * 1) * nDatas[i].integerPrecision
              let n = nDatas[i].pointBeatFloat * nDatas[i].integerPrecision
              nDatas[i].floatProfitFall = (m / n) * nDatas[i].pointPrice * nDatas[i].tradeModelRate * nDatas[i].tradeHands * -1
            }
          }
          if (nDatas[i].floatProfitRise) {
            let a = Decimal.mul(nDatas[i].floatProfitRise, nDatas[i].targetCurrencyRatio)
            x = Decimal.add(x, a)
          }
          if (nDatas[i].floatProfitFall) {
            let a = Decimal.mul(nDatas[i].floatProfitFall, nDatas[i].targetCurrencyRatio)
            y = Decimal.add(y, a)
          }
        }
        this.sum = Decimal.add(x, y).toFixed(2)
        this.knowData = nDatas
      },
      deep: true
    },
    updateLossPion(nData) {
      if (nData) {
        Hub.$emit('openBox', {
          popupVisible: false,
          data: ''
        })
        this.loadFrist()
      }
    },
    marketList(nData) {
      let data = msg.MessageBase.deserializeBinary(nData).array[6]
      if (!data || !data.length) {
        return false
      }
      if (this.knowData && this.knowData.length) {
        for (let i = 0; i < this.knowData.length; i++) {
          let marketData = this.knowData[i]
          if (marketData.commodityCode === data[0][1] && marketData.contractCode === data[0][2]) {
            marketData.lastPrice = data[0][3]
            marketData.askPrice = data[0][10]
            marketData.bidPrice = data[0][8]
            if (marketData.tradeType === 1) {
              let rise = (((data[0][10] - marketData.orderPrice) * marketData.integerPrecision) /
                  (marketData.pointBeatFloat * marketData.integerPrecision) *
                  marketData.pointPrice) *
                marketData.tradeModelRate *
                marketData.tradeHands
              marketData.floatProfitRise = rise.toFixed(2)
            }
            if (marketData.tradeType === 2) {
              let fall = (((marketData.orderPrice - data[0][8]) * marketData.integerPrecision) /
                  (marketData.pointBeatFloat * marketData.integerPrecision) * marketData.pointPrice) *
                marketData.tradeModelRate *
                marketData.tradeHands
              marketData.floatProfitFall = fall.toFixed(2)
            }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getCashPosit',
      'backHand',
      'backHandIntegral',
      'backHandImitate',
      'eveningUp',
      'eveningUpIntegral',
      'eveningUpImitate',
      'canlcaAlls',
      'canlca_ScoreAlls',
      'canlcaImitateAlls',
      'getIntegralPosit',
      'getImitatePosit'
    ]),
    // 下拉刷新
    refresh(done) {
      if (this.isIntegral === 0) {
        this.refreshCash(done)
        return
      }
      if (this.isIntegral === 1) {
        this.refreshIntegral(done)
        return
      }
      if (this.isIntegral === 2) {
        this.refreshImitate(done)
      }
    },
    // 刷新现金持仓
    refreshCash(done) {
      const _that = this
      if (this.flat) {
        this.getCashPosit({
          pageNo: this.page,
          pageSize: this.pageSize,
          tradeStatus: 1
        }).then(res => {
          this.numberHeight()
          done()
        }).catch(err => {
          done()
          _that.$toast({
            message: err,
            position: 'middle',
            duration: 1500
          })
        })
        _that.flat = false
        setTimeout(() => {
          _that.flat = true
        }, 1000)
      }
    },
    // 刷新积分持仓
    refreshIntegral(done) {
      const _that = this
      if (this.flat) {
        this.getIntegralPosit({
          pageNo: this.page,
          pageSize: this.pageSize,
          tradeStatus: 1
        }).then(res => {
          this.numberHeight()
          done()
        }).catch(err => {
          done()
          _that.$toast({
            message: err,
            position: 'middle',
            duration: 1500
          })
        })
        _that.flat = false
        setTimeout(() => {
          _that.flat = true
        }, 1000)
      }
    },
    // 刷新模拟持仓
    refreshImitate(done) {
      const _that = this
      if (this.flat) {
        this.getImitatePosit({
          pageNo: this.page,
          pageSize: this.pageSize,
          tradeStatus: 1
        }).then(res => {
          this.numberHeight()
          done()
        }).catch(err => {
          done()
          _that.$toast({
            message: err,
            position: 'middle',
            duration: 1500
          })
        })
        _that.flat = false
        setTimeout(() => {
          _that.flat = true
        }, 1000)
      }
    },
    // 进入加载
    loadFrist() {
      if (this.isIntegral === 0) {
        // this.$store.dispatch('showLoading')
        this.cashHildings()
        return
      }
      if (this.isIntegral === 1) {
        // this.$store.dispatch('showLoading')
        this.IntegralHildings()
        return
      }
      if (this.isIntegral === 2) {
        // this.$store.dispatch('showLoading')
        this.ImitateHildings()
      }
    },
    // 现金加载
    cashHildings() {
      this.getCashPosit({
        pageNo: this.page,
        pageSize: this.pageSize,
        tradeStatus: 1
      }).then(res => {
        // this.$store.dispatch('hideLoading')
        this.clearTimer()
        if (this && this._isDestroyed) return
        this.cashTimer = setInterval(() => {
          this.cashHildings()
        }, 3000)
        this.numberHeight()
      }).catch(() => {
        // this.$store.dispatch('hideLoading')
        this.clearTimer()
        if (this && this._isDestroyed) return
        this.cashTimer = setInterval(() => {
          this.cashHildings()
        }, 3000)
      })
    },
    // 积分加载
    IntegralHildings() {
      this.getIntegralPosit({
        pageNo: this.page,
        pageSize: this.pageSize,
        tradeStatus: 1
      }).then(res => {
        // this.$store.dispatch('hideLoading')
        this.clearTimer()
        if (this && this._isDestroyed) return
        this.IntegralTimer = setInterval(() => {
          this.IntegralHildings()
        }, 3000)
        this.numberHeight()
      }).catch(() => {
        // this.$store.dispatch('hideLoading')
        this.clearTimer()
        if (this && this._isDestroyed) return
        this.IntegralTimer = setInterval(() => {
          this.IntegralHildings()
        }, 3000)
      })
    },
    // 模拟加载
    ImitateHildings() {
      this.getImitatePosit({
        pageNo: this.page,
        pageSize: this.pageSize,
        tradeStatus: 1
      }).then(res => {
        this.clearTimer()
        // this.$store.dispatch('hideLoading')
        if (this && this._isDestroyed) return
        this.imitateTimer = setInterval(() => {
          this.ImitateHildings()
        }, 3000)
        this.numberHeight()
      }).catch(() => {
        // this.$store.dispatch('hideLoading')
        this.clearTimer()
        if (this && this._isDestroyed) return
        this.imitateTimer = setInterval(() => {
          this.ImitateHildings()
        }, 3000)
      })
    },
    // 反手
    backhand(e, item) {
      let price = 0
      if (item.tradeType === 2) {
        price = item.askPrice // 涨价
      } else {
        price = item.bidPrice // 跌价
      }
      if (price === 0) {
        MessageBox.alert('暂无最新价格').then(action => {
          return false
        })
      }
      if (this.isIntegral === 0 && price) {
        this.toast && this.toast.close()
        MessageBox.confirm('确认要反手?').then(action => {
          this.$store.dispatch('showLoading')
          this.backHand({
            orderNo: item.orderNo,
            orderPrice: price
          }).then(res => {
            this.$store.dispatch('hideLoading')
            if (res.status) {
              this.loadFrist()
              this.toast = Toast({
                message: '反手成功',
                duration: 1000
              })
            }
          }).catch(err => {
            this.$store.dispatch('hideLoading')
            return err
          })
        }).catch(() => {})
      }
      if (this.isIntegral === 1 && price) {
        this.toast && this.toast.close()
        MessageBox.confirm('确认要反手?').then(action => {
          this.$store.dispatch('showLoading')
          this.backHandIntegral({
            orderNo: item.orderNo,
            orderPrice: price
          }).then(res => {
            this.$store.dispatch('hideLoading')
            if (res.status) {
              this.loadFrist()
              this.toast = Toast({
                message: '反手成功',
                duration: 1000
              })
            }
          }).catch(err => {
            this.$store.dispatch('hideLoading')
            return err
          })
        }).catch(() => {})
      }
      if (this.isIntegral === 2 && price) {
        this.toast && this.toast.close()
        MessageBox.confirm('确认要反手?').then(action => {
          this.$store.dispatch('showLoading')
          this.backHandImitate({
            orderNo: item.orderNo,
            orderPrice: price
          }).then(res => {
            this.$store.dispatch('hideLoading')
            if (res.status) {
              this.loadFrist()
              this.toast = Toast({
                message: '反手成功',
                duration: 1000
              })
            }
          }).catch(err => {
            this.$store.dispatch('hideLoading')
            return err
          })
        }).catch(() => {})
      }
    },
    // 平仓单个
    eveningUps(e, item) {
      const _that = this
      if (this.isIntegral === 0) {
        MessageBox.confirm('确定要平仓?').then(action => {
          _that.$store.dispatch('showLoading')
          _that.eveningUp({
            orderNo: item.orderNo
          }).then(res => {
            _that.$store.dispatch('hideLoading')
            if (res.status) {
              MessageBox.alert('平仓成功').then(action => {
                setTimeout(() => {
                  _that.loadFrist()
                }, 500)
              })
            }
          }).catch(err => {
            _that.$store.dispatch('hideLoading')
            _that.$toast({
              message: err,
              position: 'middle',
              duration: 1500
            })
          })
        }).catch(() => {})
      }
      if (this.isIntegral === 1) {
        MessageBox.confirm('确定要平仓?').then(action => {
          _that.$store.dispatch('showLoading')
          _that.eveningUpIntegral({
            orderNo: item.orderNo
          }).then(res => {
            _that.$store.dispatch('hideLoading')
            if (res.status) {
              MessageBox.alert('平仓成功').then(action => {
                setTimeout(() => {
                  _that.loadFrist()
                }, 500)
              })
            }
          }).catch(err => {
            _that.$store.dispatch('hideLoading')
            _that.$toast({
              message: err,
              position: 'middle',
              duration: 1500
            })
          })
        }).catch(() => {})
      }
      if (this.isIntegral === 2) {
        MessageBox.confirm('确定要平仓?').then(action => {
          _that.$store.dispatch('showLoading')
          _that.eveningUpImitate({
            orderNo: item.orderNo
          }).then(res => {
            _that.$store.dispatch('hideLoading')
            if (res.status) {
              MessageBox.alert('平仓成功').then(action => {
                setTimeout(() => {
                  _that.loadFrist()
                }, 500)
              })
            }
          }).catch(err => {
            _that.$store.dispatch('hideLoading')
            _that.$toast({
              message: err,
              position: 'middle',
              duration: 1500
            })
          })
        }).catch(() => {})
      }
    },
    // 平仓所有
    quickEveningUp() {
      const _that = this
      const da = {}
      if (this.isIntegral === 0 && this.clickStatus) {
        MessageBox.confirm('确定平仓所有现金持仓?').then(action => {
          if (action) {
            this.clickStatus = false
            _that.$store.dispatch('showLoading')
            _that.canlcaAlls(da).then(res => {
              _that.$store.dispatch('hideLoading')
              if (res.status) {
                MessageBox.alert('平仓成功').then(action => {
                  _that.loadFrist()
                  this.clickStatus = true
                })
              }
            }).catch(err => {
              _that.$store.dispatch('hideLoading')
              this.clickStatus = true
              return err
            })
          }
        }).catch(() => {})
      }
      if (this.isIntegral === 1 && this.clickStatus) {
        MessageBox.confirm('确定平仓所有积分持仓?').then(action => {
          if (action) {
            this.clickStatus = false
            _that.$store.dispatch('showLoading')
            _that.canlca_ScoreAlls(da).then(res => {
              _that.$store.dispatch('hideLoading')
              if (res.status) {
                MessageBox.alert('平仓成功').then(action => {
                  _that.loadFrist()
                  this.clickStatus = true
                })
              }
            }).catch(err => {
              _that.$store.dispatch('hideLoading')
              this.clickStatus = true
              return err
            })
          }
        }).catch(() => {})
      }
      if (this.isIntegral === 2 && this.clickStatus) {
        MessageBox.confirm('确定平仓所有模拟持仓?').then(action => {
          if (action) {
            this.clickStatus = false
            _that.$store.dispatch('showLoading')
            _that.canlcaImitateAlls(da).then(res => {
              _that.$store.dispatch('hideLoading')
              if (res.status) {
                MessageBox.alert('平仓成功').then(action => {
                  _that.loadFrist()
                  this.clickStatus = true
                })
              }
            }).catch(err => {
              _that.$store.dispatch('hideLoading')
              this.clickStatus = true
              return err
            })
          }
        }).catch(() => {})
      }
    },
    // 处理请求刷新
    updatePage(val) {
      this.updateLossPion = val
    },
    // 传值
    setUpLoss(e, item) {
      let val = {
        data: item,
        popupVisible: true
      }
      Hub.$emit('openBox', val)
      this.$store.dispatch('lossBox', true)
    },
    timer(type, t) {
      let updateTime = moment(t * 1000).format('YYYY-MM-DD HH:mm:ss')
      return updateTime
    },
    foxedNum(num) {
      return utils.toFixedRandom(num)
    },
    // 计算高度
    numberHeight() {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_holdings.getBoundingClientRect().top
    },
    clearTimer() {
      clearInterval(this.cashTimer)
      clearInterval(this.IntegralTimer)
      clearInterval(this.imitateTimer)
    },
    // 专门处理精度问题
    fixNumLen(m, n, x, y, z) { // x, n, x, y代表四个参数
      let num = (new Decimal(m).add(n)).mul(x).mul(y).mul(z).toFixed(2)
      return num
    }
  },
  beforeDestroy() {
    this.toast && this.toast.close()
    this.clearTimer()
  }
}
