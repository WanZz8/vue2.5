<template>
  <div id="loading">
    <div class="mask_loading">
      <div class='sk-fading-circle'>
        <svg-icon icon-class="oval"></svg-icon>
      </div>
      <p>{{msg}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loads: {
      type: Boolean
    },
    msg: {
      type: String,
      default: '处理中'
    }
  }
}
</script>
<style scoped>
#loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  z-index: 9999;
}
.mask_loading {
  width: 88px;
  height: 78px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  padding-top: 12px;
  position: absolute;
  top: 50%;
  margin-top: -60px;
  margin-left: -44px;
  left: 50%;
  border-radius: 5px;
}
.sk-fading-circle {
  width: 40px;
  height: 40px;
  position: relative;
  margin: 0 auto;
}
.mask_loading p {
  color: #ddd;
  line-height: 38px;
  font-size: 14px;
  text-align: center;
}
</style>
