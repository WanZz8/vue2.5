<template>
  <div class="user_body">
    <div class="mint-content userCenter">
      <div class="partTop">
        <div class="Img1">
          <div class="Img1_time">
            <img src="../../../assets/images/userCenter/timg.png" />
          </div>
          <div class="Img1_Info">
            <p class="info_p1">
              <span class="info_span1">{{name}}</span>
              <span class="info_span2">VIP</span>
            </p>
            <p class="info_p2">
              <i v-if="vierity">
                <svg-icon icon-class="realNameIcon"></svg-icon>
              </i>
              <b v-else @click="goReal">
                <span>未实名</span> <i style="text-decoration:underline;color:#333;font-size:12px">去实名</i>
              </b>
            </p>
            <p class="info_p3">
              <i><svg-icon icon-class="time"></svg-icon></i>{{date}}
            </p>
          </div>
        </div>
        <div class="Img3">
          <div class="Img1_Info ss1">
            <p class="info_p2">
              <span>账户余额&nbsp;&nbsp;(元)</span>
            </p>
            <p class="info_p1">
              <span class="info_span1">
                {{balance ? balance.balance.toFixed(2) : 0}}
              </span>
            </p>
          </div>
          <div class="Img1_Info ss2">
            <p class="info_p2">
              <span>可提余额&nbsp;&nbsp;(元)</span>
            </p>
            <p class="info_p1">
              <span class="info_span1">
                {{
                balance ? balance.amountUseable.toFixed(2) : 0
                }}</span>
            </p>
            <i class="clear_line"></i>
            <p class="info_p2">
              <span>冻结余额&nbsp;&nbsp;(元)</span>
            </p>
            <p class="info_p1">
              <span class="info_span1">{{balance ? balance.amountFrozen.toFixed(2) : 0}}</span>
            </p>
          </div>
        </div>
        <div class="Img2">
          <router-link to="/userCenter/recharge">
            <p class="cz">
              <i class="icons chongzhi">
                <svg-icon icon-class="chongzhi"></svg-icon>
              </i>
              <span class="">充值</span>
            </p>
          </router-link>
          <router-link to="/userCenter/MyBanlance">
            <p class="tx">
              <b class="main-tap-cmline"></b>
              <i class="icons money_bag">
                <svg-icon icon-class="balance"></svg-icon>
              </i>
              <span>钱包</span>
            </p>
          </router-link>
          <router-link to="/userCenter/withdraw">
            <p class="tx">
              <b class="main-tap-cmline"></b>
              <i class="icons tixian">
                <svg-icon icon-class="tixian"></svg-icon>
              </i>
              <span>提现</span>
            </p>
          </router-link>
        </div>
      </div>
      <section class="partSec1">
        <div class="nav-list-title">会员中心</div>
        <div class="icon_wrap">
          <div class="main-nav-style"
               v-for="(icon,index) in vipCenterList"
               @click="userLinkBack(icon,index)"
               :key="'idx'+index">
            <div v-if="icon.name=='repacket'"
                 class="i_active"
                 style="position:absolute;right:12px;top:10px">
              <i v-show="redBagFormart.length>0"
                 style="width:20px;height:20px;border-radius:50%;background:#c21508;display:block;color:#fff;font-size:12px;line-height:20px;">{{redBagFormart.length}}</i>
            </div>
            <div class="userLinks">
              <i class="sec1_icon">
                <svg-icon :icon-class="icon.name"></svg-icon>
              </i>
              <p class="sec1_title">{{icon.title}}</p>
            </div>
          </div>
        </div>
        <div class="nav-list-title"
             v-show="checkType">代理中心</div>
        <div class="icon_wrap"
             v-show="checkType">
          <div class="main-nav-style"
               v-for="(icon,index) in ACIconList"
               @click="userLinkBack(icon,index)"
               :key="'idx'+index">
            <i class="sec1_icon">
              <svg-icon :icon-class="icon.name"></svg-icon>
            </i>
            <p class="sec1_title">{{icon.title}}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { getLocal, getNoLocal } from '@/utils/storage'
