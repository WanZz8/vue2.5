<template>
  <div class="user_body">
    <header-view :titles="'登录'">
      <router-link slot="header_Right"
                   to='/power/register'
                   class="svg-container">
        <p>立即注册</p>
      </router-link>
    </header-view>
    <layouts type="userPrivileges">
      <template slot="content">
        <div class="mint-content userPrivileges_view">
          <div class="user_header">
            <img src="../../../assets/images/common/loginHeader.png"
                 alt="logo"
                 class="user_h_img"
                 v-if="!merchantInfo">
            <img v-else
                 :src="!merchantInfo?'':merchantInfo.merchantSetting.logoUrl"
                 alt="logo"
                 class="user_h_img">
            <h1 class="register_title">欢迎来到{{merchantInfo?merchantInfo.merchantName:''}}</h1>
          </div>
          <div class="login_view">
            <div class="username">
              <!-- <label>手机号码</label> -->
              <i class="icons icon_User">
                <svg-icon icon-class="user"></svg-icon>
              </i>
              <input type="text"
                     name="user"
                     maxlength="11"
                     @input="change"
                     @change="change"
                     :value="inpNum"
                     placeholder="请输入手机号码">
            </div>
            <div class="password">
              <!-- <label>密码</label> -->
              <i class="icons icon_Pwd">
                <svg-icon icon-class="password"></svg-icon>
              </i>
              <input :type="eye_type?'password':'text'"
                     name="pwd"
                     v-model="ruleForm.password"
                     placeholder="请输入密码">
              <div class="eyeIcon"
                   @click="clickEye">
                <i class="icons icon_eye">
                  <svg-icon :icon-class="eye_type?'eye_close':'eye_open'"></svg-icon>
                </i>
              </div>
            </div>
            <div class="forget_Pdw">
              <div class="rPassword"
                   @click="submitRpassword($event)">
                <input class="select-tag-input"
                       type="checkbox"
                       id="tag-id"
                       @click="submitRpassword($event)"
                       v-model='optionVal'
                       style="display:none;">
                <label class="tag-label"
                       for="tag-id"></label>
                <span>记住密码</span>
              </div>
              <router-link to="/power/forget">忘记密码?</router-link>
            </div>
            <div class="submit_login">
              <input type="button"
                     @click="login_btn"
                     name="logins"
                     value="登录">
            </div>
          </div>
        </div>
        <loading v-show="loading"
                 msg="登录中"></loading>
      </template>
    </layouts>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
import layouts from '@/components/layout/contentView'
import Loading from '@/components/public/loading/loadings'
import { mapGetters } from 'vuex'
import { setForage, reForage, getForage } from '@/utils/storage'
import utils from '@/utils/'
// import utils from '@/utils/'
export default {
  name: 'login',
  components: {
    layouts,
    HeaderView,
    Loading
  },
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      optionVal: false,
      eye_type: true
    }
  },
  computed: {
    ...mapGetters(['loading', 'key', 'merchantInfo']),
    inpNum () {
      return this.ruleForm.username
    }
  },
  created () {
    this.$store.dispatch('publicKey')
    if (!this.merchantInfo) {
      this.$store.dispatch('getMerchantInfo')
    }
  },
  mounted () {
    getForage('userMsg').then(res => {
      if (res && res.isCheck) {
        this.optionVal = res.isCheck
        this.ruleForm.username = res.username
        this.ruleForm.password = utils.decrypt(res.password, res.sass)
      }
    })
  },
  methods: {
    change (event) {
      let val = event.target.value.trim()
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.ruleForm.username = val
      } else {
        event.target.value = this.ruleForm.username
      }
    },
    submitRpassword (e) {
      this.optionVal = !this.optionVal
    },
    login_btn () {
      const _that = this
      if (!this.ruleForm.username || !this.ruleForm.password) {
        _that.$toast('手机号或者密码不能为空')
        return false
      }
      _that.$store.dispatch('showLoading')
      this.$store.dispatch('login', this.ruleForm).then(res => {
        _that.$store.dispatch('hideLoading')
        if (res.status) {
          let pswKey = utils.ramdomString(8)
          let userInfoRule = {
            username: this.ruleForm.username,
            password: utils.encrypt(this.ruleForm.password, pswKey),
            isCheck: this.optionVal,
            sass: pswKey
          }
          if (this.optionVal) {
            setForage('userMsg', userInfoRule)
          } else {
            reForage('userMsg')
          }
          _that.$toast({
            message: '登录成功',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 300
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 400)
        }
      })
    },
    clickEye () {
      this.eye_type = !this.eye_type
    }
    // clearCache () {
    //   let u = window.navigator.userAgent
    //   let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
    //   let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    //   let isWeiXin = u.match(/MicroMessenger/i)
    //   let isQQ = u.match(/\sQQ/i) === ' QQ'
    //   if (isWeiXin || isQQ) {
    //     // document.querySelector('#info').style.display = 'block'
    //   } else {
    //     if (isAndroid) {
    //       window.JavaScriptInterface.clearAllUIWebViewData()
    //     }
    //     if (isIOS) {
    //       console.log('执行ios的清除功能')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="stylus">
@import './login'
</style>
