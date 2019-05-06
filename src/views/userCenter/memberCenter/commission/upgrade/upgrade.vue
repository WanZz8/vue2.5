<template>
  <mt-popup v-model="flat"
            position="bottom"
            class="pop_con"
            style="width:100%;"
            :closeOnClickModal="clickfalse">
    <div class="accurate_content">
      <div class="ipt_d2">
        <div class="acc_h_d3">
          <span class="span1">返佣类型：</span>
          <mt-checklist v-model="checkList"
                        @change="onCheckHanlder(checkList)"
                        :options="fytype"
                        class="mt-checklist">
          </mt-checklist>
        </div>
      </div>
      <div class="pop_b_header">
        <p class="pop_p1">
          <i class="icons icon_Invite">
            <svg-icon icon-class="invite"></svg-icon>
          </i>
          <span>{{valuItem.userPhone}}</span>
        </p>
        <!-- <p class="pop_p2">
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
        <div class="change_radio_min">
          <span v-for="(item,index) in arr"
                :key="item.value"
                @click="checkMin_Max(item,index)"
                class="radio_change_user">
            <input type="radio" :checked='minmax===index'
                                class='radio'
                                style="width:20px;height:20px;border-radius:50%;"><label>{{item.label}}</label></span>
        </div>
      </div>
      <div class="pop_con_sec">
        <div class="sec_1">
          <div class="rk_b ripple"
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
                      :disabled="!item.rebate||item.rebate-1==1||item.rebate-1==0">
              <div slot="start"
                   class="slot-start">1%</div>
              <div slot="end"
                   class="slot-end">
                {{item.rebate!==0? item.rebate-1: item.rebate}}%
              </div>
            </mt-range>
          </div>
        </div>
        <div class="foot_bottom">
          <div class="cancel"
               @click="handleClose">
            取消
          </div>
          <div class="confirm"
               @click="sumbit_btn">
            确定
          </div>
        </div>
      </div>
    </div>
  </mt-popup>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import { getLocal } from '@/utils/storage'
