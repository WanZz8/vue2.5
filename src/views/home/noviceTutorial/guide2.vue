<template>
  <div class="noviceTutorial1">
    <header class="header_outher"
            style="background:#6989ff">
      <div class="flexs flex-left"></div>
      <div class="flexs flex-center"></div>
      <div class="flexs flex-right">签到</div>
    </header>
    <div class="contents">
      <div class="bannerImg">
        <img src="../../../assets/images/home/b1.jpg" />
      </div>
      <div class="kj">
        <!--联系客服-->
        <div class="title_service">
          <h1>快速入口</h1>
          <a>联系客服</a>
        </div>
        <div class="title_message">
          <div class="message_icon">
            <i class="icon icon_message">
              <svg-icon icon-class="message"></svg-icon>
            </i>
          </div>
          <!--跑马灯-->
          <div class="message_txt">
            <span>暂无内容!</span>
          </div>
        </div>
        <!--快速通道-->
        <div class="quick_slot"></div>
      </div>
      <!--新手引导-->
      <div class="green_hands">
        <h2>新手引导</h2>
        <div class="new_Hand">
          新手引导-快速上手-日进斗金
        </div>
      </div>
      <!--大赛排名-->
      <!--<div class="ranking">-->
      <!--<h2>大赛排名</h2>-->
      <!--<div class="game_ranking">-->
      <!--<ul>-->
      <!--<li>-->
      <!--<div class="ranking_name">-->
      <!--<span style="width:37px;height:37px;border-radius:50%">-->
      <!--<img src="../../../assets/images/home/one.png" />-->
      <!--</span>-->
      <!--<p>每日盈利</p>-->
      <!--<b>1171.67%</b>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li>-->
      <!--<div class="ranking_name">-->
      <!--<span style="width:37px;height:37px;border-radius:50%">-->
      <!--<img src="../../../assets/images/home/two.png" />-->
      <!--</span>-->
      <!--<p>每日盈利</p>-->
      <!--<b>1171.67%</b>-->
      <!--</div>-->
      <!--</li>-->
      <!--<li>-->
      <!--<div class="ranking_name">-->
      <!--<span style="width:37px;height:37px;border-radius:50%">-->
      <!--<img src="../../../assets/images/home/three.png" />-->
      <!--</span>-->
      <!--<p>每日盈利</p>-->
      <!--<b>1171.67%</b>-->
      <!--</div>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
      <!--</div>-->
      <div class="coupon">
        <h2>热门活动</h2><span class="hot_img">快速上手让你盈利不停</span>
        <ul>
          <li class="bg_color bg_one">
            <div class="coupon_left">
              <h3 class="coupone_left_left">100</h3>
              <div class="coupone_left_right">
                <span>日欢迎礼金</span>
                <p>元</p>
              </div>
            </div>
            <div class="coupon_right">
              <p> 单笔充值<br />≥2000元</p>
              <button class="coupon_submit">立即参与</button>
            </div>
          </li>
          <li class="bg_color bg_two">
            <div class="coupon_left">
              <h3 class="coupone_left_left">288</h3>
              <div class="coupone_left_right">
                <span>全勤礼包</span>
                <p>元</p>
              </div>
            </div>
            <div class="coupon_right">
              <p>尽情交易<br />欢乐投资</p>
              <button class="coupon_submit">立即参与</button>
            </div>
          </li>
          <li class="bg_color bg_three">
            <div class="coupon_left">
              <h3 class="coupone_left_left">2000</h3>
              <div class="coupone_left_right">
                <span>新人礼金</span>
                <p>元</p>
              </div>
            </div>
            <div class="coupon_right">
              <p>实名认证<br />注册即送</p>
              <button class="coupon_submit">立即参与</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="novice_div_two">
      <b class="novice_close"
         @click="close"></b>
      <div class="outline-box">
        <quick :temp="temp"></quick>
      </div>
      <div class="btn">
        <span class="btn_methods look_course"
              @click="market"></span>
        <span class="btn_methods look_trade"
              @click="lookNext"></span>
      </div>
    </div>
    <nocice-mask></nocice-mask>
  </div>
</template>

<script>
import quick from './components/guide1'
import nociceMask from './mask'
export default {
  props: {
    template: {
      type: Array
    }
  },
  components: {
    quick,
    nociceMask
  },
  data () {
    return {
      da: 3
    }
  },
  computed: {
    temp () {
      let arr = Object.assign([], this.template)
      return arr
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
  .contents
    position absolute
    top 50px
    left 0
    right 0
    bottom 0
    overflow hidden
    z-index 9
    .bannerImg
      width 100%
      height 147px
      img
        width 100%
        height 100%
    .quick_slot
      width 100%
      height 180px
      opacity 0
.novice_div_two
  position absolute
  top 150px
  width 100%
  z-index 9999
  .novice_close
    width 33px
    height 33px
    background-image url('../../../assets/images/noviceTutorial/close.png')
    background-size cover
    display inline-block
    float right
    margin-right 40px
    margin-bottom 10px
  .outline-box
    clear both
    width 347px
    height 242px
    background-image url('../../../assets/images/noviceTutorial/two_node.png')
    background-size cover
    padding 10px
    margin 0 auto
  .btn
    width 260px
    margin 0 auto
    .btn_methods
      width 105px
      height 48px
      display inline-block
      margin 20px 8px 0
      &.look_trade
        background-image url('../../../assets/images/noviceTutorial/next.png')
        background-size cover
      &.look_course
        background-image url('../../../assets/images/noviceTutorial/trade.png')
        background-size cover
</style>
