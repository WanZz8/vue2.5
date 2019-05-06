<template>
  <div class="user_body">
    <header-view :titles="'交易明细'"
                 class="redPacket_red">
      <router-link slot="header_Right"
                   to='/userCenter/RechargeRecord'
                   class="svg-container">
      </router-link>
    </header-view>
    <div class="mint-content trandeDetail_view">
      <div class="trandeDetail_select">
        <div class="select_bag select">
          <div class="select_ouline_status"
               @click="onClickStatusOpen">
            <p>{{statusIndex.name}}</p>
            <i :class='[statusFlat?"open":""]'>
              <svg-icon icon-class="sj"></svg-icon>
            </i>
          </div>
          <transition name="move"
                      mode="out-in">
            <ul class="status_list"
                v-show="statusFlat">
              <li v-for="(item,idx) in allBanlances"
                  :class="statusIndex.oIndex===idx?'active':''"
                  :key="item.walletType"
                  v-show="item.walletType!==4"
                  @click="onClickStatusList(item,idx)">
                <p>{{item.walletType===1?'现金':item.walletType===2?'积分':'模拟'}}</p>
              </li>
            </ul>
          </transition>
        </div>
        <div class="select_timer select">
          <div class="select_ouline_status"
               @click="onClickTimerOpen">
            <p style="line-height:6px;">日期<span style="display:block;position:relative;top:8px">({{timerIndex.name}})</span></p>
            <!-- <i :class='[timerFlat?"open":""]'>
              <svg-icon icon-class="sj"></svg-icon>
            </i> -->
          </div>
          <transition name="move"
                      mode="out-in">
            <ul class="status_list"
                v-show="timerFlat">
              <li v-for="(item,idx) in timeList"
                  :class="timerIndex.status===idx?'active':''"
                  :key="item.name"
                  @click="onClickTimerList(item,idx)">{{item.name}}</li>
              <li @click="customize"
                  :class="timerIndex.status===3?'active':''">{{typeof timerIndex.date=='number'?'自定义':timerIndex.date}}</li>
            </ul>
          </transition>
        </div>
        <div class="select_type select">
          <div class="select_ouline_status"
               @click="onClickTypeOpen">
            <p style="line-height:6px;">交易类型<span style="display:block;position:relative;top:8px">({{typeData.description}})</span></p>
          </div>
          <transition name="move"
                      mode="out-in">
            <ul class="status_list"
                v-show="typeFlat">
              <li v-for="(item,idx) in getTradeDetailType"
                  :class="typeData.typeId===item.typeId?'active':''"
                  :key="item.typeName"
                  v-show="item.level==3"
                  @click="onClickTypeList(item,idx)">{{item.description}}</li>
            </ul>
          </transition>
        </div>
        <div class="select_shaixuan select">
          <div class="select_ouline_status"
               @click="onClickShaiXuan">
            <p>筛选</p>
            <i>
              <svg-icon icon-class="shaixuan"></svg-icon>
            </i>
          </div>
        </div>
      </div>
      <!--列表-->
      <div class="detail_content">
        <div class="top_title"
             v-if="loadFlat">
          <i class="icons icon_spinner">
            <svg-icon icon-class="Spinner"></svg-icon>
          </i>
          <span>交易明细拉取中...</span>
        </div>
        <div class="main-body"
             ref="wrapper_entrust"
             :style="{ height: (wrapperHeight-5) + 'px' }">
          <scroller :on-refresh="refresh"
                    :on-infinite="infinite"
                    ref="my_scroller"
                    v-if="tradeRecord.length">
            <div class="entrust_list"
                 v-for="(item, index) in tradeRecord"
                 :key="index+'idx'">
              <div class="entrust_title">
                <h1>{{item.remark}}</h1>
                <span v-if="item.amount>=0"
                      style="color:#c21b1b">金额：+{{item.amount}} 元</span>
                <span v-else
                      style="color:#7ED321">金额：-{{Math.abs(item.amount)}}元</span>
              </div>
              <div class="container_list">
                <div class="container_left">
                  <span class="bankNumber">订单号：{{item.orderNo}}</span>
                  <span>类型：
                    <i style="color:#f59523">{{item.walletType===1?'现金':item.walletType===2?'积分':'模拟'}}</i>
                  </span>
                  <span>时间：{{formartTime(item.createTimeStamp)}}</span>
                  <span>当前余额：{{item.currentBalance}}</span>
                </div>
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
      <transition name="fade"
                  mode="out-in">
        <div class="mask_cz"
             v-show="maskFlat"
             @click="closeMask"></div>
      </transition>
    </div>
    <transition name="fade"
                mode="out-in">
      <shaiXuan :conditionFlat='conditionFlat'
                :statusIndex='statusIndex'
                :timerIndex='timerIndex'
                :allBanlances='allBanlances'
                @shaiXuanValue='shaiXuanValue'
                @showDataZidingyi='showDataZidingyi'
                @closeMaskAfter='closeMaskAfter'
                :typeData='typeData'
                v-show="conditionFlat"></shaiXuan>
    </transition>
    <date :showCalendar.sync='showdateDouble'
          maxDate="12m"
          :options="dateOptionsDouble"
          @changeDate="changeDateDouble"></date>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
