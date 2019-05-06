<template>
  <div class="user_body">
    <header-view :titles="'修改链接信息'">
      <router-link slot="header_Right"
                   to=''
                   class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content changeLink_view">
      <ul>
        <li class="name">链接码：{{!queryLink.code?'-':queryLink.code}}</li>
        <li class="timer">
          <p class="timer_left">创建日期：{{!queryLink.createTime?'-':queryLink.createTime}}</p>
          <p class="timer_right">过期时间：{{!queryLink.effictiveTime?'-':queryLink.effictiveTime}}</p>
        </li>
        <li style="clear:both;"></li>
        <li class="link_type">
          <div class="type">
            类型
            <p>{{queryLink.type===0?'会员':queryLink.type===1?'代理':'总代'}}</p>
          </div>
          <div class="pople_num">
            注册人数
            <p>{{!queryLink.currentRegisterNum?0:queryLink.currentRegisterNum}}</p>
          </div>
          <div class="status">
            状态
            <p>{{queryLink.status===1?'正常':'冻结'}}</p>
          </div>
        </li>
        <li class="input_box">
          <div class="input_list">
            <input type="text"
                   v-model="number"
                   placeholder="请输入注册人数上限" />
          </div>
          <div class="acc_h_d2"
               @click="handleShow">
            <i class="icons down_arrow"
               slot="icon"
               v-show="readonly">
              <svg-icon icon-class="down"></svg-icon>
            </i>
            <input placeholder="请输入时间数字,例如:30"
                   key="ss1"
                   :value="inpNum"
                   class="ipt_account"
                   @change="checkAccount"
                   @input="checkAccount"
                   @blur="checkPhoneNum"
                   :readonly="readonly"
                   maxlength="4" />
          </div>
        </li>
        <li class="input_btn">
          <input type="button"
                 class="btn_change"
                 @click="submitChange"
                 value="确认修改" />
        </li>
      </ul>
    </div>
    <mt-popup v-model="popupVisible"
              position="bottom"
              class="pop_con"
              closeOnClickModal="true">
      <div class="pop_con_b">
        <div class="pop_con_sec">
          <div class="sec_1">
            <div class="rk_b ripple">
              <mt-cell v-for="(item,idx) in time"
                       :key="item.day"
                       :title="item.name"
                       @click.native="clickTime($event,item,idx)">
                <span></span>
              </mt-cell>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
import moment from 'moment'
import { Toast } from 'mint-ui'
import { getLocal, removeLocal } from '@/utils/storage'
import { mapGetters } from 'vuex'
export default {
  name: 'changeLink',
  components: {
    HeaderView
  },
  data () {
    return {
      inpNum: '',
      popupVisible: false,
      number: '',
      account: '',
      date: '',
      readonly: true,
      custom: 0,
      linkDas: getLocal('linkData'),
      time: [{ day: 1, name: '1天' }, { day: 7, name: '7天' }, { day: 30, name: '30天' }, { day: 99, name: '永久' }, { day: 103, name: '自定义' }]
    }
  },
  computed: {
    ...mapGetters(['queryLink'])
  },
  created () {
    this.getSingleLinkInfo()
  },
  methods: {
    handleShow () {
      if (this.custom === 0) {
        this.popupVisible = true
      }
    },
    checkAccount (event) {
      let val = event.target.value.trim()
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.account = val
      } else {
        event.target.value = this.account
      }
    },
    checkPhoneNum () {
      let myDate = new Date()
      let nextDate = new Date(myDate.getTime() + this.account * 24 * 60 * 60 * 1000)
      this.date = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
      this.inpNum = this.account + '天'
      this.readonly = false
      if (this.inpNum.length === 1) {
        this.readonly = true
        this.date = ''
        this.custom = 0
      }
    },
    clickTime (event, item, idx) {
      if (item.day === 99) {
        this.date = '2036-01-01 23:59:59'
        this.inpNum = '永久'
        this.popupVisible = false
        return
      }
      if (item.day === 103) {
        this.account = ''
        this.readonly = false
        this.popupVisible = false
        this.custom = 1
        return
      }
      let myDate = new Date()
      let nextDate = new Date(myDate.getTime() + item.day * 24 * 60 * 60 * 1000)
      this.date = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
      this.inpNum = item.day + '天'
      this.popupVisible = false
    },
    submitChange () {
      if (!this.number) {
        Toast({
          message: '请输入上限人数',
          position: 'middle',
          duration: 1000
        })
        return false
      }
      if (!this.date) {
        Toast({
          message: '请选择日期',
          position: 'middle',
          duration: 1000
        })
        return false
      }
      let das = {
        maxRegisterNum: Number(this.number),
        effictiveTime: new Date(this.date).toISOString(),
        code: this.linkDas.code
      }
      this.$store.dispatch('showLoading')
      this.$store.dispatch('spreadLinks', das).then(res => {
        this.$store.dispatch('hideLoading')
        if (res.status) {
          Toast({
            message: '修改成功',
            duration: 1000,
            iconClass: 'mintui mintui-success'
          })
          this.getSingleLinkInfo()
        }
      }).catch(() => {
        this.$store.dispatch('hideLoading')
      })
    },
    getSingleLinkInfo () {
      this.$store.dispatch('singleLinks', { uuid: this.linkDas.code })
    }
  },
  beforeRouteLeave (to, from, next) {
    removeLocal('linkData')
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import './changeLink.styl'
</style>
