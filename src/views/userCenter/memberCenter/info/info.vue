<template>
  <div class="user_body">
    <header-view :titles="'个人资料'">
      <router-link slot="header_Right" to='' class="svg-container">
        <p>
        </p>
      </router-link>
    </header-view>
    <div class="mint-content info_view">
      <div class="part1">
        <div class="pt_Img">
          <img src="../../../../assets/images/userCenter/timg.png" />
        </div>
        <div class="input_con">
          <i class="icons icon_dd">
            <svg-icon icon-class="email"></svg-icon>
          </i>
          <input
            type="text"
            placeholder="请输入您的邮箱"
            v-model="emails"
            @change="checkEmailValue"
          >
        </div>
        <div class="input_con"  @click="handleShow">
          <i class="icons icon_dd">
            <svg-icon icon-class="area"></svg-icon>
          </i>
          <input
            type="text"
            placeholder="请输入您所在的城市"
            :value="areaName"
          >
        </div>
        <div class="input_con" @click="openPicker">
          <i class="icons icon_dd">
            <svg-icon icon-class="birthday"></svg-icon>
          </i>
          <input
            type="text"
            placeholder="请选择您的出生日期"
            v-model="date"
          >
        </div>
      </div>
      <div class="part2">
        <div class="real_ss" @click="handleBtn">提交</div>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      class="pop_cons"
      closeOnClickModal="true"
    >
      <div class="pop_con_b">
        <div class="pop_b_header">
          <p class="pop_p1" @click="handleClose">
            <i class="icons icon_left">
              <svg-icon icon-class="left"></svg-icon>
            </i>
          </p>
          <p class="pop_p2">选择开户城市</p>
          <p class="pop_p3" @click="handleClose">
            关闭
          </p>
        </div>
        <div class="pop_con_sec">
          <mt-picker :slots="myAddressSlots" @change="onMyAddressChange">
          </mt-picker>
        </div>
      </div>
    </mt-popup>
    <mt-datetime-picker
      ref="picker"
      type="date"
      :startDate="startDate"
      v-model="pickerValue"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirm"
    >
    </mt-datetime-picker>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { Picker, Toast } from 'mint-ui'
import myaddress from './address.json'
import { validateEmail } from '@/utils/validate'
import Loading from '@/components/public/loading/loadings'
import { mapGetters } from 'vuex'
let moment = require('moment')
export default {
  name: 'info',
  components: {
    layouts,
    HeaderView,
    'mt-picker': Picker,
    Loading
  },
  data() {
    return {
      popupVisible: false,
      showPop: false,
      date: '',
      myAddressProvince: '',
      myAddressCity: '',
      area: '',
      pickerValue: '',
      emails: '',
      startDate: new Date('1960-01-01'),
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), // 省份数组
          className: 'slot1',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ]
    }
  },
  computed: {
    areaName() {
      return this.showPop
        ? this.myAddressProvince + '' + this.myAddressCity
        : ''
    },
    ...mapGetters(['loading'])
  },
  methods: {
    handleShow() {
      this.popupVisible = true
      this.showPop = true
    },
    handleClose() {
      this.popupVisible = false
    },
    checkEmailValue() {
      if (!validateEmail(this.emails)) {
        Toast({
          message: '请填写正确的邮箱',
          position: 'middle',
          duration: 1500
        })
        return false
      }
    },
    openPicker() {
      this.$refs.picker.open()
    },
    handleConfirm(value) {
      this.pickerValue = moment(value).format('YYYY-MM-DD')
      this.date = moment(value).format('YYYY-MM-DD')
    },
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        picker.setSlotValues(1, myaddress[values[0]])
        picker.setSlotValues(5, myaddress[values[0]][values[1]])
        this.myAddressProvince = values[0]
        this.myAddressCity = values[1]
      }
    },
    handleBtn() {
      if (!validateEmail(this.emails)) {
        Toast({
          message: '请填写正确的邮箱',
          position: 'middle',
          duration: 1500
        })
        return false
      }
      if (!this.areaName) {
        Toast({
          message: '请选择开户城市',
          position: 'middle',
          duration: 1500
        })
        return false
      }
      if (!this.date) {
        Toast({
          message: '请选择出生日期',
          position: 'middle',
          duration: 1500
        })
        return false
      }
      const data = {
        emails: this.emails,
        areaName: this.areaName,
        date: this.date
      }
      const _that = this
      _that.$store.dispatch('showLoading')
      this.$store.dispatch('setUserDetails', data).then(res => {
        _that.$store.dispatch('hideLoading')
        if (res && res.status) {
          Toast({
            message: '设置成功',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push('/userCenter/home')
          }, 1500)
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.myAddressSlots[0].defaultIndex = 0
    })
  },
  destroyed() {
    this.showPop = false
  }
}
</script>

<style lang="stylus">
  @import './info.styl'
</style>
