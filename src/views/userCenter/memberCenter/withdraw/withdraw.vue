<template>
  <div class="user_body">
    <header-view :titles="'提现记录'"
                 class="redPacket_red">
      <div slot="header_Right"
           class="svg-container">
        <router-link slot="header_Right"
                     to='/userCenter/withdrawRecord'
                     class="svg-container">
          <p>提现记录</p>
        </router-link>
      </div>
    </header-view>
    <div class="mint-content withdraw">
      <div class="part1"
           v-if="getBanklist">
        <div class="wit_top">
          <mt-swipe :auto="0"
                    :show-indicators="getBanklist !== 0 && getBanklist > 1"
                    @change="handleChange($event,banklist)">
            <mt-swipe-item v-for="(item,index) in banklist"
                           :key="'idx'+index">
              <div class="wit_tp_img"
                   :class="item.bankCode">
                <div class="icon_con">
                  <i class="icons bankIcon"
                     slot="icon">
                    <svg-icon :icon-class='item.bankCode'></svg-icon>
                  </i>
                </div>
                <div class="bk_name">
                  <p class="bk_name_p1">
                    <span>
                      {{item.bankName}}
                    </span>
                    <span>
                      （尾号{{item.accountNum.substr(item.accountNum.length - 4)}})
                    </span>
                  </p>
                  <p class="bk_name_p2">
                    储蓄卡
                  </p>
                </div>
              </div>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <div class="noBank"
           v-else>
        <div class="noBank_top">
          <div class="noBank_tp_img">
            <div class="icon_con"
                 @click="routeTobank">
              <p>添加银行卡</p>
            </div>
          </div>
        </div>
      </div>
      <div class="part2">
        <div class="item_wrap">
          <div class="item_styl">
            <p class="item_p1">提现金额</p>
            <p class="item_p2"
               @click="checkAmounts">
              <input type="text"
                     :disabled="checkBankList"
                     @input="change"
                     :value="inpNum" />
              <i>￥</i>
            </p>
            <p class="item_p3">
              可提余额 <i style="color:red">{{ withdrawFlat?amountUseable.toFixed(2):'余额不足以提现' }}</i>
            </p>
          </div>
        </div>
        <div class="wrap2">
          <div class="w2_sty2"
               @click="tradePwds">
            <span>交易密码</span>
            <input type="password"
                   placeholder="请输入交易密码"
                   name="withdraw"
                   class="with_ipt"
                   :disabled="checkTradePwd"
                   v-model="tradePwd">
          </div>
        </div>
      </div>
      <div class="part3">
        <div class="p3_wrap">
          <div class="p3_title">
            <p>温馨提示:</p>
          </div>
          <ul class="p3_content">
            <li>
              <span class="round">.</span>
              <span class="sp2">
                单笔最低金额{{minMoney}}元，单笔最高金额49999元，若订单需持仓过夜，账户需保留当天隔夜费用，以免余额不足
              </span>
            </li>
            <li>
              <span class="round">.</span>
              <span class="sp2">
                提款处理时间：开市时间内早上10:00:00-凌晨02:00:00，到账时间以银行处理时间为准
              </span>
            </li>
            <li>
              <span class="round">.</span>
              <span class="sp2">
                如充值后未交易提款，第一次全额出款，第二次及以后需每笔收取2%的手续费
              </span>
            </li>
            <li>
              <span class="round">.</span>
              <span class="sp2">
                如需帮助请联系在线客服或拨打24小时服务电话：
                <span class="sp3">
                  0510-66611495
                </span>，竭诚为您提供最好的服务
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="part4">
        <div class="withdraw_ss"
             @click="withdraw_btn">
          立即提现
        </div>
      </div>
    </div>
    <loading v-show="loading"
             msg="正在加载.."></loading>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import Loading from '@/components/public/loading/loadings'
