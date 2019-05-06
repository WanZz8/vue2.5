<template>
  <transition name="linkSlider"
              mode="out-in">
    <div class="app_Pread_page"
         v-show="appSpreadFlat">
      <header-view :titles="'APP推广'"
                   :headerLeft='true'>
        <div class="home_back_icon"
             slot="header_Left"
             @click='goBack'>
          <i class="icons icon_Back">
            <svg-icon icon-class="left"></svg-icon>
          </i>
        </div>
      </header-view>
      <div class="mint-content link-detail"
           ref="wrapper_entrust"
           :style="{ height: (wrapperHeight-60) + 'px' }">
        <div class="link_header">
          <div class="acc_h_d1">
            <span class="span1">开户类型：</span>
            <!-- <mt-radio v-model="val"
                        :options="options"
                        class="mt-radio">
              </mt-radio> -->
            <div class="appCheckRadios">
              <span v-for="(item,index) in options"
                    :key="item.value"
                    @click="checkRadios(item,index)"
                    class="radio_appTuiguang">
                <input type="radio" :checked='val===index'
                                    class='radio'
                                    style="width:20px;height:20px;border-radius:50%;"><label>{{item.label}}</label></span>
            </div>
          </div>
        </div>
        <div class="acc_content"
             v-show="val=== 1">
          <div class="ipt_d2">
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
            <!-- <div class="acc_h_d4">
              <mt-field v-model="domain"
                        placeholder="输入推广链接"
                        key="ss4">
              </mt-field>
            </div> -->
            <div class="acc_h_d3">
              <div class="code">
                <input type="text"
                       name="code"
                       v-model="code"
                       placeholder="请输入验证码">
                <div class="code_img"
                     @click="refreshImgCode">
                  <img :src="'data:image/png;base64,'+ imgCode" />
                </div>
              </div>
              <div class="mt_box">
                <span class="span1">返佣类型：</span>
                <mt-checklist v-model="checkList"
                              :options="fytype"
                              @change="onCheckHanlder(checkList)"
                              class="mt-checklist">
                </mt-checklist>
              </div>
            </div>
          </div>
          <div class="accurate_content">
            <div class="con-min_max">
              <!-- <p>
                <mt-radio v-model="minmax"
                          class="mt-radio"
                          :options="arr"
                          @click.native.capture="handleSwitch1">
                </mt-radio>
                <mt-radio v-model="minmax"
                          :options="maxOptions"
                          class="mt-radio"
                          @click.native.capture="handleSwitch2">
                </mt-radio>
              </p> -->
              <div class="radio_min_max">
                <span v-for="(item,index) in arr"
                      :key="item.value"
                      @click="checkMin_Max(item,index)"
                      class="radio_minRadio">
                  <input type="radio" :checked='minmax===index'
                                      class='radio'
                                      style="width:20px;height:20px;border-radius:50%;"><label>{{item.label}}</label></span>
              </div>
            </div>
            <div class="d1"
                 style="clear:both"
                 v-for="(item, index) in getTemplateList"
                 v-show="item.rebate!==1"
                 :key="index+'idx'">
              <div class="d1-header">
                <p class="p1">
                  <span>{{item.templateName}}</span>
                  <span>{{rangeValue['ss'+index]}}%</span>
                </p>
                <p class="p2">
                  <span class="span1"
                        :id="'ss'+index"
                        @click="handleReduce($event, item, 'ss'+index, index)">
                    -
                  </span>
                  <span class="span2"
                        @click="handleAdd($event, item, 'ss'+index, index)"
                        :id="'ss'+index">
                    +
                  </span>
                </p>
              </div>
              <mt-range v-model="rangeValue['ss'+index]"
                        :min="min['ss'+index]"
                        :max="item.rebate-1"
                        :step="step['ss'+index]"
                        :bar-height="8"
                        @input="inputEvent($event, item, 'ss'+index, index)"
                        @change="changeEvent($event, item, 'ss'+index, index)"
                        :disabled="!item.rebate||item.rebate-1<=1">
                <div slot="start"
                     class="slot-start">1%</div>
                <div slot="end"
                     class="slot-end">
                  {{item.rebate!==0? item.rebate-1: item.rebate}}%
                </div>
              </mt-range>
            </div>
          </div>
          <div class="part2"
               @click="register_accbtn">
            <div class="real_ss">
              生成邀请码
            </div>
          </div>
        </div>
        <div class="acc2_content"
             v-show="val=== 0">
          <div class="ipt_d2">
            <div class="acc_h_d2"
                 @click="handleShow">
              <i class="icons down_arrow"
                 slot="icon">
                <svg-icon icon-class="down"></svg-icon>
              </i>
              <input placeholder="请输入时间数字,例如:30"
                     key="ss1"
                     :value="inpNum1"
                     class="ipt_account"
                     @change="checkAccount"
                     @input="checkAccount"
                     @blur="checkPhoneNum"
                     :readonly="readonly1"
                     maxlength="4" />
            </div>
            <div class="acc_h_d4">
              <mt-field v-model="maxRegisterNum"
                        placeholder="最大会员人数"
                        key="ss3"
                        @change.native.capture="checkMaxRegisterNum"
                        @input.native.capture="checkMaxRegisterNum">
              </mt-field>
            </div>
            <!-- <div class="acc_h_d4">
              <mt-field v-model="domain"
                        placeholder="输入推广链接"
                        key="ss4">
              </mt-field>
            </div> -->
          </div>
          <div class="part2"
               @click="register_membtn">
            <div class="real_ss">生成推广码</div>
          </div>
        </div>
        <mt-popup v-model="popupVisible"
                  position="bottom"
                  class="pop_con"
                  closeOnClickModal="true">
          <div class="pop_con_b">
            <div class="pop_con_sec">
              <div class="sec_1">
                <div class="rk_b ripple">
                  <mt-cell :title="time.t1"
                           @click.native="clickTime1">
                    <span></span>
                  </mt-cell>
                  <mt-cell :title="time.t2"
                           @click.native="clickTime2">
                    <span></span>
                  </mt-cell>
                  <mt-cell :title="time.t3"
                           @click.native="clickTime3">
                    <span></span>
                  </mt-cell>
                  <mt-cell :title="time.t4"
                           @click.native="clickTime4">
                    <span></span>
                  </mt-cell>
                  <mt-cell :title="time.t5"
                           @click.native="clickTime5">
                    <span></span>
                  </mt-cell>
                </div>
              </div>
            </div>
          </div>
        </mt-popup>
      </div>
    </div>
  </transition>
