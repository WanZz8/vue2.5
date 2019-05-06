<template>
  <div class="user_body">
    <header-view :titles="'添加银行卡'">
    </header-view>
    <div class="mint-content addCard_views">
      <div class="part1">
        <div class="real_title">
          <p>
            <span class="iconb">!</span>
            <span>请填写您的真实信息，通过后将不能修改</span>
          </p>
        </div>
        <div class="realContent">
          <div class="realInput rp1">
            <span>真实姓名</span>
            <input type="text"
                   placeholder="请输入您的真实姓名"
                   name="withdraw"
                   class="with_ipt"
                   @focus="checkStart"
                   @blur="checkEnd"
                   v-model="bankList.accountName">
          </div>
          <div class="realInput">
            <span>银行卡号</span>
            <input type="text"
                   placeholder="请输入您的银行卡号"
                   name="withdraw"
                   class="with_ipt"
                   maxlength="19"
                   :value="bankNum"
                   @input="changeBankNum"
                   @change="changeBankNum">
          </div>
          <div class="realInput"
               @click="handleBankShow">
            <span>开户银行</span>
            <input type="text"
                   placeholder="请输入您的开户银行"
                   name="withdraw"
                   class="with_ipt"
                   readonly
                   :value="bankNameCode">
          </div>
          <div class="realInput"
               @click="handleShow">
            <span>开户城市</span>
            <input type="text"
                   placeholder="请输入您的开户城市"
                   name="withdraw"
                   class="with_ipt"
                   readonly
                   :value="areaName" />
          </div>
          <div class="realInput">
            <span>开户支行</span>
            <input type="text"
                   placeholder="请输入您的开户支行"
                   name="withdraw"
                   class="with_ipt">
          </div>
        </div>
      </div>
      <div class="part2"
           @click="handleBtn">
        <div class="real_ss">提交</div>
      </div>
      <mt-popup v-model="popupVisible1"
                position="bottom"
                class="pop_consBank"
                closeOnClickModal="true">
        <div class="pop_con_b">
          <div class="pop_b_header">
            <p class="pop_p1"
               @click="handleClose">
              <i class="icons icon_left">
                <svg-icon icon-class="left"></svg-icon>
              </i>
            </p>
            <p class="pop_p2">选择开户城市</p>
            <p class="pop_p3"
               @click="handleClose">
              关闭
            </p>
          </div>
          <div class="pop_con_sec">
            <mt-picker :slots="myAddressSlots"
                       @change="onMyAddressChange">
            </mt-picker>
          </div>
        </div>
      </mt-popup>
      <mt-popup v-model="popupVisible2"
                position="bottom"
                class="pop_consBank"
                closeOnClickModal="true">
        <div class="pop_con_b">
          <div class="pop_b_header">
            <p class="pop_p1"
               @click="handleBankClose">
              <i class="icons icon_left">
                <svg-icon icon-class="left"></svg-icon>
              </i>
            </p>
            <p class="pop_p2">{{loadBankList}}</p>
            <p class="pop_p3"
               @click="handleBankClose">
              关闭
            </p>
          </div>
          <div class="pop_con_sec">
            <mt-picker :slots="bankMapList"
                       ref="picker"
                       value-key="bankName"
                       @change="bankListChange">
            </mt-picker>
          </div>
          <!-- {{bankMapList}} -->
        </div>
      </mt-popup>
    </div>
    <loading v-show="loading"
             msg="加载中.."></loading>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { Picker, Toast } from 'mint-ui'
