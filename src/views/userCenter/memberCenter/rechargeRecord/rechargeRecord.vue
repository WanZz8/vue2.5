<template>
  <div class="user_body">
    <header-view :titles="'充值记录'">
      <router-link slot="header_Right"
                   to='/register'
                   class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content rechargeRecord_view">
      <div class="reRocd_select">
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
      <div class="allRecords_detail">
        <!--列表-->
        <div class="top_title"
             v-show="loadFlat">
          <i class="icons icon_spinner">
            <svg-icon icon-class="Spinner"></svg-icon>
          </i>
          <span>充值记录拉取中..</span>
        </div>
        <div class="main-body"
             ref="wrapper_entrust"
             :style="{ height: (wrapperHeight-5) + 'px' }">
          <scroller :on-refresh="refresh"
                    :on-infinite="infinite"
                    ref="my_scroller"
                    v-if="record.length">
            <div class="entrust_list"
                 v-for="(item, index) in recordData"
                 :key="index+'idx'">
              <div class="entrust_title">
                <h1>{{item.channelName}}</h1>
              </div>
              <div class="container_list">
                <ul>
                  <li class="container_left">
                    <span>充值状态：
                      <i v-if="item.status==1"
                         style="color:#F5A623">处理中</i>
                      <i v-else-if="item.status==2"
                         style="color:#34C487">成功</i>
                      <i v-else
                         style="color:#FF5E4D">失败</i>
                    </span>
                    <span>交易时间：{{formartTime(item.createTimeStamp)}}</span>
                  </li>
                  <li class="container_center"></li>
                  <li class="container_right">
                    <span>充值金额：{{item.amount}} 元</span>
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
      <!-- </div> -->
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
import date from '@/components/userCenter/datepicker/datePicker'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
import timer from '@/utils/index'
import channel from './channel'
import utils from '@/utils'
import moment from 'moment'
import FastClick from 'fastclick'
FastClick.attach(document.body)
export default {
  name: 'rechargeRecord',
  components: {
    layouts,
    HeaderView,
    date
  },
  data () {
    return {
      selected: '0',
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
        { name: '处理中', id: 1, status: 1 },
        { name: '成功', id: 2, status: 2 },
        { name: '失败', id: 3, status: 3 }
      ],
      loadingShow: false,
      timerIndex: { name: '当天', date: 1, status: 0 },
      startDate: '',
      endData: '',
      pageOneNum: 1,
      sizeOneNum: 10,
      pageSize: 0,
      channels: channel
    }
  },
  computed: {
    ...mapGetters(['record', 'timeList']),
    recordData () {
      let das = this.record
      if (das.length === 0) {
        return
      }
      let t = das.map((item, idx) => {
        let ts = new Date(item.createTime) / 1000
        item.createData = timer.time('1', ts * 1000)
        for (let i = 0; i < this.channels.length; i++) {
          if (this.channels[i].channelId === item.channelId) {
            item.channelName = this.channels[i].channelName
          }
        }
        return item
      })
      return t
    }
  },
  created () {
    this.loadFlat = true
    // this.getRecord()
    this.$store.dispatch('getTimeList')
    this.onClickTimerList(this.timeList[0], this.timerIndex.status)
  },
  mounted () {
    this.conHeight()
  },
  watch: {
    showdateDouble (n) {
      let t = new Date() / 1000
      this.dateOptionsDouble.start = utils.getYearDate()
      this.dateOptionsDouble.end = utils.time('0', t * 1000)
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
    onClickTimerOpen () {
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
      this.statusFlat = false
      this.maskFlat = false
      this.scrollerToTop()
      this.getRecord(item.status, this.startDate, this.endDate)
      this.loadFlat = true
    },
    onClickTimerList (item, idx) {
      let status = this.statusIndex.status === 0 ? '' : this.statusIndex.status
      this.timerIndex = item
      this.timerFlat = false
      this.maskFlat = false
      this.scrollerToTop()
      this.startDouble = ''
      this.endDouble = ''
      this.getRecord(status, item.startTimes, item.endTimes)
      this.loadFlat = true
    },
    refresh (done) {
      this.getRecord(
        this.statusIndex.status,
        this.startDate,
        this.endDate,
        done
      )
    },
    infinite (done) {
      this.addGetRecord(
        this.statusIndex.status,
        this.startDate,
        this.endDate,
        done
      )
    },
    // 充值记录
    getRecord (status, startTimer, endTimer, done) {
      this.startDate = startTimer
      this.endDate = endTimer
      const _that = this
      let das = {
        pageNum: 1,
        pageSize: 10,
        status: status,
        startTime: startTimer,
        endTime: endTimer
      }
      this.$store
        .dispatch('record', das)
        .then(res => {
          this.loadFlat = false
          if (res.status) {
            _that.pageOneNum = 1
            _that.sizeOneNum = 10
            _that.pageSize = res.data.pages
            if (done) {
              done()
            }
            _that.conHeight()
          }
        })
        .catch(err => {
          this.loadFlat = false
          return err
        })
    },
    // 追加充值记录
    addGetRecord (status, startTimer, endTimer, done) {
      const _that = this
      if (this.pageOneNum < this.pageSize) {
        let das = {
          pageNum: (this.pageOneNum += 1),
          pageSize: 10,
          status: status,
          startTime: startTimer,
          endTime: endTimer
        }
        this.$store
          .dispatch('addRecord', das)
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
      this.getRecord(this.statusIndex.status,
        das.startTimes,
        das.endTimes)
    },
    customize () {
      this.showdateDouble = true
    },
    formatDate (timestamp, formats) {
      formats = formats || 'Y-M-D'
      var myDate = timestamp ? new Date(timestamp) : new Date()
      var year = myDate.getFullYear()
      var month = formatDigit(myDate.getMonth() + 1)
      var day = formatDigit(myDate.getDate())
      var hour = formatDigit(myDate.getHours())
      var minute = formatDigit(myDate.getMinutes())
      var second = formatDigit(myDate.getSeconds())
      return formats.replace(/Y|M|D|h|m|s/g, function (matches) {
        return {
          Y: year,
          M: month,
          D: day,
          h: hour,
          m: minute,
          s: second
        }[matches]
      })
      // 小于10补0
      function formatDigit (n) {
        return n.toString().replace(/^(\d)$/, '0$1')
      }
    },
    closeMask () {
      this.timerFlat = false
      this.statusFlat = false
      this.maskFlat = false
    },
    scrollerToTop () {
      if (this.$refs.my_scroller) {
        this.$refs.my_scroller.scrollTo(0, 0, true)
      }
    },
    formartTime (t) {
      return moment(t).format('YYYY-MM-DD HH:mm:ss')
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
@import './rechargeRecord.styl'
</style>
