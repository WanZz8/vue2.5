<template>
  <div class="accurate_detail">
    <div class="accurate_header">
      <div class="acc_h_d1">
        <p>
          <span class="span1">开户类型：</span>
          <!-- <mt-radio v-model="val"
                    :options="options"
                    class="mt-radio">
          </mt-radio> -->
          <span v-for="(item,index) in options"
                :key="item.value"
                @click="checkRadio(index)"
                class="radio_openUser">
            <input type="radio" :checked='val===index'
                                class='radio'
                                style="width:20px;height:20px;border-radius:50%;"
                                @change="checkRadio(index)"><label>{{item.label}}</label></span>
        </p>
      </div>
    </div>
    <div class="acc_content"
         v-show="val=== 1">
      <div class="ipt_d2">
        <div class="acc_h_d2">
          <mt-field :state="iptStatus"
                    v-model="account"
                    placeholder="请输入账号"
                    key="ss1"
                    type="tel"
                    @change.native.capture="checkAccount"
                    @input.native.capture="checkAccount"
                    @blur.native.capture="checkPhoneNum"
                    :attr="{ maxlength: 11 }">
          </mt-field>
        </div>
        <div class="acc_h_d5">
          <div class="code">
            <input type="text"
                   name="code"
                   v-model="code"
                   maxlength="4"
                   placeholder="请输入验证码">
            <div class="code_img"
                 @click="refreshImgCode">
              <img :src="'data:image/png;base64,'+ imgCode" />
            </div>
          </div>
        </div>
        <div class="acc_h_d3">
          <span class="span1">返佣类型：</span>
          <mt-checklist v-model="checkList"
                        :options="fytype"
                        @change="onCheckHanlder(checkList)"
                        class="mt-checklist">
          </mt-checklist>
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
          <div class="checkRadios">
            <span v-for="(item,index) in arr"
                  :key="item.value"
                  @click="checkRadios(item,index)"
                  class="radio_openUser">
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
        <div :class="getTemplateList.length ? 'real_ss': 'bgShow'">提交</div>
      </div>
    </div>
    <div class="acc2_content"
         v-show="val=== 0">
      <div class="ipt_d2">
        <div class="acc_h_d2">
          <mt-field :state="iptStatus1"
                    v-model="account2"
                    placeholder="请输入账号"
                    key="ss2"
                    :attr="{ maxlength: 11 }"
                    @change.native.capture="checkAccount1"
                    @input.native.capture="checkAccount1"
                    @blur.native.capture="checkPhoneNum1"
                    type="tel">
          </mt-field>
        </div>
        <div class="acc_h_d3">
          <div class="code">
            <input type="text"
                   name="code"
                   v-model="code"
                   maxlength="4"
                   placeholder="请输入验证码">
            <div class="code_img"
                 @click="refreshImgCode">
              <img :src="'data:image/png;base64,'+ imgCode" />
            </div>
          </div>
        </div>
      </div>
      <div class="part2"
           @click="register_membtn">
        <div class="real_ss">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
