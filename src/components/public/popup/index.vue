<template>
  <div class="popup_diabox">
    <transition name="over">
      <div class="popup_content" v-show="popupVisible">
        <slot name="popup_node"></slot>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div class="popup_box" v-show="popupVisible" @click.stop="popupClose">
      </div>
    </transition>
  </div>
</template>

<script>
import Popup from './popup'
export default Popup
</script>

<style lang="stylus" scoped>
@import './popup.styl'
</style>
