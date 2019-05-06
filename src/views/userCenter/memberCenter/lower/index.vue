<template>
  <div class="user_body">
    <header-view :titles="'下级管理'"
                 class="redPacket_red">
    </header-view>
    <div class="mint-content lower">
      <div id="l_nav">
        <ul class="l_navigtion">
          <li class="l_navigtion_list" :class="tabActive.id===idx?'active':''" @click="ctab(item,idx)" v-for="(item,idx) in tabList" :key="item.label">{{item.label}}</li>
        </ul>
        <div class="tj" @click="tjcx">
          <div class="tjcx">
            <span :class="tabFlat?'clickOn':''">条件查询</span>
            <i :class="tabFlat?'triangleActive':''"></i>
          </div>
        </div>
        <transition name="move"
                      mode="out-in">
          <div class="tj_num" v-show="tabFlat">
            <ul class="tj_s_x">
              <li>
                <label>昵称:</label>
                <input type="text" name="nickname" placeholder='请输入'>
              </li>
              <li>
                <label>姓名:</label>
                <input type="text" name="payname" placeholder='请输入'>
              </li>
              <li>
                <label>手机号:</label>
                <input type="text" name="phone" placeholder='请输入'>
              </li>
              <li>
                <label>登录时间:</label>
                <input type="text" name="login_time" placeholder='请输入'>
              </li>
              <li>
                <label>注册时间:</label>
                <input type="text" name="register_time" placeholder='请输入'>
              </li>
            </ul>
            <button class="search_nextLower">查询</button>
          </div>
        </transition>
      </div>
      <div class="lower_box_content">
        <ul class="lower_list_ul">
          <li class="lower_list">
            <div class="title">
              <p>用户信息</p>
              <p class="userId">68239443</p>
            </div>
            <div class="user_content_List" :style="!lopFlat?'height:200px':''">
              <ol>
                <li>
                  <p>昵称：</p>
                  <p>小格子</p>
                </li>
                <li>
                  <p>姓名：</p>
                  <p>白海燕</p>
                </li>
                <li>
                  <p>现金余额：</p>
                  <p>7994.4</p>
                </li>
                <li>
                  <p>积分余额：</p>
                  <p>3333</p>
                </li>
                <li>
                  <p>累积充值：</p>
                  <p>20000</p>
                </li>
                <li>
                  <p>累积盈亏：</p>
                  <p>+3456</p>
                </li>
                <li>
                  <p>手机号码：</p>
                  <p>151****9977</p>
                </li>
                <li>
                  <p>累积手续费：</p>
                  <p>893.6</p>
                </li>
                <li>
                  <p>注册日期：</p>
                  <p>2017-03-09 17:40:47</p>
                </li>
                <li>
                  <p>最后登录时间：</p>
                  <p>2017-08-08 18:50:37</p>
                </li>
              </ol>
            </div>
            <span class="zkai_context" @click="lop">{{lopText}}<i></i></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
export default {
  name: 'Lower',
  components: {
    layouts,
    HeaderView
  },
  data() {
    return {
      tabFlat: false,
      lopFlat: false,
      lopText: '展开',
      tabActive: {
        id: 0,
        day: 7,
        label: '上周订单查询'
      },
      tabList: [
        {
          id: 0,
          day: 7,
          label: '上周订单查询'
        },
        {
          id: 1,
          day: 30,
          label: '上月订单查询'
        }
      ]
    }
  },
  methods: {
    ctab(item, idx) {
      this.tabActive = item
    },
    tjcx() {
      this.tabFlat = !this.tabFlat
    },
    lop() {
      this.lopFlat = !this.lopFlat
      if (!this.lopFlat) {
        this.lopText = '展开'
      } else {
        this.lopText = '收起'
      }
    }
  }
}
</script>

<style lang="stylus">
.lower
  background #f8f8f8
#l_nav
  height 46px
  border-bottom 1px solid #f2f2f2
  display flex
  padding 0 15px
  color #6B6B6B
  position relative
  background #fff
  ul.l_navigtion
    flex 0 0 65%
    display flex
    li.l_navigtion_list
      font-size 12px
      line-height 46px
      flex 0 0 50%
      text-align center
      position relative
      &.active
        &::before
          border-bottom 2px solid #6B89FE
          position absolute
          bottom 0
          width 50%
          height 2px
          content:''
          left 50%
          margin-left -25%
  .tj
    flex 0 0 35%
    .tjcx
      line-height 46px
      position relative
      span
        display block
        line-height 46px
        text-align center
      .clickOn
        color:#6b89fe
      i
        width 0
        height 0
        border-left 5px solid transparent
        border-right 5px solid transparent
        border-bottom 6px solid #6B6B6B
        position absolute
        top 50%
        margin-top -2px
        right 15px
        transform rotate(-180deg)
        transition all .3s ease
        &.triangleActive
          transform rotate(0deg)
          border-bottom 6px solid #6b89fe
  .tj_num
    width 100%
    position absolute
    top 47px
    left 0
    background #fff
    box-shadow 0 2px 6px #eee
    .tj_s_x
      padding 0 15px
      li
        height 40px
        border-bottom 1px solid #eee
        position relative
        width 100%
        display block
        margin-top 8px
        label
          position absolute
          top 50%
          margin-top -8px
          text-indent 5px
          font-size 12px
        input
          width 90%
          height 40px
          text-align right
          margin 0 auto
          display block
        input::-webkit-input-placeholder{
            color:#ccc;
        }
        input::-moz-placeholder{
            color:#ccc;
        }
        input:-moz-placeholder{
            color:#ccc;
        }
        input:-ms-input-placeholder{
            color:#ccc;
        }
    .search_nextLower
      width 90%
      margin 10px auto 20px
      display block
      border none
      box-shadow none
      color #fff
      height 40px
      line-height 40px
      border-radius 100px
      background #6989ff
.lower_box_content
  ul.lower_list_ul
    li.lower_list
      background #fff
      margin-top 8px
      border-bottom 1px solid #eee
      .title
        height 50px
        padding 0 20px
        border-bottom 1px solid #F2F2F2
        display flex
        p
          display inline-block
          flex 0 0 50%
          width 50%
          text-align center
          font-size 14px
          line-height 50px
          color #6B6B6B
          &.userId
            font-size 12px
    .user_content_List
      overflow hidden
      ol
        padding 0 20px
        li
          height 36px
          line-height 36px
          display flex
          p
           color #C1BFC2
           &:nth-child(1)
             flex 0 0 40%
             width 40%
           &:nth-child(2)
             flex 0 0 60%
             width 60%
    .zkai_context
      color #666
      text-align center
      display block
      height 30px
      line-height 30px
      background linear-gradient(bottom,#f8f8f8,rgba(255,255,255,.6))
.move-enter-active, .move-leave-active
  transition all 0.2s ease-out
.move-enter
  transform translateY(30px)
  opacity 0
.move-leave-active
  transform translateY(30px)
  opacity 0
</style>
