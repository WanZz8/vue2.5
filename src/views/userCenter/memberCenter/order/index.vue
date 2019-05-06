<template>
<div class="user_body">
  <header-view :titles="'下级管理'"
                class="redPacket_red">
  </header-view>
  <div class="mint-content order_list">
    订单管理
  </div>
</div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
export default {
  name: 'OrderList',
  components: {
    layouts,
    HeaderView
  },
  data() {
    return {
      da: ''
    }
  }
}
</script>
<style lang="stylus">

</style>
