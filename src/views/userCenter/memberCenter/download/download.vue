<template>
  <div class="user_body">
    <header-view :titles="'备用软件下载'">
      <router-link slot="header_Right" to='/register' class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content download_view">
      <div class="bgContainer">
        <div class="download_con">
          <div class="download_app">
            <div class="start" @click="download">
              <i></i>
              <span>应用下载</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
import { Toast } from 'mint-ui'
export default {
  name: 'download',
  components: {
    HeaderView
  },
  data() {
    return {}
  },
  mounted () {
    let u = window.navigator.userAgent
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    this.$nextTick(() => {
      if (isIOS) {
        this.setupWebViewJavascriptBridge(function(bridge) {
          // JS 被调用的方法  OCCallJSFunction 定义的标识
          bridge.registerHandler('OCCallJSFunction', function(data, responseCallback) {
            alert('JS方法被调用:' + data)
            responseCallback('js执行过了')
          })
        })
      }
    })
  },
  methods: {
    download() {
      let u = window.navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      let isWeiXin = u.match(/MicroMessenger/i)
      let isQQ = u.match(/\sQQ/i) === ' QQ'
      if (isWeiXin || isQQ) {
        document.querySelector('#info').style.display = 'block'
      } else {
        if (isAndroid) {
          Toast({
            message: '开始下载平台应用',
            position: 'middle',
            duration: 2000
          })
          let _that = this
          setTimeout(() => { _that.openWebPage() }, 2050)
        }
        if (isIOS) {
          let title = window.sessionStorage.getItem('merchantInfo')
          if (title) {
            title = JSON.parse(title).merchantName
            if (title === '期货交易通') {
              window.WebViewJavascriptBridge.callHandler('openWebPage', 'https://www.pgyer.com/qOtu')
            }
            // if (title === '全球理财通') {
            //   window.WebViewJavascriptBridge.callHandler('openWebPage', url)
            // }
          }
        }
      }
    },
    openWebPage() {
      window.JavaScriptInterface.openWebPage('http://xingshigj.com/v2/lc5_1.0.0_release.apk')
    },
    setupWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
      window.WVJBCallbacks = [callback]
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
  }
}
</script>

<style lang="stylus">
  @import 'download.styl'
</style>
