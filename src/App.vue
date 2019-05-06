<template>
  <div id="app"
       :class="currentSkins">
    <!-- <transition name="page-fade"> -->
    <section class="header_fixed"
             v-show="comTopContent"
             :style="this.$route.path!=='/home'||disBox ? 'z-index:0' : 'z-index:10'">
      <section class="home_left"
               @click="backToMarket">
        <span class="icons icon_Back"
              v-if="tradeBack">
          <svg-icon icon-class="left"></svg-icon>
        </span>
      </section>
      <section class="section_title">
        <h1>{{ titleH5 }}</h1>
      </section>
      <section class="home_right entry"
               v-show="$route.path === '/home' || $route.path === '/home/'">
        <span class="svg-container"
              v-if="token"
              @click="handleLogout">
          <p>登出</p>
          <i class="qd">
            <svg-icon icon-class="qiandao" />
          </i>
        </span>
        <div v-else
             @click="toLogin">
          <p><i>登录</i>/<i>注册</i></p>
        </div>
      </section>
    </section>
    <!-- </transition> -->
    <loading v-show="loading"
             msg="处理中"></loading>
    <layout-view></layout-view>
    <!-- <transition name="page-fade"> -->
    <footer-view v-show="comTopContent"></footer-view>
    <!-- </transition> -->
    <novice-tutorial></novice-tutorial>
    <!-- <set-color :changColor='changColor'
               ref="colorPanel"></set-color> -->
  </div>
</template>

<script>
import LayoutView from './views/shitu.vue'
import NoviceTutorial from './views/home/noviceTutorial/guide'
import Loading from './components/public/loading/loadings'
import FooterView from './components/layout/footer'
// import SetColor from './components/public/setColor/换颜色'
import config from '@/config/basic.config'
import { mapGetters } from 'vuex'
import { MessageBox } from 'mint-ui'
export default {
  name: 'App',
  data () {
    return {
      changColor: false,
      flat: false
    }
  },
  watch: {
    currentSkins (n) {
      this.$store.dispatch('current')
    }
  },
  mounted () {
    this.$store.dispatch('current')
  },
  computed: {
    ...mapGetters(['token', 'currentSkins', 'loading', 'disBox']),
    comTopContent () {
      var url = []
      // const baseUrl = window.location.pathname
      config.footerUrl.map((item, index) => {
        url.push(item.routerName)
      })
      if (url.indexOf(this.$route.path) > -1) {
        return true
      } else {
        return false
      }
    },
    titleH5 () {
      var title = ''
      config.footerUrl.map((item, index) => {
        if (item.routerName === this.$route.path) {
          title = item.cnName
        }
      })
      return title
    },
    tradeBack () {
      if (this.token) {
        switch (this.$route.path) {
          case '/home':
            return false
          case '/market':
            return false
          case 'live':
            return false
          case '/userCenter/home':
            return false
          case '/trade':
            return false
          default:
        }
      }
    }
  },
  methods: {
    go () {
      this.$router.push({
        path: '/userCenter'
      })
    },
    backToMarket () {
      if (this.tradeBack) {
        if (this.$route.path === '/trade') {
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      }
    },
    toLogin () {
      this.$router.push({ path: '/power/login' })
    },
    toRegister () {
      this.$router.push({ path: '/power/register' })
    },
    // changeColor () {
    //   this.$refs.colorPanel.changColor = true
    // },
    // ...mapActions({
    //   logout: 'logout'
    // }),
    handleLogout () {
      console.log('点击刷不动吗')
      MessageBox.confirm('确定要登出操作吗?')
        .then(action => {
          this.$router.replace('/')
          this.$store.dispatch('logout')
        })
        .catch(() => {
        })
    },
    guideToMarketList () {
      this.$router.push('/')
    }
  },
  components: {
    LayoutView,
    FooterView,
    // SetColor,
    Loading,
    NoviceTutorial
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.header_fixed
  position absolute
  right 0
  left 0
  height 50px
  line-height 50px
  text-align center
  overflow hidden
  padding 0 10px
  -webkit-backface-visibility hidden
  backface-visibility hidden
  display flex
  display -webkit-box
  display -moz-box
  display -ms-flexbox
  display -webkit-flex
  .home_left
    flex 0 0 20%
    box-flex 0 0 20%
    -webkit-box-flex 0 0 20%
    -moz-box-flex 0 0 20%
    -webkit-flex 0 0 20%
    width 20%
    .icon_Back
      width 20px
      height 28px
      display block
      position absolute
      top 10px
      svg
        width 100%
        height 100%
        fill #fff
    .icon_downLoad
      width 22px
      height 28px
      display block
      position absolute
      top 10px
      left 20px
      svg
        width 100%
        height 100%
        fill #fff
    .backmarket
      color #FFF
      padding-left 10px
  .section_title
    flex 0 0 60%
    box-flex 0 0 60%
    -webkit-box-flex 0 0 60%
    -moz-box-flex 0 0 60%
    -webkit-flex 0 0 60%
    width 60%
    h1
      font-size 18px
      color #fff
      font-weight normal
  .entry
    flex 0 0 20%
    box-flex 0 0 20%
    -webkit-box-flex 0 0 20%
    -moz-box-flex 0 0 20%
    -webkit-flex 0 0 20%
    width 20%
    .svg-container
      height 14px
      color #666
      color #eee
      .qd
        width 22px
        height 22px
        display inline-block
        margin 12px 0 0 6px
        float left
      p
        float left
        padding-left 25px
</style>
