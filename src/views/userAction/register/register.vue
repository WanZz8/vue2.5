<template>
  <div class="user_body">
    <header-view :titles="'注册'">
      <router-link slot="header_Right"
                   to='/power/login'
                   class="svg-container">
        <p>去登录</p>
      </router-link>
    </header-view>
    <layouts type="userPrivileges">
      <template slot="content">
        <div class="mint-content userPrivileges_view"
             v-show="!flat">
          <div class="user_header">
            <img src="../../../assets/images/common/loginHeader.png"
                 alt="logo"
                 class="user_h_img"
                 v-if="!merchantInfo">
            <img v-else
                 :src="!merchantInfo?'':merchantInfo.merchantSetting.logoUrl"
                 alt="logo"
                 class="user_h_img">
            <h1 class="register_title">欢迎注册{{merchantInfo?merchantInfo.merchantName:''}}</h1>
          </div>
          <div class="register_view">
            <div class="username">
              <i class="icons icon_User">
                <svg-icon icon-class="sec_phone" />
              </i>
              <input type="text"
                     name="user"
                     maxlength="11"
                     @input="change"
                     @change="change"
                     :value="inpNum"
                     placeholder="请输入手机号码">
            </div>
            <div class="phoneCode">
              <i class="icons icon_phoneCode">
                <svg-icon icon-class="phone_code" />
              </i>
              <input type="text"
                     name="phoneCode"
                     maxlength="6"
                     :value="phCodeNum"
                     @input="changePhcode"
                     @change="changePhcode"
                     placeholder="请输入手机验证码"
                     :readonly="iptSwitch"
                     @focus="checkPhoneNum">
              <div class="phoneCode_btn">
                <input type="button"
                       :disabled="disabled"
                       @click="sendImgCode"
                       name="getPhoneCode"
                       :value="timeText">
              </div>
            </div>
            <div class="password">
              <i class="icons icon_Pwd">
                <svg-icon icon-class="password"></svg-icon>
              </i>
              <input :type="eye_type?'password':'text'"
                     name="pwd"
                     maxlength="16"
                     v-model="ruleForm.password"
                     placeholder="请输入密码">
              <div class="eyeIcon"
                   @click="clickEye">
                <i class="icons icon_eye">
                  <svg-icon :icon-class="eye_type?'eye_close':'eye_open'" />
                </i>
              </div>
            </div>
            <div class="promoCode"
                 v-show="promoCode">
              <i class="icons icon_Pwd">
                <svg-icon icon-class="promoCode"></svg-icon>
              </i>
              <input type="text"
                     name="promoCode"
                     v-model="ruleForm.promoCode"
                     placeholder="请输入推广码">
            </div>
            <div class="opt">
              <input type="checkbox"
                     class="check_box tui-checkbox"
                     v-model="checkedNames"
                     @click='checkOut'>
              <span>阅读并同意
                <b @click="showUserAgreement">《{{merchantInfo?merchantInfo.merchantName:''}}用户服务协议》</b>
              </span>
            </div>
            <div class="submit_register">
              <input type="button"
                     @click="register_btn"
                     name="register"
                     value="注册">
            </div>
          </div>
          <transition name="modal-fade">
            <div class="modal-backdrop"
                 v-show="isModalVisible">
              <div class="modal">
                <div class="modal-header">
                  <div class="modal-close">
                    请填写验证码
                  </div>
                </div>
                <div class="modal-body">
                  <div class="code">
                    <i class="icons icon_Code">
                      <svg-icon icon-class="code"></svg-icon>
                    </i>
                    <input type="text"
                           name="code"
                           maxlength="4"
                           v-model="ruleForm.code"
                           placeholder="请输入验证码">
                    <div class="code_img"
                         @click="refreshImgCode">
                      <img :src="'data:image/png;base64,'+ this.img" />
                    </div>
                  </div>
                  <div class="refresh_btn">
                    点击按钮以更换验证码
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="phoneCode_btn">
                    <input type="button"
                           @click="sendPhoneCode"
                           name="getPhoneCode"
                           value="确定">
                  </div>
                  <div class="phoneCode_btn">
                    <input type="button"
                           @click="closeModal"
                           name="getPhoneCode"
                           value="取消">
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </template>
    </layouts>
    <userAgreenMent :flat='flat'
                    @closeUserAgreement='closeUserAgreement'></userAgreenMent>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { getLocal } from '@/utils/storage'
