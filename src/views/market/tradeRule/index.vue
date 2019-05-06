<template>
  <transition name="slider"
              mode="out-in">
    <div class="rule_page"
         v-show="flat">
      <header-view :titles="'交易规则'"
                   :headerLeft='true'>
        <div class="home_back_icon"
             slot="header_Left"
             @click='goBack'>
          <i class="icons icon_Back">
            <svg-icon icon-class="left"></svg-icon>
          </i>
        </div>
      </header-view>
      <div class="mint-content rule_view">
        <div ref="wrapper_entrust"
             :style="{ height: (wrapperHeight-20) + 'px' }"
             class="rule_box">
          <div class="rule_content"
               v-for="(item,idx) in productDataList"
               :key="'idx'+idx"
               v-show="item.commodityCode.content===onRoute">
            <div class="rule_list"
                 style="border-top:1px solid #eee;">
              <b>{{item.commodityName.title}}</b>
              <p v-html="item.commodityName.content"></p>
            </div>
            <div class="rule_list">
              <b>{{item.tradeHands.title}}</b>
              <p v-html="item.tradeHands.content"></p>
            </div>
            <div class="rule_list">
              <b>{{item.unit.title}}</b>
              <p v-html="item.unit.content"></p>
            </div>
            <div class="rule_list"
                 v-show="false">
              <b>{{item.priceQuote.title}}</b>
              <p v-html="item.priceQuote.content"></p>
            </div>
            <div class="rule_list">
              <b>{{item.minPrice.title}}</b>
              <p v-html="item.minPrice.content"></p>
            </div>
            <div class="rule_list">
              <b>{{item.commodityCode.title}}</b>
              <p v-html="item.commodityCode.content"></p>
            </div>
            <div class="rule_list">
              <b>{{item.exchange.title}}</b>
              <p v-html="item.exchange.content"></p>
            </div>
            <div class="rule_list"
                 v-show="item.contractId.content">
              <b>{{item.contractId.title}}</b>
              <p v-html="item.contractId.content"></p>
            </div>
            <div class="rule_slider"
                 style="margin-top:20px">
              <b v-html="item.trandeTime.title"
                 :class="titleShow==item.trandeTime.id?'active':''"
                 @click="onClicksSlider($event,item.trandeTime.id)"></b>
              <div class="content"
                   v-html="item.trandeTime.content"
                   v-show="titleShow==item.trandeTime.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.conversion.title"
                 :class="titleShow==item.conversion.id?'active':''"
                 @click="onClicksSlider($event,item.conversion.id)"></b>
              <div class="content"
                   v-html="item.conversion.content"
                   v-show="titleShow==item.conversion.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.rise.title"
                 :class="titleShow==item.rise.id?'active':''"
                 @click="onClicksSlider($event,item.rise.id)"></b>
              <div class="content"
                   v-html="item.rise.content"
                   v-show="titleShow==item.rise.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.fall.title"
                 :class="titleShow==item.fall.id?'active':''"
                 @click="onClicksSlider($event,item.fall.id)"></b>
              <div class="content"
                   v-html="item.fall.content"
                   v-show="titleShow==item.fall.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.targetProfit.title"
                 :class="titleShow==item.targetProfit.id?'active':''"
                 @click="onClicksSlider($event,item.targetProfit.id)"></b>
              <div class="content"
                   v-html="item.targetProfit.content"
                   v-show="titleShow==item.targetProfit.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.targetStoploss.title"
                 :class="titleShow==item.targetStoploss.id?'active':''"
                 @click="onClicksSlider($event,item.targetStoploss.id)"></b>
              <div class="content"
                   v-html="item.targetStoploss.content"
                   v-show="titleShow==item.targetStoploss.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.bail.title"
                 :class="titleShow==item.bail.id?'active':''"
                 @click="onClicksSlider($event,item.bail.id)"></b>
              <div class="content"
                   v-html="item.bail.content"
                   v-show="titleShow==item.bail.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.poundage.title"
                 :class="titleShow==item.poundage.id?'active':''"
                 @click="onClicksSlider($event,item.poundage.id)"></b>
              <div class="content"
                   v-html="item.poundage.content"
                   v-show="titleShow==item.poundage.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.deferredCharges.title"
                 :class="titleShow==item.deferredCharges.id?'active':''"
                 @click="onClicksSlider($event,item.deferredCharges.id)"></b>
              <div class="content"
                   v-html="item.deferredCharges.content"
                   v-show="titleShow==item.deferredCharges.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.hildingsTime.title"
                 :class="titleShow==item.hildingsTime.id?'active':''"
                 @click="onClicksSlider($event,item.hildingsTime.id)"></b>
              <div class="content"
                   v-html="item.hildingsTime.content"
                   v-show="titleShow==item.hildingsTime.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.designatedPrice.title"
                 :class="titleShow==item.designatedPrice.id?'active':''"
                 @click="onClicksSlider($event,item.designatedPrice.id)"></b>
              <div class="content"
                   v-html="item.designatedPrice.content"
                   v-show="titleShow==item.designatedPrice.id"></div>
            </div>
            <div class="rule_slider">
              <b v-html="item.backhand.title"
                 :class="titleShow==item.backhand.id?'active':''"
                 @click="onClicksSlider($event,item.backhand.id)"></b>
              <div class="content"
                   v-html="item.backhand.content"
                   v-show="titleShow==item.backhand.id"></div>
            </div>
          </div>
          <div class="noData_icon"
               v-show="flatNoData">
            <i>
              <svg-icon icon-class="noDatas"></svg-icon>
            </i>
            <p>暂无内容..</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import HeaderView from '@/components/layout/header'
