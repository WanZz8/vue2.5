<template>
  <div class="setUpStopLoss">
    <popup
      :popupVisible='popupVisible'
      @closePopup='closePopup'
    >
      <div slot="popup_node">
        <div class="popup_container">
          <div class="popup_order_info">
            <b class="title">
              {{knowData.commodityName}}-{{knowData.commodityCode}}{{knowData.contractCode}}
              <i :style="knowData.tradeType === 1
              ? 'color:#ea3826'
              : 'color:#7ED321'">
                买{{knowData.tradeType === 1
                ? '涨'
                : '跌'}}{{knowData.tradeHands}}手
              </i>
            </b>
            <ul>
              <li>
                止损点：{{knowData.currencySign}}{{fixNumLen_1(
                knowData.lossAmount,
                knowData.tradeModelRate,
                knowData.tradeHands)}}
              </li>
              <li>
                止盈点：{{knowData.currencySign}}{{fixNumLen_1(
                knowData.profitAmount,
                knowData.tradeModelRate,
                knowData.tradeHands)}}
              </li>
              <li>
                当前价：{{knowData.lastPrice}}
              </li>
              <li>
                买入价：{{knowData.orderPrice}}
              </li>
            </ul>
          </div>
          <div class="take_profit">
            <div class="title">
              <span class="title_name">触发止损</span>
              <span
                class="title_range"
                v-if="knowData.tradeType === 1"
              >
                (止损范围{{lossPriceScope}}～{{knowData.orderPrice}})
              </span>
              <span
                class="title_range"
                v-else
              >
                (止损范围{{knowData.orderPrice}}～{{otherLossPriceScope}})
              </span>
            </div>
            <div class="profit">
              <div class="item_num">
                <div class="profit_number_big">
                  {{lossAmount * knowData.tradeModelRate > 0
                  ? '-'
                  : ''}}{{knowData.currencySign}}{{fixNumLen_1(
                    lossAmount,
                    knowData.tradeModelRate,
                    knowData.tradeHands
                    )}}
                  ({{toFixedRandom(lossAmount * knowData.tradeModelRate * knowData.targetCurrencyRatio * knowData.tradeHands)}})
                </div>
                <div class="rt_lossPrice">
                  {{lossPrice}}
                </div>
              </div>
              <div class="profit_operation">
                <button
                  class="reduce"
                  style="border-radius:50%;width:34px;height:34px"
                  @click="lessLoss($event)"
                >
                   -
                </button>
                <mt-range
                  v-model="get_LossPrice"
                  :bar-height="8"
                  :step="setNewStep"
                  :min="minLossPrice"
                  :max="maxLossPrice"
                  @change="changelessLoss($event)"
                  @input="inputlessLoss($event)"
                >
                </mt-range>
                <button
                  size="small"
                  class="add"
                  style="border-radius:50%;width:34px;height:34px"
                  @click="addLoss($event)"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div class="stop_loss">
            <div class="title">
              <span class="title_name">触发止盈</span>
              <span
                class="title_range"
                v-if="knowData.tradeType===1"
              >
                (止盈范围{{knowData.orderPrice}}～{{setWinPriceSocpe}})
              </span>
              <span
                class="title_range"
                v-else
              >
                (止盈范围{{otherSetWinPriceScope}}～{{knowData.orderPrice}})
              </span>
            </div>
            <div class="loss">
              <div class="item_num">
                <div class="profit_number_big">
                  {{profitAmount * knowData.tradeModelRate > 0
                    ? '+'
                    : ''}}{{knowData.currencySign}}{{fixNumLen_1(
                  profitAmount,
                  knowData.tradeModelRate,
                  knowData.tradeHands
                  )}}
                      ({{toFixedRandom(profitAmount * knowData.tradeModelRate * knowData.targetCurrencyRatio * knowData.tradeHands)}})
                </div>
                <div class="rt_lossPrice">
                  {{profitPrice}}
                </div>
              </div>
              <div class="loss_operation">
                <button
                  class="reduce"
                  style="border-radius:50%;width:34px;height:34px"
                  @click="lessProfit"
                >
                  -
                </button>
                <mt-range
                  v-model="get_profitPrice"
                  :bar-height="8"
                  :step="setNewStep"
                  :min="min_profitPrice"
                  :max="max_profitPrice"
                  @change="changelessLoss1($event)"
                  @input="inputlessLoss1($event)"
                >
                </mt-range>
                <button
                  size="small"
                  class="add"
                  style="border-radius:50%;width:34px;height:34px"
                  @click="addProfit"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <span class="explanation">
            说明：止损金额小于浮动亏损金额订单将面临止损平仓，清谨慎操作。
          </span>
          <div class="setUp_btn">
            <mt-button
              type="default"
              size="large"
              @click="cancel"
            >
              取消
            </mt-button>
            <span></span>
            <mt-button
              type="primary"
              size="large"
              @click="submitUpdate"
            >
              确定
            </mt-button>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import setUpStopLoss from './setUpStopLoss'
export default setUpStopLoss
</script>

<style lang="stylus">
@import './setUpStopLoss.styl'
</style>
