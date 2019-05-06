<template>
  <layouts type="market">
    <template slot="content">
      <div class="mint-content market_list">
        <div class="market_box">
          <skeleton v-if='templates.length<=0'></skeleton>
          <b-scroll :scrollX="false"
                    v-else>
            <span @click="goMarket($event,item)"
                  class="list"
                  :style='!item.color?{"border-radius":"5px","backgroundColor":"#999"}:{"border-radius":"5px","background-color":item.color}'
                  v-for="(item,index) in templates"
                  :key="'idx'+item.templateCode"
                  :class="index===templates.length-1&&templates.length%2==1?'upside_list_one':''">
              <i :class="index===templates.length-1&&templates.length%2==1?'upside_bg':''"></i>
              <p>{{item.templateName}}</p>
            </span>
          </b-scroll>
        </div>
      </div>
    </template>
  </layouts>
</template>

<script>
import BScroll from '@/components/public/bScroll/bScrolls'
import layouts from '@/components/layout/contentView'
import { MessageBox } from 'mint-ui'
import Skeleton from './skeleton'
import { mapGetters } from 'vuex'
export default {
  components: {
    layouts,
    BScroll,
    Skeleton
  },
  data () {
    return {
      bgImg: require('../../assets/images/home/quick_bg1.png')
    }
  },
  computed: {
    ...mapGetters(['token', 'templates'])
  },
  mounted () {
    // if (!this.token) {
    //   this.gTemplate({ merchantCode: 20 })
    // } else {
    //   this.gTemplate()
    // }
    this.gTemplate()
  },
  methods: {
    goMarket (e, item) {
      if (!this.token) {
        MessageBox.confirm('您还未登录,去登录？').then(action => {
          this.$router.push({ path: '/power/login' })
          return false
        }).catch(() => { })
      } else {
        window.sessionStorage.setItem('templateName', item.templateName)
        // templateInfo['templateName'] = item.templateName
        this.$router.push({ path: `/market/list/${item.templateCode}` })
      }
    },
    gTemplate (d) {
      this.$store.dispatch('getTemplate', d).then(res => {
      }).catch((err) => {
        MessageBox.alert(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.market_list
  padding 6px
  .market_box
    width 100%
    .list-wrapper
      height 560px
      overflow-x scroll
      .list
        width 49%
        height 123px
        display inline-block
        margin-bottom 6px
        text-align center
        line-height 123px
        position relative
        float left
        background #999
        // &:nth-child(1)
        // background #6a89fe
        // &:nth-child(2)
        // background #f5a623
        // &:nth-child(3)
        // background #a57dff
        // &:nth-child(4)
        // background #ff5e4c
        // &:nth-child(5)
        // background #595880
        &:nth-child(even)
          float right
        &.upside_list_one
          width 100% !important
        i
          width 100%
          height 100%
          position absolute
          top 0
          left 0
          z-index 0
          background-image url('../../assets/images/home/quick_bg1.png')
          background-size cover
          &.upside_bg
            background-image url('../../assets/images/home/quick_bg2.png')
        p
          position absolute
          top 50%
          left 50%
          height 30px
          line-height 30px
          transform translate(-50%, -50%)
          z-index 22
          color #eee
          width 100%
          font-size 18px
</style>
