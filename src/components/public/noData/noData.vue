<template>
  <div class="noData">
    <i class="">
      <svg-icon icon-class="no_data" />
    </i>
    <span>暂无数据</span>
    <router-link to='/market'>期货申购</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: require('../../../assets/images/common/no_data.png')
    }
  }
}
</script>

<style lang="stylus">
.noData
  width 95%
  margin 0 auto
  i
    width 135px
    height 185px
    margin 50px auto 0
    display block
  span
    display block
    text-align center
    font-size 18px
    height 35px
    line-height 35px
    margin-right 15px
    color #949494
    margin-bottom 45px
  a
    width 100%
    height 55px
    display block
    background #6B89FE
    border-radius 50px
    text-align center
    line-height 55px
    color #fff
    font-size 15px
    margin 25px auto 0
</style>
