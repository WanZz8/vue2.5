<template>
  <div class="recommed">
    <div class="banner_box">
      <swipe class="my-swipe"
             v-if="banner.length">
        <swipe-item class="slide"
                    v-for="(item,idx) in banner"
                    :key="item.img">
          <img :src='item.img'
               @click="onClickBanner(item,idx)" />
        </swipe-item>
      </swipe>
      <div class="no_banner"
           v-else>
        暂无内容
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'banner',
  props: {
    banner: {
      type: Array
    }
  },
  methods: {
    onClickBanner (item, idx) {
      if (item.id === 1) {
        this.$router.push({ path: item.link })
        return
      }
      if (item.id === 5) {
        this.$router.push({path: item.link, query: {id: '5'}})
      }
    }
  }
}
</script>
<style lang="stylus">
@import './banner.styl'
</style>
