<template>
  <div class="whiteCon">
    <div class="futures_name">
      <div class="f_name">
        <span>
                {{$route.query.CommodityName}}
             </span>
        {{$route.query.commodityCode}}{{$route.query.contractCode}}
      </div>
      <div class="f_timer">
        <p class="position">
          <span>
                  <span
                    to='/trade?id=1'
                    class="svg-container"
                    @click="linkToPosition"
                  >
                    持仓
                  </span>
                </span>
        </p>
        <p v-if="getCloseTime">本时段持仓时间至
          <span class="getTime">
            {{getCloseTime}}
          </span>
        </p>
        <p v-else class="closeTime">休市中</p>
      </div>
    </div>
    <div class="money_number">
      <div class="moneys money_left"
           :class="[sockList.upDropSpeed > 0 ? 'upDropPrice' : 'upDropSpeed']">
        <h2>{{formatPoint(sockList.lastPrice)}}</h2>
        <p>
          <span>{{formatPoint(sockList.upDropPrice)}}</span>
          <span>{{sockList.upDropSpeed.toFixed(2)}}%</span>
        </p>
      </div>
      <div class="moneys money_right">
        <div class="sell_left">
          <!--买量-->
          <span class="sells">
            <i :style="{width:sockList.buyNumber >= 100? '100%' : sockList.buyNumber+'%'}"></i>
          </span>
          <!--卖量-->
          <span class="buys">
            <i :style="{width:sockList.sellNumber >= 100? '100%' : sockList.sellNumber+'%'}"></i>
          </span>
        </div>
        <div class="buy_right">
          <span>{{sockList.buyNumber}} 买量</span>
          <span>{{sockList.sellNumber}} 卖量</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DynamicPrice from './dynamicPrice'
export default DynamicPrice
</script>

<style lang="stylus">
</style>
