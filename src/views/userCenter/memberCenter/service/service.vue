<template>
  <div class="user_body">
    <header-view :titles="'联系客服'">
      <router-link slot="header_Right" to='/register' class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content setting_view">
      <div class="part1">
        <p>客服页面</p>
      </div>
      <div class="part2">
        <div class="settips">
          <input type="text" placeholder="请输入QQ,微信或者手机号">
        </div>
      </div>
      <div class="part3">
        <div class="set_ss">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
export default {
  name: 'service',
  components: {
    layouts,
    HeaderView
  },
  data() {
    return {
      Msg: []
    }
  }
}
</script>

<style lang="stylus">
  @import './service.styl'
</style>
