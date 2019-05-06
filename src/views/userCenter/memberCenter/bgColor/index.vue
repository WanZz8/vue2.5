<template>
  <div class="user_body">
    <header-view :titles="'主题颜色'">
    </header-view>
    <div class="mint-content bgColor_view">
      <div class="color-items">
        <span class="color-item color-cycle"
              v-for="item in colorData"
              :style="{'backgroundColor':item.colorNumber}"
              :key="item.className"
              @click="changeSkin(item.className)">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { mapGetters } from 'vuex'
import baColor from '@/config/basic.config'
import { Toast } from 'mint-ui'
export default {
  name: 'bgColor',
  components: {
    layouts,
    HeaderView
  },
  data () {
    return {
      childrenClass: '.color-cycle',
      colorData: baColor.colorList
    }
  },
  computed: {
    ...mapGetters(['skins'])
  },
  methods: {
    changeSkin (val) {
      Toast({
        message: '您更换了颜色',
        position: 'middle',
        duration: 1500
      })
      this.$store.dispatch('changeColor', 'theme-' + val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.bgColor_view
  width 100%
  .color-items
    display inline-block
    width 100%
    .color-cycle
      display inline-block
      width 60px
      height 60px
      margin 10px 0px 0 12px
      border-radius 5px
      box-shadow 1px 1px 3px #ccc
</style>
