<template>
  <div class="settlement_detail">
    <div class="redio_settlement_time">
      <div :class="'radios radios' + parseInt(index+1)"
           v-for="(item, index) in list"
           :key='item.value'>
        <div class="box"
             style="width: 15px;height: 15px">
          <input type="radio"
                 v-model="checkedValue"
                 :value="item.value"
                 @click="checkoutType(item)"
                 :id="'one_' + item.value" />
          <span></span>
        </div>
        <label :for="'one_'+item.value">
          {{item.label}}
        </label>
      </div>
    </div>
    <div class="main-body"
         ref="wrapper_settlement"
         :style="{ height: (wrapperHeight-50) + 'px' }">
      <scroller :on-refresh="refresh"
                :on-infinite="infinite"
                ref="my_scroller"
                v-if="settleList.length">
        <ul class="settlement_list"
            v-for="(item,idx) in settleList"
            :key="item.orderNo+idx"
            @click="checkDetail(item)">
          <li>
            <p class="buy_list buy_name">
              {{item.commodityName}}({{item.commodityCode}}{{item.contractCode}})
            </p>
            <p class="buy_list buy_num"
               :style="{color:item.tradeType === 1 ? '#EA3826' : '#7ED321'}">
              买{{item.tradeType === 1 ? '涨' : '跌'}}{{item.tradeHands}}手
            </p>
          </li>
          <li class="status">
            <p>交易状态: {{obj[item.tradeStatus]}} </p>
          </li>
          <li class="buy_bottom">
            <p class="buy_list buy_bottom_left">
              平仓时间: {{timers('1',item.closeTimeL)}}
            </p>
            <p class="buy_list buy_bottom_right"
               v-if="item.tradeStatus !== 3">
              <i :style="{color:item.settleAmount >= 0 ? '#EA3826': '#7ED321'}">
                {{item.settleAmount >= 0
                ? '+'
                :'-'}}{{item.currencySign}}{{item.settleAmount > 0
                ? fixNumLen0(item.settleAmount, item.tradeModelRate, item.tradeHands)
                : fixNumLen0(Math.abs(item.settleAmount), item.tradeModelRate, item.tradeHands)
                }}
              </i>
              <span>
                ({{item.targetCurrencySign}}{{fixNumLen1(item.settleAmount, item.tradeHands, item.tradeModelRate, item.targetCurrencyRatio)}})
              </span>
            </p>
          </li>
        </ul>
      </scroller>
      <noData v-else></noData>
    </div>
  </div>
</template>

<script>
import Settlement from './settlement'
export default Settlement
</script>

<style lang="stylus">
@import './settlement.styl'
</style>
