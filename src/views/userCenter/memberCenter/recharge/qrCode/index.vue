<template>
  <div id="play_page">
    <div id="qrCodes">
      <div class="qrCode_title">
        <p>付款码</p>
      </div>
      <div class="qr_background">
        <div class="code"
             style="margin:25px auto 0;width:160px;">
          <vue-qr :text="links"
                  :size="160"
                  :margin="0"
                  id="sss">
          </vue-qr>
        </div>
        <div class="functionOnclick">
          <p @click="copyLink">复制链接</p>
          <!-- <a class="downLoadImg"
             :href="base64"
             download="w3logo">下载图片</a> -->
        </div>
        <div class="tip">
          <p>请保存二维码或复制链接<br />到浏览器打开</p>
        </div>
      </div>
    </div>
    <div class="play_mask"></div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import VueQr from 'vue-qr'
import { Toast } from 'mint-ui'
export default {
  components: {
    QRCode,
    VueQr
  },
  props: {
    qrFlat: {
      type: Boolean,
      default: false
    },
    codeUrl: {
      type: String
    }
  },
  data () {
    return {
      channelName: '支付页面',
      links: '',
      base64: ''
    }
  },
  watch: {
    codeUrl (n) {
      this.links = n
      // this.useqrcode(n)
    }
  },
  methods: {
    copyLink () {
      this.$copyText(this.links).then(e => {
        Toast({
          message: '复制成功',
          position: 'middle',
          duration: 1000,
          iconClass: 'mintui mintui-success'
        })
      })
    }
    // useqrcode (arg) {
    //   const _that = this
    //   let a = arg.split(':')
    //   let b = a[0]
    //   let url = b === 'http' ? arg : `http://${arg}`
    //   let qrcode = new QRCode('qrcode', {
    //     width: 160,
    //     height: 160, // 高度
    //     text: url, // 二维码内容
    //     // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
    //     background: '#f0f',
    //     foreground: '#ff0'
    //   })
    //   if (qrcode) {
    //     let imgBox = document.getElementById('qrcode')
    //     let img = imgBox.getElementsByTagName('img')
    //     setTimeout(() => {
    //       _that.base64 = img[0].src
    //     }, 200)
    //   }
    // }
  }
}
</script>

<style lang="stylus">
#play_page
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 99
  .play_mask
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background #6989ff
#qrCodes
  width 90%
  height 350px
  position absolute
  background #ffffff
  left 50%
  top 60px
  margin-left -45%
  z-index 100
  .qrCode_title
    width 100%
    height 36px
    background #e4e9fb
    text-align center
    line-height 36px
#qrcode
  width 160px
  height 160px
  margin 30px auto 0
.functionOnclick
  width 160px
  margin 0 auto
  p
    display block
    font-size 15px
    line-height 50px
    text-align center
    color #6989ff
.tip
  clear both
  text-align center
  color #888
</style>
