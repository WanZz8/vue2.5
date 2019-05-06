<template>
  <div class="entrust_detail">
    <div class="main-body"
         ref="wrapper_entrust"
         :style="{ height: (wrapperHeight-50) + 'px' }">
      <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="my_scroller"
        v-if="knowData.length"
      >
        <div
          class="entrust_list"
          v-for="(item,idx) in knowData"
          :key="item.orderNo+idx"
        >
          <span class="right_triangle">
            <p>{{item.tradeModel===0?'元':'角'}}</p>
          </span>
          <div class="entrust_title">
            <h1>
              {{item.commodityName}}-{{item.commodityCode}}{{item.contractCode}}
            </h1>
            <i v-html="item.tradeType === 1 ? '涨' : '跌'"
               :style="{backgroundColor:item.tradeType===1?'#EA3826':'#7ED321'}"
               style="width:20px;height:20px;line-height:20px"></i>
            <p><span class="multiply">×</span>{{item.tradeHands}}手</p>
            <div class="for_right"
                 style="color:#F5A623">
              <span v-if="item.tradeStatus===1">委托排队中</span>
              <span v-else-if="item.tradeStatus===2">委托买入成功</span>
              <span v-else-if="item.tradeStatus===3">委托买入取消</span>
              <span v-else-if="item.tradeStatus===4">委托卖出成功</span>
              <span v-else>委托买入失败</span>
            </div>
          </div>
          <div class="container_list">
            <ul>
              <li class="container_left">
                <span>套餐：{{item.templateName}}</span>
                <span>委托编号：{{item.orderNo}}</span>
                <span>委托时间：{{timer(0,item.createTimeL)}}</span>
                <span>止损点：{{item.currencySign}}{{item.tradeModel === 0 ? item.lossAmount:(item.lossAmount*0.1).toFixed(1)}}</span>
                <span>止盈点：{{item.currencySign}}{{item.tradeModel === 0 ?item.profitAmount:(item.profitAmount*0.1).toFixed(1)}}</span>
              </li>
              <li class="container_center"></li>
              <li class="container_right">
                <span>类型：{{item.buyType===0?'市价买入':'指定价买入'}}</span>
                <span
                  :style="{color:item.tradeType === 1 ? '#EA3826' : '#7ED321'}">
                  买入：{{item.orderPrice}}
                </span>
                <span v-if="item.tradeStatus===1">当前价：{{item.tradeStatus === 1 ? item.lastPrice : '-'}}</span>
                <span>
                  保证金：{{item.targetCurrencySign}}{{item.tradeModel===0
                  ?(item.securityDepositBuffer+item.lossGearAmount)* item.tradeHands * item.targetCurrencyRatio
                  :((item.securityDepositBuffer+item.lossGearAmount)* item.tradeHands * item.targetCurrencyRatio*0.1).toFixed(1)}}
                </span>
              </li>
            </ul>
            <div class="cancel"
                 v-if="item.tradeStatus===1">
              <input
                type="button"
                value="取消委托"
                name="cancel"
                @click="cancel_entrust($event,item)"
              />
            </div>
          </div>
        </div>
      </scroller>
      <no-data v-else></no-data>
    </div>
  </div>
</template>

<script>
import Entrust from './entrust'
export default Entrust
</script>

<style lang="stylus">
@import './entrust.styl'
</style>
