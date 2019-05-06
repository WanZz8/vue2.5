<template>
  <div class="openings">
    <ul>
      <li>
        <p>最高</p>
        <b class="red">{{formatPoint(sockList.hightPrice)}}</b>
      </li>
      <li>
        <p>最低</p>
        <b class="green">{{formatPoint(sockList.lowPrice)}}</b>
      </li>
      <li>
        <p>开盘</p>
        <b :class="[sockList.openPrice>sockList.closePrice?'red':'green']">
          {{formatPoint(sockList.openPrice)}}
        </b>
      </li>
      <li>
        <p>昨收</p>
        <b>{{formatPoint(sockList.closePrice)}}</b>
      </li>
      <li>
        <p>涨跌</p>
        <b :class="[sockList.upDropSpeed>0?'red':'green']">
          {{formatPoint(sockList.upDropPrice)}}
        </b>
      </li>
      <li>
        <p>幅度</p>
        <b :class="[sockList.upDropSpeed>0?'red':'green']">
          {{sockList.upDropSpeed.toFixed(2)}}%
        </b>
      </li>
    </ul>
  </div>
</template>

<script>
import opening from './opening'
export default opening
</script>

<style lang="stylus">
.openings
  ul
    display flex
    width 100%
    flex-wrap wrap
    height 300px
    li
      flex 0 0 50%
      width 50%
      display flex
      line-height 100px
      border-bottom 1px solid #f8f8f8
      position relative
      &:nth-last-child(1), &:nth-last-child(2)
        border none
      &:nth-child(odd)::before
        content ''
        height 100%
        width 1px
        background #f8f8f8
        position absolute
        right 0
      p
        font-size 14px
        width 40%
        text-align center
        flex 0 0 40%
        color #777
      b
        width 60%
        font-size 18px
        flex 0 0 60%
        color #666
        &.red
          color #ea3826
        &.green
          color #7ed321
</style>
