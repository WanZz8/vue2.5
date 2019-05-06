<template>
  <div class="user_body">
    <header-view :titles="'提现记录'"
                 class="redPacket_red">
      <router-link slot="header_Right"
                   to='/userCenter/RechargeRecord'
                   class="svg-container">
      </router-link>
    </header-view>
    <div class="mint-content withdrawRecord_view">
      <div class="withdraw_select">
        <div class="select_status select">
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
              <li v-for="(item,idx) in statusList"
                  :class="statusIndex.id===idx?'active':''"
                  :key="item.name"
                  @click="onClickStatusList(item,idx)">{{item.name}}</li>
            </ul>
          </transition>
        </div>
        <div class="select_timer select">
          <div class="select_ouline_status"
               @click="onClickTimerOpen">
            <p>日期 ({{timerIndex.name}})</p>
            <i :class='[timerFlat?"open":""]'>
              <svg-icon icon-class="sj"></svg-icon>
            </i>
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
                  :class="timerIndex.status===3?'active':''">{{!this.showDouble()?'自定义':this.showDouble()}}</li>
            </ul>
          </transition>
        </div>
      </div>
      <div class="withdraw_content">
        <div class="top_title"
             v-if="loadFlat">
          <i class="icons icon_spinner">
            <svg-icon icon-class="Spinner"></svg-icon>
          </i>
          <span>正在加载更多数据...</span>
        </div>
        <!--列表-->
        <div class="main-body"
             ref="wrapper_entrust"
             :style="{ height: (wrapperHeight-5) + 'px' }">
          <scroller :on-refresh="refresh"
                    :on-infinite="infinite"
                    ref="my_scroller"
                    v-if="withDrawRecord.length">
            <div class="entrust_list"
                 v-for="(item, index) in recordData"
                 :key="index+'idx'">
              <div class="entrust_title">
                <h1>{{item.bankName}}</h1>
                <span style="color:#e75a39;text-align:right;line-height:40px;float:right;font-size:12px;">提现金额：{{item.amount}} 元</span>
              </div>
              <div class="container_list">
                <ul>
                  <li class="container_left">
                    <!-- <span>姓名：11</span> -->
                    <span class="bankNumber">订单号：{{item.orderNo}}</span>
                    <span>提现状态：
                      <i v-if="item.status==1"
                         style="color:#f59523">申请</i>
                      <i v-else-if="item.status==2"
                         style="color:#cea412">审核</i>
                      <i v-else-if="item.status==3"
                         style="color:#f52323">拒绝</i>
                      <i v-else-if="item.status==4"
                         style="color:#FF5E4D">发起</i>
                      <i v-else-if="item.status==5"
                         style="color:#34C487">成功</i>
                      <i v-else
                         style="color:#FF5E4D">失败</i>
                    </span>
                    <span>手续费：{{item.fee}}元</span>
                    <span v-show="item.status===3">拒绝理由：{{item.remark}}</span>
                    <span>提现时间：{{formartTime(item.createTimeStamp)}}</span>
                  </li>
                </ul>
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
    <date :showCalendar.sync='showdateDouble'
          maxDate="12m"
          :options="dateOptionsDouble"
          @changeDate="changeDateDouble"></date>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import noData from '@/components/public/noData/noData'
