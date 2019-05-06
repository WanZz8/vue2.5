<template>
  <div class="user_body">
    <header-view :titles="'交易详情'" :headerLeft='true'>
      <div class="home_back_icon"
           slot="header_Left"
           @click='goBack'>
        <i class="icons icon_Back">
          <svg-icon icon-class="left"></svg-icon>
        </i>
      </div>
    </header-view>
    <div class="mint-content settlementDetail">
      <ul>
        <li>
          <div class="title_left">
            <h1>{{settleData.commodityName}}({{settleData.commodityCode}}{{settleData.contractCode}})</h1>
            <i
              v-html="settleData.tradeType===1?'涨':'跌'"
              :style="{backgroundColor:settleData.tradeType===1
              ?'#EA3826'
              :'#7ED321'}"
              style="width:20px;height:20px;line-height:20px;border-radius:50%"></i>
            <p>x{{settleData.tradeHands}}手</p>
          </div>
          <div class="title_right">
            <p  v-if="settleData.tradeStatus!==3">
              <i
                :style="{color:settleData.settleAmount>=0
                ? '#EA3826'
                :'#7ED321'}"
              >
                {{settleData.settleAmount >= 0
                ? '+'
                : '-'}}{{settleData.currencySign}}{{Math.abs(fixNumLena(
                settleData.settleAmount,
                settleData.tradeHands,
                settleData.tradeModelRate))}}
              </i>
              <span>
                ({{settleData.targetCurrencySign}}{{fixNumLenb(
                settleData.settleAmount,
                settleData.targetCurrencyRatio,
                settleData.tradeModelRate,
                settleData.tradeHands)}})
              </span>
            </p>
          </div>
        </li>
        <li class="uid">
          <p>套餐：{{settleData.templateName}}</p>
        </li>
        <li class="uid">
          <p>订单编号：{{settleData.orderNo}}</p>
        </li>
        <li class="list">
          <p>下单模式:</p>
          <p>{{settleData.tradeModel===0?'元':'角'}}</p>
        </li>
        <li class="list">
          <p>止损点：</p>
          <p>{{settleData.currencySign}}{{fixNumLena(
            settleData.lossAmount,
            settleData.tradeModelRate,
            settleData.tradeHands)}}</p>
        </li>
        <li class="list">
          <p>止盈点：</p>
          <p>{{settleData.currencySign}}{{fixNumLena(
            settleData.profitAmount,
            settleData.tradeModelRate,
            settleData.tradeHands)}}</p>
        </li>
        <li class="list">
          <p>手续费:</p>
          <p>
            {{settleData.targetCurrencySign}}{{!settleData.fee
            ?'0.00'
            :fixNumLenb(settleData.fee,
            settleData.tradeHands,
            settleData.targetCurrencyRatio,
            settleData.tradeModelRate)}}
          </p>
        </li>
        <li class="list">
          <p>递延费:</p>
          <p>
            {{settleData.overnightStatus ? fixNumLenadd(
            settleData.targetCurrencySign,
            settleData.totalOvernightFee) : '-'}}
          </p>
        </li>
        <li class="list">
          <p>保证金：</p>
          <p>{{settleData.targetCurrencySign}}{{fixNumLend(settleData.securityDepositBuffer,
            settleData.lossAmount,
            settleData.tradeHands,
            settleData.targetCurrencyRatio,
            settleData.tradeModelRate
            )}}</p>
        </li>
        <li class="list list_margin">
          <p>{{settleData.buyType===0
            ?'市价买入'
            :'指定价买入'}}：</p>
          <p>{{settleData.orderPrice}}</p>
        </li>
        <li class="list">
          <p>市价平仓：</p>
          <p>{{settleData.tradeStatus!==3
            ? settleData.closePrice
            : "-"}}</p>
        </li>
        <li class="list">
          <p>开仓时间：</p>
          <p>{{timer("1",settleData.createTimeL)}}</p>
        </li>
        <li class="list">
          <p>平仓时间：</p>
          <p>{{timer("1",settleData.closeTimeL)}}</p>
        </li>
        <li class="list">
          <p>平仓类型：</p>
          <p>{{this.closeType[settleData.tradeCloseType]}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SettlementDetail from './settlementDetail'
export default SettlementDetail
</script>

<style lang="stylus">
@import './settlementDetail'
</style>
