<template>
  <div class="user_body">
    <header-view :titles="'佣金设置'"
                 class="redPacket_red">
    </header-view>
    <div class="mint-content commission_view">
      <div class="commission_header">
        <div class="com_hr_lf"
             @click="sendNextji">
          <p class="com_hr_lf_p">
            <i class="icons icon_henggang">
              <svg-icon icon-class="henggang"></svg-icon>
            </i>
            <span class="spanText">{{selectName.name}}</span>
          </p>
        </div>
        <div class="com_hr_rt">
          <input :value="inpNum"
                 placeholder="请输入下级手机号"
                 type="tel"
                 @change="checkAccount"
                 @input="checkAccount"
                 maxlength="11">
          <i class="icons icon_search"
             @click="checkPhoneNum(account)">
            <svg-icon icon-class="search"></svg-icon>
          </i>
        </div>
      </div>
      <div class="top_title"
           v-show="false">
        <i class="icons icon_spinner">
          <svg-icon icon-class="Spinner"></svg-icon>
        </i>
        <span>正在加载更多数据...</span>
      </div>
      <div class="commission_detail">
        <div class="top_title"
             v-show="loadFlat">
          <i class="icons icon_spinner">
            <svg-icon icon-class="Spinner"></svg-icon>
          </i>
          <span>用户信息拉取中..</span>
        </div>
        <div class="main-body commission_content"
             ref="wrapper_entrust"
             :style="{ height: (wrapperHeight-20) + 'px' }">
          <!-- <mt-loadmore :top-method="loadTop"
                     :bottom-method="loadBottom"
                     :bottom-all-loaded="footShow"
                     ref="loadmore"
                     :autoFill="isAutoFill"
                     v-if="comInviteList.length>0"> -->
          <scroller :on-refresh="refresh"
                    :on-infinite="infinite"
                    ref="my_scroller"
                    v-if="userInviteList.length>0">
            <div class="com_content"
                 v-for="(item, index) in userInviteList"
                 :key="index+'idx'">
              <div class="commiss_header">
                <i class="icons icon_Invite">
                  <svg-icon icon-class="invite"></svg-icon>
                </i>
                <span>{{item.userPhone}}</span>
                <span class="link_rebeat"
                      v-if="item.userType==0"
                      @click="upgrade(item)">
                  升级为代理
                </span>
                <span class="link_rebeat"
                      v-else
                      @click="getInviteRebate(item.uuid, item.userPhone)">
                  设置佣金
                </span>
              </div>
              <div class="commis_type">
                <p class="commis_type_p1">
                  <span>
                    账号类型：
                    {{userType[item.userType]}}
                  </span>
                </p>
                <p class="commis_type_p2">
                  <span class="span1">
                    创建时间：
                  </span>
                  <span class="span2">
                    {{item.createTime}}
                  </span>
                </p>
                <p class="commis_type_p2">
                  <span class="span1">
                    最后登录时间：
                  </span>
                  <span class="span2">
                    {{item.lastLoginTime}}
                  </span>
                </p>
              </div>
              <div class="commis-footer">
                <p class="commis-footer-p">
                  <span>状态</span>
                  <span>在线状态</span>
                </p>
                <p class="commis-footer-p">
                  <span>
                    {{userStatus[item.userStatus]}}
                  </span>
                  <span>离线</span>
                </p>
              </div>
            </div>
          </scroller>
          <div class="noData_icon"
               v-else>
            <i>
              <svg-icon icon-class="noDatas"></svg-icon>
            </i>
            <p>暂无内容..</p>
          </div>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible"
              position="bottom"
              class="pop_con"
              closeOnClickModal="true">
      <div class="pop_con_b">
        <div class="pop_b_header">
          <p class="pop_p1">
            <i class="icons icon_Invite">
              <svg-icon icon-class="invite"></svg-icon>
            </i>
            <span>{{userPhone}}</span>
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
                                  style="width:20px;height:20px;border-radius:50%"><label>{{item.label}}</label></span>
          </div>
        </div>
        <div class="pop_con_sec">
          <div class="sec_1">
            <div class="rk_b ripple"
                 v-for="(item, index) in templateList"
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
                        :min="item.rebate"
                        :max="item.maxRebate"
                        :step="1"
                        :bar-height="8"
                        @input="inputEvent($event, item, 'ss'+index, index)"
                        @change="changeEvent($event, item, 'ss'+index, index)">
                <div slot="start"
                     class="slot-start">
                  {{item.rebate}}%
                </div>
                <div slot="end"
                     class="slot-end">
                  {{item.maxRebate}}%
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
    <mt-popup v-model="popupFlat"
              position="bottom"
              class="pop_con"
              closeOnClickModal="true">
      <div class="pop_con_b2"
           style="height:300px">
        <div class="pop_con_sec">
          <div class="sec_4">
            <div class="rk_b ripple">
              <mt-cell v-for="(item,idx) in secList"
                       :key="item.name"
                       :title="item.name"
                       @click.native="clickPopups($event,item,idx)">
                <span></span>
              </mt-cell>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
    <up-grade :templateInfo='templateInfo'
              :upgradeVisible='upgradeVisible'
              :valuItem='valuItem'
              @upDateList='upDateList'
              ref='popup_grade'></up-grade>
    <loading v-show="loading"
             msg="正在加载.."></loading>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
