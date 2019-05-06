<template>
  <div class="user_body">
    <header-view :titles="'用户反馈'">
      <router-link slot="header_Right" to='' class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content feedback_view">
      <div class="part1">
        <div class="pt1_d1">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="多谢您给我们提供的宝贵的意见和建议"
            class="text-area"
          />
        </div>
        <p class="pt1_d2">
          字符数须小于200，当前字符数{{textLength}}
        </p>
      </div>
      <div class="part2">
        <input type="text" placeholder="请输入QQ,微信或者手机号" class="pt2_input">
      </div>
      <div class="part3">
        <div class="real_ss">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
export default {
  name: 'feedback',
  components: {
    layouts,
    HeaderView
  },
  data() {
    return {
      textLength: '30'
    }
  }
}
</script>

<style lang="stylus">
  @import './feedback.styl'
</style>
