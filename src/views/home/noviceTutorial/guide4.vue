<template>
  <div class="noviceTutorial1">
    <header class="header_outher"
            style="background:#6989ff">
      <div class="flexs flex-left"></div>
      <div class="flexs flex-center">交易</div>
      <div class="flexs flex-right"></div>
    </header>
    <div class="content">
      <div class="tab"></div>
      <div class="chicang"></div>
      <div class="footer_nav"></div>
      <div class="novice_div_four">
        <b class="novice_close"
           @click="close"></b>
        <div class="text_center">
          <p>设置止盈止损</p>
          <i></i>
        </div>
        <div class="btn">
          <span class="btn_methods look_course"
                @click="market"></span>
          <span class="btn_methods look_trade"
                @click="lookNext"></span>
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
      da: 5
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
      flex 0 0 33.3333%
      width 33.3333%
      color #fff
.content
  position relative
  .tab
    width 90%
    height 58px
    background url('../../../assets/images/noviceTutorial/chicang.png') no-repeat
    background-size 100% 100%
    margin 55px auto 0
  .chicang
    width 90%
    height 250px
    background-image url('../../../assets/images/noviceTutorial/chicang.jpg')
    background-repeat no-repeat
    background-size 100% 100%
    margin 0 auto
  .footer_nav
    width 100%
    height 80px
    background-image url('../../../assets/images/noviceTutorial/nav.jpg')
    background-size 100%
    position fixed
    bottom 0
    left 0
  .novice_div_four
    position absolute
    bottom -50px
    width 80%
    z-index 9999
    left 50%
    margin-left -40%
    .novice_close
      width 33px
      height 33px
      background-image url('../../../assets/images/noviceTutorial/close.png')
      background-size cover
      display inline-block
      position absolute
      right 0
      top -50px
    .btn
      margin 0 auto
      position relative
      top 20px
      .btn_methods
        width 105px
        height 48px
        display inline-block
        margin 15px 20px 0
        &.look_trade
          background-image url('../../../assets/images/noviceTutorial/next.png')
          background-size cover
        &.look_course
          background-image url('../../../assets/images/noviceTutorial/trade.png')
          background-size cover
  .text_center
    line-height 24px
    display flex
    i
      width 145px
      height 161px
      background-image url('../../../assets/images/noviceTutorial/four_node.png')
      background-size cover
    p
      width 84px
      text-align center
      height 24px
      color #F5A623
      font-size 12px
      display block
      border solid 1px #F5A623
      border-radius 3px
      margin 144px 10px 0
</style>