import productData from '@/config/product'
export default {
  props: {
    flat: Boolean,
    default: false
  },
  components: {
    HeaderView
  },
  data () {
    return {
      wrapperHeight: 0,
      titleShow: '',
      flatNoData: false
    }
  },
  computed: {
    productDataList () {
      return productData
    },
    onRoute () {
      return this.$route.query.commodityCode
    }
  },
  mounted () {
    this.conHeight()
  },
  methods: {
    goBack () {
      this.$emit('removeLeft', false)
    },
    onClicksSlider (e, item) {
      if (!e.target.className) {
        this.titleShow = item
      } else {
        this.titleShow = ''
      }
    },
    conHeight () {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_entrust.getBoundingClientRect().top
    }
  }
}
</script>

<style lang="stylus" scoped>
.rule_page
  position absolute
  top 0
  width 100%
  height 100%
  background #fff
  z-index 9990
  transition all 0.5s ease
  .rule_view
    padding 0 10px
    background #f8f8f8
    .rule_box
      .rule_content
        margin-top 15px
        margin-bottom 15px
        .rule_list
          display flex
          line-height 42px
          border-bottom 1px solid #eee
          border-right 1px solid #eee
          background #fff
          b
            flex 0 0 35%
            text-align center
            font-size 15px
          p
            // flex 0 0 65%
            padding 0 10px
            font-size 14px
            color #999
          &:nth-child(even)
            b
              background #F2F2F2
          &:nth-child(odd)
            b
              background #DDDDDD
  &.flat_active
    left 0
    opacity 1
  &.flat_actives
    left 100%
    opacity 0
.rule_slider
  width 100%
  border-bottom 1px solid #eee
  b
    height 48px
    width 100%
    display block
    background #fff
    line-height 48px
    font-weight normal
    text-indent 10px
    font-size 16px
    &.active
      background #6989ff
      color #fff
  .content
    line-height 24px
    background #ffffff
    padding 10px
    border-top 1px solid #eee
    color #666
    font-size 14px
.noData_icon
  padding-top 60px
  i
    width 150px
    height 150px
    margin 0px auto 0
    display block
    svg
      fill #ddd
  p
    text-align center
    font-size 20px
    color #ddd
    font-weight 600
.slider-enter-active, .slider-leave-active
  transition all 0.3s ease-out
.slider-enter
  transform translateX(360px)
  opacity 0
.slider-leave-active
  transform translateX(360px)
  opacity 0
</style>