import date from '@/components/userCenter/datepicker/datePicker'
import utils from '@/utils/'
import { mapGetters } from 'vuex'
import timer from '@/utils/index'
import { Toast } from 'mint-ui'
import moment from 'moment'
import FastClick from 'fastclick'
FastClick.attach(document.body)
export default {
  name: 'withdrawRecord',
  components: {
    layouts,
    HeaderView,
    noData,
    date
  },
  data () {
    return {
      wrapperHeight: 0,
      statusFlat: false,
      maskFlat: false,
      timerFlat: false,
      loadFlat: false,
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
      statusIndex: { name: '全部', id: 0, status: '' },
      statusList: [
        { name: '全部', id: 0, status: '' },
        { name: '申请', id: 1, status: 1 },
        { name: '审核', id: 2, status: 2 },
        { name: '拒绝', id: 3, status: 3 },
        { name: '发起', id: 4, status: 4 },
        { name: '成功', id: 5, status: 5 },
        { name: '失败', id: 6, status: 6 }
      ],
      loadingShow: false,
      timerIndex: { name: '当天', date: 1, status: 0 },
      startDate: '',
      endData: '',
      pageOneNum: 1,
      sizeOneNum: 10,
      pageSize: 0
    }
  },
  watch: {
    showdateDouble (n) {
      let t = new Date() / 1000
      this.dateOptionsDouble.start = utils.getYearDate()
      this.dateOptionsDouble.end = utils.time('0', t * 1000)
    }
  },
  created () {
    this.loadFlat = true
    this.$store.dispatch('getTimeList')
    this.onClickTimerList(this.timeList[0], this.timerIndex.status)
  },
  mounted () {
    this.conHeight()
  },
  computed: {
    ...mapGetters(['withDrawRecord', 'timeList']),
    recordData () {
      let das = this.withDrawRecord
      if (das.length === 0) {
        return
      }
      let t = das.map((item, idx) => {
        let ts = new Date(item.createTime) / 1000
        item.createData = timer.time('1', ts * 1000)
        return item
      })
      return t
    }
  },
  methods: {
    onClickStatusOpen () {
      if (this.timerFlat) {
        this.statusFlat = true
        this.timerFlat = false
        this.maskFlat = true
        return false
      }
      this.statusFlat = !this.statusFlat
      this.maskFlat = !this.maskFlat
    },
    onClickTimerOpen (item, idx) {
      if (this.statusFlat) {
        this.timerFlat = true
        this.statusFlat = false
        this.maskFlat = true
        return false
      }
      this.timerFlat = !this.timerFlat
      this.maskFlat = !this.maskFlat
    },
    onClickStatusList (item, idx) {
      this.statusIndex = item
      this.scrollerToTop()
      this.statusFlat = false
      this.maskFlat = false
      this.getWithdraw(item.status, this.startDate, this.endDate)
      this.loadFlat = true
    },
    onClickTimerList (item, idx) {
      let status = this.statusIndex.status === 0 ? '' : this.statusIndex.status
      this.scrollerToTop()
      this.timerIndex = item
      this.timerFlat = false
      this.maskFlat = false
      this.getWithdraw(status, item.startTimes, item.endTimes)
      this.loadFlat = true
    },
    closeMask () {
      this.timerFlat = false
      this.statusFlat = false
      this.maskFlat = false
    },
    refresh (done) {
      this.getWithdraw(
        this.statusIndex.status,
        this.startDate,
        this.endDate,
        done
      )
    },
    infinite (done) {
      this.addWithdraw(
        this.statusIndex.status,
        this.startDate,
        this.endDate,
        done
      )
    },
    getWithdraw (status, startTimer, endTimer, done) {
      const _that = this
      this.startDate = startTimer
      this.endDate = endTimer
      this.$store
        .dispatch('withdrawRecord', {
          pageNum: 1,
          pageSize: this.sizeOneNum,
          stauts: status,
          startTime: startTimer,
          endTime: endTimer
        })
        .then(res => {
          if (res.data) {
            _that.pageOneNum = 1
            _that.sizeOneNum = 10
            _that.pageSize = res.data.pages
            if (done) {
              done()
            }
            _that.conHeight()
            this.loadFlat = false
          }
        })
        .catch(err => {
          this.loadFlat = false
          return err
        })
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
        date: '',
        status: 3
      }
      this.timerIndex = das
      this.timerFlat = false
      this.maskFlat = false
      this.loadFlat = true
      this.getWithdraw(this.statusIndex.status,
        das.startTimes,
        das.endTimes)
    },
    customize () {
      this.showdateDouble = true
    },
    addWithdraw (status, startTimer, endTimer, done) {
      const _that = this
      if (this.pageOneNum < this.pageSize) {
        let das = {
          pageNum: (this.pageOneNum += 1),
          pageSize: this.sizeOneNum,
          status: status,
          startTime: startTimer,
          endTime: endTimer
        }
        this.$store
          .dispatch('addWithdrawRecord', das)
          .then(res => {
            if (res.status) {
              _that.pageSize = res.data.pages
              if (done) {
                done()
              }
              _that.conHeight()
            }
          })
          .catch(err => {
            return err
          })
      } else {
        done(true)
      }
    },
    formartTime (t) {
      return moment(t).format('YYYY-MM-DD HH:mm:ss')
    },
    scrollerToTop () {
      if (this.$refs.my_scroller) {
        this.$refs.my_scroller.scrollTo(0, 0, true)
      }
    },
    conHeight () {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_entrust.getBoundingClientRect().top
    }
  }
}
</script>

<style lang="stylus">
@import './withdrawRecord.styl'
</style>
