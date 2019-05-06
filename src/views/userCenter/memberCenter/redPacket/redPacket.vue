<template>
  <div class="user_body">
    <header-view :titles="'红包'"
                 class="redPacket_red">
      <router-link slot="header_Right"
                   to='/userCenter/RechargeRecord'
                   class="svg-container">
      </router-link>
    </header-view>
    <div class="mint-content redPacket_view">
      <div class="redPacket-title">
        <i class="radius1"></i>
        <i class="radius2"></i>
        <i class="radius3"></i>
      </div>
      <div class="redPacket-list">
        <div class="top_title"
             v-show="loadFlat">
          <i class="icons icon_spinner">
            <svg-icon icon-class="Spinner"></svg-icon>
          </i>
          <span>正在加载红包..</span>
        </div>
        <ul v-if="getRedPacketList.length>0"
            ref="wrapper_entrust"
            :style="{ height: (wrapperHeight-50) + 'px' }">
          <li v-for="(item,idx) in getRedPacketList"
              :key="item.id"
              @click="onClickRedPacket(item,idx)"
              :class="item.status===3?'active':''">
            <i class="radius_box"></i>
            <div class="content">
              <b></b>
              <i>领取</i>
              <p>红包福利</p>
            </div>
            <div class="expire"
                 v-show="item.status===3">
              <span></span>
              <i>
                <svg-icon icon-class="expire"></svg-icon>
              </i>
            </div>
            <div class="received"
                 v-show="item.status===1">
              <span class="money_num">
                <i>{{item.amount}}元</i>
              </span>
              <i>
                <svg-icon icon-class="redbag"></svg-icon>
              </i>
            </div>
          </li>
        </ul>
        <div class="noData_icon"
             ref="wrapper_entrust"
             :style="{ height: (wrapperHeight-50) + 'px' }"
             v-else>
          <i>
            <svg-icon icon-class="no_redBag"></svg-icon>
          </i>
          <p>暂无红包信息..</p>
        </div>
        <div class="redBag_modal"
             v-show="modelBox">
          <div class="redBag_label">
            <div class="redBag_box">
              <span class="radius_box"></span>
              <div class="radius_boxs">
                <p>恭喜您获得</p>
                <b>{{moneyNum}}<i style="font-size:24px">元</i></b>
              </div>
              <div class="radius_bottom">
                <p>红包福利</p>
              </div>
            </div>
            <span class="close"
                  @click='closeMask'>
              <svg-icon icon-class="closeOff"></svg-icon>
            </span>
          </div>
          <span class="redBag_mask"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
import { mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'redPacket',
  components: {
    HeaderView
  },
  data () {
    return {
      loadFlat: false,
      pageNo: 1,
      pageSize: 10,
      pageTotal: 0,
      modelBox: false,
      moneyNum: 0,
      wrapperHeight: 0
    }
  },
  computed: {
    ...mapGetters(['getRedPacketList'])
  },
  mounted () {
    this.getRedPacket()
  },
  methods: {
    onClickRedPacket (item, idx) {
      const _that = this
      if (item.status === 1 || item.status === 3) {
        return false
      }
      if (item.status === 2) {
        Toast({
          message: '未到领取时间',
          position: 'middle',
          duration: 1000
        })
        return false
      }
      this.$store.dispatch('showLoading')
      this.$store.dispatch('lingquRedPacket', { id: item.id }).then(res => {
        this.$store.dispatch('hideLoading')
        if (res.status) {
          _that.modelBox = true
          _that.moneyNum = item.amount
          _that.getRedPacket()
        }
      }).catch(() => {
        this.$store.dispatch('hideLoading')
        Toast({
          message: '红包领取失败',
          position: 'middle',
          duration: 1000
        })
      })
    },
    getRedPacket () {
      const _that = this
      this.loadFlat = true
      this.$store.dispatch('findRedPacketList').then(res => {
        _that.loadFlat = false
        if (res.status) {
          _that.pageTotal = res.data.pages
          _that.pageNo = 1
          _that.conHeight()
        }
      }).catch(() => {
        _that.loadFlat = false
      })
    },
    closeMask () {
      this.modelBox = false
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
.redPacket_red
  background-color #ff5e4d !important
.redPacket_view
  overflow-x hidden
  .redPacket-title
    background #ff5e4d
    height 70px
    overflow hidden
    i
      border-radius 100%
      position absolute
      &.radius1
        width 60px
        height 60px
        background #ffada4
        left 20px
        top 20px
      &.radius2
        width 36px
        height 36px
        background linear-gradient(#ffada4, #E15247)
        opacity 0.8
        left 60%
        top 5px
      &.radius3
        width 60px
        height 60px
        background #ffada4
        right -20px
        top 20px
  .redPacket-list
    position absolute
    top 50px
    background #ffffff
    min-height 20px
    width 100%
    border-top-left-radius 20px
    border-top-right-radius 20px
    ul
      padding 20px 16px
      display flex
      flex-wrap wrap
      li
        width 100px
        height 126px
        background #E54215
        border-radius 5px
        overflow hidden
        margin 0 7px
        position relative
        margin-bottom 15px
        &:nth-last-child(1)
          margin-right 0
        i.radius_box
          width 126px
          height 126px
          background #E54215
          display block
          position absolute
          border-radius 100%
          box-shadow 0 0 10px #333
          top -56px
          margin-left -13px
        .content
          position relative
          top 0
          left 0
          height 100%
          width 100%
          b
            width 100%
            height 63px
          i
            width 48px
            height 48px
            background #F5A623
            border-radius 50%
            display block
            position absolute
            top 50%
            margin-top -24px
            left 50%
            margin-left -24px
            text-align center
            line-height 48px
            color #fff
            font-size 15px
          p
            width 50px
            color #fff
            position absolute
            bottom 12px
            left 50%
            font-size 12px
            font-weight 600
            margin-left -25px
        .received
          width 100px
          height 126px
          position absolute
          top 0
          left 0
          display block
          .money_num
            position absolute
            top 34px
            width 100%
            font-weight 600
            color #f5a623
            transform rotate(-5deg)
            i
              width 100%
              text-align center
              display block
              font-size 13px
        &.active
          background #D5D5D5
          .radius_box
            background #D5D5D5
          .content
            i
              background #C1BFC2
              color #9B9B9B
          .expire
            width 100%
            height 100%
            position absolute
            top 0
            left 0
            background rgba(255, 255, 255, 0.3)
            i
              width 50px
              height 50px
              margin 15px auto 0
              display block
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
.noData_icon
  padding-top 60px
  i
    width 120px
    height 120px
    margin 0px auto 0
    display block
    svg
      fill #ddd
  p
    text-align center
    font-size 16px
    color #ddd
    line-height 30px
.redBag_modal
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  z-index 9999
  .redBag_mask
    width 100%
    height 100%
    background rgba(0, 0, 0, 0.4)
    position absolute
    top 0
    left 0
  .redBag_label
    position absolute
    left 50%
    margin-left -128px
    top 50%
    margin-top -180px
    width 256px
    height 300px
    .redBag_box
      width 256px
      height 300px
      background #fff
      position absolute
      z-index 1
      border-radius 20px
      overflow hidden
      .radius_box
        width 300px
        height 300px
        border-radius 100%
        background #E54215
        position absolute
        top -100px
        left -20px
      .radius_boxs
        position relative
        z-index 9
        p
          font-size 25px
          text-align center
          color #F5A623
          padding-top 30px
        b
          font-size 68px
          text-align center
          display block
          color #fff
          padding-top 10px
          font-weight normal
      .radius_bottom
        color #F5A623
        font-size 28px
        text-align center
        line-height 40px
        position relative
        top 64px
    .close
      width 35px
      height 35px
      display block
      position absolute
      bottom -50px
      z-index 999
      left 50%
      margin-left -18px
      svg
        fill #fff
</style>
