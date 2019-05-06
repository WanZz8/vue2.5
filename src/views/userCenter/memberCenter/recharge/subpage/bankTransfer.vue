<template>
  <div class="user_body">
    <header-view :titles="!payList||!payList.channelName?'充值':payList.channelName"
                 :headerLeft='true'>
      <div class="home_back_icon"
           slot="header_Left"
           @click='goBack'>
        <i class="icons icon_Back">
          <svg-icon icon-class="left"></svg-icon>
        </i>
      </div>
      <router-link slot="header_Right"
                   to=''
                   class="svg-container">
        <p />
      </router-link>
    </header-view>
    <div class="mint-content rechar_view">
      <div class="part1">
        <div class="part1_p">
          <div class="par_lf">
            <img src="../../../../../assets/images/userCenter/timg.png" />
          </div>
          <div class="par_rt">
            <!-- <p>
              <span class="vip">VIP</span>
            </p> -->
            <p>
              <span class="nikeName">昵称：<i style="font-weight:600;font-size:15px">{{userInfo.userName}}</i></span>
              <span class="vip">VIP</span>
            </p>
            <p class="balace_wrap">
              <span class="balace">账户余额&nbsp;(&yen;)</span>
              <span class="money">&nbsp;{{balance.balance>0?balance.balance.toFixed(2):0.00}}元</span>
            </p>
            <p class="present_wrap">
              <!--<span>当前汇率:</span>-->
              <!--<span>6.3633人民币/美元</span>-->
            </p>
          </div>
        </div>
      </div>
      <div class="p2_title">
        <p class="p2_ti_p1">请输入支付金额</p>
      </div>
      <div class="p2_list_input">
        <input type="number"
               name="money"
               :value="moneyNumber"
               @input="change"
               @change="change"
               placeholder="请输入金额" />
      </div>
      <div class="content_txt">
        <h3>温馨提示</h3>
        <p>1、为了您的资金安全，您的账户我们将交由第三方银行托管</p>
        <p>2、充值前请注意您的银行卡的充值限额，以免造成不便</p>
        <p>3、禁止洗钱，信用卡套现，虚假交易等行为，一经发现并确认，将终止该账户的使用</p>
        <p>4、单笔充值不低于{{minAccount}}元，上限不超过{{maxAccount}}元，每张银行卡单日充值上限依据各家银行而定</p>
        <p>5、如您需要协助，请及时与我们的<router-link to="/service">在线客服</router-link>取得联系竭诚为您服务！</p>
      </div>
      <div class="recharge_btn">
        <button @click="goRecharge">充值</button>
      </div>
    </div>
    <transition name="fade"
                mode="out-in">
      <qr-code v-show="rechargeQr"
               :qrFlat='rechargeQr'
               :codeUrl="codeUrl"></qr-code>
    </transition>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { mapGetters } from 'vuex'
import { getSession, getLocal, removeSession } from '@/utils/storage'
import { Toast } from 'mint-ui'
import qrCode from '../qrCode'
import { setTimeout } from 'timers'
export default {
  name: 'bankTransfer',
  components: {
    layouts,
    HeaderView,
    qrCode
  },
  data () {
    return {
      moneyNumber: '',
      payList: getSession('payList'),
      minAccount: 100,
      maxAccount: 10000,
      rechargeQr: false,
      codeUrl: '',
      type: ''
    }
  },
  created () {
    this.getBalance()
  },
  computed: {
    ...mapGetters(['balance', 'userInfo'])
  },
  mounted () {
    let u = window.navigator.userAgent
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    this.$nextTick(() => {
      if (isIOS) {
        this.setupWebViewJavascriptBridge(function (bridge) {
          // JS 被调用的方法  OCCallJSFunction 定义的标识
          bridge.registerHandler('OCCallJSFunction', function (data, responseCallback) {
            alert('JS方法被调用:' + data)
            responseCallback('js执行过了')
          })
        })
      }
    })
    if (this.payList.channelUuid === '7e669d7856be11e98e58000d3a80ddde') {
      this.maxAccount = 5000
      return
    }
    if (this.payList.channelUuid === '1246374c5b5511e98e58000d3a80ddde') {
      this.maxAccount = 50000
    }
  },
  methods: {
    change (event) {
      let val = event.target.value.trim()
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.moneyNumber = val
      } else {
        event.target.value = this.moneyNumber
      }
    },
    getBalance () {
      this.$store.dispatch('balance')
    },
    goBack () {
      if (this.rechargeQr) {
        this.codeUrl = ''
        this.rechargeQr = false
        return false
      }
      this.$router.go(-1)
    },
    goRecharge () {
      let isUserVierity = getLocal('isUserVierity') || getLocal('userInfo').isUserVierity
      if (isUserVierity) {
        this.btnRecharge()
      } else {
        Toast({
          message: '请先完成实名认证',
          position: 'middle',
          duration: 1000
        })
      }
    },
    btnRecharge () {
      const _that = this
      let das = {
        amount: this.moneyNumber,
        channelUuid: this.payList.channelUuid,
        channelName: this.payList.channelName
      }
      if (!this.moneyNumber) {
        Toast({
          message: '充值金额不正确',
          duration: 2000
        })
        return false
      }
      if (this.moneyNumber < this.minAccount || this.moneyNumber > this.maxAccount) {
        Toast({
          message: `充值金额不能小于${this.minAccount}且不能大于${this.maxAccount}`,
          duration: 2000
        })
        return false
      }
      _that.$store.dispatch('showLoading')
      _that.$store.dispatch('deposit', das).then(res => {
        _that.$store.dispatch('hideLoading')
        if (res.status) {
          _that.moneyNumber = ''
          // location.href = res.date-range-list
          this.type = res.type
          if (res.type === 'URL') {
            _that.rechargeQr = true
            _that.codeUrl = res.data
            _that.openRecharge(res.data)
            return false
          }
          Toast({
            message: res.msg,
            duration: 2000
          })
        }
      }).catch(() => {
        _that.$store.dispatch('hideLoading')
      })
    },
    openRecharge (url) {
      let u = window.navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      let isWeiXin = u.match(/MicroMessenger/i)
      let isQQ = u.match(/\sQQ/i) === ' QQ'
      if (isWeiXin || isQQ) {
        // document.querySelector('#info').style.display = 'block'
      } else {
        if (isAndroid) {
          window.JavaScriptInterface.openWebPage(url)
        }
        if (isIOS) {
          window.WebViewJavascriptBridge.callHandler('openWebPage', url)
        }
      }
    },
    setupWebViewJavascriptBridge (callback) {
      if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
      if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
      window.WVJBCallbacks = [callback]
      var WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
  },
  beforeRouteLeave (to, from, next) {
    removeSession('payList')
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import './bankTransfer.styl'
</style>
