<template>
  <div class="user_body">
    <header-view :titles="'修改资金密码'">
    </header-view>
    <div class="mint-content userPrivileges_view">
      <div class="forget_view">
        <div class="user_header">
          <img :src="merchant.merchantSetting.logoUrl"
               alt="header"
               class="user_h_img">
          <p>{{merchant.merchantName}}</p>
        </div>
        <div class="username">
          <i class="icons icon_User">
            <svg-icon icon-class="user"></svg-icon>
          </i>
          <input type="text"
                 name="user"
                 maxlength="11"
                 @input="change"
                 @change="change"
                 :value="inpNum"
                 readonly
                 placeholder="请输入手机号码">
        </div>
        <div class="phoneCode">
          <i class="icons icon_phoneCode">
            <svg-icon icon-class="phone_code"></svg-icon>
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
          <input :type="eye_type1?'password':'text'"
                 name="pwd"
                 v-model="ruleForm.password"
                 placeholder="请输入密码">
          <div class="eyeIcon"
               @click="clickEye1">
            <i class="icons icon_eye">
              <svg-icon :icon-class="eye_type1
                ?'eye_close'
                :'eye_open'">
              </svg-icon>
            </i>
          </div>
        </div>
        <div class="password">
          <i class="icons icon_Pwd">
            <svg-icon icon-class="password"></svg-icon>
          </i>
          <input :type="eye_type2?'password':'text'"
                 name="pwd"
                 v-model="ruleForm.comfirmPwd"
                 placeholder="确认密码">
          <div class="eyeIcon"
               @click="clickEye2">
            <i class="icons icon_eye">
              <svg-icon :icon-class="eye_type2
              ?'eye_close'
              :'eye_open'">
              </svg-icon>
            </i>
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
                  点击图片更换验证码
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
        <div class="submit_comfirm">
          <input type="button"
                 @click="comfirm_btn"
                 name="comfirm"
                 value="确认">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { isvalidPhone, isvalidPssword } from '@/utils/validate'
import { setLocal, getLocal, getSession } from '@/utils/storage'
export default {
  name: 'changeFundPass',
  components: {
    layouts,
    HeaderView
  },
  data () {
    return {
      isModalVisible: false,
      ruleForm: {
        userphone: '',
        password: '',
        comfirmPwd: '',
        code: '',
        phoneCode: '',
        checked: true
      },
      merchant: getSession('merchantInfo'),
      timeText: '获取验证码',
      disabled: false,
      time: 60,
      eye_type1: true,
      eye_type2: true
    }
  },
  computed: {
    ...mapGetters({
      img: 'imgCode'
    }),
    inpNum () {
      return this.ruleForm.userphone
    },
    phCodeNum () {
      return this.ruleForm.phoneCode
    },
    iptSwitch () {
      return !isvalidPhone(this.ruleForm.userphone)
    }
  },
  created () {
    const userPhone = getLocal('userInfo')
      ? getLocal('userInfo').userPhone
      : ''
    this.ruleForm.userphone = userPhone
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
    changePhcode (event) {
      let val = event.target.value.trim()
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.ruleForm.phoneCode = val
      } else {
        event.target.value = this.ruleForm.phoneCode
      }
    },
    checkPhoneNum () {
      if (!isvalidPhone(this.ruleForm.userphone)) {
        Toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
      }
      return false
    },
    // 关闭模态框
    closeModal () {
      this.isModalVisible = false
      this.disabled = false
    },
    // 获取图形验证码
    sendImgCode () {
      if (!isvalidPhone(this.ruleForm.userphone)) {
        Toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
        return
      }
      this.$store.dispatch('getImgCode').then(res => {
        if (res && res.status && res.data) {
          this.isModalVisible = true
          this.disabled = true
        }
      })
    },
    refreshImgCode () {
      this.$store.dispatch('getImgCode', this.ruleForm)
    },
    sendPhoneCode () {
      this.$store.dispatch('showLoading')
      this.$store.dispatch('getFunsPhoneCode', this.ruleForm).then(res => {
        this.$store.dispatch('hideLoading')
        if (res.status) {
          this.isModalVisible = false
          this.timer()
        }
      }).catch(() => {
        this.$store.dispatch('hideLoading')
      })
    },
    comfirm_btn () {
      if (!isvalidPhone(this.ruleForm.userphone)) {
        Toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (!this.ruleForm.phoneCode) {
        Toast({
          message: '请填写您的短信验证码',
          position: 'middle',
          duration: 1500
        })
        return
      }
      if (!isvalidPssword(this.ruleForm.password)) {
        Toast({
          message: '请填写6-16位的英文或数字密码',
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (this.ruleForm.password !== this.ruleForm.comfirmPwd) {
        Toast({
          message: '两次密码输入不一致',
          position: 'middle',
          duration: 2000
        })
        return
      }
      this.$store.dispatch('setFundPass', this.ruleForm).then(res => {
        if (res && res.status) {
          this.ruleForm.phoneCode = ''
          this.ruleForm.password = ''
          this.ruleForm.comfirmPwd = ''
          setLocal('isSetFundPass', 1)
          Toast({
            message: '修改成功',
            position: 'middle',
            duration: 1000,
            iconClass: 'mintui mintui-success'
          })
        }
      })
    },
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
    clickEye1 () {
      this.eye_type1 = !this.eye_type1
    },
    clickEye2 () {
      this.eye_type2 = !this.eye_type2
    }
  }
}
</script>

<style lang="stylus">
@import './changeFundPass.styl'
</style>
