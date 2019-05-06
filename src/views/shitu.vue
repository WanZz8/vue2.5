<template>
  <div style="height:100%">
    <!-- <transition name="page-fade" mode="out-in"> -->
    <keep-alive>
      <router-view class="pages-view" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="pages-view" v-if="!$route.meta.keepAlive"></router-view>
    <!-- </<transition> -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'routeView',
  data() {
    return {
      active: ''
    }
  }
}
</script>
