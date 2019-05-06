<template>
  <div class="quickInt">
    <!--联系客服-->
    <div class="title_service">
      <router-link to="/service"><i>
          <svg-icon icon-class="service"></svg-icon>
        </i>联系客服</router-link>
    </div>
    <div class="title_message">
      <div class="message_icon">
        <i class="icon icon_message">
          <svg-icon icon-class="message"></svg-icon>
        </i>
      </div>
      <!--跑马灯-->
      <div class="message_txt"
           @click="toNotice">
        <marquee direction="left"
                 class="marquee"
                 scrollamount="7">
          <span v-if="!getNoticeData.content||getNoticeData.content.length<=0">暂无内容啦！！</span>
          <span v-for="item in getNoticeData.content"
                :key="item.announcementId"
                v-else>{{item.cnSummary}}</span>
        </marquee>
      </div>
    </div>
    <!--快速通道-->
    <skeleton v-if='templates.length<=0'></skeleton>
    <div class="quickInts"
         v-else>
      <p v-for="(item,index) in templates"
         @click="goMarket($event,item)"
         :key="'idx'+item.templateCode"
         :class="index===templates.length-1&&templates.length%2==1?'upside_list_class':''"
         :style='!item.color?{"border-radius":"5px","backgroundColor":"#999"}:{"border-radius":"5px","background-color":item.color}'>
        <i></i>
        <span class="list">
          {{item.templateName}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import Skeleton from './skeleton'
import { MessageBox } from 'mint-ui'
import { setSession } from '@/utils/storage'
import { mapGetters } from 'vuex'
export default {
  props: {
    msgData: {
      type: Array
    }
  },
  data () {
    return {
      merchantCode: ''
    }
  },
  components: {
    Skeleton
  },
  mounted () {
    this.gTemplate()
    if (!this.getNoticeData) {
      this.$store.dispatch('getNotice')
    }
  },
  computed: {
    ...mapGetters(['templates', 'token', 'getNoticeData'])
  },
  methods: {
    goMarket (e, item) {
      if (!this.token) {
        MessageBox.confirm('您还未登录,去登录？').then(action => {
          this.$router.push({ path: '/power/login' })
          return false
        }).catch(() => { })
      } else {
        setSession('templateName', item.templateName)
        this.$router.push({ path: `/market/list/${item.templateCode}` })
      }
    },
    toNotice () {
      this.$router.push({ path: '/notice' })
    },
    gTemplate (d) {
      this.$store.dispatch('getTemplate', d)
    }
  }
}
</script>

<style lang="stylus">
@import './quickInt.styl'
</style>
