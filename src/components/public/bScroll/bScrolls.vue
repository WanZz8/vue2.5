<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot>
        </slot>
      </div>
      <slot name="pullup" :pullUpLoad="pullUpLoad" :isPullUpLoad="isPullUpLoad">
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>{{pullUpTxt}}</span>
          </div>
          <div class="after-trigger" v-else>
            <div class="mf-loading-container">
              <img src="./loading.gif">
            </div>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown" :pullDownRefresh="pullDownRefresh" :pullDownStyle="pullDownStyle" :beforePullDown="beforePullDown" :isPullingDown="isPullingDown">
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          <!-- <bubble :y="bubbleY"></bubble> -->
          <div class="tip-content">
            <div class="loading_icon">
              <svg-icon icon-class='next' :class="pullDownClass"></svg-icon>
            </div>
            <span style="display:block;text-indent:30px;color:#999;" class="pulltxt">{{pullDownTextLoad}}</span>
          </div>
        </div>
        <div class="after-trigger" v-else>
          <div v-if="isPullingDown" class="loading">
            <div class="mf-loading-container">
              <img src="./loading.gif">
            </div>
          </div>
          <div v-else><span style="color:#999">{{refreshTxt}}</span></div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
import bScroll from './bScroll'
export default bScroll
</script>

<style lang="stylus">
@import './bscroll.styl'
</style>
