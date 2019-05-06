<template>
  <div
    class="dynamicNumber"
    :style="buyVisible?'z-index:999':''"
  >
    <div
      class="buy_mask_bottom"
      v-show="chartMask"
    >
    </div>
    <quick-buy
      :buyVisible='buyVisible'
      ref="child">
    </quick-buy>
    <div
      class="shop_Rest"
      v-if='buyBussInfo.status==2'
    >
      <p>休市中</p>
    </div>
    <div
      class="shop_Abnormal"
      v-else-if="buyBussInfo.status==3"
    >
      <p>异常</p>
    </div>
    <div
      class="shop_onClick"
      v-else
    >
      <div
        class="buyButton buy_many"
        @click="buyMuch"
      >
        <span>
          {{formatPoint(sockList.buyPrice)}}
        </span>
        <p>
          <i
            class="up_arrow_node"
            v-show='!buyVisible'
          >
            <svg-icon icon-class="down_arrow"></svg-icon>
          </i>{{buyVisible?'闪电买多':'买多'}}</p>
      </div>
      <div
        class="middle_radius"
        :class="buyVisible?'radius_btn':''"
        style="border-radius:50%;"
        @click="radiusHandle"
      >
        <span style="border-radius:50%;">
          <i>
            <svg-icon icon-class="quick_sell"></svg-icon>
          </i>
          {{buyVisible?'开启中':' '}}
        </span>
      </div>
      <div
        class="buyButton sell_null"
        @click="buyLess"
      >
        <span>
          {{formatPoint(sockList.sellPrice)}}
        </span>
        <p><i class="down_arrow_node"
             v-show='!buyVisible'>
            <svg-icon icon-class="down_arrow"></svg-icon>
          </i>{{buyVisible?'闪电卖空':'卖空'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicNumber from './dynamicNumber'
export default DynamicNumber
</script>

<style lang="stylus">
@import './dynamicNumber.styl'
</style>