import { isvalidPhone } from '@/utils/validate'
import { getLocal } from '@/utils/storage'
export default {
  name: 'accurate',
  props: {
    tab: {
      type: String,
      default: ''
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
      minmax: 0,
      account: '',
      account2: '',
      iptStatus: 'warning',
      iptStatus1: 'warning',
      checkList: [],
      code: '',
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
    }
  },
  created () {
    if (this.templateArr.length === 0) {
      this.templateArr = this.templateInfo
    }
  },
  computed: {
    ...mapGetters(['imgCode', 'template', 'fytype']),
    getTemplateList () {
      let arr = this.template.filter(item => item.rebate !== 0)
      return arr
    }
  },
  mounted () {
    this.$store.dispatch('backType')
    let sessInfo = getLocal('userInfo')
    if (sessInfo && sessInfo.rebateType === '3') {
      this.checkList = ['1', '2']
    } else {
      this.checkList = sessInfo.rebateType.split('')
    }
  },
  methods: {
    onCheckHanlder (item) {
      const rebateType = item.slice()
      let items = ''
      if (rebateType.length === 1) {
        items = Number(rebateType[0])
      }
      if (rebateType.length > 1) {
        items = Number(item[0]) + Number(item[1])
      }
      this.checkRadios({
        label: '最低',
        value: 0
      }, 0)
      this.$store.dispatch('getMyTemplateList', { rebateType: items }).then(res => {
      })
    },
    checkAccount (event) {
      let val = event.target.value.trim()
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.account = val
      } else {
        event.target.value = this.account
      }
    },
    checkAccount1 (event) {
      let val = event.target.value.trim()
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.account1 = val
      } else {
        event.target.value = this.account1
      }
    },
    checkPhoneNum () {
      if (!isvalidPhone(this.account)) {
        Toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
        return false
      }
      this.iptStatus = 'success'
    },
    checkPhoneNum1 () {
      if (!isvalidPhone(this.account1)) {
        Toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
        return false
      } else {
        this.iptStatus1 = 'success'
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
        let rebate = this.rangeValue[key]
        this.templateArr[idx] =
          {
            'templateName': value.templateName,
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
            'templateName': value.templateName,
            'templateCode': value.templateCode,
            'rebate': `${rebate}`
          }
      }
    },
    inputEvent (event, value, key, idx) {
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
          'templateName': value.templateName,
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
          'templateName': value.templateName,
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
    checkRadios (item, index) {
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
    register_accbtn () {
      if (this.getTemplateList.length) {
        if (!isvalidPhone(this.account)) {
          Toast({
            message: '请填写正确的手机号',
            position: 'middle',
            duration: 1500
          })
          return false
        }
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
        const templateArr = this.templateArr.slice()
        for (let i = 0; i < templateArr.length; i++) {
          if (templateArr[i].rebate === 0) {
            Toast({
              message: '套餐点数不正确',
              position: 'middle',
              duration: 1500
            })
            return
          }
        }
        const data = {
          adduserType: this.val * 1,
          userphone: this.account,
          code: this.code,
          rebateType: rebateCode,
          tempInfo: JSON.stringify(templateArr)
        }
        const _that = this
        _that.$store.dispatch('showLoading')
        _that.$store.dispatch('accRegister', data).then(res => {
          _that.$store.dispatch('hideLoading')
          if (res.status) {
            Toast({
              message: '添加成功',
              position: 'middle',
              iconClass: 'mintui mintui-success',
              duration: 1000
            })
            _that.code = ''
            _that.account = ''
            _that.rangeValue = {
              ss0: 1,
              ss1: 1,
              ss2: 1,
              ss3: 1,
              ss4: 1,
              ss5: 1
            }
            _that.handleSwitch1()
          }
        }).catch(() => {
          _that.$store.dispatch('hideLoading')
        })
      }
    },
    checkRadio (index) {
      this.val = index
    },
    register_membtn () {
      const _that = this
      if (!isvalidPhone(this.account1)) {
        Toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
        return false
      }
      if (!this.code) {
        Toast({
          message: '请填写验证码',
          position: 'middle',
          duration: 1500
        })
        return false
      }
      const data = {
        adduserType: this.val * 1,
        userphone: this.account1,
        code: this.code
      }
      _that.$store.dispatch('showLoading')
      _that.$store.dispatch('memRegister', data).then(res => {
        _that.$store.dispatch('hideLoading')
        if (res && res.status) {
          _that.code = ''
          _that.account2 = ''
          Toast({
            message: '添加成功',
            position: 'middle',
            iconClass: 'mintui mintui-success',
            duration: 1000
          })
        }
      }).catch(() => {
        _that.$store.dispatch('hideLoading')
      })
    }
  }
}
</script>

<style lang="stylus">
@import './accurate.styl'
</style>
