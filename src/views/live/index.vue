<template>
  <layouts type="live">
    <template slot="content">
      <div class="mint-content live_list"
           ref="wrapper_entrust">
        <p v-if="loadFlat"
           style="text-align:center;
           line-height:46px;
           position:fixed;
           top:50%;
           margin-top:-50px;
           left:50%;
           margin-left:-40px;"
        >
          资讯载入中..
        </p>
        <iframe marginwidth="0"
                :height="(wrapperHeight-60) + 'px'"
                @load='live'
                frameborder='0'
                ref='iframes'
                id="live"
                src='https://www.jin10.com/example/jin10.com.html'></iframe>
      </div>
    </template>
  </layouts>
</template>

<script>
import layouts from '@/components/layout/contentView'
export default {
  components: {
    layouts
  },
  data () {
    return {
      bgImg: '',
      wrapperHeight: 0,
      loadFlat: true
    }
  },
  mounted () {
    this.conHeight()
    this.loadFlat = true
    window.onresize = function () {
      this.conHeight()
    }
  },
  beforeDestroy() {
    this.loadFlat = false
  },
  methods: {
    live () {
      this.loadFlat = false
    },
    conHeight () {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_entrust.getBoundingClientRect().top
    }
  }
}
</script>

<style lang="stylus" scoped>
#live
  width 100%
  overflow-y auto
.top_title
  height 35px
  position relative
  text-align center
  line-height 35px
  .icon_spinner
    position absolute
    height 35px
    width 35px
    left 90px
</style>
