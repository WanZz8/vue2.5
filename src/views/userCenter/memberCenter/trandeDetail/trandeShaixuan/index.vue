<template>
  <div class="shaixuanBox">
    <div class="shaixuanList">
      <div class="trade_shaixuan"
           ref='trade_ModelBox'
           :style="{ height: (wrapperHeight-80) + 'px' }">
        <div class="trande_content">
          <div class="money_bag">
            <h3>钱包</h3>
            <ul>
              <li v-for="(item,idx) in allBanlances"
                  :key="item.walletType"
                  @click="walletBag($event,item,idx)"
                  v-show="item.walletType!==4"
                  :class="walletData.oIndex===item.oIndex?'active':''">{{item.walletType===1?'现金':item.walletType===2?'积分':'模拟'}}</li>
            </ul>
            <span style="clear:left;display:block"></span>
          </div>
          <div class="timer_date">
            <h3>日期</h3>
            <ul>
              <li v-for="item in timeList"
                  :key="item.status"
                  @click="getTimer($event,item)"
                  :class="dateIdx.status===item.status?'active':''">{{item.name}}</li>
              <li @click="customize"
                  :class="dateIdx.status===3?'active':''">{{typeof timerIndex.date=='number'?'自定义':timerIndex.date}}</li>
            </ul>
            <span style="clear:left;display:block"></span>
          </div>
          <div class="detail_type tradeTypesClassification">
            <h3>交易分类</h3>
            <ul>
              <li v-for="(item,idx) in getTradeDetailType"
                  :key="item.typeName"
                  v-show="item.level==2"
                  @click="tradeTypeSelect($event,item,idx)"
                  :class="tradeClassificationId===item.typeId?'active':''">{{item.description}}</li>
            </ul>
            <span style="clear:left;display:block"></span>
          </div>
          <div class="detail_type amountClassification">
            <h3>资金分类</h3>
            <ul>
              <li v-for="(item,idx) in getTradeDetailType"
                  :key="item.typeName"
                  v-show="item.level==1"
                  @click="amountTypeSelect($event,item,idx)"
                  :class="amountClassificationId===item.typeId?'active':''">{{item.description}}</li>
            </ul>
            <span style="clear:left;display:block"></span>
          </div>
          <div class="detail_type tradeTypes">
            <h3>交易类型</h3>
            <ul>
              <li v-for="(item,idx) in computeTradeType"
                  :key="item.typeName"
                  v-show="item.level==3"
                  :style="item.check?'backgroundColor:#f2f2f2;color:#666':'backgroundColor:#f8f8f8;color:#ccc'"
                  @click="onClicktradeTrade($event,item,idx)"
                  :class="tradeTypeIds===item.typeId?'active':''">{{item.description}}</li>
            </ul>
            <span style="clear:left;display:block"></span>
          </div>
        </div>
      </div>
      <div class="trande_shaxuanBtn">
        <button class="reclean shaixuan_btn"
                @click="reclean">重置</button>
        <button class="confrim shaixuan_btn"
                @click="confirm">确定</button>
      </div>
    </div>
    <div class="mask_swpers"
         v-show="conditionFlat"
         @click="closeMaskSwipers">
      <span class="close">
        <svg-icon icon-class="closeOff"></svg-icon>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'trandeDetailsNav',
  props: {
    conditionFlat: {
      type: Boolean,
      default: false
    },
    statusIndex: {
      type: Object,
      required: true
    },
    typeData: {
      type: [Array, Object]
    },
    timerIndex: {
      type: [Array, Object]
    },
    allBanlances: {
      type: [Array, Object]
    }
  },
  data () {
    return {
      walletData: {},
      dateIdx: {},
      tradeClassificationId: 0,
      amountClassificationId: 0,
      tradeTypeIds: 0,
      tradeType: {},
      startDouble: '',
      endDouble: '',
      zidingyiTime: '0',
      oldTime: '',
      wrapperHeight: 0
    }
  },
  computed: {
    ...mapGetters(['tradeRecord', 'getTradeDetailType', 'timeList']),
    computeTradeType () {
      let das = this.getTradeDetailType
      if (das) {
        das.map((item, idx) => {
          if (item.level === 3) {
            if (
              this.tradeClassificationId === 0 &&
              this.amountClassificationId === 0
            ) {
              item.check = true
            } else {
              if (item.typeId !== 0) {
                let parent = this.tradeClassificationId + this.amountClassificationId
                if (
                  (parent & item.typeId) === parent
                ) {
                  item.check = true
                } else {
                  item.check = false
                }
              }
            }
            return item
          }
        })
        return das
      }
    }
  },
  watch: {
    conditionFlat (n) {
      const _that = this
      this.walletData = this.statusIndex
      this.dateIdx = this.timerIndex
      setTimeout(() => {
        _that.conHeight()
      }, 20)
    },
    timerIndex (n, o) {
      this.dateIdx = n
    }
  },
  methods: {
    walletBag (e, item) {
      this.walletData = item
    },
    getTimer (e, item) {
      this.dateIdx = item
    },
    // 交易类型
    tradeTypeSelect (e, item, idx) {
      this.tradeClassificationId = item.typeId
      this.tradeTypeIds = 0
    },
    // 资金类型
    amountTypeSelect (e, item, idx) {
      this.amountClassificationId = item.typeId
      this.tradeTypeIds = 0
    },
    // 交易类型
    onClicktradeTrade (e, item, idx) {
      if (!item.check) {
        return
      }
      this.tradeType = item
      this.tradeTypeIds = item.typeId
    },
    // 重置
    reclean () {
      this.walletData = this.statusIndex
      this.startTimer = this.timerIndex
      this.tradeClassificationId = 0
      this.amountClassificationId = 0
      this.tradeTypeIds = 0
    },
    // 自定义
    customize () {
      this.$emit('showDataZidingyi', true)
    },
    // 关闭遮罩
    closeMaskSwipers () {
      let das = {
        zidingyiTime: '0',
        oldTime: this.timerIndex,
        flat: false
      }
      this.$emit('closeMaskAfter', das)
    },
    // 确认
    confirm () {
      let das = {
        walletTypes: this.walletData,
        tradeNumber:
          this.tradeClassificationId +
          this.amountClassificationId +
          this.tradeTypeIds,
        time: this.dateIdx,
        tradeTypeId: this.tradeType
      }
      this.$store.dispatch('showLoading')
      this.$emit('shaiXuanValue', das)
    },
    conHeight () {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.trade_ModelBox.getBoundingClientRect().top
    }
  }
}
</script>

