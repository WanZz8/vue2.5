<template>
  <div class="user_body">
    <header-view :titles="'提款银行卡'">
    </header-view>
    <div class="mint-content bindWithraw_view">
      <div class="realName_partTop">
        <div class="real_title">
          <p>
            <span>请您通过网上银行向以下账户转账</span>
          </p>
        </div>
      </div>
      <div class="part_m">
        <div class="realContent">
          <div class="realInput rp1">
            <span>支付银行</span>
            <input type="text"
                   placeholder="如: 招商银行"
                   name="withdraw"
                   class="with_ipt">
          </div>
          <div class="realInput rp1">
            <span>支付银行(支行)</span>
            <input type="text"
                   placeholder="深圳分行梅林支行"
                   name="withdraw"
                   class="with_ipt">
          </div>
          <div class="realInput rp1">
            <span>账户姓名</span>
            <input type="text"
                   placeholder="请输入您的姓名"
                   name="withdraw"
                   class="with_ipt">
          </div>
          <div class="realInput rp1">
            <span>账号</span>
            <input type="text"
                   placeholder="请输入您的身份证号"
                   name="withdraw"
                   class="with_ipt">
          </div>
        </div>
      </div>
      <div class="part2">
        <div class="real_ss">立即认证</div>
        <div class="tips">
          <div class="p3_wrap">
            <div class="p3_title">
              <p>温馨提示:</p>
            </div>
            <ul class="p3_content">
              <li>
                <span class="round">.</span>
                <span class="sp2">请确认收款银行</span>
              </li>
              <li>
                <span class="round">.</span>
                <span class="sp2">如需帮助请联系人工客服</span>
                <span class="sp3">QQ:800837619</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
export default {
  name: 'bindWithdrawal',
  components: {
    layouts,
    HeaderView
  },
  data () {
    return {
      bankList: [], // 从后台得到的该用户的银行卡列表,
      popupVisible: false
    }
  }
}
</script>

<style lang="stylus">
@import './bindWithdrawal.styl'
</style>
