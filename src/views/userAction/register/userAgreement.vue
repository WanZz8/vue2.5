<template>
  <div class="userAgreement"
       v-show="flat">
    <header-view :titles="'用户协议'"
                 :headerLeft='true'>
      <div class="home_back_icon"
           slot="header_Left"
           @click='goBack'>
        <i class="icons icon_Back">
          <svg-icon icon-class="left"></svg-icon>
        </i>
      </div>
    </header-view>
    <div class="userAgreement_txt"
         ref='iframes'
         :style="{height:(wrapperHeight+20) + 'px'}">
      <iframe class="ifram_box"
              marginwidth="0"
              frameborder='0'
              :height="(wrapperHeight-100) + 'px'"
              :src="!merchantInfo?'':merchantInfo.merchantSetting.userAgreementUrl"></iframe>
      <!-- <object ref="ifram_box"
              :data="!merchantInfo?'':merchantInfo.merchantSetting.userAgreementUrl"
              :height="(wrapperHeight-50) + 'px'"
              width="100%" /> -->
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  components: {
    HeaderView
  },
  props: {
    flat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      wrapperHeight: 0
    }
  },
  watch: {
    flat (n) {
      let _that = this
      setTimeout(() => {
        _that.conHeight()
      }, 50)
    }
  },
  computed: {
    ...mapGetters(['merchantInfo'])
  },
  mounted () {
    window.onresize = function () {
      this.conHeight()
    }
  },
  methods: {
    goBack () {
      this.$emit('closeUserAgreement', false)
    },
    conHeight () {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.iframes.getBoundingClientRect().top
    }
  }
}
</script>

<style lang="stylus">
.userAgreement
  position fixed
  top 0
  z-index 9999
  width 100%
  .userAgreement_txt
    width 100%
    overflow-y auto
    position relative
    .iframe_Buttom
      height 50px
      line-height 50px
      text-align center
      background #c8c8c8
      font-size 16px
      margin-top -5px
      color #777
      font-weight 600
    .ifram_box
      width 100%
      background #fff
      margin-top 50px
    object
      background #ffffff
</style>
