import Popup from '@/components/public/popup/index'
import Hub from '@/utils/hub'
import { Decimal } from 'decimal.js'
import { msg } from '@/assets/js/proto-helper'
import { mapActions, mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
export default {
  name: 'setUpStopLoss',
  components: {
    Popup
  },
  data() {
    return {
      popupVisible: false,
      disabled: true,
      knowData: {},
      lossPrice: 0,
      profitPrice: 0,
      profitPrice1: 0,
      lossAmount: 0,
      lossAmount1: 0,
      profitAmount: 0,
      profitAmount1: 0,
      profitMax: 0,
      mt1: 0,
      mt2: 0,
      msgBox: null
    }
  },
  watch: {
    marketList(nData) {
      let data = msg.MessageBase.deserializeBinary(nData).array[6]
      if (!data || !data.length) {
        return false
      }
      if (this.popupVisible === true) {
        if (this.knowData.commodityCode === data[0][1]) {
          this.knowData.lastPrice = data[0][3]
        }
      }
    }
  },
  created() {
    Hub.$on('openBox', v => {
      if (v.data !== '') {
        let profitData = v.data.profitGearAmountUnit
        this.knowData = v.data
        this.lossPrice = v.data.lossPrice
        this.profitPrice = v.data.profitPrice
        this.profitPrice1 = v.data.profitPrice
        this.lossAmount = v.data.lossAmount
        this.lossAmount1 = v.data.lossGearAmount
        this.profitAmount = v.data.profitAmount
        this.profitAmount1 = v.data.profitAmount
        let formartProfit = JSON.parse(profitData)
        this.profitMax = formartProfit[formartProfit.length - 1]
      }
      this.popupVisible = v.popupVisible
    })
  },
  computed: {
    ...mapGetters(['marketList', 'singleLoss', 'isIntegral']),
    get_LossPrice: {
      get() {
        if (this.lossPrice && this.lossPrice !== undefined) {
          this.mt1 = Decimal.mul(this.lossPrice, 100000).toNumber()
          return this.mt1
        }
      },
      set(newValue) {
        this.mt1 = newValue
      }
    },
    get_profitPrice: {
      get() {
        if (this.profitPrice && this.profitPrice !== undefined) {
          this.mt2 = Decimal.mul(this.profitPrice, 100000).toNumber()
          return this.mt2
        }
      },
      set(newValue) {
        this.mt2 = newValue
      }
    },
    setNewStep() {
      if (this.knowData.pointBeatFloat && this.knowData.pointBeatFloat !== undefined) {
        let num = Decimal.mul(this.knowData.pointBeatFloat, 100000).toNumber()
        return num
      }
    },
    lossPriceScope() {
      if (this.knowData.tradeType === 1) {
        if (
          this.knowData.lossGearAmount !== undefined &&
          this.knowData.pointPrice !== undefined &&
          this.knowData.pointBeatFloat !== undefined &&
          this.knowData.orderPrice !== undefined
        ) {
          let n = new Decimal(this.knowData.lossGearAmount)
            .div(this.knowData.pointPrice)
            .mul(this.knowData.pointBeatFloat)
          let num = new Decimal(this.knowData.orderPrice).sub(n)
          return num
        }
      }
    },
    otherLossPriceScope() {
      if (this.knowData.tradeType !== 1) {
        if (
          this.knowData.lossGearAmount !== undefined &&
          this.knowData.pointPrice !== undefined &&
          this.knowData.pointBeatFloat !== undefined &&
          this.knowData.orderPrice !== undefined
        ) {
          let n = new Decimal(this.knowData.lossGearAmount)
            .div(this.knowData.pointPrice)
            .mul(this.knowData.pointBeatFloat)
          let num = new Decimal(this.knowData.orderPrice).add(n)
          return num
        }
      }
    },
    setWinPriceSocpe() {
      if (
        this.profitMax !== undefined &&
        this.knowData.pointBeatFloat !== undefined &&
        this.knowData.pointPrice !== undefined &&
        this.knowData.orderPrice !== undefined
      ) {
        let n = new Decimal(this.profitMax)
          .div(this.knowData.pointPrice)
          .mul(this.knowData.pointBeatFloat)
        let num = new Decimal(this.knowData.orderPrice).add(n)
        return num
      }
    },
    otherSetWinPriceScope() {
      if (
        this.profitMax !== undefined &&
        this.knowData.pointBeatFloat !== undefined &&
        this.knowData.pointPrice !== undefined &&
        this.knowData.orderPrice !== undefined
      ) {
        let n = new Decimal(this.profitMax)
          .div(this.knowData.pointPrice)
          .mul(this.knowData.pointBeatFloat)
        let num = new Decimal(this.knowData.orderPrice).sub(n)
        return num
      }
    },
    minLossPrice() {
      if (this.knowData.tradeType === 1) {
        let n = new Decimal(this.knowData.lossGearAmount)
          .div(this.knowData.pointPrice)
          .mul(this.knowData.pointBeatFloat)
        let num = new Decimal(this.knowData.orderPrice).sub(n)
        return num * 100000
      } else {
        let num = this.knowData.orderPrice
        return num * 100000
      }
    },
    min_profitPrice() {
      if (this.knowData.tradeType === 1) {
        let num = this.knowData.orderPrice
        return num * 100000
      } else {
        if (
          this.profitMax !== undefined &&
          this.knowData.pointBeatFloat !== undefined &&
          this.knowData.pointPrice !== undefined &&
          this.knowData.orderPrice !== undefined
        ) {
          let n = new Decimal(this.profitMax)
            .div(this.knowData.pointPrice)
            .mul(this.knowData.pointBeatFloat)
          let num = new Decimal(this.knowData.orderPrice).sub(n)
          return num * 100000
        }
      }
    },
    maxLossPrice() {
      if (this.knowData.tradeType === 1) {
        let num = this.knowData.orderPrice
        return num * 100000
      } else {
        if (
          this.knowData.lossGearAmount !== undefined &&
          this.knowData.pointPrice !== undefined &&
          this.knowData.pointBeatFloat !== undefined &&
          this.knowData.orderPrice !== undefined
        ) {
          let n = new Decimal(this.knowData.lossGearAmount)
            .div(this.knowData.pointPrice)
            .mul(this.knowData.pointBeatFloat)
          let num = new Decimal(this.knowData.orderPrice).add(n)
          return num * 100000
        }
      }
    },
    max_profitPrice() {
      if (this.knowData.tradeType === 1) {
        if (
          this.profitMax !== undefined &&
          this.knowData.pointBeatFloat !== undefined &&
          this.knowData.pointPrice !== undefined &&
          this.knowData.orderPrice !== undefined
        ) {
          let n = new Decimal(this.profitMax)
            .div(this.knowData.pointPrice)
            .mul(this.knowData.pointBeatFloat)
          let num = new Decimal(this.knowData.orderPrice).add(n)
          return num * 100000
        }
      } else {
        let num = this.knowData.orderPrice
        return num * 100000
      }
    }
  },
  methods: {
    ...mapActions([
      'updateLossPions',
      'updateLossPionsScore',
      'updateLossPionsImitate'
    ]),
    closePopup(val) {
      this.popupVisible = val
    },
    // 止损-
    lessLoss() {
      if (this.knowData.tradeType === 1) {
        if (this.lossAmount > 0) {
          this.lossPrice = new Decimal(this.lossPrice)
            .add(this.knowData.pointBeatFloat)
            .toNumber()
          this.lossAmount = Decimal.sub(this.lossAmount, this.knowData.pointPrice)
        }
      } else {
        if (this.lossAmount <= this.knowData.lossGearAmount) {
          if (this.lossAmount > 0) {
            this.lossPrice = new Decimal(this.lossPrice)
              .sub(this.knowData.pointBeatFloat)
              .toNumber()
            this.lossAmount = Decimal.sub(this.lossAmount, this.knowData.pointPrice)
          }
        }
      }
    },
    // 止损+
    addLoss() {
      if (this.knowData.tradeType === 1) {
        if (this.lossAmount < this.knowData.lossGearAmount) {
          this.lossPrice = new Decimal(this.lossPrice)
            .sub(this.knowData.pointBeatFloat)
            .toNumber()
          this.lossAmount = Decimal.add(this.lossAmount, this.knowData.pointPrice)
        }
      } else {
        if (this.lossAmount < this.knowData.lossGearAmount) {
          this.lossPrice = new Decimal(this.lossPrice)
            .add(this.knowData.pointBeatFloat)
            .toNumber()
          this.lossAmount = Decimal.add(this.lossAmount, this.knowData.pointPrice)
        }
      }
    },
    // 止盈-
    lessProfit() {
      if (this.knowData.tradeType === 1) {
        if (this.profitAmount > 0) {
          this.profitPrice = new Decimal(this.profitPrice)
            .sub(this.knowData.pointBeatFloat)
            .toNumber()
          this.profitAmount = Decimal.sub(this.profitAmount, this.knowData.pointPrice)
        }
      } else {
        if (this.profitAmount <= this.profitMax) {
          if (this.profitAmount > 0) {
            this.profitPrice = new Decimal(this.profitPrice)
              .add(this.knowData.pointBeatFloat)
              .toNumber()
            this.profitAmount = Decimal.sub(this.profitAmount, this.knowData.pointPrice)
          }
        }
      }
    },
    // 止盈+
    addProfit() {
      if (this.knowData.tradeType === 1) {
        if (this.profitAmount < this.profitMax) {
          this.profitPrice = new Decimal(this.profitPrice)
            .add(this.knowData.pointBeatFloat)
            .toNumber()
          this.profitAmount = Decimal.add(this.profitAmount, this.knowData.pointPrice)
        }
      } else {
        if (this.profitAmount < this.profitMax) {
          this.profitPrice = new Decimal(this.profitPrice)
            .sub(this.knowData.pointBeatFloat)
            .toNumber()
          this.profitAmount = Decimal.add(this.profitAmount, this.knowData.pointPrice)
        }
      }
    },
    // 手动输入止损
    inputlessLoss(event) {
      this.lossPrice = event / 100000
      if (this.knowData.tradeType === 1) {
      }
    },
    // 手动输入止损
    inputlessLoss1(event) {
      this.profitPrice = event / 100000
      if (this.knowData.tradeType === 1) {
      }
    },
    changelessLoss(event) {
      this.lossPrice = Decimal.div(event, 100000)
      this.lossAmount = this.lossAmount1
      if (this.knowData.tradeType === 1) {
        if (event > this.minLossPrice) {
          let n = Decimal.sub(event, this.minLossPrice)
          let num = Decimal.div(n, this.setNewStep)
          let x = Decimal.mul(this.knowData.pointPrice, num)
          this.lossAmount = Decimal.sub(this.lossAmount, x)
        }
      } else {
        if (this.maxLossPrice > event) {
          let n = Decimal.sub(this.maxLossPrice, event)
          let num = Decimal.div(n, this.setNewStep)
          let x = Decimal.mul(this.knowData.pointPrice, num)
          this.lossAmount = Decimal.sub(this.lossAmount, x)
        }
      }
    },
    changelessLoss1(event) {
      this.profitPrice = Decimal.div(event, 100000)
      this.profitAmount = this.profitAmount1
      if (this.knowData.tradeType === 1) {
        let n = Decimal.mul(this.profitPrice1, 100000)
        let m = Decimal.sub(n, event)
        let num = Decimal.div(m, this.setNewStep)
        num = Decimal.mul(num, 100000).toFixed(0)
        num = Decimal.div(num, 100000)
        let x = Decimal.mul(this.knowData.pointPrice, num)
        this.profitAmount = Decimal.sub(this.profitAmount, x)
      } else {
        let n = Decimal.mul(this.profitPrice1, 100000)
        let m = Decimal.sub(n, event)
        let num = Decimal.div(m, this.setNewStep)
        if (num > 0) {
          let x = Decimal.mul(this.knowData.pointPrice, num)
          this.profitAmount = Decimal.add(this.profitAmount, x)
        } else {
          let x = Decimal.mul(this.knowData.pointPrice, num)
          this.profitAmount = Decimal.add(this.profitAmount, x)
        }
      }
    },
    // 取消
    cancel() {
      this.popupVisible = false
      this.$store.dispatch('lossBox', false)
    },
    // 更新止盈止损
    submitUpdate() {
      let allData = this.knowData
      let das = {
        orderNo: allData.orderNo,
        commodityCode: allData.commodityCode,
        contractCode: allData.contractCode,
        lossAmount: Math.abs(this.lossAmount),
        profitAmount: this.profitAmount
      }
      if (
        this.knowData.floatProfitRise * 1 < 0 &&
        das.lossAmount * -1 > this.knowData.floatProfitRise * 1
      ) {
        this.msgBox = MessageBox.alert('止损点不能低于当前盈利金额范围')
        return false
      }
      if (
        this.knowData.floatProfitRise * 1 > 0 &&
        das.profitAmount * 1 < this.knowData.floatProfitRise * 1
      ) {
        this.msgBox = MessageBox.alert('止盈点不能低于当前盈利金额范围')
        return false
      }
      const _that = this
      _that.$store.dispatch('showLoading')
      if (this.isIntegral === 0) {
        _that
          .updateLossPions(das)
          .then(res => {
            _that.$store.dispatch('hideLoading')
            if (res.status) {
              this.popupVisible = false
              this.msgBox = MessageBox.alert('更新成功').then(action => {
                if (action) {
                  _that.$emit('updatePage', true)
                }
              })
            }
          })
          .catch(err => {
            this.$store.dispatch('hideLoading')
            return err
          })
        return
      }
      if (this.isIntegral === 1) {
        _that
          .updateLossPionsScore(das)
          .then(res => {
            _that.$store.dispatch('hideLoading')
            if (res.status) {
              this.popupVisible = false
              this.msgBox = MessageBox.alert('更新成功').then(action => {
                if (action) {
                  _that.$emit('updatePage', true)
                }
              })
            }
          })
          .catch(err => {
            this.$store.dispatch('hideLoading')
            return err
          })
        return
      }
      if (this.isIntegral === 2) {
        _that
          .updateLossPionsImitate(das)
          .then(res => {
            _that.$store.dispatch('hideLoading')
            if (res.status) {
              this.popupVisible = false
              this.msgBox = MessageBox.alert('更新成功').then(action => {
                if (action) {
                  _that.$emit('updatePage', true)
                }
              })
            }
          })
          .catch(err => {
            this.$store.dispatch('hideLoading')
            return err
          })
      }
    },
    toFixedRandom(num) {
      let y = String(num).indexOf('.') + 1
      let count = String(num).length - y
      if (y === 0 && count <= 5) {
        return num
      } else {
        return num.toFixed(1)
      }
    },
    fixNumLen_1(m, n, x) {
      if (m && m !== undefined && n && n !== undefined && x && x !== undefined) {
        let num = new Decimal(m).mul(n).mul(x)
        return num.toFixed(2)
      }
    }
  }
}