<style lang="stylus" scoped>
.shaixuanBox
  position fixed
  width 100%
  height 100%
  right 0
  top 50px
  z-index 1001
  .shaixuanList
    position absolute
    width 85%
    height 100%
    right 0
    top 0
    background rgba(255, 255, 255, 1)
    z-index 1001
    .trade_shaixuan
      overflow-y auto
      .trande_content
        width 90%
        margin 0 auto
        position relative
        div
          clear both
          h3
            line-height 42px
            font-size 14px
          ul
            padding 0 10px
            li
              padding 0 20px
              height 30px
              line-height 32px
              background #F2F2F2
              border-radius 4px
              float left
              font-size 12px
              text-align center
              color #6B6B6B
              margin 8px 4px
          span
            width 100%
            border-bottom 1px dashed #efefef
            position relative
            top 5px
          &.timer_date
            li
              background none
              border solid 1px #efefef
    .trande_shaxuanBtn
      position relative
      &::before
        content ''
        width 100%
        height 1px
        position absolute
        top -1px
        left 0
        box-shadow -1px 1px 5px #ccc
      button
        width 95px
        height 40px
        border none
        border-radius 5px
        margin 15px 12px 0 26px
        &.confrim
          color #fff
  .money_bag, .tradeTypesClassification, .amountClassification, .tradeTypes
    li.active
      color #fff !important
.mask_swpers
  position absolute
  top 0
  height 100%
  left 0
  background rgba(0, 0, 0, 0.5)
  width 100%
  z-index 1000
  .close
    width 20px
    height 20px
    display block
    color #eeeeee
    font-size 18px
    font-weight normal
    position absolute
    left 0
    top 50%
    margin-top -60px
    left 16px
    svg
      fill #eee
</style>
