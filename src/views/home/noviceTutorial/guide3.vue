<template>
  <div class="noviceTutorial1">
    <header class="header_outher"
            style="background:#6989ff">
      <div class="flexs flex-left"></div>
      <div class="flexs flex-center">
        <i></i>
      </div>
      <div class="flexs flex-right">交易规则</div>
    </header>
    <div class="contents">
      <div class="contents_center">
      </div>
      <div class="bottom">
        <div class="contents_top"></div>
        <div class="contents_bottoms"></div>
      </div>
    </div>
    <div class="newsHand">
      <i class="close"
         @click="close"></i>
      <div class="btn">
        <span class="btn_methods look_course"
              @click="market"></span>
        <span class="btn_methods look_trade"
              @click="lookNext"></span>
      </div>
      <div class="newHand_text"></div>
      <div class="middle_btn">
        <div class="bottom_radius"
             style="border-radius:50%;">
          <span style="border-radius:50%;">
            <i>
              <svg-icon icon-class="quick_sell"></svg-icon>
            </i>
          </span>
        </div>
      </div>
    </div>
    <nocice-mask></nocice-mask>
  </div>
</template>

<script>
import nociceMask from './mask'
export default {
  components: {
    nociceMask
  },
  data () {
    return {
      da: 4
    }
  },
  methods: {
    lookNext () {
      this.$emit('tradeLook', this.da)
    },
    close () {
      this.$emit('tradeLook', 0)
    },
    market () {
      this.$router.push({ path: '/market' })
      this.$emit('tradeLook', 0)
    }
  }
}
</script>

<style lang="stylus" scoped>
.noviceTutorial1
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  overflow hidden
  .header_outher
    position absolute
    right 0
    left 0
    height 50px
    line-height 50px
    padding 0 12px
    text-align center
    -webkit-backface-visibility hidden
    backface-visibility hidden
    display flex
    .flexs
      color #fff
      text-align center
      &.flex-center
        flex 0 0 50%
        width 50%
        i
          width 128px
          height 50px
          background url('../../../assets/images/noviceTutorial/132_02.jpg')
          display block
          background-size cover
          margin 0 auto
      &.flex-left
        flex 0 0 25%
        width 25%
      &.flex-right
        flex 0 0 25%
        width 25%
.contents_center
  width 99%
  height 422px
  background url('../../../assets/images/noviceTutorial/132_04.jpg')
  display block
  margin 55px auto 0
  background-size 100% 100%
.bottom
  width 99%
  height 132px
  display block
  background-size 100% 100%
  position fixed
  bottom 0
  .contents_top
    height 70px
    width 100%
    background url('../../../assets/images/noviceTutorial/132_05.jpg')
    display block
    background-size 100% 100%
  .contents_bottoms
    height 62px
    width 100%
    background url('../../../assets/images/noviceTutorial/132_06.jpg')
    display block
    background-size 100% 100%
.newsHand
  position absolute
  z-index 1000
  left 50%
  margin-left -45%
  bottom 0
  margin-left -130px
  .close
    width 33px
    height 33px
    background-image url('../../../assets/images/noviceTutorial/close.png')
    background-size cover
    display inline-block
    position absolute
    right 0
    top -40px
.btn
  width 260px
  margin 0 auto
  .btn_methods
    width 105px
    height 48px
    display inline-block
    margin 20px 10px 0
    &.look_trade
      background-image url('../../../assets/images/noviceTutorial/next.png')
      background-size cover
    &.look_course
      background-image url('../../../assets/images/noviceTutorial/trade.png')
      background-size cover
.newHand_text
  height 200px
  margin 40px auto 0
  background-image url('../../../assets/images/noviceTutorial/three_node.png')
  background-size 100% 100%
  width 240px
.middle_btn
  width 100%
  height 62px
  position relative
  .bottom_radius
    width 62px
    height 62px
    background #eee
    border-radius 50%
    position absolute
    left 50%
    margin-left -34px
    span
      width 55px
      height 55px
      display block
      background #6B89FE
      margin 4px auto 0
      position relative
      i
        width 34px
        height 34px
        display block
        left 50%
        position absolute
        top 50%
        margin-top -17px
        margin-left -17px
        transition all 0.2s ease
</style>