import utils from '@/utils/'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      date: utils.time('1', Date.now()),
      MCIconList: [
        // {
        //   name: 'fund',
        //   title: '资金账户',
        //   linkTo: '/userCenter/funds'
        // },
        // {
        //   name: 'task',
        //   title: '任务中心',
        //   linkTo: '/userCenter/task'
        // },
        // {
        //   name: 'invite',
        //   title: '邀请好友',
        //   linkTo: '/userCenter/invite'
        // },
        {
          name: 'bank',
          title: '我的银行卡',
          linkTo: '/userCenter/myBanks'
        },
        {
          name: 'security',
          title: '安全中心',
          linkTo: '/userCenter/securityCenter'
        },
        // {
        //   name: 'coupon',
        //   title: '我的优惠券',
        //   linkTo: '/userCenter/discounts'
        // },
        {
          name: 'setting',
          title: '设置',
          linkTo: '/userCenter/setting'
        },
        {
          name: 'tradeDetail',
          title: '交易明细',
          linkTo: '/userCenter/trandeDetails'
        },
        {
          name: 'depositDetail',
          title: '充值记录',
          linkTo: '/userCenter/RechargeRecord'
        },
        {
          name: 'withdrawDetail',
          title: '提现记录',
          linkTo: '/userCenter/withdrawRecord'
        },
        {
          name: 'share',
          title: '分享',
          linkTo: '/userCenter/share'
        },
        {
          name: 'repacket',
          title: '红包',
          linkTo: '/userCenter/redPacket'
        }
        // {
        //   name: 'download',
        //   title: '下载',
        //   linkTo: '/userCenter/download'
        // }
        // {
        //   name: 'active',
        //   title: '活动',
        //   linkTo: ''
        // }
      ],
      ACIconList: [
        // {
        //   name: 'pandect',
        //   title: '总览',
        //   linkTo: '/userCenter/securityCenter'
        // },
        {
          name: 'openAccount',
          title: '开户',
          linkTo: '/userCenter/openAccount'
        },
        {
          name: 'link',
          title: '推广管理',
          linkTo: '/userCenter/spreadLink'
        },
        {
          name: 'commission',
          title: '修改佣金',
          linkTo: '/userCenter/commission'
        }
        // {
        //   name: 'commission',
        //   title: '下级管理',
        //   linkTo: '/userCenter/lower'
        // },
        // {
        //   name: 'commission',
        //   title: '订单管理',
        //   linkTo: '/userCenter/orderList'
        // }
        // {
        //   name: 'team',
        //   title: '团队管理',
        //   linkTo: '/userCenter/securityCenter'
        // },
        // {
        //   name: 'profit',
        //   title: '团队盈亏',
        //   linkTo: '/userCenter/securityCenter'
        // },
        // {
        //   name: 'rebate',
        //   title: '返点收入',
        //   linkTo: '/userCenter/rebate'
        // }
      ],
      timer: ''
    }
  },
  components: {
    layouts,
    HeaderView
  },
  mounted () {
    const _that = this
    this.getBalance()
    this.getRedPacket()
    this.timer = setInterval(() => {
      _that.date = utils.time('1', Date.now())
    }, 1000)
  },
  computed: {
    ...mapGetters(['userInfo', 'balance', 'getRedPacketList']),
    name () {
      let name = getNoLocal('userInfo')
        ? '****' + JSON.parse(getNoLocal('userInfo')).userPhone.substr(JSON.parse(getNoLocal('userInfo')).userPhone.length - 4) : 'MAX'

      return name
    },
    checkType () {
      let uerStatus = getNoLocal('userInfo') ? JSON.parse(getNoLocal('userInfo')).userType : 0
      return uerStatus
    },
    vierity () {
      let real = getLocal('userInfo').isUserVierity || getLocal('isUserVierity')
      return real
    },
    vipCenterList () {
      let mc = this.MCIconList.filter((item, idx) => {
        if (this.userInfo.userType !== 0) {
          return item.name !== 'share'
        }
        return item
      })
      return mc
    },
    redBagFormart () {
      const redBagNum = this.getRedPacketList
      if (!redBagNum) {
        return []
      } else {
        let redBagArr = redBagNum.filter((item, idx) => {
          return item.status === 0
        })
        return redBagArr
      }
    }
  },
  methods: {
    getRedPacket () {
      this.$store.dispatch('findRedPacketList')
    },
    goReal () {
      this.$router.push({ path: '/userCenter/realName' })
    },
    userLinkBack (item, idx) {
      this.$router.push({ path: item.linkTo })
    },
    // 钱包余额
    getBalance () {
      this.$store.dispatch('balance')
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>

<style lang="stylus">
@import './userCenter.styl'
</style>