import HeaderView from '@/components/layout/header'
import layouts from '@/components/layout/contentView'
import userAgreenMent from './userAgreement'
import { isvalidPhone, isvalidPssword } from '@/utils/validate'
export default {
  name: 'register',
  components: {
    layouts,
    HeaderView,
    userAgreenMent
  },
  data () {
    return {
      ruleForm: {
        userphone: '',
        username: '',
        password: '',
        code: '',
        phoneCode: '',
        promoCode: '',
        checked: true
      },
      flat: false,
      checkedNames: false,
      timeText: '获取验证码',
      disabled: false,
      time: 60,
      eye_type: true,
      isModalVisible: false
    }
  },
  // watch: {
  //   // phoneNum(newValue, oldValue) {
  //   //   if (newValue > oldValue) {
  //   //     if (newValue.length === 4 || newValue.length === 9) {
  //   //       let pre = newValue.substring(0, newValue.length - 1)
  //   //       let last = newValue.substr(newValue.length - 1, 1)
  //   //       this.telephone = pre + ' ' + last
  //   //     } else {
  //   //       this.telephone = newValue
  //   //     }
  //   //   } else {
  //   //     if (newValue.length === 9 || newValue.length === 4) {
  //   //       this.telephone = this.telephone.trim()
  //   //     } else {
  //   //       this.telephone = newValue
  //   //     }
  //   //   }
  //   // }
  // },
  created () {
    if (!this.merchantInfo) {
      this.$store.dispatch('getMerchantInfo')
    }
    // this.$store.dispatch('getImgCode')
  },
  computed: {
    ...mapGetters({
      img: 'imgCode',
      merchantInfo: 'merchantInfo'
    }),
    inpNum () {
      return this.ruleForm.userphone
    },
    phCodeNum () {
      return this.ruleForm.phoneCode
    },
    iptSwitch () {
      return !isvalidPhone(this.ruleForm.userphone)
    },
    promoCode () {
      let merchantInfo = this.merchantInfo
      if (merchantInfo) {
        let link = location.host
        let das = link.split('.')
        if (das[das.length - 3] === 'www' || das[das.length - 3].toUpperCase() === merchantInfo.merchantCode.toUpperCase()) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
    change (event) {
      let val = event.target.value.trim()
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.ruleForm.userphone = val
      } else {
        event.target.value = this.ruleForm.userphone
      }
    },
    checkOut () {
      if (this.checkedNames) {
        this.flat = true
      }
    },
    showUserAgreement () {
      this.flat = true
    },
    changePhcode (event) {
      let val = event.target.value.trim()
      if (/^[0-9]\d*$|^$/.test(val)) {
        this.ruleForm.phoneCode = val
      } else {
        event.target.value = this.ruleForm.phoneCode
      }
    },
    checkPhoneNum () {
      const _that = this
      if (!isvalidPhone(this.ruleForm.userphone)) {
        _that.$toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
      }
      return false
    },
    closeUserAgreement (val) {
      this.flat = val
    },
    // 关闭模态框
    closeModal () {
      this.isModalVisible = false
      this.disabled = false
    },
    // 获取图形验证码
    sendImgCode () {
      const _that = this
      if (!isvalidPhone(this.ruleForm.userphone)) {
        _that.$toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
        return
      }
      // console.log(this.ruleForm)
      this.$store.dispatch('getImgCode', this.ruleForm).then(res => {
        if (res && res.status && res.data) {
          this.isModalVisible = true
          this.disabled = true
        }
      })
    },
    refreshImgCode () {
      this.$store.dispatch('getImgCode', this.ruleForm)
    },
    // 获取短信验证码
    sendPhoneCode () {
      this.$store.dispatch('showLoading')
      this.$store.dispatch('getPhoneCode', this.ruleForm).then(res => {
        this.$store.dispatch('hideLoading')
        if (res.status) {
          this.isModalVisible = false
          this.timer()
        }
      }).catch(() => {
        this.$store.dispatch('hideLoading')
      })
    },
    register_btn () {
      const _that = this
      // 1. 验证手机号非空
      if (!isvalidPhone(this.ruleForm.userphone)) {
        _that.$toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (!this.ruleForm.phoneCode) {
        _that.$toast({
          message: '请填写您的短信验证码',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (!isvalidPssword(this.ruleForm.password)) {
        _that.$toast({
          message: '请填写6-16位的英文或数字密码',
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (!this.checkedNames) {
        _that.$toast({
          message: '没有同意用户协议',
          position: 'middle',
          duration: 2000
        })
        return false
      }
      let link = location.host
      let das = link.split('.')
      if (das[das.length - 3] !== 'www' || das[das.length - 3].toUpperCase() !== this.merchantInfo.merchantCode.toUpperCase()) {
        this.ruleForm.promoCode = das[das.length - 3]
      }
      this.$store.dispatch('showLoading')
      this.$store.dispatch('register', this.ruleForm).then(res => {
        this.$store.dispatch('hideLoading')
        if (res && res.status) {
          _that.$toast({
            message: '注册成功',
            position: 'middle',
            duration: 1000,
            iconClass: 'mintui mintui-success'
          })
          if (res.data.token && res.data) {
            setTimeout(() => {
              this.$router.push('/')
            }, 2000)
          }
        }
      }).catch(() => {
        this.$store.dispatch('hideLoading')
      })
    },
    /**
     * 倒计时器
     */
    timer: function () {
      if (this.time > 0) {
        this.time--
        this.timeText = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 60
        this.timeText = '获取验证码'
        this.disabled = false
      }
    },
    /**
     * 密码显示隐藏
     */
    clickEye () {
      this.eye_type = !this.eye_type
    }
  }
}
</script>
<style lang="stylus">
@import './register.styl'
</style>
