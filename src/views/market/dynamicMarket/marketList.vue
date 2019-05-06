<template>
  <div class="user_body">
    <header-view :titles="this.templateName"
                 :headerLeft='true'>
      <div class="home_back_icon"
           slot="header_Left"
           @click='goBack'>
        <i class="icons icon_Back">
          <svg-icon icon-class="left"></svg-icon>
        </i>
      </div>
    </header-view>
    <div class="mint-content userPrivileges_view">
      <div class="market_list"
           v-if="items.length>0">
        <div class="tab_list">
          <b-scroll :scrollX='scrollX'
                    :isShowBox='isShowBox'
                    :childrenClass='childrenClass'
                    ref='bScroll'>
            <span class="list-cycle"
                  :class="{'active':active===index}"
                  v-for="(tab,index) in items"
                  :key="tab"
                  @click="toggle(index,tab)">
              {{tab}}
            </span>
          </b-scroll>
        </div>
        <div class="market_container_item">
          <scroller :on-refresh="refresh"
                    ref="my_scroller">
            <div class="market_block"
                 :class="it.status!==2?(it.upDropSpeed>0&&it.status===1?'rise':'fall'):'close'"
                 v-for="it in list"
                 @click="checkMarket($event,it)"
                 v-show="it.productType==selected"
                 :key="it.CommodityName">
              <ul>
                <li class="market_left">
                  <span
                    width="40px"
                    height="40px"
                    :style="[{marginTop: '13px',marginLeft: '5px',background: it.icon}]">
                    {{it.commodityCode}}
                  </span>
                </li>
                <li class="market_txt">
                  <div class="market_top">
                    <p>{{it.CommodityName}}</p>
                    <span class="percent">
                      <i class="icons icon_up">
                        <svg-icon icon-class="up"></svg-icon>
                      </i>
                      <p v-if="it.status===2">
                        {{getLowerPirce(it.lastPrice, it.openPrice)}}
                      </p>
                      <p v-else>
                        {{getUpPrice(it.upDropSpeed)}}
                      </p>
                    </span>
                    <i class="icons icon_Rise"
                       v-if="it.status===1">
                      <svg-icon icon-class="rise"></svg-icon>
                    </i>
                    <i class="close"
                       v-else>
                      休市
                    </i>
                    <b class="market_bottom">
                      {{it.remark}}
                    </b>
                  </div>
                </li>
                <li class="market_right">
                  <h2>{{it.lastPrice}}</h2>
                  <p>{{it.tradeTime}}</p>
                </li>
              </ul>
            </div>
          </scroller>
        </div>
      </div>
      <skeleton v-else></skeleton>
    </div>
  </div>
</template>

<script>
import dynamicMarket from './market'
export default dynamicMarket
</script>
<style lang="stylus" scoped>
@import './market.styl'
</style>
