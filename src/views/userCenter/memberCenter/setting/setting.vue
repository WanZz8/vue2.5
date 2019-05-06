<template>
  <div class="user_body">
    <header-view :titles="'设置'"
                 class="redPacket_red">
    </header-view>
    <div class="mint-content setting_view">
      <div class="part1">
        <mt-cell title='个人资料'
                 is-link
                 to="/userCenter/info">
        </mt-cell>
        <mt-cell title='修改登录密码'
                 is-link
                 to="/userCenter/changePassword">
        </mt-cell>
        <mt-cell title='修改资金密码'
                 is-link
                 to="/userCenter/ChangeFundsPassword">
        </mt-cell>
        <mt-cell title='联系客服'
                 is-link
                 to="/service">
        </mt-cell>
        <mt-cell title='主题颜色'
                 is-link
                 to="/userCenter/setColor">
        </mt-cell>
      </div>
      <div class="part2">
        <div class="settips">
          <span>查看</span>
          <router-link to="/userCenter/agreement">
            <b>《用户须知以及风险提示》</b>
          </router-link>
        </div>
      </div>
      <div class="part3"
           @click="handleLogout">
        <div class="set_ss">退出当前账号</div>
      </div>
      <loading v-show="loading"></loading>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import Loading from '@/components/public/loading/loadings'
import { MessageBox } from 'mint-ui'
import { mapGetters } from 'vuex'
export default {
  name: 'setting',
  components: {
    layouts,
    HeaderView,
    Loading
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['token', 'loading'])
  },
  methods: {
    handleLogout () {
      const _that = this
      MessageBox.confirm('确定要登出操作吗?').then(action => {
        _that.$router.replace('/')
        this.$store.dispatch('logout')
      }).catch(() => { })
    }
  }
}
</script>

<style lang="stylus">
@import './setting.styl'
</style>
