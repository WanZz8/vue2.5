<template>
  <div class="layout-page"
       :class="type">
    <!-- 视图 -->
    <div class="content_wrapper"
         :style='disBox?"z-index:1500":""'>
      <section v-show="desc"
               class="desc">
        <slot name="desc">{{desc}}</slot>
      </section>
      <main class="content_body">
        <slot name="content">{{content}}</slot>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['disBox'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './layout.styl'
</style>
