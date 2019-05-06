<template>
  <div class="user_body">
    <header-view :titles="'管理银行卡'">
      <div slot="header_Right"
           class="svg-container">
        <p @click="showRomoveTab">
          {{show ? '取消': '移除' }}
        </p>
      </div>
    </header-view>
    <div class="mint-content myBank_view">
      <div class="part1"
           v-if="getBanklist">
        <div class="bankContainer"
             v-for="(item,index) in banklist"
             :key="'idx'+index">
          <div :class="['bank_item', item.bankCode]">
            <div class="bank_title">
              <p class="icon_p">
                <i class="icons bankIcon"
                   slot="icon">
                  <svg-icon :icon-class='item.bankCode'></svg-icon>
                </i>
              </p>
              <p class="bank_name">
                {{item.bankName}}
              </p>
            </div>
            <div class="bank_num">
              <span>****</span>
              <span>****</span>
              <span>****</span>
              <span>
                {{item.accountNum.substr(item.accountNum.length - 4)}}
              </span>
            </div>
            <div class="bank_remove"
                 v-if="show"
                 @click="removeBank(item.uuid, index)">
              <p>
                <b>-</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else
           class="nodata_container">
        <div class="p_add_card">
          请添加银行卡
        </div>
      </div>
      <div class="part2">
        <div class="add_bank"
             v-show="banklist.length !== 3">
          <!-- <router-link to="/userCenter/addCard"> -->
          <div class="addBankList"
               @click="addBanks">
            <p class="add_p1">
              <span class="add_p">+</span>
            </p>
          </div>
          <!-- </router-link> -->
          <p class="add_p2">
            添加银行卡
          </p>
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
                最多可绑定三张银行卡
              </span>
            </li>
            <li>
              <span class="round">.</span>
              <span class="sp2">
                单笔最低金额100元，单笔最高金额8000元，若订单需持仓过夜，账户需保留当天隔夜费用，以免余额不足
              </span>
            </li>
            <li>
              <span class="round">.</span>
              <span class="sp2">
                提款处理时间：周一至周五10:00:00-02:00:00，到账时间以银行处理时间为准
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
      <loading v-show="loading"
               :msg="msg"></loading>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import Loading from '@/components/public/loading/loadings'
import { mapGetters } from 'vuex'
import { getLocal } from '@/utils/storage'
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'myBanks',
  components: {
    layouts,
    HeaderView,
    Loading
  },
  data () {
    return {
      show: false,
      msg: '正在加载..'
    }
  },
  computed: {
    ...mapGetters(['loading', 'banklist']),
    getBanklist () {
      let arr = this.banklist.slice()
      return arr.length ? arr.length : 0
    }
  },
  created () {
    const _that = this
    _that.$store.dispatch('showLoading')
    this.$store.dispatch('QueryBankInfo').then(res => {
      _that.$store.dispatch('hideLoading')
    })
  },
  methods: {
    showRomoveTab () {
      this.show = !this.show
    },
    addBanks () {
      let isUserVierity = getLocal('isUserVierity') || getLocal('userInfo').isUserVierity
      if (isUserVierity === 1) {
        this.$router.push({ path: '/userCenter/addCard' })
        return false
      }
      MessageBox.confirm('您还未实名,去实名?').then(action => {
        this.$router.push({ path: '/userCenter/realName' })
      }).catch(() => { })
    },
    removeBank (i) {
      if (this.show) {
        const _that = this
        this.msg = '正在删除..'
        MessageBox.confirm('确定删除此银行卡吗?').then(() => {
          // this.bankList.splice(idx, 1)
          _that.$store.dispatch('showLoading')
          this.$store.dispatch('closeBankId', { bankId: i }).then(res => {
            _that.$store.dispatch('hideLoading')
            if (res && res.status) {
              this.show = false
              this.$store.dispatch('QueryBankInfo')
              Toast({
                message: '操作成功',
                position: 'middle',
                iconClass: 'mintui mintui-success',
                duration: 1000
              })
              this.msg = '正在加载..'
            }
          })
        }).catch(() => {
          _that.$store.dispatch('hideLoading')
          this.show = false
        })
      }
    }
  }
}
</script>

<style lang="stylus">
@import './myBanks.styl'
</style>
