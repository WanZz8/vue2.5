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
    <div class="mint-content activityRuleGuize" :style="{'background':bgColor}">
      <div class="activityRule1"
           ref="wrapper_entrust"
           v-if="tolis=='0'">
        <div class="activity_Box"
             :style="{height:(wrapperHeight-30) + 'px'}">
          <div class="activity_container"
               :style="{height:(wrapperHeight-220) + 'px'}">
            <h2>每日欢迎礼金</h2>
            <p class="p2">
              活动对象：完成新人成就奖奖励的平台会员均可参与此活动<br />
              活动内容:<br />
            </p>
            <div class="content">
              <p class="p3">
                每日0点后单笔充值≥2000元送100元优惠大放送。<br />完成规定交易手数，即可在提现时间内提现。</p><br />
              <p class="p3">
                <i style="color:#FF26A7">如何申请：</i>需联系在线客服申请添加欢迎礼金。符合条件的优惠将在20分钟内添加至会员账户。</p>
              <p class="p3">
                <i style="color:#FF26A7">活动规则：</i>1.每日单笔存款≥2000元，申请优惠的存款金额需单笔满足，不可累积。每日享受1次欢迎礼金。<br />2.申请日欢迎礼金优惠的有效时间为存款后的1小时内以下3种情况将视为客户自动放弃该优惠：<br />
                <ul>
                  <li>● 满足优惠条件的存款已进行交易</li>
                  <li>● 满足优惠条件的存款1小时内未申请</li>
                  <li>● 足优惠条件的存款已申请成功提现</li>
                </ul>
                符合条件的优惠，会在审核通过后的20分钟内添加到账。<br />
                3.会员享受了欢迎礼金优惠后，需要完成交易手数要求，方可提款 。<br />
                4.已享受欢迎礼金优惠并已进行交易，不能申请取消该优惠。<br />
                5.该活动不与其他任何存款优惠活动共享。<br />
                6.欢迎礼金提款条件：需完成：元模式——外盘≥2手或内盘≥5手；角模式——外盘≥20手或内盘≥50手；<br />
                7.该优惠只适用于拥有一个独立账户的会员,每个独立账户的会员每日仅可申请一次。电子邮箱地址、电话号码、IP地址、支付方式(相同借记卡/信用卡/银行账户号码)、上网设备、网络环境等将可以作为判定是否为独立会员的条件。<br />
                8.任何违规下单及套取优惠行为，一经发现，官方将保留冻结您的账户盈利及余额的权利。官方保留修改、解释本规则的权利；以及在无通知的情况下作出改变或停止本次活动的权利。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="activityRule2"
           ref="wrapper_entrust"
           v-else-if="tolis=='1'">
        <div class="activity_Box"
             :style="{height:(wrapperHeight-30) + 'px'}">
          <div class="activity_container"
               :style="{height:(wrapperHeight-220) + 'px'}">
            <h2>新手成就</h2>
            <h3 class="h2">活动内容</h3>
            <p style="margin:10px 0;color:#666">
              1.新人加入：即完成注册<br />
              2.自报家门：完成实名认证<br />
              3.建立资金账户：绑定提现银行卡<br />
            </p>
            <h3 class="h2">兑换条件:</h3>
            <p class="p2"
               style="color:#666">1.积分可用于积分场（元模式）下单，积分场积分按照100:1兑换现金，100元起兑，可提现。<br />2.积分场交易后账户余额10000元可兑换100元，以此类推。自然月内累计可兑换现金最高500元。所兑换的现金可用于实盘操作或提现。</p>
            <h3 class="h2">兑换方式:</h3>
            <p class="p3"
               style="color:#666">1.请联系在线客服申请兑换积分，符合兑换条件的积分账户将于30分钟内兑换相对应金额至客户的主钱包内。<br />
              2.兑换次数不限
            </p>
          </div>
        </div>
      </div>
      <div class="activityRule3"
           v-else-if="tolis=='2'">
        <div class="activity_Box"
             :style="{height:(wrapperHeight-30) + 'px'}">
          <div class="activity_container"
               :style="{height:(wrapperHeight-220) + 'px'}">
            <h2>周全勤任务奖励</h2>
            <p style="color:#ff26a7;line-height:30px;">活动对象：所有实盘交易用户</p>
            <p>即日起每周完成对应天数连环赠送活动让您尽情操盘，欢乐投资不能停~！只需您每日<i style="color:#ff26a7">6:00-周六5:00休市（夏令时）</i>进行实盘交易达到指定累计天数即可申请对应之礼金详情请见下表。</p>
            <div class="tables">
              <table cellspacing="0"
                     cellpadding="0">
                <tr>
                  <th>交易范围</th>
                  <th>累计交易天数</th>
                  <th>交易要求</th>
                  <th>礼金</th>
                  <th>提款要求</th>
                </tr>
                <tr>
                  <td rowspan="2">国际品种</td>
                  <td>累计3天</td>
                  <td rowspan="4">元模式且每日交易≥2手</td>
                  <td>168</td>
                  <td rowspan="4">礼金需要交易一笔可提现</td>
                </tr>
                <tr>
                  <td>累计5天</td>
                  <td>288</td>
                </tr>
                <tr>
                  <td rowspan="2">国内品种</td>
                  <td>累计3天</td>
                  <td>88</td>
                </tr>
                <tr>
                  <td>累计5天</td>
                  <td>168</td>
                </tr>
              </table>
            </div>
            <div class="take_jl">
              <h2>活动规则：</h2>
              <p>
                1.北京时间每周一下午13点前系统将自动结算至客户账户中，周三23:59前未交易，礼金将过期。<br />
                2.活动期间每位独立客户每周仅限领取一次该奖励，如提前领取奖励本周后面的任务天数系统将不予以计算。
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="activityRule4" v-else-if="tolis=='5'">
        <div class="box_center">
          <img src="../../../assets/images/home/1.jpg"/>
          <img src="../../../assets/images/home/2.jpg"/>
          <img src="../../../assets/images/home/3.jpg"/>
          <img src="../../../assets/images/home/4.jpg"/>
          <img src="../../../assets/images/home/5.jpg"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
