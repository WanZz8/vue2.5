<template>
  <div class="user_body">
    <header-view :titles="'资金账户'">
      <router-link slot="header_Right"
                   to='/register'
                   class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content funds_view">
      <div class="partTop">
        <div class="Img1">
          <div class="Img1_Info ss1">
            <p class="info_p2">
              <span>账户余额&nbsp;&nbsp;(元)</span>
            </p>
            <p class="info_p1">
              <span class="info_span1">
                {{balance ? balance.balance : 0}}
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
                balance ? balance.amountUseable : 0
                }}</span>
            </p>
            <p class="info_p2">
              <span>冻结余额&nbsp;&nbsp;(元)</span>
            </p>
            <p class="info_p1">
              <span class="info_span1">{{balance ? balance.amountFrozen : 0}}</span>
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
              <i class="icons tixian">
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
      <div class="dis_navBar">
        <mt-navbar v-model="selected"
                   @click.native="tableIdx(selected)">
          <mt-tab-item class="st_tab_con"
                       v-for="item in items"
                       :key="item.id"
                       :id="item.id">
            {{item.name}}
          </mt-tab-item>
        </mt-navbar>
      </div>
      <div class="dis_content">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="0">
            <TransactionDetails :tab="selected"
                                :pageNum="pageTwoNum"
                                :size="sizeTwoNum">
            </TransactionDetails>
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <DepositRecord :tab="selected"
                           :pageNum="pageOneNum"
                           :size="sizeOneNum">
            </DepositRecord>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <WithdrawDetails :tab="selected"
                             :pageNum="pageThreeNum"
                             :size="sizeThreeNum">
            </WithdrawDetails>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import DepositRecord from './depositRecord/depositRecord.vue'
import TransactionDetails from './transactionDetail/transactionDetails.vue'
import WithdrawDetails from './withdrawRecord/withdrawRecord.vue'
import Loading from '@/components/public/loading/loadings'
// import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: 'fund',
  components: {
    layouts,
    HeaderView,
    DepositRecord,
    TransactionDetails,
    WithdrawDetails,
    Loading
  },
  data () {
    return {
      selected: '0',
      loadingShow: true,
      items: [
        {
          name: '交易明细',
          id: '0'
        },
        {
          name: '充值记录',
          id: '1'
        },
        {
          name: '提现记录',
          id: '2'
        }
      ],
      pageOneNum: 1,
      sizeOneNum: 5,
      pageTwoNum: 1,
      sizeTwoNum: 5,
      pageThreeNum: 1,
      sizeThreeNum: 5
    }
  },
  computed: {
    ...mapGetters(['balance', 'loading'])
  },
  created () {
    this.getBalance()
    this.getRecord()
  },
  methods: {
    // 钱包余额
    getBalance () {
      this.$store.dispatch('balance')
    },
    // 充值记录
    getRecord () {
      const _that = this
      _that.$store.dispatch('showLoading')
      this.$store.dispatch(
        'record',
        {
          pageNum: this.pageOneNum,
          pageSize: this.sizeOneNum,
          status: 2,
          refresh: false
        }).then(res => {
        if (res) {
          console.log(res)
          _that.$store.dispatch('hideLoading')
        }
      })
    },
    // 交易记录
    TransRecord () {
      const _that = this
      _that.$store.dispatch('showLoading')
      this.$store.dispatch(
        'tradeRecord',
        {
          pageNum: this.pageTwoNum,
          pageSize: this.sizeTwoNum,
          walletType: 1,
          refresh: false
        }).then(res => {
        if (res) {
          _that.$store.dispatch('hideLoading')
        }
      })
    },
    // 提现记录
    getWithdraw () {
      const _that = this
      _that.$store.dispatch('showLoading')
      this.$store.dispatch(
        'withdrawRecord',
        {
          pageNum: this.pageThreeNum,
          pageSize: this.sizeThreeNum,
          stauts: 5,
          refresh: false
        }).then(res => {
        if (res) {
          _that.$store.dispatch('hideLoading')
        }
      })
    },
    tableIdx (idx) {
      if (idx === '0') {
        this.getRecord()
        return false
      }
      if (idx === '1') {
        this.TransRecord()
        return false
      }
      if (idx === '2') {
        this.getWithdraw()
        return false
      }
    }
  }
}
</script>

<style lang="stylus">
@import 'fund.styl'
</style>
