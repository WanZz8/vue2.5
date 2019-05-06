<template>
  <div class="user_body">
    <header-view :titles="this.templateName"
                 :headerLeft='true'>
      <div class="home_back_icon"
           slot="header_Left"
           @click='goBack'>
        <i class="icons icon_Back">
          <svg-icon icon-class="left"></svg-icon>
        </i>
      </div>
    </header-view>
    <div class="mint-content notice_list"
         id="notice">
      <ul v-if="this.getNoticeData&&this.getNoticeData.content.length>0">
        <li class="notice_lists"
            v-for="(item,idx) in getNoticeData.content"
            :class="item.announcementId===noticeId?'active':''"
            :key="item.announcementId"
            @click.prevent="onClickNotice($event,item,idx)">
          <div class="notice_Title">
            <h3>{{item.cnSummary}}</h3>
            <i :style="item.announcementId===noticeId?'transform:rotate(180deg)':'transform:rotate(0deg)'">
              <svg-icon icon-class="downs"></svg-icon>
            </i>
          </div>
          <div class="notice_Content">
            <div class="notice_box"
                 :style="item.announcementId===noticeId?'height:120px;opcity:1':'height:0;overflow:hidden;opcity:0'">
              <p v-html='item.cnContent'></p>
            </div>
          </div>
          <div class="notice_Time">
            <p>{{formartTime(item.createTimeStamp)}}</p>
          </div>
        </li>
      </ul>
      <div class="noData_icon"
           v-else>
        <i>
          <svg-icon icon-class="noDatas"></svg-icon>
        </i>
        <p>暂无内容..</p>
      </div>
      <!-- <div class="printNum"
           @click="payOpen">
        <p>请输入</p>
      </div>
      <key-view :isTrue='isTrue'
                @backFnc='backFnc'></key-view> -->
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
import { mapGetters } from 'vuex'
import moment from 'moment'
// import keyView from '@/components/userCenter/paymentPwd/支付密码'
export default {
  components: {
    HeaderView
    // keyView
  },
  data () {
    return {
      templateName: '公告',
      noticeId: 0,
      isTrue: false
    }
  },
  computed: {
    ...mapGetters(['getNoticeData'])
  },
  mounted () {
    if (!this.getNoticeData) {
      this.$store.dispatch('getNotice')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    onClickNotice (e, item, idx) {
      if (e.currentTarget.className.indexOf('active') !== -1) {
        this.noticeId = ''
      } else {
        this.noticeId = item.announcementId
      }
    },
    formartTime (t) {
      return moment(t).format('YYYY-MM-DD HH:mm:ss')
    },
    payOpen () {
      this.isTrue = true
    },
    backFnc (val) {
      this.isTrue = val.isTrue
      console.log(val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.notice_list
  ul
    li
      padding 0 10px
      margin-top 16px
      min-height 80px
      .notice_Title
        display flex
        line-height 45px
        h3
          font-size 15px
          color #6B6B6B
          flex 0 0 90%
          width 90%
        i
          width 10%
          flex 0 0 10%
          height 15px
          display block
          margin-top 20px
      .notice_Content, .notice_Time
        font-size 13px
        line-height 26px
        color #6B6B6B
      .notice_Content
        .notice_box
          height 0
          transition all 0.3s ease
          overflow-y auto
      .notice_Time
        line-height 34px
        border-bottom 1px dashed #eee
.noData_icon
  padding-top 60px
  i
    width 150px
    height 150px
    margin 0px auto 0
    display block
    svg
      fill #ddd
  p
    text-align center
    font-size 20px
    color #ddd
    font-weight 600
</style>
