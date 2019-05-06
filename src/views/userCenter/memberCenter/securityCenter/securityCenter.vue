<template>
  <div class="user_body">
    <header-view :titles="'安全中心'">
    </header-view>
    <div class="mint-content securityCenter">
      <div class="part1">
        <div class="sec_top">
          <div class="sec_tp_pro">
            <ProgressG v-if="isShow"
                       ref="$circle"
                       class="progress"
                       :isAnimation="true"
                       :isRound="true"
                       :width="width"
                       :radius="radius"
                       :progress="getProgress"
                       :barColor="barColor"
                       :duration="duration"
                       :delay="delay"
                       :timeFunction="timeFunction"
                       :backgroundColor="backgroundColor">
            </ProgressG>
          </div>
          <div class="sec_tp_img">
            <img src="../../../../assets/images/memberCenter/securityCenter.png"
                 alt="img"
                 class="sec_img_img">
          </div>
        </div>
      </div>
      <div class="part2">
        <div class="item_wrap">
          <div class="item_style"
               v-for="(item,index) in itemlist"
               :key="'idx'+index">
            <router-link :to="item.linkto"
                         class="a_rinks"
                         @click.native="routerFunc(item.icon, item.linkto)">
              <div class="it_sy_d1">
                <p class="it-sy_d1_p1">
                  <i class="sec1_icon">
                    <svg-icon :icon-class="item.icon"></svg-icon>
                  </i>
                </p>
                <p class="it-sy_d1_p2">
                  {{item.title}}
                </p>
              </div>
              <div class="it_sy_d2">
                <p>{{item.name}}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import { getLocal } from '@/utils/storage'
import ProgressG from './progress.vue'
import { Toast } from 'mint-ui'
export default {
  name: 'securityCenter',
  components: {
    layouts,
    HeaderView,
    ProgressG
  },
  data () {
    return {
      isShow: true,
      width: 150,
      radius: 10,
      progress: 25,
      duration: 1000,
      delay: 10,
      num: 1,
      isUserVierity: false,
      isSetFundPass: false,
      total: 4,
      barColor: '#7ad8f2',
      backgroundColor: 'rgba(255,255, 255, 100)',
      timeFunction: 'cubic-bezier(0.99, 0.01, 0.22, 0.94)',
      itemlist: [
        {
          name: '',
          icon: 'sec_name',
          title: '实名认证',
          linkto: '/userCenter/realName'
        },
        {
          name: '未绑定',
          icon: 'bindBanks',
          title: '绑定银行卡',
          linkto: this.isUserVierity ? '' : ''
        },
        {
          icon: 'sec_phone',
          title: '手机绑定',
          name: getLocal('userInfo') ? getLocal('userInfo').userPhone.substr(0, 4) + '***' : '',
          linkto: ''
        },
        {
          icon: 'sec_funds',
          title: '资金密码',
          name: '未设置',
          linkto: !this.isSetFundPass ? '' : ''
        }
      ]
    }
  },
  watch: {
    getProgress (val) {
      this.progress = val
    }
  },
  computed: {
    getProgress () {
      return (this.num / this.total) * 100
    }
  },
  created () {
    this.getUserDetails()
  },
  methods: {
    reset () {
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    },
    getUserDetails () {
      this.$store.dispatch('userDetailsInfo').then(res => {
        if (res && res.status) {
          let data = res.data
          if (data.isSetFundPass) {
            this.num += 1
            this.isSetFundPass = true
            this.itemlist[3].name = '已设置'
          }
          if (data.isUserVierity) {
            this.num += 1
            this.isUserVierity = true
          }
          if (data.isbandBank) {
            this.num += 1
            this.itemlist[1].name = '已绑定'
          }
        }
      })
    },
    routerFunc (icon, url) {
      if (icon === 'bindBanks' && !url) {
        if (this.isUserVierity) {
          this.$router.push({
            path: '/userCenter/myBanks'
          })
        } else {
          Toast({
            message: '请先完成实名认证',
            position: 'middle',
            duration: 1000
          })
        }
      }
      if (icon === 'sec_funds' && !url) {
        if (this.isSetFundPass) {
          Toast({
            message: '您已经设置过资金密码',
            position: 'middle',
            duration: 1000
          })
        } else {
          this.$router.push('/userCenter/fundsPassword')
        }
      }
    }

  }

}
</script>

<style lang="stylus">
@import './securityCenter.styl'
</style>
