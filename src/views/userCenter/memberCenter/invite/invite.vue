<template>
  <div class="user_body">
    <header-view :titles="'全名邀请一荐钟情'">
      <div slot="header_Right" class="svg-container">
        <p></p>
      </div>
    </header-view>
    <div class="mint-content invite_view">
      <div class="part1">
        <div class="pt1Bg">
          <img src="../../../../assets/images/memberCenter/inviteBg.jpg" alt="" class="pt1BgImg">
        </div>
        <div class="pt1_d1">
          <div class="pt1_d1_card">
            <div class="pt1_card_title">
              <p>我获得的奖励</p>
              <!--<p>查看奖励明细</p>-->
            </div>
            <div class="pt1_card_content">
              <div class="pt1_card_content_d1">
                <div class="content_d1">
                  <p>成功邀请</p>
                  <p>0 好友</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="part2">
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
export default {
  name: 'invite',
  components: {
    layouts,
    HeaderView
  },
  data() {
    return {}
  }
}
</script>

<style lang="stylus">
  @import './invite.styl'
</style>
