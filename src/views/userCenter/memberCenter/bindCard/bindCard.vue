<template>
  <div class="user_body">
    <header-view :titles="'绑定银行卡'">
    </header-view>
    <div class="mint-content bindCard_view">
      <div class="part1">
        <div class="block"></div>
        <div class="add_bank">
          <router-link to="/userCenter/addCard">
            <p class="add_p1">
              <span class="add_p">+</span>
            </p>
          </router-link>
          <p class="add_p2">
            添加银行卡
          </p>
        </div>
      </div>
      <div class="part2">
        <div class="p3_wrap">
          <div class="p3_title">
            <p>温馨提示:</p>
          </div>
          <ul class="p3_content">
            <li>
              <span class="round">.</span>
              <span class="sp2">
                单笔最低金额11元，单笔最高金额49999元，若订单需持仓过夜，账户需保留当天隔夜费用，以免余额不足
              </span>
            </li>
            <li>
              <span class="round">.</span>
              <span class="sp2">
                提款处理时间：周一至周五10:00:00-23:59:59，到账时间以银行处理时间为准
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
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
export default {
  name: 'bindCard',
  components: {
    layouts,
    HeaderView
  },
  data () {
    return {
      bankList: [] // 从后台得到的该用户的银行卡列表
    }
  }
}
</script>

<style lang="stylus">
@import './bindCard.styl'
</style>
