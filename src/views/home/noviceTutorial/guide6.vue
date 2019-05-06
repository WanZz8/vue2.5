<template>
  <div class="noviceTutorial1">
    <header class="header_outher"
            style="background:#6989ff">
      <div class="flexs flex-left"></div>
      <div class="flexs flex-center">行情</div>
      <div class="flexs flex-right"></div>
    </header>
    <div class="content">
      <div class="market_list"
           v-if="items.length>0">
        <div class="tab_list">
          <span class="list-cycle"
                :class="{'active':active===index}"
                v-for="(tab,index) in items"
                :key="tab">{{tab}}</span>
        </div>
        <div class="market_container_item">
          <div class="market_block"
               :class="it.status!==2?(it.upDropSpeed>0&&it.status===1?'rise':'fall'):'close'"
               v-for="it in list"
               v-show="it.productType==selected"
               :key="it.CommodityName">
            <ul>
              <li class="market_left">
                <span>
                  <i></i>
                </span>
              </li>
              <li class="market_txt">
                <div class="market_top">
                  <p>{{it.CommodityName}}</p>
                  <span class="percent">
                    <i class="icons icon_up">
                      <svg-icon icon-class="up"></svg-icon>
                    </i>
                    <p>0.82%</p>
                  </span>
                  <i class="icons icon_Rise"
                     v-if="it.status===1">
                    <svg-icon icon-class="rise"></svg-icon>
                  </i>
                  <i class="close"
                     v-else>
                    休市
                  </i>
                  <b class="market_bottom">{{it.remark}}</b>
                </div>
              </li>
              <li class="market_right">
                <h2>{{it.lastPrice}}</h2>
                <p>{{it.tradeTime}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="novice_div_six">
        <div class="like">
          <p></p>
          <i></i>
        </div>
        <i class="success_txt"></i>
        <div class="btn">
          <span class="btn_methods look_trade"
                @click="market"></span>
          <span class="btn_methods look_course"
                @click="lookNext"></span>
        </div>
      </div>
      <div class="footer_nav"></div>
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
      items: ['外盘'],
      active: 0,
      selected: '外盘',
      list: [
        {
          CommodityName: '美原油',
          commodityCode: 'CL',
          contractCode: '1902',
          lastPrice: '56.46',
          openPrice: 53.73,
          productType: '外盘',
          remark: '国际爆款，首选避险产品',
          status: 1,
          tradeTime: '00:00:00-次日23:59:00',
          upDropSpeed: 0.0085744908896035
        },
        {
          CommodityName: '德指',
          commodityCode: 'DAX',
          contractCode: '1903',
          lastPrice: '11314.0',
          openPrice: 11318.5,
          productType: '外盘',
          remark: '火爆德指，波幅巨大',
          status: 1,
          tradeTime: '00:00:00-次日23:59:00',
          upDropSpeed: 0.25744908896035
        }
      ]
    }
  },
  methods: {
    lookNext () {
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
.market_list
  padding 0 6px
  height 100%
  margin-top 50px
  .tab_list
    clear both
    width 364px
    margin 0 auto
    border-bottom 1px solid #f8f8f8
    span
      padding 8px 24px
      margin 10px 0 2px
      display inline-block
      font-size 14px
      position relative
      &::before
        content ''
        position absolute
        width 50%
        left 50%
        margin-left -25%
        bottom -2px
        height 2px
.market_container_item
  position relative
  height calc(100% - 50px)
  .market_block
    width 350px
    height 65px
    display block
    background #ffffff
    border-radius 5px
    margin 14px auto
    box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 -2px 4px 0 rgba(0, 0, 0, 0.07)
    padding 0 10px 0 0
    ul
      display flex
    li.market_left
      flex 0 0 10%
      width 10%
      span
        width 16px
        height 16px
        display block
        border-radius 50%
        margin 26px 9px
        position relative
        i
          width 12px
          height 12px
          display block
          border-radius 50%
          left 50%
          margin-left -6px
          position absolute
          top 2px
    li.market_txt
      width 55%
      flex 0 0 55%
      display flex
      padding 10px 0
      .market_top
        width 100%
        p
          float left
          display inline-block
          line-height 20px
        .percent
          height 20px
          display block
          float left
          margin-left 10px
          border-radius 3px
          padding 0 5px
          .icon_up
            width 12px
            height 12px
            display block
            fill #fff
            float left
            margin 4px 0 0 1px
          p
            color #eee
            font-size 12px
            padding-left 2px
            line-height 20px
        .icon_Rise
          width 45px
          height 12px
          display block
          float left
          margin 3px 0 0 10px
      .market_bottom
        color #9b9b9b
        clear both
        float left
        line-height 32px
        font-size 10px
        font-weight normal
    .market_right
      width 35%
      flex 0 0 35%
      text-align right
      h2
        font-size 16px
        line-height 40px
      p
        font-size 10px
        color #9b9b9b
    &.rise
      span
        background #FFB4B4
        i
          background #EA3826
      .percent
        background #EA3826
        .icon_up
          transform rotate(0deg)
      svg
        stroke #ea3826
      .market_right
        h2
          color #ea3826
    &.fall
      span
        background #bfe991
        i
          background #7ED321
      .percent
        background #7ED321
        .icon_up
          transform rotate(180deg)
      svg
        stroke #7ED321
      .market_right
        h2
          color #7ED321
    &.close
      background #E2E2E2
      span
        background #BCBCBC
        i
          background #878585
      .percent
        background #878585
      .close
        width 32px
        background #878585
        color #fff
        font-size 12px
        height 20px
        float left
        margin-left 10px
        text-align center
        line-height 20px
        border-radius 3px
      .market_right
        h2
          color #878585
.content
  position relative
  .novice_div_six
    position absolute
    width 80%
    z-index 9999
    left 50%
    margin-left -40%
    top 50px
    .novice_close
      width 33px
      height 33px
      background-image url('../../../assets/images/noviceTutorial/close.png')
      background-size cover
      display inline-block
      position absolute
      right 0
      top -30px
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
          background-image url('../../../assets/images/noviceTutorial/trade.png')
          background-size cover
        &.look_course
          background-image url('../../../assets/images/noviceTutorial/success_course.png')
          background-size cover
    .like
      width 260px
      height 260px
      margin 0 auto
      position relative
      p
        width 100%
        height 100%
        background url('../../../assets/images/noviceTutorial/success_halo.png')
        display block
        background-size 100% 100%
        animation identifier 5s infinite linear
      i
        width 100px
        height 100px
        background url('../../../assets/images/noviceTutorial/six_node_success.png')
        display block
        background-size 100% 100%
        position absolute
        top 50%
        margin-top -50px
        left 50%
        margin-left -50px
    .success_txt
      width 300px
      height 36px
      display block
      margin-top 20px
      background url('../../../assets/images/noviceTutorial/six_txt.png')
      background-size 100% 100%
  .footer_nav
    width 100%
    height 2.133333rem
    background-image url('../../../assets/images/noviceTutorial/nav.jpg')
    background-size 100%
    position fixed
    bottom 0
    left 0
@keyframes identifier
  0%
    transform rotate(45deg)
  25%
    transform rotate(-45deg)
  50%
    transform rotate(45deg)
  75%
    transform rotate(-45deg)
  100%
    transform rotate(45deg)
</style>