import { mapGetters } from 'vuex'
import { getLocal, removeLocal } from '@/utils/storage'
import date from '@/components/userCenter/datepicker/datePicker'
import shaiXuan from './trandeShaixuan'
import { Toast } from 'mint-ui'
import utils from '@/utils'
import moment from 'moment'
import FastClick from 'fastclick'
FastClick.attach(document.body)
export default {
  name: 'trandeDetails',
  components: {
    HeaderView,
    shaiXuan,
    date
  },
  data () {
    return {
      wrapperHeight: 0,
      statusFlat: false,
      maskFlat: false,
      timerFlat: false,
      typeFlat: false,
      loadFlat: false,
      conditionFlat: false,
      showdateDouble: false,
      startDouble: '',
      endDouble: '',
      dateOptionsDouble: {
        scrollEnd: true, // 滚到最后
        start: '2018-01-01',
        end: '',
        // maxDate: '12m', // 月份跨度
        isDoubleCheck: true
        // startDate: ''
      },
      statusIndex: {
        name: '现金',
        walletName: 'CASH',
        walletType: 1,
        oIndex: 0
      },
      loadingShow: false,
      typeData: {},
      timerIndex: { name: '当天', date: 1, status: 0 },
      startDate: '',
      endDate: '',
      pageOneNum: 1,
      sizeOneNum: 10,
      pageSize: 0,
      zidingyiTime: '0'
    }
  },
  watch: {
    showdateDouble (n) {
      let t = new Date() / 1000
      this.dateOptionsDouble.start = utils.getYearDate()
      this.dateOptionsDouble.end = utils.time('0', t * 1000)
    }
  },
  computed: {
    ...mapGetters([
      'allbalance',
      'tradeRecord',
      'getTradeDetailType',
      'timeList'
    ]),
    allBanlances () {
      let list = this.allbalance
      list.map((item, idx) => {
        item.oIndex = idx
        item.name =
          item.walletType === 1
            ? '现金'
            : item.walletType === 2
              ? '积分'
              : '模拟'
        return item
      })
      return list
    }
  },
  created () {
    let getBanlance = getLocal('balance')
    if (getBanlance) {
      this.statusIndex = getBanlance
    }
    if (this.allbalance.length === 0) {
      this.getBalance()
    }
    this.getTypeList()
    this.$store.dispatch('getTimeList')
    this.loadFlat = true
    this.timerIndex = this.timeList[0]
    this.getTradeDetails(
      this.statusIndex.walletType,
      this.typeData.typeId,
      this.timeList[0].startTimes,
      this.timeList[0].endTimes
    )
  },
  mounted () {
    this.conHeight()
  },
  methods: {
    getBalance () {
      this.$store.dispatch('balance')
    },
    // 打开钱包筛选
    onClickStatusOpen () {
      if (this.timerFlat || this.typeFlat) {
        this.statusFlat = true
        this.timerFlat = false
        this.typeFlat = false
        this.maskFlat = true
        return false
      }
      this.statusFlat = !this.statusFlat
      this.maskFlat = !this.maskFlat
    },
    // 钱包筛选
    onClickStatusList (item, idx) {
      this.statusIndex = item
      this.loadFlat = true
      this.scrollerToTop()
      this.onClickStatusOpen()
      this.getTradeDetails(
        this.statusIndex.walletType,
        this.typeData.typeId,
        this.startDate,
        this.endDate
      )
    },
    onClickShaiXuan () {
      this.zidingyiTime = '1'
      this.getTypeList()
      this.conditionFlat = true
    },
    // 打开时间筛选
    onClickTimerOpen () {
      if (this.statusFlat || this.typeFlat) {
        this.timerFlat = true
        this.statusFlat = false
        this.typeFlat = false
        this.maskFlat = true
        return false
      }
      this.timerFlat = !this.timerFlat
      this.maskFlat = !this.maskFlat
    },
    // 时间选择
    onClickTimerList (item, idx) {
      this.loadFlat = true
      this.timerIndex = item
      this.scrollerToTop()
      this.startDouble = ''
      this.endDouble = ''
      this.getTradeDetails(
        this.statusIndex.walletType,
        this.typeData.typeId,
        item.startTimes,
        item.endTimes
      )
      this.timerFlat = false
      this.maskFlat = false
    },
    // 打开类型筛选
    onClickTypeOpen () {
      if (this.statusFlat || this.timerFlat) {
        this.statusFlat = false
        this.timerFlat = false
        this.typeFlat = true
        this.maskFlat = true
        return false
      }
      this.typeFlat = !this.typeFlat
      this.maskFlat = !this.maskFlat
    },
    // 点击类型
    onClickTypeList (item, idx) {
      this.loadFlat = true
      this.typeData = item
      this.scrollerToTop()
      this.typeFlat = false
      this.maskFlat = false
      this.getTradeDetails(
        this.statusIndex.walletType,
        this.typeData.typeId,
        this.startDate,
        this.endDate
      )
    },
    // 交易明细
    getTradeDetails (walletTypes, typeIds, startTimer, endTimer, done) {
      let das = {
        pageNum: 1,
        pageSize: this.sizeOneNum,
        startTime: startTimer,
        endTime: endTimer,
        walletType: walletTypes,
        typeId: typeIds
      }
      this.startDate = startTimer
      this.endDate = endTimer
      this.$store
        .dispatch('tradeRecord', das)
        .then(res => {
          if (res.status) {
            this.pageSize = res.data.pages
            this.loadFlat = false
            this.$store.dispatch('hideLoading')
            this.conHeight()
            this.pageOneNum = 1
            this.sizeOneNum = 10
            if (done) {
              done()
            }
          }
        })
        .catch(() => {
          if (done) {
            done()
          }
          this.loadFlat = false
          this.$store.dispatch('hideLoading')
        })
    },
    // 转化时间
    timerFormart (date) {
      return utils.getDayNow(date)
    },
    // 获取类型
    getTypeList () {
      this.$store.dispatch('tradeRecordType').then(res => {
        if (res.status) {
          this.getTioNavType(this.getTradeDetailType)
        }
      })
    },
    // 取头部导航类型
    getTioNavType (das) {
      das.filter((item, idx) => {
        if (item.level === 3 && item.typeId === 0) {
          this.typeData = item
        }
      })
    },
    // 下拉刷新
    refresh (done) {
      this.getTradeDetails(
        this.statusIndex.walletType,
        this.typeData.typeId,
        this.startDate,
        this.endDate,
        done
      )
    },
    // 上拉加载
    infinite (done) {
      this.addTradeDatail(
        this.statusIndex.walletType,
        this.typeData.typeId,
        this.startDate,
        this.endDate,
        done
      )
    },
    // 追加交易明细
    addTradeDatail (walletTypes, typeIds, startTimer, endTimer, done) {
      const _that = this
      if (this.pageOneNum < this.pageSize) {
        let das = {
          pageNum: (this.pageOneNum += 1),
          pageSize: this.sizeOneNum,
          startTime: startTimer,
          endTime: endTimer,
          walletType: walletTypes,
          typeId: typeIds
        }
        this.$store
          .dispatch('addTradeRecord', das)
          .then(res => {
            if (res.status) {
              _that.pageSize = res.data.pages
              if (done) {
                done()
              }
              _that.conHeight()
            }
          })
          .catch(() => {
            if (done) {
              done()
            }
          })
      } else {
        done(true)
      }
    },
    showDouble () {
      if (this.startDouble && this.endDouble) {
        return this.startDouble + '至' + this.endDouble
      } else if (this.startDouble && !this.endDouble) {
        return this.startDouble
      } else {
        return ''
      }
    },
    changeDateDouble (start, end) {
      if (!start || !end) {
        Toast({
          message: '请选择时间',
          duration: 1000
        })
        return
      }
      this.startDouble = start
      this.endDouble = end
      let s = start + ' ' + '00:00:00'
      let e = end + ' ' + '23:59:59'
      let num = Date.parse(end) - Date.parse(start)
      let das = {
        startTimes: new Date(s).toISOString(),
        endTimes: new Date(e).toISOString(),
        name: Math.floor(num / (24 * 3600 * 1000)) + 1 + '天',
        date: start + ' - ' + end,
        status: 3
      }
      this.timerIndex = das
      if (this.zidingyiTime === '0') {
        this.loadFlat = true
        this.timerFlat = false
        this.maskFlat = false
        this.getTradeDetails(
          this.statusIndex.walletType,
          this.typeData.typeId,
          das.startTimes,
          das.endTimes
        )
      }
    },
    closeMaskAfter (val) {
      this.conditionFlat = val.flat
      this.zidingyiTime = val.zidingyiTime
      this.timerIndex = val.oldTime
      this.getTradeDetails(
        this.statusIndex.walletType,
        this.typeData.typeId,
        val.oldTime.startTimes,
        val.oldTime.endTimes
      )
    },
    // 还原时间
    // cleanTimer (val) {
    //   console.log(val)
    //   this.timerIndex = val
    // },
    customize () {
      this.showdateDouble = true
    },
    showDataZidingyi (val) {
      this.showdateDouble = val
    },
    shaiXuanValue (val) {
      this.timerIndex = val.time
      this.statusIndex = val.walletTypes
      this.getTradeDetails(
        val.walletTypes.walletType,
        val.tradeNumber,
        val.time.startTimes,
        val.time.endTimes
      )
      this.conditionFlat = false
    },
    scrollerToTop () {
      if (this.$refs.my_scroller) {
        this.$refs.my_scroller.scrollTo(0, 0, true)
      }
    },
    formartTime (t) {
      return moment(t).format('YYYY-MM-DD HH:mm:ss')
    },
    // 关闭遮罩
    closeMask () {
      this.statusFlat = false
      this.maskFlat = false
      this.timerFlat = false
      this.typeFlat = false
    },
    conHeight () {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_entrust.getBoundingClientRect().top
    }
  },
  beforeRouteLeave (to, from, next) {
    removeLocal('balance')
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import './trandeDetail.styl'
</style>
