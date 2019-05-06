<template>
  <div class="user_body marketCenter">
    <header-view :headerCenter='true'
                 :headerLeft='true'
                 v-show="productBayShow">
      <div class="home_back_icon"
           slot="header_Left"
           @click='goBack'>
        <i class="icons icon_Back">
          <svg-icon icon-class="left"></svg-icon>
        </i>
      </div>
      <div class="top_ajax_fall_mask"
           slot="header_Left"
           v-show="chartMask">
      </div>
      <div slot="header_Center"
           @click="checkOrder">
        <div class="header_title_market">
          <h1>
            {{ $route.query.CommodityName
            ? $route.query.CommodityName
            : '-----'
            }}
          </h1>
          <span style="border:solid 1px #ffffff">
            {{navOnClickData.navOnClickQuick
            ? "收回"
            : "切换" }}
          </span>
        </div>
        <p>
          {{buyBussInfo.walletType === 1
          ? '实盘交易' : buyBussInfo.walletType === 2
          ? '积分交易' : '模拟交易'
          }}
        </p>
      </div>
      <div slot="header_Right"
           class="svg-container"
           @click="toTradeRule">
        <p>交易规则</p>
      </div>
    </header-view>
    <div class="mint-content market_pic_view"
         :class="marketColor==='theme-Gary'
         ? 'gary_theme'
         : ''"
         v-show="productBayShow">
      <div class="buy_list">
        <dynamicPrice :stockMarket="stockMarket"
                      :navOnClickData="navOnClickData"
                      :singleGoods="singleGoods">
        </dynamicPrice>
        <div class="stock-line">
          <div class="stock-line">
            <ul class="flex nav">
              <li @click="onItemClick($event, 0)"
                  :class="[active === 0?'active':'']">
                分时
              </li>
              <li @click="onItemClick($event, 1)"
                  :class="[active === 1?'active':'']">
                盘口
              </li>
              <li @click="onItemClick($event, 2)"
                  :class="[active === 2?'active':'']">
                日K
              </li>
              <li @click="onItemClick($event, 3)"
                  :class="[active === 3?'active':'']">
                1分钟
              </li>
              <li @click="onItemClick($event, 4)"
                  :class="[active === 4?'active':'']">
                5分钟
              </li>
              <li @click="onItemClick($event, 5)"
                  :class="[active === 5?'active':'']">
                15分钟
              </li>
            </ul>
            <div class="checkoutChart">
              <echart-link :linkData='linkData'
                           :dayData='dayData'
                           :bgColor='bgColor'
                           ref="trade"
                           v-show="klineActive === 0">
              </echart-link>
              <opening v-show="klineActive===1"
                       :stockMarket="stockMarket">
              </opening>
              <div class="charLoading"
                   v-show="loadsh">
                <progrees></progrees>
              </div>
              <div class="charLoading loading_fall"
                   v-show="loadsh2"
                   @click="close_fall">
                <p>图表载入失败,点击重载..</p>
              </div>
            </div>
          </div>
        </div>
        <market-nav :navOnClickData='navOnClickData'
                    @closeMask='closeMask'
                    @marketChart='marketChart'>
        </market-nav>
        <div class="clear_bottom"
             :style='{height:stockHeight}'>
        </div>
      </div>
      <div class="dunamicCost">
        <dynamic-buy :stockMarket="stockMarket"
                     :navOnClickData="navOnClickData"
                     :singleGoods="singleGoods"
                     @showBuyMenu="showFromDyBuy">
        </dynamic-buy>
      </div>
    </div>
    <transition name="fade">
      <productBay @closeBuyMenu="closeFromDyBuy"
                  :title="title"
                  :class="productBayShow ? 'bug_Page' : 'bug_Page come'" />

    </transition>
    <trade-rule :flat='flat'
                @removeLeft='removeLeft'></trade-rule>
  </div>
</template>
<script>
import MarketCharts from './marketCharts'
export default MarketCharts
</script>

<style lang="stylus" scoped>
@import './marketCharts.styl'
</style>
