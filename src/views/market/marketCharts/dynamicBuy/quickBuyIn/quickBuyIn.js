import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'quickBuy',
  props: {
    buyVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    buyVisible(newData, oldData) {
      if (!newData) {
        this.openNum = false
        this.openStopLoss = false
        // this.numLen = this.handlsUnits[0].values[0].num
        // this.stopLossMoney = this.dateStopLoss[0].values[0].num
      }
    },
    '$route'(to, from) {
      const das = {
        templateCode: to.query.tpCode,
        commodityCode: to.query.commodityCode
      }
      this.getBuyData(das)
    }
  },
  data() {
    return {
      handlsUnits: [{
        flex: 1,
        values: [{
          cname: '-',
          num: '-'
        }],
        className: 'slot1',
        textAlign: 'center'
      }],
      dateStopLoss: [{
        flex: 1,
        values: [{
          cname: '-',
          num: '-'
        }],
        className: 'slot1',
        textAlign: 'center'
      }],
      model_moneys: [],
      checks: true,
      disabled: true,
      buyData: {},
      numLen: 0,
      stopLossMoney: 0,
      profitMoney: 0,
      gearInfoMoneys: [],
      openNum: false,
      openStopLoss: false
    }
  },
  computed: {
    ...mapGetters(['buyBussInfo']),
    bail() {
      if (!this.buyData.securityDepositBuffer) {
        return '-'
      }
      let moneys = (this.stopLossMoney * 1 + this.buyData.securityDepositBuffer * 1) * this.numLen * this.buyData.ratio * this.model_moneys.num
      return this.model_moneys.type === 0 ? moneys : moneys.toFixed(1) + '元'
    },
    ComprehensiveCost() {
      if (!this.buyData.fee) {
        return '-'
      }
      let moneys = ((this.buyData.fee * this.numLen) * this.buyData.ratio) * this.model_moneys.num
      return this.model_moneys.type === 0 ? moneys : moneys.toFixed(1) + '元'
    }
  },
  created() {
    const das = {
      templateCode: this.$route.query.tpCode,
      commodityCode: this.$route.query.commodityCode
    }
    this.getBuyData(das)
  },
  methods: {
    ...mapActions(['tradeBalances']),
    closeMask() {
      this.openStopLoss = false
      this.openNum = false
    },
    tradeNum() {
      this.openNum = !this.openNum
      if (this.openStopLoss) {
        this.openStopLoss = false
      }
    },
    stopLoss() {
      this.openStopLoss = !this.openStopLoss
      if (this.openNum) {
        this.openNum = false
      }
    },
    checkBoxs(e, item) {
      this.checks = !this.checks
      if (this.checks) {
        this.model_moneys = {
          num: 1,
          title: '元模式',
          type: 0
        }
      } else {
        this.model_moneys = {
          num: 0.1,
          title: '角模式',
          type: 1
        }
      }
      this.buyDataNeed(this.buyBussInfo)
    },
    onChangeNum(picker, values) {
      if (!values[0]) {
        return false
      }
      this.numLen = values[0].num
    },
    onChangeStopMoney(picker, values) {
      if (!values[0]) {
        return false
      }
      if (this.gearInfoMoneys) {
        let gear = this.gearInfoMoneys
        for (let i in gear) {
          let gearList = gear[i][values[0].num]
          if (gearList) {
            this.profitMoney = gear[i][values[0].num][0]
          }
        }
      }
      this.stopLossMoney = values[0].num
    },
    getBuyData(das) {
      const _that = this
      this.handlsUnits[0].values = []
      this.dateStopLoss[0].values = []
      this.$store.dispatch('getBusInfo', das).then(rs => {
        if (rs.status) {
          this.tradeBalances()
          this.model_moneys = {
            num: 1,
            title: '元模式',
            type: 0
          }
          _that.buyData = rs.data
          _that.buyDataNeed(rs.data)
          if (rs.data.dimeMode === 0) {
            _that.disabled = true
          } else {
            _that.disabled = false
          }
        }
      }).catch(err => {
        this.$store.dispatch('hideLoading')
        return err
      })
    },
    buyDataNeed(d) {
      let v = []
      let ds = []
      if (d) {
        let buyNum = d.tradeHandsUnit.split(',')
        let gearInfoMoney = typeof d.gearInfo === 'string' ? JSON.parse(d.gearInfo) : []
        for (let i in buyNum) {
          v.push({
            cname: `${buyNum[i]}手`,
            num: buyNum[i] * 1
          })
        }
        for (let j in gearInfoMoney) {
          let nums = Object.keys(gearInfoMoney[j])[0]
          ds.push({
            cname: nums * this.model_moneys.num,
            num: nums
          })
        }
        this.numLen = v[0].num
        this.stopLossMoney = ds[0].num
        this.handlsUnits[0].values = v
        this.dateStopLoss[0].values = ds
        this.gearInfoMoneys = gearInfoMoney
      }
    },
    closeBuyNumber() {
      this.closeMask()
    },
    closeStopLoss() {
      this.closeMask()
    }
  }
}
