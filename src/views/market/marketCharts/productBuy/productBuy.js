import HeaderView from '@/components/layout/header'
import {msg} from '@/assets/js/proto-helper'
import {mapGetters, mapActions} from 'vuex'
import {Toast} from 'mint-ui'
import {getLocal, getSession} from '@/utils/storage'
import popup from '@/components/public/popup/index'
import {Decimal} from 'decimal.js'
export default {
  props: {
    title: [Number]
    // productBayShow: [Boolean]
  },
  components: {
    HeaderView,
    popup
  },
  data() {
    return {
      isModalVisible1: false,
      isModalVisible2: false,
      isModalVisible3: false,
      modelActive: 0,
      lossActive: 0,
      stopProfitActive: 0,
      buyType: 0,
      popupVisible: false,
      paramsValue: {},
      orderModel: [],
      query: this.$route.query,
      orderId: this.title,
      modelNum: {},
      buyPrice: 0,
      sellPrice: 0,
      addNums: 1,
      stopLossFee: 0,
      stopProfitFee: 0,
      desigPrice: 0,
      diyan: false,
      toast: null
    }
  },
  watch: {
    sockets(newData, oldData) {
      // const _that = this
      this.sockets.onreconnect = (e) => {
        console.log('reconnecting..')
      }
      this.sockets.onerror = (e) => {
        console.log('connect err')
      }
    },
    marketList(newDatas) {
      let data = msg.MessageBase.deserializeBinary(newDatas).array[5]
      if (!data) {
        return false
      }
      this.buyPrice = data[13] * 1
      this.sellPrice = data[3] * 1
    }
  },
  mounted() {
    // const das = {
    //   templateCode: this.query.tpCode,
    //   commodityCode: this.query.commodityCode
    // }
    this.modelOnclick(this.orderModel[0], 0)
    let idType = this.$route.params.id === 'buyMuch'
    if (idType) {
      this.buyPrice = this.singleGoods.askPrice
    } else {
      this.sellPrice = this.singleGoods.bidPrice
    }
    // this.getInfoBuss(das)
  },
  computed: {
    ...mapGetters([
      'marketList',
      'sockets',
      'buyBussInfo',
      'singleGoods',
      'tradeBanlance'
    ]),
    dimeModes() {
      let data = this.buyBussInfo
      let da = [{
        title: '元模式',
        num: 1,
        type: 0
      }, {
        title: '角模式',
        num: 0.1,
        type: 1
      }]
      if (data.dimeMode === 0 || data.walletType === 2) {
        da.filter((item, idx) => {
          if (item.type === 1) {
            da.splice(idx, 1)
          }
        })
      }
      this.orderModel = da
      return this.orderModel
    },
    getCloseTime() {
      let time = this.buyBussInfo
      return time ? time.closeTime : '05:58'
    },
    pageTitle() {
      return this.title ? '买多' : '卖空'
    },
    getNeworderId() {
      return this.title ? 1 : 2
    },
    buyPrices() {
      return this.buyPrice ? this.formatPoint(this.buyPrice) : this.buyPrice
    },
    sellFixeds() {
      return this.sellPrice ? this.formatPoint(this.sellPrice) : this.sellPrice
    },
    getQuotaInfo() {
      let data = this.buyBussInfo
      if (data.tradeHandsUnit) {
        let num = data.tradeHandsUnit.split(',')
        let v = []
        for (let i in num) {
          v.push({
            cName: `${num[i]}手`,
            num: num[i] * 1
          })
        }
        return v
      }
    },
    stopLossAmount() {
      let data = this.buyBussInfo
      if (data.gearInfo) {
        let amount = typeof data.gearInfo === 'string' ? JSON.parse(data.gearInfo) : data.gearInfo
        let k = []
        for (let i in amount) {
          let key = Object.keys(amount[i])
          let arr = key[0] * this.modelNum.num
          let md = this.modelNum.type === 0 ? JSON.stringify(arr) : arr.toFixed(1)
          let arrn = new Array(md)
          k = k.concat(arrn)
        }
        this.lossClick(k[0])
        return k
      }
      return []
    },
    stopProfitMount() {
      let data = this.buyBussInfo
      if (data.gearInfo) {
        let amount = typeof data.gearInfo === 'string' ? JSON.parse(data.gearInfo) : data.gearInfo
        let m = []
        for (let i in amount) {
          let key = Object.keys(amount[i])
          let modelAmount = key[0] * this.modelNum.num
          if (modelAmount === this.stopLossFee * 1) {
            for (let j in amount[i]) {
              let arr = amount[i][j]
              for (let k in arr) {
                let arrs = arr[k] * this.modelNum.num
                let md = this.modelNum.type === 0 ? JSON.stringify(arrs) : arrs.toFixed(1)
                let arrn = new Array(md)
                m = m.concat(arrn)
              }
            }
          }
        }
        this.stopProfitClick(m[0])
        return m
      }
    },
    bailAmount() {
      let data = this.buyBussInfo
      let otherNum
      if (this.modelNum.type === 0) {
        otherNum = this.stopLossFee * 1
      } else {
        otherNum = this.stopLossFee * 10
      }
      if (data.securityDepositBuffer && otherNum) {
        let moneys = (otherNum + data.securityDepositBuffer * 1) * this.addNums * data.ratio * this.modelNum.num
        return this.modelNum.type === 0 ? moneys : moneys.toFixed(1) + '元'
      }
      return '-'
    },
    comprehensiveCost() {
      let data = this.buyBussInfo
      if (data.securityDepositBuffer) {
        let moneys = ((data.fee * this.addNums) * data.ratio) * this.modelNum.num
        return this.modelNum.type === 0 ? moneys : moneys.toFixed(1) + '元'
      }
      return '-'
    },
    deferredFee() {
      let data = this.buyBussInfo
      if (data.overnightFee) {
        let moneys = ((data.overnightFee * this.addNums) * data.ratio) * this.modelNum.num
        return this.modelNum.type === 0 ? moneys : moneys.toFixed(1) + '元'
      }
      return 0
    },
    getOverNight() {
      const overNight = getSession('merchantInfo').merchantSetting.overNight
      return overNight
    }
  },
  methods: {
    ...mapActions(['openLink', 'tradeBalances']),
    // 精度
    formatPoint(price) {
      let point = this.buyBussInfo.priceDecimalPlaces
      if (price && point) {
        return price.toFixed(point)
      } else {
        return price
      }
    },
    // 递延
    changeDiyan() {},
    // 打开模态框
    openModal1() {
      this.isModalVisible1 = true
    },
    openModal2() {
      this.isModalVisible2 = true
    },
    openModal3() {
      this.isModalVisible3 = true
    },
    // 关闭模态框
    closeModal1() {
      this.isModalVisible1 = false
    },
    closeModal2() {
      this.isModalVisible2 = false
    },
    closeModal3() {
      this.isModalVisible3 = false
    },
    // 跳转到持仓
    linkToPosition() {
      this.toast && this.toast.close()
      this.$router.push('/trade?id=1')
    },
    onClickNum(e, item, idx) {
      this.addNums = item.num
    },
    modelOnclick(item, idx) {
      this.modelActive = idx
      this.modelNum = item
    },
    lossClick(item, idx = 0) {
      this.stopLossFee = item
      this.lossActive = idx
    },
    stopProfitClick(item, idx = 0) {
      this.stopProfitFee = item
      this.stopProfitActive = idx
    },
    cutBacks() {
      let numDas = this.getQuotaInfo[0]
      if (this.addNums > numDas.num) {
        this.addNums--
      }
    },
    addNumbers() {
      let numDas = this.getQuotaInfo[this.getQuotaInfo.length - 1]
      if (this.addNums < numDas.num) {
        this.addNums++
      }
    },
    goBacks() {
      this.toast && this.toast.close()
      this.$emit('closeBuyMenu', true)
    },
    marketIn() {
      let das = {
        price: this.title ? this.buyPrice : this.sellPrice,
        orderType: 0
      }
      switch (this.buyBussInfo.walletType) {
        case 1:
          das.orderType = 1
          break
        case 2:
          das.orderType = 2
          break
        case 3:
          das.orderType = 3
          break
      }
      this.submitParams(das)
    },
    manually() {
      let das = {
        price: this.desigPrice,
        orderType: 0
      }
      switch (this.buyBussInfo.walletType) {
        case 1:
          das.orderType = 1
          break
        case 2:
          das.orderType = 2
          break
        case 3:
          das.orderType = 3
          break
      }
      this.submitParams(das)
    },
    // 购买弹出
    marketPrice() {
      let das = {
        CommodityName: this.$route.query.CommodityName,
        modelNum: this.modelNum.title,
        orderPrice: this.title ? this.buyPrice : this.sellPrice,
        addNums: this.addNums,
        stopLossFee: this.stopLossFee * this.addNums * 1,
        stopProfitFee: this.stopProfitFee * this.addNums
      }
      if (!das.orderPrice) {
        Toast({
          message: '请等待最新价',
          duration: 2000
        })
        return
      }
      this.buyType = 0
      this.paramsValue = das
      this.toast && this.toast.close()
      this.marketIn()
    },
    // 购买弹出
    designationPrice() {
      let das = {
        CommodityName: this.$route.query.CommodityName,
        modelNum: this.modelNum.title,
        addNums: this.addNums,
        stopLossFee: this.stopLossFee * 1,
        stopProfitFee: this.stopProfitFee
      }
      this.desigPrice = this.title ? this.buyPrice : this.sellPrice
      if (!this.desigPrice) {
        this.toast = Toast({
          message: '请等待最新价',
          duration: 2000
        })
        return
      }
      this.buyType = 1
      this.paramsValue = das
      this.toast && this.toast.close()
      this.popupVisible = true
    },
    // 关闭弹出
    closePopup(item) {
      this.popupVisible = false
    },
    cancel() {
      this.popupVisible = false
    },
    // 指定价减
    cutNum() {
      if (this.buyBussInfo) {
        this.desigPrice = new Decimal(this.desigPrice).sub(this.buyBussInfo.pointBeatFloat).toNumber()
      }
    },
    // 指定价加
    increase() {
      if (this.buyBussInfo) {
        this.desigPrice = new Decimal(this.desigPrice).add(this.buyBussInfo.pointBeatFloat).toNumber()
      }
    },
    // 下单信息
    submitParams(data) {
      let das = {
        lossAmount: this.modelNum.type === 1 ? this.stopLossFee * 10 : this.stopLossFee,
        tradeHands: this.addNums,
        profitAmount: this.modelNum.type === 1 ? this.stopProfitFee * 10 : this.stopProfitFee,
        orderType: data.orderType,
        merchantCode: getLocal('userInfo').merchantCode,
        templateCode: this.$route.query.tpCode,
        commodityCode: this.$route.query.commodityCode,
        contractCode: this.$route.query.contractCode,
        tradeModel: this.modelNum.type,
        tradeType: this.getNeworderId,
        orderPrice: data.price,
        overnightStatus: this.diyan ? 1 : 0
      }
      switch (das.orderType) {
        case 1:
          if (this.buyType === 0) {
            this.submitOrderAPI(das)
          } else {
            this.entrustsOrder(das)
          }
          break
        case 2:
          if (this.buyType === 0) {
            this.submitSimulationOrder(das)
          } else {
            this.appointSimulationOrder(das)
          }
          break
        case 3:
          if (this.buyType === 0) {
            this.imitateOrder(das)
          } else {
            this.appointImitateOrder(das)
          }
      }
    },
    // 市价现金下单
    submitOrderAPI(das) {
      const _that = this
      // const datas = {
      //   templateCode: this.$route.query.tpCode,
      //   commodityCode: this.$route.query.commodityCode
      // }
      if (this.tradeBanlance) {
        _that.$store.dispatch('showLoading')
        _that.$store.dispatch('goSubmitOrder', das).then(res => {
          _that.$store.dispatch('hideLoading')
          if (res.status) {
            // this.getInfoBuss(datas)
            this.toast = Toast({
              message: '开仓成功',
              position: 'middle',
              iconClass: 'mintui mintui-success',
              duration: 300
            })
            setTimeout(() => {
              // _that.toast && _that.toast.close()
              this.$router.push('/trade?id=1')
            }, 500)
          }
        }).catch(err => {
          _that.$store.dispatch('hideLoading')
          this.toast = Toast({
            message: err.msg,
            position: 'middle',
            duration: 500
          })
        })
      } else {
        this.toast = Toast({
          message: '您的可用余额不足,请充值',
          duration: 500
        })
      }
    },
    // 市价模拟下单
    imitateOrder(das) {
      const _that = this
      // const datas = {
      //   templateCode: this.query.tpCode,
      //   commodityCode: this.query.commodityCode
      // }
      if (this.tradeBanlance) {
        _that.$store.dispatch('showLoading')
        _that.$store.dispatch('ImitateOrder', das).then(res => {
          _that.$store.dispatch('hideLoading')
          if (res.status) {
            // this.getInfoBuss(datas)
            this.toast = Toast({
              message: '开仓成功',
              position: 'middle',
              iconClass: 'mintui mintui-success',
              duration: 300
            })
            setTimeout(() => {
              this.$router.push('/trade?id=1')
            }, 500)
          }
        }).catch(err => {
          _that.$store.dispatch('hideLoading')
          this.toast = Toast({
            message: err.msg,
            position: 'middle',
            duration: 500
          })
        })
      } else {
        this.toast = Toast({
          message: '您的可用余额不足,请充值',
          duration: 500
        })
      }
    },
    // 市价积分下单
    submitSimulationOrder(das) {
      const _that = this
      // const datas = {
      //   templateCode: this.query.tpCode,
      //   commodityCode: this.query.commodityCode
      // }
      if (this.tradeBanlance) {
        _that.$store.dispatch('showLoading')
        _that.$store.dispatch('IntegralOrder', das).then(res => {
          _that.$store.dispatch('hideLoading')
          if (res.status) {
            // this.getInfoBuss(datas)
            this.toast = Toast({
              message: '开仓成功',
              position: 'middle',
              iconClass: 'mintui mintui-success',
              duration: 300
            })
            setTimeout(() => {
              this.$router.push('/trade?id=1')
            }, 500)
          }
        }).catch(err => {
          _that.$store.dispatch('hideLoading')
          this.toast = Toast({
            message: err.msg,
            position: 'middle',
            duration: 500
          })
        })
      } else {
        this.toast = Toast({
          message: '您的可用余额不足,请充值',
          duration: 500
        })
      }
    },
    // 现金指定价下单
    entrustsOrder(das) {
      const _that = this
      // const datas = {
      //   templateCode: this.query.tpCode,
      //   commodityCode: this.query.commodityCode
      // }
      if (this.tradeBanlance) {
        _that.$store.dispatch('showLoading')
        _that.$store.dispatch('goEntrustsOrder', das).then(res => {
          _that.$store.dispatch('hideLoading')
          if (res.status) {
            // this.getInfoBuss(datas)
            this.toast = Toast({
              message: '委托成功',
              position: 'middle',
              iconClass: 'mintui mintui-success',
              duration: 300
            })
            setTimeout(() => {
              this.$router.push('/trade?id=1')
            }, 500)
          }
        }).catch(err => {
          _that.$store.dispatch('hideLoading')
          this.toast = Toast({
            message: err.msg,
            position: 'middle',
            duration: 500
          })
        })
      } else {
        this.toast = Toast({
          message: '您的可用余额不足,请充值',
          duration: 500
        })
      }
    },
    // 指定价积分下单
    appointSimulationOrder(das) {
      const _that = this
      // const datas = {
      //   templateCode: this.query.tpCode,
      //   commodityCode: this.query.commodityCode
      // }
      if (this.tradeBanlance) {
        _that.$store.dispatch('showLoading')
        _that.$store.dispatch('goSimulationOrder', das).then(res => {
          _that.$store.dispatch('hideLoading')
          if (res.status) {
            // this.getInfoBuss(datas)
            this.toast = Toast({
              message: '委托成功',
              position: 'middle',
              iconClass: 'mintui mintui-success',
              duration: 300
            })
            setTimeout(() => {
              this.$router.push('/trade?id=1')
            }, 500)
          }
        }).catch(err => {
          _that.$store.dispatch('hideLoading')
          this.toast = Toast({
            message: err.msg,
            position: 'middle',
            duration: 500
          })
        })
      } else {
        this.toast = Toast({
          message: '您的可用余额不足,请充值',
          duration: 500
        })
      }
    },
    // 指定价模拟下单
    appointImitateOrder(das) {
      const _that = this
      // const datas = {
      //   templateCode: this.query.tpCode,
      //   commodityCode: this.query.commodityCode
      // }
      if (this.tradeBanlance) {
        _that.$store.dispatch('showLoading')
        _that.$store.dispatch('goImitateOrder', das).then(res => {
          _that.$store.dispatch('hideLoading')
          if (res.status) {
            // this.getInfoBuss(datas)
            this.toast = Toast({
              message: '委托成功',
              position: 'middle',
              iconClass: 'mintui mintui-success',
              duration: 300
            })
            setTimeout(() => {
              this.$router.push('/trade?id=1')
            }, 500)
          }
        }).catch(err => {
          _that.$store.dispatch('hideLoading')
          this.toast = Toast({
            message: err.msg,
            position: 'middle',
            duration: 500
          })
        })
      } else {
        this.toast = Toast({
          message: '您的可用余额不足,请充值',
          duration: 500
        })
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== 'charts') {
      this.$store.dispatch('closeScoket')
    }
    next()
  }
}
