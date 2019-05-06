<template>
  <div class="user_body">
    <header-view :titles="this.templateName"
                 :headerLeft='true'>
      <div class="home_back_icon"
           slot="header_Left"
           @click='goBack'>
        <i class="icons icon_Back">
          <svg-icon icon-class="left"></svg-icon>
        </i>
      </div>
    </header-view>
    <div class="mint-content market_list"
         ref="wrapper_entrust">
      <iframe marginwidth="0"
              :height="(wrapperHeight+44) + 'px'"
              scrolling="no"
              frameborder='0'
              ref='iframes'
              id="service"
              :src="merchantInfo.merchantSetting.customerServiceUrl"></iframe>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
// import { getLocal } from '@/utils/storage'
import { mapGetters } from 'vuex'
export default {
  components: {
    HeaderView
  },
  data () {
    return {
      templateName: '客服',
      wrapperHeight: 0
    }
  },
  computed: {
    ...mapGetters(['merchantInfo'])
  },
  mounted () {
    this.conHeight()
    window.onresize = function () {
      this.conHeight()
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    conHeight () {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_entrust.getBoundingClientRect().top
    }
  }
}
</script>
<style lang="stylus">
#service
  width 100%
  position absolute
  top -44px
</style>
