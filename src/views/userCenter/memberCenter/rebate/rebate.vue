<template>
  <div class="user_body">
    <header-view :titles="'返点收入'">
      <router-link slot="header_Right" to='/register' class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content rebate_view">
      <div class="rebate_navBar">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">我的返点</mt-tab-item>
          <mt-tab-item id="2">返点收入</mt-tab-item>
          <mt-tab-item id="3">代理返点</mt-tab-item>
        </mt-navbar>
      </div>
      <div class="rebate_content">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <div class="part1">
              我的返点
            </div>
            <div class="part2">
            </div>
            <div class="part3">
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="part1">
              返点收入
            </div>
            <div class="part2">
            </div>
            <div class="part3">
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div class="part1">
              代理返点
            </div>
            <div class="part2">
            </div>
            <div class="part3">
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
export default {
  name: 'rebate',
  components: {
    layouts,
    HeaderView
  },
  data() {
    return {
      selected: '1'
    }
  }
}
</script>

<style lang="stylus">
  @import 'rebate.styl'
</style>
