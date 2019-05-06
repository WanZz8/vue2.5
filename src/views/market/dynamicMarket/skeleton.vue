<template>
  <div class="market_skeleton">
    <div class="tab_list animated-background">
    </div>
    <div class="mint-tab-container">
      <div class="market_block">
        <div class="market_left">
          <i class="animated-background"></i>
        </div>
        <div class="market_right">
          <div class="market_top_div animated-background"></div>
          <div class="market_bottom_div animated-background"></div>
        </div>
      </div>
      <div class="market_block">
        <div class="market_left">
          <i class="animated-background"></i>
        </div>
        <div class="market_right">
          <div class="market_top_div animated-background"></div>
          <div class="market_bottom_div animated-background"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      da: ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.market_skeleton
  .tab_list
    width 330px
    margin 12px auto 0
    height 34px
  .mint-tab-container
    .market_block
      width 350px
      height 65px
      display flex
      margin 14px auto
      box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 -2px 4px 0 rgba(0, 0, 0, 0.07)
      .market_left
        width 15%
        flex 0 0 15%
        i
          width 20px
          height 20px
          background #eee
          display block
          margin-top 24px
          margin-left 16px
      .market_right
        width 82%
        flex 0 0 82%
        div
          width 100%
        .market_top_div
          height 16px
          margin-top 10px
        .market_bottom_div
          height 16px
          margin-top 10px
</style>