</template>

<script>
import HeaderView from '@/components/layout/header'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { getLocal } from '@/utils/storage'
let moment = require('moment')
export default {
  name: 'app',
  components: {
    HeaderView
  },
  props: {
    tab: {
      type: String,
      default: ''
    },
    appSpreadFlat: {
      type: Boolean,
      default: false
    },
    templateInfo: {
      type: Array
    }
  },
  data () {
    return {
      rangeValue: {
        ss0: 1,
        ss1: 1,
        ss2: 1,
        ss3: 1,
        ss4: 1,
        ss5: 1
      },
      step: {
        ss0: 1,
        ss1: 1,
        ss2: 1,
        ss3: 1,
        ss4: 1,
        ss5: 1
      },
      min: {
        ss0: 1,
        ss1: 1,
        ss2: 1,
        ss3: 1,
        ss4: 1,
        ss5: 1
      },
      val: 0,
      val1: '0',
      date: '2036-01-01 23:59:59',
      date1: '2036-01-01 23:59:59',
      readonly: true,
      readonly1: true,
      iptStatus: 'success',
      account: '永久',
      account1: '永久',
      checkList: [],
      maxRegisterNum: '',
      domain: '',
      minmax: 0,
      code: '',
      popupVisible: false,
      wrapperHeight: 0,
      options1: [
        {
          label: '链接推广',
          value: '0'
        },
        {
          label: 'APP推广',
          value: '1'
        }
      ],
      options: [
        {
          label: '会员',
          value: 0
        },
        {
          label: '代理',
          value: 1
        }
      ],
      arr: [
        {
          label: '最低',
          value: 0
        },
        {
          label: '最高',
          value: 1
        }
      ],
      time: {
        t1: '1天',
        t2: '7天',
        t3: '30天',
        t4: '永久',
        t5: '自定义'
      },
      templateArr: []
    }
  },
  watch: {
    templateInfo (n) {
      this.templateArr = n
    },
    template (len) {
      let da = []
      for (let i = 0; i < len.length; i++) {
        let rbt = len[i] === 1 ? 0 : 1
        da.push({ templateName: len[i].templateName, templateCode: len[i].templateCode, rebate: rbt })
      }
      this.templateArr = da
    },
    // fytype (n, o) {
    //   this.checkList = n[0].value.split('')
    // },
    appSpreadFlat (n) {
      if (n) {
        this.rangeValue = {
          ss0: 1,
          ss1: 1,
          ss2: 1,
          ss3: 1,
          ss4: 1,
          ss5: 1
        }
        this.code = ''
        this.domain = ''
        this.maxRegisterNum = ''
        this.checkAllInfo()
        this.conHeight()
      }
    }
  },
  created () {
    if (this.templateArr.length === 0) {
      this.templateArr = this.templateInfo
    }
  },
  mounted () {
    this.$store.dispatch('backType')
    this.checkAllInfo()
  },
  computed: {
    ...mapGetters(['imgCode', 'template', 'fytype']),
    getTemplateList () {
      let arr = this.template.filter(item => item.rebate !== 0)
      return arr
    },
    inpNum () {
      return this.account
    },
    inpNum1 () {
      return this.account1
    }
  },
  methods: {
    checkAllInfo () {
      let sessInfo = getLocal('userInfo')
      if (sessInfo && sessInfo.rebateType === '3') {
        this.checkList = ['1', '2']
      } else {
        this.checkList = sessInfo.rebateType.split('')
      }
    },
    onCheckHanlder (item) {
      const rebateType = item.slice()
      let items = ''
      if (rebateType.length === 1) {
        items = Number(rebateType[0])
      }
      if (rebateType.length > 1) {
        items = Number(item[0]) + Number(item[1])
      }
      this.checkMin_Max({
        label: '最低',
        value: 0
      }, 0)
      this.$store.dispatch('getMyTemplateList', { rebateType: items }).then(res => {
      })
    },
    checkRadios (item, index) {
      this.val = index
    },
    goBack () {
      localStorage.removeItem('spreadNum')
      this.$emit('appSpread', false)
    },
    handleShow () {
      if (this.val === 1) {
        if (this.readonly) {
          this.popupVisible = true
        }
      } else if (this.val === 0) {
        if (this.readonly1) {
          this.popupVisible = true
        }
      }
    },
    handleClose () {
      this.popupVisible = false
    },
    checkAccount (event) {
      if (this.val === 1) {
        let val = event.target.value.trim()
        if (/^[1-9]\d*$|^$/.test(val)) {
          this.account = val
        } else {
          event.target.value = this.account
        }
      } else if (this.val === 0) {
        let val = event.target.value.trim()
        if (/^[1-9]\d*$|^$/.test(val)) {
          this.account1 = val
        } else {
          event.target.value = this.account1
        }
      }
    },
    checkMaxRegisterNum (event) {
      let val = event.target.value.trim()
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.maxRegisterNum = val
      } else {
        event.target.value = this.maxRegisterNum
      }
    },
    checkPhoneNum () {
      if (this.val === 1) {
        if (this.account) {
          let myDate = new Date()
          let nextDate = new Date(myDate.getTime() + this.account * 24 * 60 * 60 * 1000)
          this.date = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
          this.account = this.account
          this.readonly = true
        }
      } else if (this.val === 0) {
        if (this.account1) {
          let myDate = new Date()
          let nextDate = new Date(myDate.getTime() + this.account1 * 24 * 60 * 60 * 1000)
          this.date1 = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
          this.account1 = this.account1
          this.readonly1 = true
        }
      }
    },
    clickTime1 () {
      if (this.val === 1) {
        this.account = '1天'
        let myDate = new Date()
        let nextDate = new Date(myDate.getTime() + 24 * 60 * 60 * 1000)
        this.date = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
        this.popupVisible = false
      } else if (this.val === 0) {
        this.account1 = '1天'
        let myDate = new Date()
        let nextDate = new Date(myDate.getTime() + 24 * 60 * 60 * 1000)
        this.date1 = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
        this.popupVisible = false
      }
    },
    clickTime2 () {
      if (this.val === 1) {
        this.account = '7天'
        let myDate = new Date()
        let nextDate = new Date(myDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        this.date = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
        this.popupVisible = false
      } else if (this.val === 0) {
        this.account1 = '7天'
        let myDate = new Date()
        let nextDate = new Date(myDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        this.date1 = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
        this.popupVisible = false
      }
    },
    clickTime3 () {
      if (this.val === 1) {
        this.account = '30天'
        let myDate = new Date()
        let nextDate = new Date(myDate.getTime() + 30 * 24 * 60 * 60 * 1000)
        this.date = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
        this.popupVisible = false
      } else if (this.val === 0) {
        this.account1 = '7天'
        let myDate = new Date()
        let nextDate = new Date(myDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        this.date1 = moment(nextDate).format('YYYY-MM-DD HH:mm:ss')
        this.popupVisible = false
      }
    },
    clickTime4 () {
      if (this.val === 1) {
        this.account = '永久'
        this.date = '2036-01-01 23:59:59'
        this.popupVisible = false
      } else if (this.val === 0) {
        this.account1 = '永久'
        this.date1 = '2036-01-01 23:59:59'
        this.popupVisible = false
      }
    },
    clickTime5 () {
      if (this.val === 1) {
        this.account = ''
        this.readonly = false
        this.popupVisible = false
      } else if (this.val === 0) {
        this.account1 = ''
        this.readonly1 = false
        this.popupVisible = false
      }
    },
    refreshImgCode () {
      this.$store.dispatch('getImgCode', this.ruleForm)
    },
    // 减步长
    handleReduce (event, value, key, idx) {
      if (event.target.id === key && value.rebate) {
        if (this.rangeValue[key] > this.min[key]) {
          this.rangeValue[key] = this.rangeValue[key] - this.step[key]
        }
        let rebate = this.rangeValue[key] / 100
        this.templateArr[idx] =
          {
            'templateCode': value.templateCode,
            'rebate': `${rebate}`
          }
      }
    },
    // 加步长
    handleAdd (event, value, key, idx) {
      let rbt = value.rebate - 1
      if (event.target.id === key && rbt) {
        if (this.rangeValue[key] < rbt) {
          this.rangeValue[key] = this.rangeValue[key] + this.step[key]
        }
        let rebate = this.rangeValue[key]
        this.templateArr[idx] =
          {
            'templateCode': value.templateCode,
            'rebate': `${rebate}`
          }
      }
    },
    inputEvent (event, value, key, idx) {
      if (value.rebate) {
        if (event < value.rebate * 100) {
          this.rangeValue[key] = event
        } else if (event === value.rebate * 100) {
          this.rangeValue[key] = event - 1
        }
      }
      let rebate = this.rangeValue[key]
      this.templateArr[idx] =
        {
          'templateCode': value.templateCode,
          'rebate': `${rebate}`
        }
    },
    changeEvent (event, value, key, idx) {
      if (value.rebate) {
        if (event < value.rebate) {
          this.rangeValue[key] = event
        } else if (event === value.rebate) {
          this.rangeValue[key] = event - 1
        }
      }
      let rebate = this.rangeValue[key]
      this.templateArr[idx] =
        {
          'templateCode': value.templateCode,
          'rebate': `${rebate}`
        }
    },
    // 切换
    // handleSwitch1 () {
    //   const obj = {
    //     ss0: 1,
    //     ss1: 1,
    //     ss2: 1,
    //     ss3: 1,
    //     ss4: 1
    //   }
    //   let getTemplateList = this.getTemplateList
    //   for (let i = 0; i < getTemplateList.length; i++) {
    //     this.templateArr[i].rebate = getTemplateList[i].rebate - 1
    //   }
    //   if (this.minmax === '最高') {
    //     this.rangeValue = obj
    //     this.minmax = '最低'
    //   }
    // },
    // handleSwitch2 () {
    //   const obj = {}
    //   let getTemplateList = this.getTemplateList
    //   for (let i = 0; i < getTemplateList.length; i++) {
    //     obj['ss' + i] = getTemplateList[i].rebate - 1
    //     this.templateArr[i].rebate = obj['ss' + i]
    //   }
    //   if (this.minmax === '最低') {
    //     this.rangeValue = obj
    //     this.minmax = '最高'
    //   }
    // },
    checkMin_Max (item, index) {
      let obj = ''
      this.minmax = index
      if (item.value === 1) {
        obj = {}
        let getTemplateList = this.getTemplateList
        for (let i = 0; i < getTemplateList.length; i++) {
          obj['ss' + i] = getTemplateList[i].rebate - 1
          this.templateArr[i].rebate = obj['ss' + i]
        }
        this.rangeValue = obj
      } else {
        obj = {
          ss0: 1,
          ss1: 1,
          ss2: 1,
          ss3: 1,
          ss4: 1,
          ss5: 1
        }
        let getTemplateList = this.getTemplateList
        for (let i = 0; i < getTemplateList.length; i++) {
          this.templateArr[i].rebate = 1
        }
        this.rangeValue = obj
      }
    },
    // 链接 代理
    register_accbtn () {
      if (this.getTemplateList.length > 0) {
        if (!this.code) {
          Toast({
            message: '请填写验证码',
            position: 'middle',
            duration: 1500
          })
          return false
        }
        const rebateType = this.checkList.slice()
        let rebateCode
        if (!rebateType.length) {
          Toast({
            message: '请选择返佣类型',
            position: 'middle',
            duration: 1500
          })
          return false
        } else if (rebateType.length === 1) {
          rebateCode = rebateType[0] * 1
        } else {
          rebateCode = 3
        }
        let t = this.date.replace(/\-/g, '/')
        const templateArr = this.templateArr.slice()
        const data = {
          type: this.val,
          code: this.code,
          effictiveTime: new Date(t).toISOString(),
          rebateType: rebateCode,
          promotionType: getLocal('spreadNum'),
          domain: this.domain,
          tempInfo: JSON.stringify(templateArr)
        }
        console.log(data)
        // this.$store.dispatch('showLoading')
        // this.$store.dispatch('acclinks', data).then(res => {
        //   this.$store.dispatch('hideLoading')
        //   if (res && res.status) {
        //     this.code = ''
        //     this.domain = ''
        //     this.rangeValue = {
        //       ss0: 1,
        //       ss1: 1,
        //       ss2: 1,
        //       ss3: 1,
        //       ss4: 1
        //     }
        //     this.goBack()
        //     this.getTuiguangList()
        //     Toast({
        //       message: '生成了代理推广码',
        //       position: 'middle',
        //       iconClass: 'mintui mintui-success',
        //       duration: 1000
        //     })
        //   }
        // }).catch(() => {
        //   this.$store.dispatch('hideLoading')
        // })
      } else {
        Toast({
          message: '套餐点数不足',
          position: 'middle',
          duration: 1000
        })
      }
    },
    conHeight () {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_entrust.getBoundingClientRect().top
    },
    getTuiguangList () {
      const data = {
        pageNo: 1,
        pageSize: 10,
        status: ''
      }
      this.$store.dispatch('queryPage', data)
    },
    // 链接 会员
    register_membtn () {
      // if (!this.domain) {
      //   Toast({
      //     message: '请输入本站推广链接',
      //     position: 'middle',
      //     duration: 1500
      //   })
      //   return false
      // }
      let t = this.date1.replace(/\-/g, '/')
      const data = {
        type: this.val,
        effictiveTime: new Date(t).toISOString(),
        rebateType: '2',
        promotionType: getLocal('spreadNum'),
        domain: this.domain,
        maxRegisterNum: this.maxRegisterNum
      }
      this.$store.dispatch('showLoading')
      this.$store.dispatch('memlink', data).then(res => {
        this.$store.dispatch('hideLoading')
        if (res && res.status) {
          this.code = ''
          this.domain = ''
          this.goBack()
          this.getTuiguangList()
          Toast({
            message: '生成了会员推广码',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 1000
          })
        }
      }).catch(() => {
        this.$store.dispatch('hideLoading')
      })
    }
  }
}
</script>

<style lang="stylus">
@import './app.styl'
</style>
