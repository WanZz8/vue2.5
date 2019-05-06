<template>
  <div class="user_body">
    <header-view :titles="'充值'">
      <router-link slot="header_Right"
                   to='/userCenter/RechargeRecord'
                   class="svg-container">
        <p>充值记录</p>
      </router-link>
    </header-view>
    <div class="mint-content rechar_view">
      <div class="part1">
        <div class="part1_p">
          <div class="par_lf">
            <img src="../../../../assets/images/userCenter/timg.png" />
          </div>
          <div class="par_rt">
            <!-- <p>
              <span class="vip">VIP</span>
            </p> -->
            <p>
              <span class="nikeName">昵称：<i style="font-weight:600;font-size:15px">{{userInfo.userName}}</i></span>
              <span class="vip">VIP</span>
            </p>
            <p class="balace_wrap">
              <span class="balace">账户余额&nbsp;(&yen;)</span>
              <span class="money">&nbsp;{{balance.balance>0?balance.balance.toFixed(2):0.00}}元</span>
            </p>
            <p class="present_wrap">
              <!--<span>当前汇率:</span>-->
              <!--<span>6.3633人民币/美元</span>-->
            </p>
          </div>
        </div>
      </div>
      <div class="part2">
        <div class="scroll_wrap">
          <!--<div class="part_scroll">-->
          <!--<div class="vip_container" ref="vipContainer">-->
          <!--<div class="vip_item">-->
          <!--<p class="vip_p1">VIP2 专享</p>-->
          <!--<p class="vip_p2">$ 10.00</p>-->
          <!--<p class="vip_p3">已解锁</p>-->
          <!--</div>-->
          <!--<div class="vip_item">-->
          <!--<p class="vip_p1">VIP2 专享</p>-->
          <!--<p class="vip_p2">$ 10.00</p>-->
          <!--<p class="vip_p3">已解锁</p>-->
          <!--</div>-->
          <!--<div class="vip_item">-->
          <!--<p class="vip_p1">VIP2 专享</p>-->
          <!--<p class="vip_p2">$ 10.00</p>-->
          <!--<p class="vip_p3">已解锁</p>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <div class="p2_title">
          <p class="p2_ti_p1">请选择充值渠道</p>
          <!--<p class="p2_ti_p2">无可用优惠券</p>-->
        </div>
        <div class="p2_list">
          <div class="rk_b ripple"
               v-for="(item, index) in channellist"
               :key="index+'idx'"
               @click.stop="goChannelRechanrge(item)">
            <!-- <mt-cell :title="item.channelName">

            </mt-cell> -->
            <!--控制显示隐藏-->
            <div class="recharge_list">
              <div class="iconImg">
                <i class="icons bankIcon"
                   slot="icon">
                  <svg-icon icon-class="bankPay"></svg-icon>
                </i>
              </div>
              <p>{{item.channelName}}</p>
              <div class="icon_back">
                <i class="icons icon_forward">
                  <svg-icon icon-class="forward"></svg-icon>
                </i>
              </div>
            </div>
          </div>
        </div>
        <div class="p2_foter">
          <p class="p2_fo_p2">遇到问题请 <i @click="toService">联系客服</i></p>
        </div>
      </div>
      <!--<div class="part3">-->
      <!--<div class="p3_title">-->
      <!--<p>充值金额</p>-->
      <!--</div>-->
      <!--<div class="p3_ipt_wrap">-->
      <!--<p class="p3_wp_p">-->
      <!--<span class="p3_wp_p_sp">&yen;</span>-->
      <!--<input-->
      <!--type="text"-->
      <!--name="thirdparty"-->
      <!--placeholder="第三方合作通道，单笔100-500元"-->
      <!--&gt;-->
      <!--</p>-->
      <!--<p class="p3_ipt_useful">可用余额: 0元</p>-->
      <!--</div>-->
      <!--<div class="p3_money">-->
      <!--<p>支付金额</p>-->
      <!--</div>-->
      <!--<div class="p3_btn">-->
      <!--<div class="topay">去支付</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<mt-popup-->
      <!--v-model="popupVisible"-->
      <!--position="bottom"-->
      <!--class="pop_con"-->
      <!--closeOnClickModal="true"-->
      <!--&gt;-->
      <!--<div class="pop_con_b">-->
      <!--<div class="pop_b_header">-->
      <!--<p class="pop_p1" @click="handleClose">-->
      <!--<i class="icons icon_left">-->
      <!--<svg-icon icon-class="left"></svg-icon>-->
      <!--</i>-->
      <!--</p>-->
      <!--<p class="pop_p2">选择银行卡</p>-->
      <!--<p class="pop_p3">-->
      <!--<router-link to="/userCenter/bindCard">-->
      <!--添加-->
      <!--</router-link>-->
      <!--</p>-->
      <!--</div>-->
      <!--<div class="pop_con_sec">-->
      <!--<div class="sec_1">-->
      <!--<div class="rk_b ripple">-->
      <!--<mt-cell title="招商银行信用卡">-->
      <!--&lt;!&ndash;控制显示隐藏&ndash;&gt;-->
      <!--<span></span>-->
      <!--<i class="icons bankIcon" slot="icon">-->
      <!--<svg-icon icon-class="zsyh"></svg-icon>-->
      <!--</i>-->
      <!--</mt-cell>-->
      <!--<mt-cell title="招商银行信用卡">-->
      <!--&lt;!&ndash;控制显示隐藏&ndash;&gt;-->
      <!--<span></span>-->
      <!--<i class="icons bankIcon" slot="icon">-->
      <!--<svg-icon icon-class="zsyh"></svg-icon>-->
      <!--</i>-->
      <!--</mt-cell>-->
      <!--<mt-cell title="招商银行信用卡">-->
      <!--&lt;!&ndash;控制显示隐藏&ndash;&gt;-->
      <!--<span></span>-->
      <!--<i class="icons bankIcon" slot="icon">-->
      <!--<svg-icon icon-class="zsyh"></svg-icon>-->
      <!--</i>-->
      <!--</mt-cell>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</mt-popup>-->
    </div>
  </div>
</template>
<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { mapGetters } from 'vuex'
import { setSession, getLocal } from '@/utils/storage'
import { Toast } from 'mint-ui'
export default {
  name: 'recharge',
  components: {
    layouts,
    HeaderView
  },
  data () {
    return {
      bankList: [], // 从后得到的该用户的银行卡列表,
      popupVisible: false
    }
  },
  computed: {
    ...mapGetters(['balance', 'channellist', 'userInfo'])
  },
  created () {
    this.getBalance()
    this.getPayChannelList()
  },
  methods: {
    getBalance () {
      this.$store.dispatch('balance')
    },
    getPayChannelList () {
      this.$store.dispatch('showLoading')
      this.$store.dispatch('payChannelList').then(rs => {
        this.$store.dispatch('hideLoading')
      }).catch(err => {
        this.$store.dispatch('hideLoading')
        Toast(err)
        return err
      })
    },
    goChannelRechanrge (item) {
      const _that = this
      let das = {
        channelName: item.channelName,
        channelUuid: item.channelUuid
      }
      let isUserVierity = getLocal('isUserVierity') || getLocal('userInfo').isUserVierity
      if (isUserVierity) {
        setSession('payList', das)
        _that.$router.push('/userCenter/BankTransfer')
      } else {
        Toast({
          message: '请先完成实名认证',
          position: 'middle',
          duration: 1000
        })
      }
    },
    toService () {
      this.$router.push({ path: '/service' })
    }
  }
}
</script>

<style lang="stylus">
@import './recharge.styl'
</style>
