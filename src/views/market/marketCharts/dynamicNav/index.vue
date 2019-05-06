<template>
  <div class="marketNav">
    <transition name="move"
                mode="out-in">
      <div class="commodity_nav"
           v-show="navOnClickData.navOnClickQuick">
        <div class="commodity_list"
             v-for="(item,index) in charNavr"
             :key="'idx'+index">
          <span>{{item.title}}</span>
          <p @click="select_Commodity($event,items)"
             v-for="items in item.list"
             :key="items.CommodityName"
             :style="items.status===2?'backgroundColor:#f8f8f8':''"
             :class="$route.query.CommodityName==items.CommodityName?'active':''">
            {{items.CommodityName}}
            <i v-show="items.status===2">休</i></p>
        </div>
      </div>
    </transition>
    <transition name="fade"
                mode="out-in">
      <div class="market_Mask"
           v-show="navOnClickData.navOnClickQuick"
           @click="mask_onClick">
      </div>
    </transition>
  </div>
</template>

<script>
import dynamicNav from './dynamicNav'
export default dynamicNav
</script>

<style lang="stylus">
@import './dynamicNav.styl'
</style>
