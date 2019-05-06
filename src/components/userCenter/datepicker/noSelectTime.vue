<template>
  <div class="noSelectTime"
       v-if="toastFlat">
    <p>请选择时间</p>
  </div>
</template>
<script>
export default {
  props: {
    toastFlat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      da: ''
    }
  }
}
</script>
<style lang="stylus">
.noSelectTime
  position fixed
  top 50%
  padding 10px
  background rgba(0, 0, 0, 0.6)
  left 50%
  z-index 2000
  color #fff
  margin-left -40px
  border-radius 5px
</style>
