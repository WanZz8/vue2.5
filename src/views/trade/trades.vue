<template>
  <layouts type="trade">
    <template slot="content">
      <div class="trade-content">
        <div class="maskBox"></div>
        <div class="trade_list">
          <mt-navbar v-model="selected"
                     @click.native="tableIdx(selected)">
            <mt-tab-item v-for="item in items"
                         :key="item.id"
                         :id="item.id">
              {{item.name}}
            </mt-tab-item>
          </mt-navbar>
          <mt-tab-container v-model="selected">
            <mt-tab-container-item id="0">
              <entrust :tab="selected"
                       ref="entrust" />
            </mt-tab-container-item>
            <mt-tab-container-item id="1">
              <holdings :tab="selected"
                        ref="holdings" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <settlement :tab="selected"
                          ref="settlement" />
            </mt-tab-container-item>
          </mt-tab-container>
          <div class="mobile-canvas">
            <div class="button-container"
                 :class="[menu?'open':'']">
              <div class="button-wrapper">
                <div class="button"
                     @click="menuClick">
                  <span>{{buttonName}}</span>
                </div>
                <div class="button-child-wrapper">
                  <div class="button-child"
                       v-for="item in menuList"
                       :key="item.id"
                       @click="switch_model(item.id, item.name)"
                       :class="menuActive==item.id?'MenuActive':''">
                    <p>{{item.name}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="overlay"
                 v-show="menu" />
          </div>
        </div>
      </div>
    </template>
  </layouts>
</template>

<script>
import layouts from '@/components/layout/contentView'
import Entrust from './entrust/index'
import Holdings from './holdings/index'
import Settlement from './settlement/index'
import { command, msg } from '@/assets/js/proto-helper'
import UUID from 'uuid'
import { MessageBox } from 'mint-ui'
import { mapActions, mapGetters } from 'vuex'
import { setSession, getNotSession } from '@/utils/storage'
export default {
  components: {
    layouts,
    Entrust,
    Holdings,
    Settlement
  },
  data () {
    return {
      menuActive: 0,
      menu: false,
      selected: '0',
      items: [
        {
          name: '委托',
          id: '0'
        },
        {
          name: '持仓',
          id: '1'
        },
        {
          name: '结算',
          id: '2'
        }
      ],
      menuList: [
        { name: '现金', id: 0 },
        { name: '积分', id: 1 },
        { name: '模拟', id: 2 }
      ],
      buttonName: '现金'
    }
  },
  watch: {
    sockets (newData, oldData) {
      this.sockets.onreconnect = e => {
        console.log('reconnecting..')
      }
      this.sockets.onerror = e => {
        console.log('connect err')
        this.errorSetInerval = setTimeout(() => {
          this.initWebSocket()
        }, 5000)
      }
    }
  },
  computed: {
    ...mapGetters(['isIntegral'])
  },
  mounted () {
    this.detection()
    const id = this.$route.query.id
    if (id) {
      this.tableIdx(id)
    }
    this.switch_model(0, '现金')
  },
  methods: {
    // 打开链接
    ...mapActions(['openLink', 'isIntegrals']),
    // tab切换
    tableIdx (idx) {
      setSession('paramsId', idx)
      this.selected = idx
      this.$router.push({ path: '/trade' })
      if (idx === '0') {
        this.$refs.entrust.loadFrist()
        this.$refs.holdings.clearTimer()
        return false
      }
      if (idx === '1') {
        this.$refs.holdings.loadFrist()
        this.$refs.entrust.clearAllTimer()
        return false
      }
      if (idx === '2') {
        let historyDay = !getNotSession('historyPoint')
          ? 0
          : getNotSession('historyPoint')
        this.$refs.settlement.checkoutType({ value: historyDay * 1 })
        this.$refs.entrust.clearAllTimer()
        this.$refs.holdings.clearTimer()
        return false
      }
    },
    // socket
    detection () {
      const _that = this
      if (!this.sockets) {
        _that.iniWebsocket()
        return false
      }
      if (
        this.sockets.ws.readyState === 0 ||
        this.sockets.ws.readyState === 3
      ) {
        _that.iniWebsocket()
        return false
      }
    },
    // socket
    iniWebsocket () {
      const _that = this
      if (typeof WebSocket === 'undefined') {
        MessageBox.alert('您的浏览器不支持socket')
      } else {
        let message = new msg.MessageBase()
        message.setClientid(UUID.v1())
        message.setCmd(command.CommandType.PUSH_DATA)
        message.setRequesttype(2)
        let bytes = message.serializeBinary()
        if (this.sockets && this.sockets.ws.readyState === 1) {
          this.$store.dispatch('closeScoket')
          setTimeout(function () {
            _that.openLink(bytes)
          }, 250)
        } else {
          this.openLink(bytes)
        }
      }
    },
    // 菜单
    menuClick () {
      this.menu = !this.menu
    },
    // 切换
    switch_model (item, name) {
      this.$refs.entrust.clearAllTimer()
      this.$refs.holdings.clearTimer()
      this.buttonName = name
      this.menu = false
      this.$refs.entrust.scrollerToTop()
      this.isIntegrals(item)
      this.menuActive = item
      this.tableIdx(this.selected)
    }
  },
  destroyed () {
    this.$store.dispatch('closeScoket')
  }
}
</script>

<style lang="stylus">
.trade_list
  margin 0 auto
  .mint-navbar
    width 343px
    height 39px
    box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 -2px 4px 0 rgba(0, 0, 0, 0.07)
    border-radius 19px
    margin-top 20px
    margin 20px auto 0px auto
    div
      line-height 8px
      font-size 14px
    .is-selected
      border none !important
      position relative
      &::before
        content ''
        width 50%
        height 3px
        position absolute
        left 50%
        bottom 0
        margin-left -25%
.maskBox
  height 50px
.type_Switch
  width 100%
  height 58px
  background #f8f8f8
  .switch_off
    padding 0 16px
    .instan_switch
      width 144px
      display flex
      float right
      p
        flex 0 0 30%
        width 30%
        color #6B89FE
        font-size 16px
        line-height 58px
        text-align center
      .mint-switch
        flex 0 0 40%
        width 40%
        .mint-switch-core
          background #6989ff
        .mint-switch-input:checked + .mint-switch-core
          border-color #6989ff
/* 加载样式 */
.main-body
  position relative
/* 导航 */
.mobile-canvas.open .overlay
  opacity 0.6
.overlay
  position absolute
  z-index 20
  width 100%
  height 100%
  opacity 0.1
  top 0
  left 0
  transition all 300ms ease-in-out
  background #ccc
.button-container
  position absolute
  bottom 80px
  right 20px
  width 56px
  height 56px
.button-container .button-wrapper
  position relative
  width 100%
  height 100%
  p
    color #eee
.button-container.open .button
  border-color #fff
.button-container.open .button span
  transition margin 300ms, border-radius 300ms 300ms, height 300ms 300ms, -webkit-transform 300ms
  transition margin 300ms, transform 300ms, border-radius 300ms 300ms, height 300ms 300ms
  transition margin 300ms, transform 300ms, border-radius 300ms 300ms, height 300ms 300ms, -webkit-transform 300ms
.button-container.open .button span:first-child, .button-container.open .button span:last-child
  margin 0
  height 30px
  border-radius 5px
.button-container.open .button span:first-child
  -webkit-transform translate(-50%, -50%) rotate(45deg)
  transform translate(-50%, -50%) rotate(45deg)
.button-container.open .button span:nth-of-type(2)
  opacity 0
.button-container.open .button span:last-child
  -webkit-transform translate(-50%, -50%) rotate(-45deg)
  transform translate(-50%, -50%) rotate(-45deg)
.button-container.open .button-child-wrapper
  -webkit-transform translateX(-120px)
  transform translateX(-120px)
  transition-delay 0s
.button-container.open .button-child
  transition-delay 300ms
  background #6989ff
.button-container.open .button-child:nth-child(2)
  transform rotate(35deg)
.button-container.open .button-child:nth-child(2)
  p
    transform rotate(-35deg)
.button-container.open .button-child:nth-child(3)
  transform rotate(70deg)
.button-container.open .button-child:nth-child(3)
  p
    transform rotate(-70deg)
.button, .button-child-wrapper
  position absolute
  width 100%
  height 100%
  top 0
  right 0
  bottom 0
  left 0
.button
  border-radius 50%
  z-index 40
  box-shadow 1px 2px 3px #9f9f9f
  background #6b89fe
  transition all 300ms ease-in-out 300ms
.button span
  position absolute
  top 50%
  left 50%
  color #fff
  -webkit-transform translate(-50%, -50%)
  transform translate(-50%, -50%)
  transition height 300ms, margin 300ms 300ms, background-color 300ms, border-radius 300ms, -webkit-transform 300ms
  transition height 300ms, transform 300ms, margin 300ms 300ms, background-color 300ms, border-radius 300ms
  transition height 300ms, transform 300ms, margin 300ms 300ms, background-color 300ms, border-radius 300ms, -webkit-transform 300ms
.button span:first-child
  //
.button span:last-child
  /* margin-top 10px */
.button-child-wrapper
  transition -webkit-transform 0.3s cubic-bezier(0.5, -0.5, 0.5, 1.5) 300ms
  transition transform 0.3s cubic-bezier(0.5, -0.5, 0.5, 1.5) 300ms
  transition transform 0.3s cubic-bezier(0.5, -0.5, 0.5, 1.5) 300ms, -webkit-transform 0.3s cubic-bezier(0.5, -0.5, 0.5, 1.5) 300ms
  z-index 30
.button-child
  position absolute
  display flex
  align-items center
  justify-content center
  width 100%
  height 100%
  top 0
  right 0
  bottom 0
  background #6989ff
  left 0
  border-radius 50%
  -webkit-transform-origin 182.5px
  transform-origin 182.5px
  transition all 300ms cubic-bezier(0.64, 0.04, 0.35, 1)
.MenuActive
  background #f5a623 !important
</style>
