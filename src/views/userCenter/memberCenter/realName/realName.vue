<template>
  <div class="user_body">
    <header-view :titles="'实名认证'">
      <div slot="header_Right"
           class="svg-container">
        <p></p>
      </div>
    </header-view>
    <div class="mint-content realName_view">
      <div v-if="!isUserVierity">
        <div class="realName_partTop">
          <div class="real_title">
            <p>
              <span class="iconb">!</span>
              <span>请填写您的真实信息，通过后将不能修改</span>
            </p>
          </div>
          <mt-field label="真实姓名"
                    :state="nameState"
                    v-model="realNameForm.name"
                    placeholder="请输入您的真实姓名"
                    :attr="{ maxlength: 11 }"
                    @blur.native.capture="checkName">
          </mt-field>
          <mt-field label="身份证号"
                    :state="codeState"
                    v-model="realNameForm.code"
                    placeholder="请输入您的身份证号"
                    :attr="{ maxlength: 18 }"
                    @blur.native.capture="checkCode">
          </mt-field>
        </div>
        <div class="part2">
          <div class="real_ss"
               @click="submitData">立即认证</div>
          <div class="tips">
            <p>温馨提示：如需帮助请联系客服</p>
          </div>
        </div>
      </div>
      <div class="hasRealName"
           v-else>
        <i class="icons icon_realname">
          <svg-icon icon-class="realname"></svg-icon>
        </i>
        <div class="realname_txt">
          您已完成实名认证
        </div>
        <div class="back_btn"
             @click="backHome">
          <p>返回首页</p>
        </div>
      </div>
    </div>
    <loading v-show="loading"
             msg="提交认证中.."></loading>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { validateName, validateCardNo } from '@/utils/validate'
import Loading from '@/components/public/loading/loadings'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { getLocal, setLocal } from '@/utils/storage'
export default {
  name: 'realName',
  components: {
    layouts,
    HeaderView,
    Loading
  },
  data () {
    return {
      realNameForm: {
        name: '',
        code: ''
      },
      nameState: 'warning',
      codeState: ''
    }
  },
  computed: {
    ...mapGetters(['loading', 'sec_info']),
    isUserVierity () {
      return getLocal('isUserVierity') ? getLocal('isUserVierity') : 0
    }
  },
  methods: {
    checkName () {
      if (validateName(this.realNameForm.name)) {
        this.nameState = 'success'
      } else {
        this.nameState = 'warning'
      }
    },
    checkCode () {
      if (validateCardNo(this.realNameForm.code)) {
        this.codeState = 'success'
      } else {
        this.codeState = 'warning'
      }
    },
    submitData () {
      if (this.codeState !== 'success' || this.nameState !== 'success') {
        Toast({
          message: '请输入正确的姓名和身份证号',
          duration: 1500,
          position: 'middle',
          iconClass: 'mintui mintui-field-warning'
        })
        return false
      }
      const _that = this
      _that.$store.dispatch('showLoading')
      this.$store.dispatch('realNameVerified', this.realNameForm).then(res => {
        _that.$store.dispatch('hideLoading')
        if (res && res.status) {
          setLocal('isUserVierity', 1)
          Toast({
            message: '实名认证成功',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push('/userCenter/securityCenter')
          }, 2000)
        }
      })
    },
    backHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus">
@import './realName.styl'
</style>
