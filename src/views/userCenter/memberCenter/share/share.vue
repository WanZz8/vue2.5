<template>
  <div class="user_body">
    <header-view :titles="'分享'">
      <div slot="header_Right"
           class="more-container">
        <span class="somore"
              @click="handleShow">...</span>
      </div>
    </header-view>
    <div class="mint-content share_view">
      <div class="part1">
      </div>
      <div class="part2">
      </div>
      <div class="part3">
        <div class="p3_con">
          <div class="p3_con_d">
            <div class="p3_con_d_d1">
              <p>注：好友注册90天内的充值金额作为你的提成基数</p>
              <p>逾期将不再提成，奖励为50%赠金+50%现金</p>
            </div>
            <div class="p3_con_d_d2">
              <div class="p3_share"
                   @click="handleShow">
                <router-link to=""
                             class="p3_share_a">
                  邀请好友一起赚钱
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <mt-popup v-model="popupVisible"
                position="bottom"
                class="pop_con"
                closeOnClickModal="true">
        <div class="pop_con_box">
          <div class="pop_con_header">
            <p class="pop_p1">分享到</p>
            <p class="pop_p2">
              <span>每天首次分享财富值</span>
              <span class="num_fine">+5</span></p>
          </div>
          <div class="pop_con_sec">
            <div class="sec_1">
              <p class="btn"
                 @click="copy('微信')">
                <img src="../../../../assets/images/memberCenter/wx.png"
                     alt="微信">
                <span>微信</span>
              </p>
              <p class="btn"
                 @click="copy('短信')">
                <img src="../../../../assets/images/memberCenter/dx.png"
                     alt="短信">
                <span>短信</span>
              </p>
              <p class="btn"
                 @click="copy('朋友圈')">
                <img src="../../../../assets/images/memberCenter/pyq.png"
                     alt="朋友圈">
                <span>朋友圈</span>
              </p>
              <p class="btn"
                 @click="copy('新浪微博')">
                <img src="../../../../assets/images/memberCenter/xl.png"
                     alt="新浪微博">
                <span>新浪微博</span>
              </p>
            </div>
            <div class="sec_1">
              <p class="btn"
                 @click="copy('QQ好友')">
                <img src="../../../../assets/images/memberCenter/qq.png"
                     alt="qq">
                <span>QQ好友</span>
              </p>
              <p class="btn"
                 @click="copy('QQ空间')">
                <img src="../../../../assets/images/memberCenter/kj.png"
                     alt="空间">
                <span>QQ空间</span>
              </p>
              <p class="btn"
                 @click="copy('朋友圈')">
                <img src="../../../../assets/images/memberCenter/py.png"
                     alt="朋友网">
                <span>朋友网</span>
              </p>
              <p class="btn"
                 @click="copy('支付宝')">
                <img src="../../../../assets/images/memberCenter/aipay.png"
                     alt="支付宝好友">
                <span>支付宝好友</span>
              </p>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { Toast } from 'mint-ui'
export default {
  name: 'share',
  components: {
    layouts,
    HeaderView
  },
  data () {
    return {
      popupVisible: false
    }
  },
  methods: {
    handleShow () {
      this.popupVisible = true
    },
    copy (val) {
      const url = `${window.location.protocol}//${window.location.host}/#/power/login`
      this.$copyText(url).then(e => {
        this.popupVisible = false
        Toast({
          message: `赶快去${val}分享你的专属链接吧!`,
          position: 'middle',
          duration: 1000,
          iconClass: 'mintui mintui-success'
        })
      })
    }
  }
}
</script>

<style lang="stylus">
@import './share.styl'
</style>