import noData from '@/components/public/noData/noData'
import Loading from '@/components/public/loading/loadings'
import { isvalidPhone } from '@/utils/validate'
import UpGrade from './upgrade/upgrade'
import { getLocal } from '@/utils/storage'
import { Toast } from 'mint-ui'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'commission',
  components: {
    HeaderView,
    noData,
    Loading,
    UpGrade
  },
  data () {
    return {
      popupVisible: false,
      upgradeVisible: false,
      popupFlat: false,
      showLoding: true,
      account: '',
      pageNo: 1,
      pageSize: 5,
      pageTotal: 0,
      allLoaded: false,
      isAutoFill: false,
      wrapperHeight: 0,
      courrentPage: 0,
      footTips: false,
      footText: '',
      pagaVal: 1,
      loadFlat: false,
      valuItem: {},
      selectName: {
        title: '-1',
        name: '所有下级'
      },
      secList: [{ title: '-1', name: '所有下级' }, { title: '0', name: '下级会员' }, { title: '1', name: '下级代理' }],
      userStatus: {
        0: '正常',
        1: '黑名单',
        2: '删除'
      },
      userType: {
        0: '普通会员',
        1: '代理',
        2: '总代'
      },
      userPhone: '',
      minmax: 0,
      checkList: [],
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
        ss0: Math.floor(1),
        ss1: 1,
        ss2: 1,
        ss3: 1,
        ss4: 1,
        ss5: 1
      },
      userTemplate: [],
      templateInfo: [],
      templateArr: [],
      userInfo: getLocal('userInfo')
    }
  },
  watch: {
    tab () {
      this.conHeight()
    }
    // templateList (tempArr) {
    //   if (tempArr.length > 0) {
    //     for (let i = 0; i < tempArr.length; i++) {
    //       let rebate = Math.floor(tempArr[i].rebate)
    //       this.rangeValue['ss' + i] = rebate
    //       this.min['ss' + i] = rebate
    //     }
    //   }
    // }
  },
  computed: {
    ...mapGetters([
      'userInviteList',
      'comInviteTotal',
      'loading',
      'template',
      'templateList',
      'fytype'
    ]),
    inpNum () {
      return this.account
    },
    footShow () {
      let len = this.comInviteTotal / this.pageSize
      len = Math.ceil(len)
      return this.pagaVal === len
    },
    getTemplateList () {
      let arr = this.templateList.filter(item => item.rebate !== 0)
      return arr
    }
  },
  created () {
    this.loadFlat = true
    this.autoTemplate()
    this.allInvite('', '-1', '')
  },
  mounted () {
    this.conHeight()
    this.$store.dispatch('backType')
  },
  methods: {
    autoTemplate () {
      this.$store.dispatch('getMyTemplateList').then(res => {
        if (res.status) {
          let data = res.data.slice()
          data.forEach(({ id, templateName, templateCode, rebate }) => {
            if (rebate) {
              let rbt = rebate === 1 ? 0 : 1
              this.userTemplate.push({ id, templateName, templateCode, rebate: rebate })
              this.templateInfo.push({ id, templateName, templateCode, rebate: rbt })
            }
          })
        }
      })
    },
    allInvite (phone, types, done) {
      const _that = this
      _that.popupFlat = false
      this.$store.dispatch('queryByLevelInfo', {
        pageNo: 1,
        pageSize: 10,
        userType: types,
        userPhone: !phone ? '' : phone
      }).then(res => {
        if (res && res.status) {
          _that.loadFlat = false
          _that.pageNo = 1
          _that.pageSize = 10
          _that.pageTotal = res.data.pages
          this.conHeight()
          if (done) {
            done()
          }
        }
      }).catch(() => {
        _that.loadFlat = false
      })
    },
    handleClose () {
      this.popupVisible = false
    },
    upDateList (val) {
      if (val) {
        this.allInvite('', '-1', '')
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
      if (!isvalidPhone(this.account)) {
        Toast({
          message: '请填写正确的手机号',
          position: 'middle',
          duration: 1500
        })
        return false
      }
      this.searchInvite(this.account)
    },
    getAllComInvite (type, phone, done) {
      const _that = this
      if (this.pageNo < this.pageTotal) {
        const data = {
          pageNo: this.pageNo += 1,
          pageSize: this.pageSize,
          userType: type,
          userPhone: phone
        }
        this.$store.dispatch('addByLevelInfo', data).then(res => {
          if (res.status) {
            _that.pageSize = res.data.pages
          }
          if (done) {
            done()
          }
          _that.loadFlat = false
        }).catch(() => {
          _that.loadFlat = false
        })
      } else {
        done(true)
      }
    },
    refresh (done) {
      this.allInvite('', '', done)
    },
    infinite (done) {
      this.getAllComInvite(1, '', done)
    },
    scrollerToTop () {
      if (this.$refs.my_scroller) {
        this.$refs.my_scroller.scrollTo(0, 0, true)
      }
    },
    // 升级
    upgrade (item) {
      // this.upgradeVisible = true
      this.$refs.popup_grade.handleSubmit()
      this.valuItem = item
    },
    conHeight () {
      if (this.$refs.wrapper_entrust) {
        this.wrapperHeight =
          document.documentElement.clientHeight -
          this.$refs.wrapper_entrust.getBoundingClientRect().top
      }
    },
    // 搜索功能
    searchInvite (phone) {
      this.scrollerToTop()
      this.loadFlat = true
      this.allInvite(phone, this.selectName.title, '')
    },
    // 返点信息
    getInviteRebate (userId, userPhone) {
      this.userPhone = userPhone
      let arr = {}
      this.checkMin_Max({ value: 0 }, 0)
      this.$store.dispatch('showLoading')
      this.$store.dispatch(
        'getInvitedTemplaInfo',
        { agentId: userId }
      ).then(res => {
        this.popupVisible = true
        if (res && res.status) {
          let data = res.data.slice()
          this.templateArr = data
          this.$store.dispatch('hideLoading')
          for (let i = 0; i < data.length; i++) {
            arr['ss' + i] = data[i].rebate
          }
          this.rangeValue = arr
        }
      }).catch(() => {
        this.$store.dispatch('hideLoading')
      })
    },
    checkMin_Max (item, index) {
      let obj = ''
      this.minmax = index
      if (item.value === 0) {
        obj = {}
        this.templateList.forEach((item, idx) => {
          obj['ss' + idx] = item.rebate
          this.templateArr[idx] =
            {
              'rebate': item.rebate,
              'templateCode': item.templateCode,
              'templateName': item.templateName,
              'id': item.id
            }
        })
        this.rangeValue = obj
      } else {
        obj = {}
        this.templateList.forEach((item, idx) => {
          obj['ss' + idx] = item.maxRebate
          this.templateArr[idx] =
            {
              'rebate': item.maxRebate,
              'templateCode': item.templateCode,
              'templateName': item.templateName,
              'id': item.id
            }
        })
        this.rangeValue = obj
      }
    },
    // 切换
    // handleSwitch1 () {
    //   const obj = {}
    //   this.templateList.forEach((item, idx) => {
    //     obj['ss' + idx] = item.rebate
    //   })
    //   if (this.minmax === '最高') {
    //     this.rangeValue = obj
    //     this.minmax = '最低'
    //   }
    // },
    // handleSwitch2 () {
    //   const obj = {}
    //   this.userTemplate.forEach((item, idx) => {
    //     obj['ss' + idx] = item.rebate - 1
    //   })
    //   if (this.minmax === '最低') {
    //     this.rangeValue = obj
    //     this.minmax = '最高'
    //   }
    // },
    // 加步长
    handleAdd (event, value, key, idx) {
      let rbt = value.maxRebate
      if (event.target.id === key && value.rebate) {
        if (this.rangeValue[key] < rbt) {
          this.rangeValue[key] = this.rangeValue[key] + this.step[key]
        }
        let rebate = this.rangeValue[key]
        this.templateArr[idx] =
          {
            'rebate': `${rebate}`,
            'id': value.id
          }
      }
    },
    // 减步长
    handleReduce (event, value, key, idx) {
      if (event.target.id === key && value.rebate) {
        if (this.rangeValue[key] > value.rebate) {
          this.rangeValue[key] = this.rangeValue[key] - this.step[key]
        }
        let rebate = this.rangeValue[key]
        this.templateArr[idx] =
          {
            'rebate': `${rebate}`,
            'id': value.id
          }
      }
    },
    inputEvent (event, value, key, idx) {
      let rbt = value.maxRebate
      if (event < rbt) {
        this.rangeValue[key] = event
      } else if (event === value.rebate) {
        this.rangeValue[key] = rbt
      }
      let rebate = this.rangeValue[key]
      this.templateArr[idx] =
        {
          'rebate': `${rebate}`,
          'id': value.id
        }
    },
    changeEvent (event, value, key, idx) {
      let rbt = value.maxRebate
      if (event < rbt) {
        this.rangeValue[key] = event
      } else if (event === rbt) {
        this.rangeValue[key] = rbt
      }
      let rebate = this.rangeValue[key]
      this.templateArr[idx] =
        {
          'rebate': `${rebate}`,
          'id': value.id
        }
    },
    sendNextji () {
      this.popupFlat = true
    },
    clickPopups (e, item, idx) {
      // console.log(e, item, idx)
      this.scrollerToTop()
      this.loadFlat = true
      this.selectName = item
      this.allInvite('', item.title, '')
    },
    sumbit_btn () {
      const _that = this
      if (this.templateArr.slice().length) {
        const templateArr = this.templateArr.slice()
        const data = JSON.stringify(templateArr)
        this.$store.dispatch('showLoading')
        this.$store.dispatch('updateAgTempInfo', data).then(res => {
          this.$store.dispatch('hideLoading')
          if (res.status) {
            this.popupVisible = false
            Toast({
              message: '修改成功',
              position: 'middle',
              iconClass: 'mintui mintui-success',
              duration: 1000
            })
            setTimeout(() => {
              _that.allInvite('', '-1', '')
            }, 500)
          } else {
            Toast({
              message: res.msg,
              duration: 1000
            })
          }
        }).catch(() => {
          this.$store.dispatch('hideLoading')
          Toast({
            message: '修改失败',
            duration: 1500
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './commission.styl'
</style>
