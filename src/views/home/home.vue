<template>
  <layouts type="home"
           title="首页">
    <template slot="content">
      <section class="mint-content middle-content"
               ref="mfct">
        <!-- <b-scroll :scrollX="false"> -->
        <banner-con :banner='banner'></banner-con>
        <quick-int></quick-int>
        <buttom-fun></buttom-fun>
        <div class="home_bottom"></div>
        <!-- </b-scroll> -->
      </section>
    </template>
  </layouts>
</template>
<script>
import layouts from '@/components/layout/contentView'
import BannerCon from './banner/banner'
import QuickInt from './quickInt/quickInt'
import ButtomFun from './buttomFun/news_hot'
import BScroll from '@/components/public/bScroll/bScrolls'
import {
  getSession
} from '@/utils/storage'
export default {
  name: 'Home',
  components: {
    layouts,
    BannerCon,
    QuickInt,
    ButtomFun,
    BScroll
  },
  data () {
    return {
      banner: [
        {
          link: '/service',
          id: 1,
          img: require('../../assets/images/home/b4.jpg')
        },
        {
          link: '/activityRule',
          id: 5,
          img: require('../../assets/images/home/b5.jpg')
        },
        {
          link: '/activityRule',
          id: 2,
          img: require('../../assets/images/home/b1.jpg')
        },
        {
          link: '/activityRule',
          id: 3,
          img: require('../../assets/images/home/b2.jpg')
        },
        {
          link: '/activityRule',
          id: 4,
          img: require('../../assets/images/home/b3.jpg')
        }
      ]
    }
  },
  mounted () {
    if (!getSession('merchantInfo')) {
      this.$store.dispatch('getMerchantInfo').then(res => {
        if (res && res.status) {
          document.title = res.data.merchantName
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  height calc(100% - 1px)
.home_bottom
  height 60px
</style>
