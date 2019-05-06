<template>
  <div>
    <transition name='fade'>
      <div
        class="quickBuyUi"
        v-show="buyVisible"
      >
        <div class="stock-number">
          <div class="model_amount">
            <div class="wrap">
              <input
                type="checkbox"
                v-model='checks'
                @click="checkBoxs($event, model_moneys)"
                :disabled='disabled'
                id="checkbox_b1"
                class="chk_2" />
              <label
                :class="[checks ? 'checks' : 'nochecks']"
                for="checkbox_b1"
              >
                {{model_moneys.title}}
              </label>
            </div>
          </div>
          <span
            @click="tradeNum"
            class="quickTrades hanldNum"
          >
            手数：{{numLen}}
          </span>
          <span
            @click="stopLoss"
            class="quickTrades stopLoopAmount"
          >
            止损金额：
            {{!buyData ? '' : buyData.currentCurrencySign}}
            {{stopLossMoney * model_moneys.num}}
          </span>
        </div>
        <div class="cost">
          <span>保证金:{{bail}}</span>
          <span>交易综合费:{{ComprehensiveCost}}</span>
          <span>
            止盈金额:
            {{!buyData ? '' : buyData.currentCurrencySign}}
            {{profitMoney * model_moneys.num}}
          </span>
        </div>
      </div>
    </transition>
    <transition name="move">
      <div
        class="buyinfo"
        v-show="openNum"
      >
        <mt-picker
          :slots="handlsUnits"
          ref="picker"
          value-key="cname"
          @change="onChangeNum"
          :visible-item-count="5">
        </mt-picker>
      </div>
    </transition>
    <transition name="move">
      <div
        class="buyinfo"
        v-show="openStopLoss"
      >
        <mt-picker
          :slots="dateStopLoss"
          ref="picker"
          value-key="cname"
          @change="onChangeStopMoney"
          :visible-item-count="5"
        >
        </mt-picker>
      </div>
    </transition>
    <transition name="fade">
      <div
        class="buyMask"
        v-show="openNum||openStopLoss"
        @click="closeMask"
      >
      </div>
    </transition>
  </div>
</template>

<script>
import quickBuyIn from './quickBuyIn'
export default quickBuyIn
</script>

<style lang="stylus">
@import './quickBuyIn.styl'
</style>
