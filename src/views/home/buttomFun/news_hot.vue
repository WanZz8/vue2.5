<template>
  <div class="buttom_fun">
    <!--新手引导-->
    <div class="green_hands"
         @click="goNewHand">
      <h2>新手引导</h2>
      <div class="new_Hand">
        新手引导-快速上手-日进斗金
      </div>
    </div>
    <!--大赛排名-->
    <!-- <div class="ranking">
      <h2>大赛排名</h2>
      <div class="game_ranking">
        <ul>
          <li>
            <div class="ranking_name">
              <span style="width:37px;height:37px;border-radius:50%">
                <img src="../../../assets/images/home/one.png" />
              </span>
              <p>每日盈利</p>
              <b>1171.67%</b>
            </div>
          </li>
          <li>
            <div class="ranking_name">
              <span style="width:37px;height:37px;border-radius:50%">
                <img src="../../../assets/images/home/two.png" />
              </span>
              <p>每日盈利</p>
              <b>1171.67%</b>
            </div>
          </li>
          <li>
            <div class="ranking_name">
              <span style="width:37px;height:37px;border-radius:50%">
                <img src="../../../assets/images/home/three.png" />
              </span>
              <p>每日盈利</p>
              <b>1171.67%</b>
            </div>
          </li>
        </ul>
      </div>
    </div> -->
    <!--优惠券-->
    <div class="coupon">
      <h2>热门活动</h2><span class="hot_img">快速上手让你盈利不停</span>
      <ul>
        <li class="bg_color bg_one">
          <div class="coupon_left">
            <h3 class="coupone_left_left">100</h3>
            <div class="coupone_left_right">
              <span>日欢迎礼金</span>
              <p>元</p>
            </div>
          </div>
          <div class="coupon_right">
            <p> 单笔充值<br />≥2000元</p>
            <button class="coupon_submit"
                    @click="goRechange('0')">立即参与</button>
          </div>
        </li>
        <li class="bg_color bg_two">
          <div class="coupon_left">
            <h3 class="coupone_left_left">288</h3>
            <div class="coupone_left_right">
              <span>全勤礼包</span>
              <p>元</p>
            </div>
          </div>
          <div class="coupon_right">
            <p>尽情交易<br />欢乐投资</p>
            <button class="coupon_submit"
                    @click="goRechange('2')">立即参与</button>
          </div>
        </li>
        <li class="bg_color bg_three">
          <div class="coupon_left">
            <h3 class="coupone_left_left">2000</h3>
            <div class="coupone_left_right">
              <span>新人礼金</span>
              <p>元</p>
            </div>
          </div>
          <div class="coupon_right">
            <p>实名认证<br />注册即送</p>
            <button class="coupon_submit"
                    @click="goRechange('1')">立即参与</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Hub from '@/utils/hub'
import { getLocal } from '@/utils/storage'
export default {
  data () {
    return {
      num: 1
    }
  },
  created () {
    let info = getLocal('userInfo')
    if (!info) {
      return false
    }
    if (info.isFirstLogin === 1 && getLocal('isFirstLogin') !== 0) {
      this.goNewHand()
    }
  },
  methods: {
    goNewHand () {
      Hub.$emit('guide', this.num)
    },
    goRechange (item) {
      this.$router.push({ path: '/activityRule', query: { id: item } })
    }
  }
}
</script>

<style lang="stylus">
@import './buttom.styl'
</style>