export default {
  components: {
    HeaderView
  },
  data () {
    return {
      templateName: '活动规则',
      tolis: '0',
      wrapperHeight: 0,
      bgColor: ''
    }
  },
  mounted () {
    this.tolis = this.$route.query.id
    this.activityBg()
    this.conHeight()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getPath () {
      console.log(this.$route.path)
    },
    activityBg() {
      if (this.tolis !== '5') {
        this.bgColor = '#300393'
      } else {
        this.bgColor = '#F5CFFF'
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
// .activityRuleGuize
//   background #300393
.activityRule1, .activityRule2, .activityRule3
  background url('../../../assets/images/home/bg.png') no-repeat
  background-size 100% 100%
  width 98%
  margin 0 auto
  .activity_Box
    padding 0 40px
    .activity_container
      position relative
      top 110px
      overflow-y auto
      h2
        font-size 16px
        color #4406FF
        padding 0 15px
        line-height 50px
        margin 5px 0 0px
        text-align center
      p.p2
        padding 0 15px
        margin 0 0 14px
        color #FF26A7
      .content
        padding 0 15px
        line-height 24px
        color #666
        .p3
          display block
    .activityRule2
      h2
        color #7B26E1
      .p1
        padding 0 15px
        color #666
      .p2
        color #666
      .h2
        font-size 14px
        padding 0 15px
        color #7b26e1
        margin-top 5px
      .p3
        padding 0 15px
        color #666
.activityRule2
  h3
    font-size 14px
    color #ff26a7
  p
    color #666
    padding 0 15px
  .h2
    padding 0 15px
.activityRule3
  h2
    color #EA1750
  p
    padding 0 15px
    color #666
  .tables
    padding 0 15px
    margin 20px 0
    table
      color #ff26a7
      font-size 14px
      border-right #ff26a7 1px solid
      border-top #ff26a7 1px solid
      th, td
        text-align center
        border-bottom #ff26a7 1px solid
        border-left #ff26a7 1px solid
      td
        border-left #ff26a7 1px solid
        border-bottom #ff26a7 1px solid
        line-height 25px
  .take_jl
    h2
      font-size 14px
      line-height 24px
    p
      color #666
      line-height 22px
.activityRule4
  .box_center
    width 94%
    margin auto
    background #fff
    margin-top 8px
    img
      width 100%
      display block
      &:nth-last-child(1)
        margin-bottom 20px
</style>
