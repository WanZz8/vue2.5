<template>
  <div class="user_body">
    <header-view :titles="'任务中心'">
      <router-link slot="header_Right"
                   to='/register'
                   class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content task_view">
      <div class="task_partTop">
        <div class="task_t1">
          <p class="task_t1_p1">
            <span>完成任务 X</span>
            <span>入群享大奖</span>
          </p>
          <p class="task_t1_p2">
            <router-link to="/market">
              <span>最新行情一手掌握</span>
            </router-link>
          </p>
        </div>
        <div class="task_t2">
          <p class="task_t2_p">
            <img src="../../../../assets/images/memberCenter/present.png"
                 alt="present">
            <img src="../../../../assets/images/memberCenter/present.png"
                 alt="present">
            <img src="../../../../assets/images/memberCenter/present.png"
                 alt="present">
          </p>
        </div>
      </div>
      <div class="part2">
        <div class="pt2_title">
          <span>完成新手任务>联系客服加群>领取红包奖励</span>
        </div>
      </div>
      <div class="part3">
        <div class="p2-con">
          <div class="p2_content">
            <div class="p2_cart1">
              <div class="p2_cart1_title">
                <span>新手任务</span>
              </div>
              <div class="p2_cart1_items">
                <div class="cart1_item1">
                  <router-link to="/userCenter/realName">
                    <mt-cell title='实名认证'
                             label="">
                      <span class="span_alipay">未完成</span>
                      <i class="icons icon_item">
                        <svg-icon icon-class="forward"></svg-icon>
                      </i>
                    </mt-cell>
                  </router-link>
                </div>
                <div class="cart1_item2">
                  <router-link to="/userCenter/info">
                    <mt-cell title="完善资料"
                             label="">
                      <span class="span_alipay">未完成</span>
                      <i class="icons icon_item">
                        <svg-icon icon-class="forward"></svg-icon>
                      </i>
                    </mt-cell>
                  </router-link>
                </div>
                <div class="cart1_item3">
                  <router-link to="/trade">
                    <mt-cell title="交易量"
                             label="">
                      <span class="span_alipay">未完成</span>
                      <i class="icons icon_item">
                        <svg-icon icon-class="forward"></svg-icon>
                      </i>
                    </mt-cell>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="part4">
        <div class="pt4_con">
          <div class="pt4_con_box">
            <div class="pt4_title">
              <p>日常任务</p>
            </div>
            <div class="pt4_content">
              <router-link to="/userCenter/realName">
                <mt-cell title='实名认证'
                         label="">
                  <span class="span_alipay">去做任务</span>
                </mt-cell>
              </router-link>
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
// import { getLocal } from '@/utils/storage'
export default {
  name: 'task',
  components: {
    layouts,
    HeaderView
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="stylus">
@import './task.styl'
</style>
