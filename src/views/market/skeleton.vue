<template>
  <div class="quickInts2">
    <span class="list animated-background"></span>
    <span class="list animated-background"></span>
    <span class="list animated-background"></span>
  </div>
</template>
<script>
</script>
<style lang="stylus">
.quickInts2
  .list
    width 49%
    height 123px
    display inline-block
    margin-bottom 6px
    text-align center
    line-height 123px
    position relative
    border-radius 5px
    float left
    &:nth-last-child(1)
      width 100%
    &:nth-child(even)
      float right
</style>
