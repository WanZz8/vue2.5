<template>
  <div class="mask"></div>
</template>

<script>
export default {
  data() {
    return {
      da: ''
    }
  }
}
</script>
<style lang="stylus">
.mask
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.7)
  z-index 999
</style>