import myaddress from './address.json'
import Loading from '@/components/public/loading/loadings'
import { mapGetters } from 'vuex'
export default {
  name: 'addCard',
  components: {
    layouts,
    HeaderView,
    Loading,
    'mt-picker': Picker
  },
  data () {
    return {
      popupVisible1: false,
      popupVisible2: false,
      showPop1: false,
      showPop2: false,
      bankList: {
        accountName: '',
        accountNum: '',
        bankName: '',
        bankCity: ''
      },
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
      ],
      myAddressProvince: '',
      myAddressCity: '',
      loadBankList: '',
      area: '',
      bankArea: {},
      bankName: '',
      bankMapList: []
    }
  },
  computed: {
    ...mapGetters(['banklistId', 'loading']),
    areaName () {
      return this.showPop1
        ? this.myAddressProvince + '' + this.myAddressCity
        : ''
    },
    // bankName () {
    //   let bankName
    //   let solt
    //   let id
    //   let _that = this
    //   this.banklistId.forEach((item) => {
    //     bankName = item.bankName
    //     id = item.id
    //     _that.obj[bankName] = id
    //     _that.obj1[bankName] = item.bankCode
    //     solt = [
    //       {
    //         flex: 1,
    //         defaultIndex: 1,
    //         values: Object.keys(_that.obj), // 银行数组
    //         className: 'slot1',
    //         textAlign: 'center'
    //       }
    //     ]
    //   })
    //   return solt
    // let bankList = this.banklistId
    // console.log(bankList)
    // },
    bankNameCode () {
      return this.showPop2 ? this.bankName + '' : ''
    },
    bankNum () {
      return this.bankList.accountNum
    }
  },
  created () {
  },
  methods: {
    change () {
      this.bankList.accountName = this.bankList.accountName.replace(/[^\u4E00-\u9FA5]/g, '')
    },
    checkStart () {
      this.checkInterval = setInterval(this.change, 100)
    },
    checkEnd () {
      clearInterval(this.checkInterval)
    },
    changeBankNum (event) {
      let val = event.target.value.trim()
      if (/^[0-9]\d*$|^$/.test(val)) {
        this.bankList.accountNum = val
      } else {
        event.target.value = this.bankList.accountNum
      }
    },
    handleShow () {
      this.popupVisible1 = true
      this.showPop1 = true
    },
    handleClose () {
      this.popupVisible1 = false
    },
    onMyAddressChange (picker, values) {
      if (myaddress[values[0]]) {
        picker.setSlotValues(1, myaddress[values[0]])
        picker.setSlotValues(5, myaddress[values[0]][values[1]])
        this.myAddressProvince = values[0]
        this.myAddressCity = values[1]
      }
    },
    handleBankShow () {
      this.popupVisible2 = true
      this.showPop2 = true
      // 银行卡列表
      if (this.banklistId.length <= 0) {
        this.loadBankList = '银行卡列表载入中'
        this.$store.dispatch('getQueryBankList').then(res => {
          if (res.status) {
            this.loadBankList = '选择开户银行'
            this.bankListNumber(res.data)
            return
          }
          this.loadBankList = '银行卡载入失败'
        }).catch(() => {
          this.loadBankList = '银行卡载入失败'
          this.$store.dispatch('hideLoading')
        })
      } else {
        this.loadBankList = '选择开户银行'
        this.bankListNumber(this.banklistId)
      }
    },
    bankListNumber (bankLists) {
      let slots = [
        { values: [] }
      ]
      slots[0].values = bankLists
      this.bankMapList = slots
    },
    handleBankClose () {
      this.popupVisible2 = false
    },
    bankListChange (picker, values) {
      if (values.length > 0) {
        this.bankArea = values[0]
        this.bankName = values[0].bankName
      }
    },
    handleBtn () {
      const _that = this
      if (!this.bankList.accountName) {
        Toast({
          message: '请填写您的真实姓名',
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (!this.bankNum || this.bankNum.length < 16) {
        Toast({
          message: '请填写正确的银行卡号',
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (!this.bankNameCode) {
        Toast({
          message: '请选择开户银行',
          position: 'middle',
          duration: 2000
        })
        return
      }
      if (!this.areaName) {
        Toast({
          message: '请选择开户城市',
          position: 'middle',
          duration: 2000
        })
        return
      }

      const data = {
        bankType: 1, // 银行卡类型  0、支付宝 1、银行卡 2、微信
        accountName: this.bankList.accountName,
        accountNum: this.bankNum,
        bank: this.bankArea.id,
        bankLand: this.areaName,
        bankName: this.bankNameCode,
        bankCode: this.bankArea.bankCode
      }
      _that.$store.dispatch('showLoading')
      this.$store.dispatch('addBankList', data).then(res => {
        _that.$store.dispatch('hideLoading')
        if (res && res.status) {
          Toast({
            message: '添加成功',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 1000
          })
          setTimeout(() => {
            _that.$router.push({path: '/userCenter/myBanks'})
          }, 1000)
        }
      })
    }
  },
  mounted () {
    this.$nextTick(() => { // vue里面全部加载好了再执行的函数 （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0
    })
  },
  destroyed () {
    this.showPop1 = false
    this.showPop2 = false
  }
}
</script>

<style lang="stylus" scoped>
@import './addCard.styl'
</style>