import { setTimeout } from 'timers'
export default {
  props: {
    upgradeVisible: {
      type: Boolean,
      default: false
    },
    templateInfo: {
      type: Array
    },
    valuItem: {
      type: Object
    }
  },
  data () {
    return {
      flat: false,
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
      clickfalse: true,
      val: '1',
      minmax: 0,
      checkList: [],
      checkListOpt: [
        {
          label: '手续费返佣',
          value: '1'
        },
        {
          label: '盈亏返佣',
          value: '2'
        }
      ],
      options: [
        {
          label: '代理',
          value: '1'
        },
        {
          label: '会员',
          value: '0'
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
    flat (n) {
      if (n) {
        this.checkMin_Max({ value: 0 }, 0)
      }
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
  mounted () {
    this.$store.dispatch('backType')
    let sessInfo = getLocal('userInfo')
    if (sessInfo && sessInfo.rebateType === '3') {
      this.checkList = ['1', '2']
    } else {
      this.checkList = sessInfo.rebateType.split('')
    }
  },
  computed: {
    ...mapGetters(['template', 'fytype']),
    getTemplateList () {
      let arr = this.template.filter(item => item.rebate !== 0)
      return arr
    }
  },
  methods: {
    handleClose () {
      this.flat = false
    },
    handleSubmit () {
      this.flat = !this.flat
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
          this.rangeValue[key] = event === 0 ? value.rebate : event
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
    checkMin_Max (item, index) {
      let obj = ''
      this.minmax = index
      if (item.value === 0) {
        obj = {
          ss0: 1,
          ss1: 1,
          ss2: 1,
          ss3: 1,
          ss4: 1
        }
        let getTemplateList = this.getTemplateList
        for (let i = 0; i < getTemplateList.length; i++) {
          this.templateArr[i].rebate = 1
        }
        this.rangeValue = obj
      } else {
        obj = {}
        let getTemplateList = this.getTemplateList
        for (let i = 0; i < getTemplateList.length; i++) {
          obj['ss' + i] = getTemplateList[i].rebate - 1
          this.templateArr[i].rebate = obj['ss' + i]
        }
        this.rangeValue = obj
      }
    },
    sumbit_btn () {
      const _that = this
      const rebateType = this.checkList.slice()
      let rebateCode
      if (!rebateType.length === 0) {
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
      const info = getLocal('userInfo')
      const data = {
        uuid: this.valuItem.uuid,
        agentUuid: info.uuid,
        merchantCode: info.merchantCode,
        rebateType: rebateCode,
        tempInfo: templateArr
      }
      this.$store.dispatch('showLoading')
      this.$store.dispatch('updateAgent', data).then(res => {
        this.$store.dispatch('hideLoading')
        this.flat = false
        if (res.status) {
          Toast({
            message: '升级成功',
            position: 'middle',
            duration: 1500
          })
          setTimeout(() => {
            _that.$emit('upDateList', true)
          }, 500)
        }
      }).catch(() => {
        this.flat = false
        this.$store.dispatch('hideLoading')
      })
    }
  }
}
</script>

<style lang="stylus">
.pop_b_header
  width 100%
  height 45px
  line-height 45px
  position relative
  display flex
  margin 0px 0 10px
  .pop_p1
    width 50%
    flex 0 0 50%
    text-align center
    font-family PingFang-SC-Medium
    font-size 14px
    color #4A4A4A
    height 45px
    line-height 45px
    padding-top 10px
    padding-left 15px
    padding-right 15px
    box-sizing border-box
    .icon_Invite
      float left
      height 27px
      width 27px
    span
      position absolute
      left 50px
      top 5px
      font-size 15px
      font-family PingFang-SC-Medium
      color #4A4A4A
      font-weight bold
  .pop_p2
    flex 0 0 50%
    height 35px
    line-height 35px
    text-align right
    right 10px
    top 8px
    display flex
    & .mt-radio
      flex 0 0 50%
      height 35px
      line-height 35px
      .mint-radiolist-title
        display none
      .mint-cell
        float left
        // width 95px
        height 35px
        line-height 35px
        min-height 0
        .mint-cell-wrapper
          background 0
          height 100%
          box-sizing border-box
          .mint-radiolist-label
            font-family PingFang-SC-Medium
            font-size 14px
            color #4A4A4A
    .mint-radio-label
      margin-left 0
    .mint-radio
      margin-right 5px
    .mint-radiolist
      margin-top 10px
.ipt_d2
  width 100%
  .acc_h_d2
    width 100%
    margin-top 5px
    margin-bottom 5px
    .mint-cell:last-child
      background 0
      border 1px solid #C1BFC2
      border-radius 5px
      .mint-cell-wrapper
        background 0
  .acc_h_d3
    width 100%
    height 35px
    line-height 35px
    padding 0 14px
    & .span1
      float left
      font-family PingFang-SC-Medium
      font-size 14px
      color #4A4A4A
    & .mt-checklist
      width 235px
      float left
      height 35px
      line-height 35px
      .mint-checklist-title
        display none
      .mint-cell
        float left
        height 35px
        line-height 35px
        min-height 0
        .mint-cell-wrapper
          background 0
          height 100%
          box-sizing border-box
          padding 0
          .mint-checkbox-label
            font-family PingFang-SC-Medium
            font-size 14px
            color #4A4A4A
          & .mint-checkbox-core
            border-radius 25%
      .mint-cell:last-child
        background 0
        width 45%
    & .code
      margin-bottom 10px
      position relative
      .code_img
        width 125px
        height 34px
        position absolute
        right 10px
        top 8px
        img
          width 100%
          height 100%
      input
        height 44px
        border none
        outline none
        font-size 14px
        border-bottom 1px solid #eee
  .acc_h_d5
    width 100%
    & .code
      margin-bottom 10px
      position relative
      .code_img
        width 125px
        height 34px
        position absolute
        right 10px
        top 8px
        img
          width 100%
          height 100%
      input
        height 44px
        border none
        outline none
        font-size 14px
        border-bottom 1px solid #eee
.accurate_content
  width 100%
  margin-top 10px
  .con-min_max
    width 100%
    height 35px
    line-height 35px
    p
      float right
      height 35px
      line-height 35px
      width 150px
      text-align right
      position relative
      & .mt-radio
        width 75px
        float left
        height 35px
        line-height 35px
        .mint-radiolist-title
          display none
        .mint-cell
          float left
          // width 95px
          height 35px
          line-height 35px
          min-height 0
          .mint-cell-wrapper
            background 0
            height 100%
            box-sizing border-box
            padding 0
            .mint-radiolist-label
              font-family PingFang-SC-Medium
              font-size 14px
              color #4A4A4A
              // padding 0
        .mint-cell:last-child
          background 0
  .d1-header
    width 100%
    height 35px
    line-height 35px
    .p1
      font-family PingFang-SC-Medium
      font-size 14px
      color #4A4A4A
      float left
      height 35px
      line-height 35px
    .p2
      float right
      height 35px
      line-height 35px
      .span1
        display inline-block
        width 22px
        height 22px
        line-height 20px
        background #7ED321
        border-radius 50%
        text-align center
        font-size 22px
        font-weight bold
        color #FFF
        font-family PingFang-SC-Medium
        margin-right 8px
      .span2
        display inline-block
        width 22px
        height 22px
        line-height 20px
        background #EA3826
        border-radius 50%
        text-align center
        font-size 22px
        font-weight bold
        color #FFF
        font-family PingFang-SC-Medium
  .mt-range
    width 100%
    .slot-start
      width 35px
      font-family PingFang-SC-Medium
      font-size 14px
      color #4A4A4A
    .mt-range-content
      // width 150px
      // display block
    .slot-end
      width 35px
      text-align right
      margin-left 12px
.part2
  margin-top 45px
  position relative
  margin-bottom 80px
  .real_ss
    width 100%
    height 100%
    line-height 45px
    display block
    border-radius 25px
    font-size 15px
    text-align center
    color #fff
    outline 0
    background-color #6B89FE
    border none
    touch-action none
    position relative
    overflow hidden
  .bgShow
    width 100%
    height 100%
    line-height 45px
    display block
    border-radius 25px
    font-size 15px
    text-align center
    color #fff
    background-color #DAD9DA
    outline 0
    border none
    touch-action none
    position relative
    overflow hidden
  .real_ss:after
    content ''
    display block
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    border-radius 25px
    pointer-events none
    background-image radial-gradient(circle, #767676 10%, transparent 10.01%)
    background-repeat no-repeat
    background-position 50%
    transform scale(10, 10)
    opacity 0
    transition transform 0.3s, opacity 0.5s
    height 45px
    line-height 45px
    padding-right 15px
  .real_ss:active:after
    transform scale(0, 0)
    opacity 0.3
    border-radius 25px
    transition 0s
.acc2_content
  .part2
    margin-top 265px
.pop_con_sec
  padding 0 15px
.ipt_d2
  margin 10px 0 0
.foot_bottom
  width 100%
  box-sizing border-box
  margin 35px 0 20px
  height 45px
  // margin-bottom 65px
  .cancel
    float left
    width 105px
    height 35px
    line-height 35px
    text-align center
    border 1px solid #6B89FE
    border-radius 5px
    color #6B89FE
    margin-left 35px
    margin-right 25px
  .confirm
    float left
    width 105px
    height 35px
    line-height 35px
    text-align center
    background #6B89FE
    border 1px solid #6B89FE
    border-radius 5px
    margin-left 25px
    color #fff
    margin-right 35px
.pop_con_b
  margin-bottom 35px
.top_title
  height 35px
  position relative
  text-align center
  line-height 35px
  .icon_spinner
    position absolute
    height 35px
    width 35px
    left 90px
.radio_change_user
  margin 0 5px
  .radio
    margin-top 12px
  label
    padding 0 5px
.mint-cell
  margin 0 5px
  .mint-checklist-label
    padding 0
</style>