import { getLocal } from '@/utils/storage'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  name: 'withdraw',
  components: {
    layouts,
    HeaderView,
    Loading
  },
  data () {
    return {
      name: '',
      autoPlay: false,
      indicators: false,
      amount: '',
      withdrawFlat: true,
      realNames: false,
      checkBankList: false,
      checkTradePwd: !(getLocal('userInfo').isSetFundPass === 1 || getLocal('isSetFundPass') === 1),
      tradePwd: '',
      bankData: {},
      minMoney: 100
    }
  },
  watch: {
    inpNum (newData) {
      if (newData * 1 > this.amountUseable) {
        this.withdrawFlat = false
      } else {
        this.withdrawFlat = true
      }
    }
  },
  computed: {
    ...mapGetters(['loading', 'balance', 'banklist']),
    getBanklist () {
      let arr = this.banklist.slice()
      return arr.length ? arr.length : 0
    },
    inpNum () {
      return this.amount
    },
    // checkAmount () {
    //   let arr = this.banklist.slice()
    //   if (arr.length) {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
    amountUseable () {
      return this.balance ? this.balance.amountUseable : 0
    }
  },
  created () {
    const _that = this
    _that.$store.dispatch('showLoading')
    this.$store.dispatch('QueryBankInfo').then(res => {
      _that.$store.dispatch('hideLoading')
      this.bankFlat()
      this.handleChange(0, this.banklist)
    }).catch(() => {
      _that.$store.dispatch('hideLoading')
    })
    if (!this.amountUseable) {
      this.getBalance()
    }
    const info = getLocal('userInfo')
    if (!info.isSetFundPass) {
      this.realNames = true
    } else {
      this.realNames = false
    }
    // let isSetFundPass = getLocal('isSetFundPass') || info.isSetFundPass
    // if (isSetFundPass) {
    //   this.checkTradePwd = true
    // } else {
    //   this.checkTradePwd = false
    // }
    this.bankFlat()
  },
  mounted () {
    this.handleChange(0, this.banklist)
  },
  methods: {
    getBalance () {
      this.$store.dispatch('balance')
    },
    // 输入数字
    change (event) {
      let val = event.target.value.trim()
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.amount = val
      } else {
        event.target.value = this.amount
      }
    },
    checkAmounts () {
      const _that = this
      if (this.checkBankList) {
        _that.$toast({
          message: '您还没有绑定银行卡',
          position: 'middle',
          duration: 1000
        })
        return false
      }
    },
    routeTobank () {
      const _that = this
      let isUserVierity = getLocal('isUserVierity') || getLocal('userInfo').isUserVierity
      if (isUserVierity) {
        _that.$router.push('/userCenter/myBanks')
      } else {
        _that.$toast({
          message: '请先完成实名认证',
          position: 'middle',
          duration: 1000
        })
      }
    },
    tradePwds () {
      const _that = this
      const info = getLocal('userInfo')
      let isSetFundPass = getLocal('isSetFundPass') || info.isSetFundPass
      if (!isSetFundPass) {
        _that.$toast({
          message: '请先设置资金密码',
          position: 'middle',
          duration: 1000
        })
        return false
      }
    },
    bankFlat () {
      if (this.getBanklist <= 0) {
        this.checkBankList = true
      } else {
        this.checkBankList = false
      }
    },
    handleChange (index, item) {
      let bankDas = item[index]
      this.bankData = bankDas
    },
    withdraw_btn () {
      const _that = this
      if (!this.bankData.accountNum) {
        _that.$toast({
          message: '未绑定银行卡',
          duration: 1000
        })
        return false
      }
      const data = {
        amount: this.amount,
        fundPass: this.tradePwd,
        bankUuid: this.bankData.uuid
      }
      if (!data.amount || data.amount > this.balance.amountUseable) {
        _that.$toast({
          message: '输入正确的金额',
          duration: 1000
        })
        return false
      }
      if (data.amount && data.amount < this.minMoney) {
        _that.$toast({
          message: `最小提现金额${this.minMoney}元`,
          duration: 1000
        })
        return false
      }
      if (!data.fundPass) {
        _that.$toast({
          message: '请输入交易密码',
          duration: 1000
        })
        return false
      }
      _that.$messagebox.confirm('确认提现?').then(action => {
        _that.$store.dispatch('showLoading')
        _that.$store.dispatch('withdraw', data).then(res => {
          if (res && res.status) {
            _that.$store.dispatch('hideLoading')
            _that.$toast({
              message: `您已申请提现${data.amount}元`,
              duration: 3000
            })
            this.amount = ''
            this.tradePwd = ''
            setTimeout(() => {
              _that.getBalance()
            }, 500)
          }
        })
      }).catch(() => { })
    }
  }
}
</script>

<style lang="stylus">
@import './withdraw.styl'
</style>
