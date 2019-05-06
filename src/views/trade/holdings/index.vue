<template>
  <div class="holdings_detail">
    <div
      class="oneKey"
      v-show="knowData.length"
    >
      <ul>
        <li class="oneKey_left">
          <p>持仓浮动盈亏<i>( RMB )</i></p>
          <p
            class="money"
            :style="sumProfitNum > 0
            ? 'color:#ea3826'
            : 'color:#7ED321'"
          >
            {{sumProfitNum > 0
            ? '+'
            : '' }}{{!sumProfitNum
            ? '0'
            : sumProfitNum}}
          </p>
        </li>
        <li class="oneKey_right">
          <span @click="quickEveningUp">
            一键平仓
          </span>
        </li>
      </ul>
    </div>
    <div
      class="main-body"
      ref="wrapper_holdings"
      :style="{ height: (wrapperHeight-50) + 'px' }"
    >
      <scroller
        :on-refresh="refresh"
        ref="my_scroller"
        v-if="knowData.length"
      >
        <div
          class="holdings_list"
          v-for="(item,idx) in knowData"
          :key="item.orderNo+idx"
        >
          <div class="holdings_title">
            <div class="holdings_left">
              <h1>
                {{item.commodityName}}-{{item.commodityCode}}{{item.contractCode}}
              </h1>
              <i
                v-html="item.tradeType === 1 ? '涨' : '跌'"
                :style="{backgroundColor:item.tradeType === 1 ? '#EA3826' : '#7ED321'}"
                style="width:20px;height:20px;line-height:20px" />
              <p>X{{item.tradeHands}}手</p>
            </div>
            <div class="holdings_right">
              <h3>{{item.buyType === 0 ? '市价买入' : '指定价买入'}}</h3>
            </div>
            <span class="right_triangle">
              <p>{{item.tradeModel === 0 ? '元' : '角'}}</p>
            </span>
          </div>
          <div class="holdings_content">
            <div class="holdings_content_left">
              <p>买入: {{item.orderPrice.toFixed(item.priceDecimalPlaces)}}</p>
              <p>止盈: {{item.currencySign}}{{item.profitAmount * item.tradeModelRate * item.tradeHands.toFixed(2)}}</p>
              <p>当前: {{(item.lastPrice * 1).toFixed(item.priceDecimalPlaces)}}</p>
              <p>止损: {{item.currencySign}}{{item.lossAmount * item.tradeModelRate * item.tradeHands.toFixed(2)}}</p>
              <p>订单编号: {{item.orderNo}}</p>
              <p>开仓时间: {{timer(0, item.createTimeL)}}</p>
            </div>
            <div class="holdings_content_right">
              <p>套餐: {{item.templateName}}</p>
              <p>手续费: {{item.currencySign}}{{item.tradeModel === 0 ? item.fee * item.tradeHands : item.fee * item.tradeHands * item.tradeModelRate }}</p>
              <h2
                v-if="item.tradeType === 1"
                :style="item.floatProfitRise >= 0
                 ? 'color:#EA3826'
                 : 'color:#7ED321'"
              >
                <span>
                  {{item.floatProfitRise >= 0
                  ? '+'
                  : '-'}}{{item.currencySign}}{{Math.abs(item.floatProfitRise).toFixed(2)}}
                </span>
                <i>
                  {{item.floatProfitRise >= 0
                  ? '+'
                  : '-'}}{{item.targetCurrencySign}}{{(Math.abs(item.floatProfitRise) * item.targetCurrencyRatio).toFixed(2)}}
                </i>
              </h2>
              <h2
                v-else
                :style="item.floatProfitFall >= 0
                 ? 'color:#EA3826'
                 : 'color:#7ED321'"
              >
                <span>
                  {{item.floatProfitFall >= 0
                  ? '+'
                  : '-' }}{{item.currencySign}}{{Math.abs(item.floatProfitFall).toFixed(2)}}
                </span>
                <i>
                  {{item.floatProfitFall >= 0
                  ? '+'
                  : '-'}}{{item.targetCurrencySign}}{{(Math.abs(item.floatProfitFall) * item.targetCurrencyRatio).toFixed(2)}}
                </i>
              </h2>
              <p>保证金: {{item.targetCurrencySign}}{{fixNumLen(item.lossGearAmount, item.securityDepositBuffer, item.tradeModelRate, item.tradeHands, item.targetCurrencyRatio)}}</p>
            </div>
          </div>
          <div class="holdings_bottom">
            <span
              style="border:solid 0.5px #F5A623"
              @click="setUpLoss($event,item)"
            >
              设置止盈止损
            </span>
            <span
              style="border:solid 0.5px #F5A623"
              @click="backhand($event,item)"
            >
              反手
            </span>
            <span
              style="border:solid 0.5px #F5A623"
              @click="eveningUps($event,item)"
            >
              平仓
            </span>
          </div>
          <div class="holdings_bottom" v-if="false">
            <p class="holdings_bottom_p">平仓处理中</p>
          </div>
        </div>
      </scroller>
      <no-data v-else></no-data>
    </div>
    <setup-loss @updatePage='updatePage'></setup-loss>
  </div>
</template>

<script>
import Holdings from './holdings'
export default Holdings
</script>

<style lang="stylus">
@import './holdings.styl'
</style>
