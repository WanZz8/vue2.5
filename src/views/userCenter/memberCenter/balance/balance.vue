<template>
  <div class="user_body">
    <header-view :titles="'我的钱包'">
    </header-view>
    <div class="mint-content balance_view">
      <div class="bal_con">
        <div class="part1"
             v-for="item in allbalance"
             :key="item.id"
             v-show="item.walletType!==4">
          <div class="part_top">
            <div class="money_bag part_left"
                 v-if="item.walletType===1">
              <i class="xjqb">
                <svg-icon icon-class="cash" />
              </i>
              <p>现金</p>
            </div>
            <div class="money_bag part_left"
                 v-if="item.walletType===2">
              <i class="xjqb">
                <svg-icon icon-class="integral" />
              </i>
              <p>积分</p>
            </div>
            <div class="money_bag part_left"
                 v-if="item.walletType===3">
              <i class="xjqb">
                <svg-icon icon-class="simulate" />
              </i>
              <p>模拟</p>
            </div>
            <div class="money_bag part_middle">
              <p>总额度 (元)</p>
              <p>{{item.balance.toFixed(2)}}</p>
            </div>
            <div class="money_bag part_right">
              <div class="forzen_money">
                <p>冻结金额 (元)</p>
                <p>{{item.amountFrozen.toFixed(2)}}</p>
              </div>
              <div class="available_money">
                <p>可用金额 (元)</p>
                <p>{{item.amountUseable.toFixed(2)}}</p>
              </div>
            </div>
          </div>
          <div class="part_bottom">
            <div class="button_left">
              <!-- <router-link to='/userCenter/recharge'
                           v-show="item.walletType===1">充值</router-link> -->
              <span v-show="item.walletType===1"
                    @click="go_recharge">充值</span>
            </div>
            <div class="button_middle">
              <b v-show="item.walletType===1"></b>
              <!-- <router-link to='/userCenter/withdraw'
                           v-show="item.walletType===1">提现</router-link> -->
              <span v-show="item.walletType===1"
                    @click="go_withdraw">提现</span>
            </div>
            <div class="button_right">
              <b v-show="item.walletType===1"></b>
              <!-- <router-link to='/userCenter/trandeDetails'>交易明细</router-link> -->
              <span @click="go_tradeDetail(item)">交易明细</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import Loading from '@/components/public/loading/loadings'
import { mapGetters } from 'vuex'
import { setLocal } from '@/utils/storage'
export default {
  name: 'balance',
  components: {
    layouts,
    HeaderView,
    Loading
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['allbalance', 'loading'])
  },
  mounted () {
    this.getBalance()
  },
  methods: {
    getBalance () {
      this.$store.dispatch('showLoading')
      this.$store.dispatch('balance').then(res => {
        this.$store.dispatch('hideLoading')
      }).catch(() => {
        this.$store.dispatch('hideLoading')
      })
    },
    go_recharge () {
      this.$router.push('/userCenter/recharge')
    },
    go_withdraw () {
      this.$router.push('/userCenter/withdraw')
    },
    go_tradeDetail (item) {
      let das = {
        name: item.name,
        walletName: item.walletName,
        walletType: item.walletType,
        oIndex: item.oIndex
      }
      setLocal('balance', das)
      this.$router.push({ path: '/userCenter/trandeDetails' })
    }
  }
}
</script>

<style lang="stylus">
@import './balance.styl'
</style>
