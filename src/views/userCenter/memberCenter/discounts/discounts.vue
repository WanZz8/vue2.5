<template>
  <div class="user_body">
    <header-view :titles="'我的优惠券'">
      <router-link slot="header_Right" to='/register' class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content discount_view">
      <div class="dis_navBar">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1">未使用</mt-tab-item>
          <mt-tab-item id="2">已使用</mt-tab-item>
          <mt-tab-item id="3">已过期</mt-tab-item>
        </mt-navbar>
      </div>
      <div class="dis_content">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <div class="part1">
              未使用页面
            </div>
            <div class="part2">
            </div>
            <div class="part3">
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="part1">
              已使用
            </div>
            <div class="part2">
            </div>
            <div class="part3">
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div class="part1">
              已过期
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
  name: 'discounts',
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
  @import './discounts.styl'
</style>
