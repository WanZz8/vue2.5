<template>
  <div class="user_body">
    <header-view
      :headerCenter='true'
      :headerLeft='true'
    >
      <div
        class="home_back_icon"
        slot="header_Left"
        @click='goBacks'
      >
        <i class="icons icon_Back">
          <svg-icon icon-class="left"></svg-icon>
        </i>
      </div>
      <div slot="header_Center">
        <span class="title_header">
          {{$route.query.CommodityName}}
          {{$route.query.commodityCode}}
          {{$route.query.contractCode}}-{{pageTitle}}
        </span>
      </div>
      <div
        slot="header_Right"
        class="svg-container"
        @click="linkToPosition"
      >
        <p>持仓</p>
      </div>
    </header-view>
    <div class="mint-content buy_trade_view">
      <div class="buy_list">
        <div class="buy_title">
          <p v-if="!buyBussInfo">钱包</p>
          <p v-else>
            ({{buyBussInfo.walletType===1
              ? '现金'
              : buyBussInfo.walletType === 2
              ? '积分'
              : buyBussInfo.walletType === 3
              ? '模拟币'
              : ''
            }})
            钱包：
          </p>
          <b>{{tradeBanlance}}</b>
        </div>
        <div class="common_trade loco_gold">
          <p>
            {{$route.query.CommodityName}}
            {{$route.query.commodityCode}}
            {{$route.query.contractCode}}
          </p>
          <span class="pcs">持仓至{{getCloseTime}}自动平仓</span>
        </div>
        <div class="common_trade buy_prices">
          <p>{{pageTitle}}价</p>
          <b
            style="color:#ea3826"
            v-if="this.title"
          >
            {{!buyPrices?'-':buyPrices}}
          </b>
          <b
            style="color:#7ed321"
            v-else>
            {{!sellFixeds?'-':sellFixeds}}
          </b>
        </div>
        <div class="common_trade buy_model">
          <span
            style="border-width:0.5px"
            v-for="(item,index) in dimeModes"
            :class="modelActive===index?'active':''"
            @click="modelOnclick(item,index)"
            :key="item.title"
          >
            {{item.title}}
          </span>
        </div>
        <div class="common_trade buy_num">
          <p>交易手数</p>
          <div class="number_add_less">
            <button
              class="btn cut_back"
              @click.prevent="cutBacks"
            >
              -
            </button>
            <span>{{addNums}}</span>
            <button
              class="btn add"
              @click.prevent="addNumbers"
            >
              +
            </button>
          </div>
          <div class="number_num_span">
            <span
              style="border-width:0.5px"
              v-for="(item,index) in getQuotaInfo"
              :key="item.num"
              :class="addNums==item.num?'active':''"
              @click.prevent="onClickNum($event,item,index)"
            >
              {{item.cName}}
            </span>
          </div>
        </div>
        <div class="common_trade trigger_stop_loss">
          <p>触发止损</p>
          <div class="number_num_span">
            <span
              style="border-width:0.5px"
              :class="lossActive===index?'active':''"
              v-for="(item,index) in stopLossAmount"
              :key="'stopLossAmount'+index"
              @click="lossClick(item,index)"
            >
              {{
              buyBussInfo.length===0
                ?'-'
                :buyBussInfo.currentCurrencySign
              }}
              {{item * addNums}}
            </span>
          </div>
        </div>
        <div class="common_trade target_profit">
          <p>触发止盈</p>
          <div class="number_num_span">
            <span
              style="border-width:0.5px"
              :class="stopProfitActive === index ? 'active' : ''"
              @click="stopProfitClick(item,index)"
              v-for="(item,index) in stopProfitMount"
              :key="'stopProfitMount'+index"
            >
              {{buyBussInfo.length==0?'-':buyBussInfo.currentCurrencySign}}
              {{item * addNums}}
            </span>
          </div>
        </div>
        <div class="common_trade cash_deposit">
          <p class="common_p" @click="openModal1">
            <b>履约保证金(冻结)</b>
            <i>
              <svg-icon icon-class="interrogation"></svg-icon>
            </i>
          </p>
          <span class="common_money">
            {{buyBussInfo.targetCurrencySign}}{{bailAmount}}
          </span>
        </div>
        <div class="common_trade comprehensive_cost">
          <p class="common_p" @click="openModal2">
            <b>交易综合费</b>
            <i>
              <svg-icon icon-class="interrogation"></svg-icon>
            </i>
          </p>
          <span class="common_money">
            {{buyBussInfo.targetCurrencySign}}{{comprehensiveCost}}
          </span>
        </div>
        <div
          class="common_trade deferred_charges"
          v-show="getOverNight===0"
        >
          <p class="diyan">
            <mt-switch v-model="diyan" @change="changeDiyan">
              <span>{{diyan ? '关闭': '开启'}}</span>递延
            </mt-switch>
          </p>
          <p class="common_p comcc" v-show="diyan" @click="openModal3">
            <b>递延费</b>
            <i>
              <svg-icon icon-class="interrogation"></svg-icon>
            </i>
          </p>
          <span class="common_money cccc" v-show="diyan">
            <span>{{buyBussInfo.targetCurrencySign}}{{deferredFee}}</span>
          </span>
        </div>
        <div class="exchange_rate">
          <p class="common_p">
            汇率换算
          </p>
          <span
            class="common_money"
            v-if="buyBussInfo.length!==0"
          >
            1{{buyBussInfo.length === 0
              ? '-'
              : buyBussInfo.currentCurrencyName}}={{buyBussInfo.length===0
              ? '-'
              : buyBussInfo.ratio}}{{buyBussInfo.targetCurrencyName}}
          </span>
          <span
            class="common_money"
            v-else
          >
            -
          </span>
        </div>
        <div class="exchange_bottom"></div>
      </div>
      <div class="buyInButton">
        <button
          class="market_buyIn"
          @click="marketPrice"
        >
          市场价{{pageTitle}}
        </button>
        <button
          class="designation_buyIn"
          @click="designationPrice"
        >
          指定价{{pageTitle}}
        </button>
      </div>
      <popup
        :popupVisible="popupVisible"
        @closePopup="closePopup"
      >
        <div slot="popup_node">
          <div class="designation_sell">
            <h2>指定价</h2>
            <ul>
              <li>
                <b>商品</b>
                <span>
                  {{paramsValue.CommodityName}}{{'-' + pageTitle}}
                </span>
              </li>
              <li>
                <b>模式</b>
                <span>
                  {{paramsValue.modelNum}}
                </span>
              </li>
              <li>
                <b>手数</b>
                <span>{{paramsValue.addNums}}手</span>
              </li>
              <li>
                <b>止损</b>
                <span>
                  {{buyBussInfo.length===0
                   ? '-'
                   :buyBussInfo.currentCurrencySign}}{{paramsValue.stopLossFee}}
                </span>
              </li>
              <li>
                <b>止盈</b>
                <span>
                  {{buyBussInfo.length===0
                   ? '-'
                   :buyBussInfo.currentCurrencySign}}{{paramsValue.stopProfitFee}}
                </span>
              </li>
              <li>
                <b>最新价</b>
                <span>
                  {{ this.title ? buyPrices : sellFixeds}}
                </span>
              </li>
              <li>
                <b class="manually_in">指定买入价</b>
                <div class="profit">
                  <div class="profit_operation">
                    <button
                      class="reduce"
                      style="border-radius:100px"
                      @click.prevent="cutNum"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      class="num"
                      :disabled="true"
                      v-model='desigPrice'
                    />
                    <button
                      size="small"
                      class="add"
                      style="border-radius:100px"
                      @click.prevent="increase"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            </ul>
            <div class="btn">
              <input type="button"
                     value="取消"
                     name="cancel"
                     @click="cancel" />
              <input type="button"
                     value="确认"
                     name="confirm"
                     @click="manually" />
            </div>
          </div>
        </div>
      </popup>
      <transition name="modal-fade1">
        <div class="modal-back" v-show="isModalVisible1">
          <div class="modal">
            <div class="modal-header">
              <div class="modal-close">
                履约保证金
              </div>
            </div>
            <div class="modal-body">
              <div class="code">
                履约保证金为操盘手委托平台冻结用于履行交易亏损赔付义务的保证金。
                操盘手以冻结的履约保证金作为承担交易亏损的上限
                （注：若出现订单穿仓由客户自己承担；出现账户穿仓由投资者承担）。
                合作交易结束后，根据结算结果，如交易盈利，操盘手冻结的履约保证金全额退还。
                如交易亏损，从冻结的履约保证金中，扣减操盘手所应承担的亏损赔付额，扣减后余额退还。
              </div>
            </div>
            <div class="modal-footer">
              <div class="phoneCode_btn">
                <input
                  type="button"
                  name="getPhoneCode"
                  value="确定"
                  @click="closeModal1"
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="modal-fade2">
        <div class="modal-back" v-show="isModalVisible2">
          <div class="modal">
            <div class="modal-header">
              <div class="modal-close">
                交易综合费
              </div>
            </div>
            <div class="modal-body">
              <div class="code code1">
                交易综合费指交易时需要交纳的交易费用，每交易一手即会收取一次（买进卖出只收取一次）
              </div>
            </div>
            <div class="modal-footer">
              <div class="phoneCode_btn">
                <input
                  type="button"
                  name="getPhoneCode"
                  value="确定"
                  @click="closeModal2"
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="modal-fade3">
        <div class="modal-back" v-show="isModalVisible3">
          <div class="modal">
            <div class="modal-header">
              <div class="modal-close">
                递延费
              </div>
            </div>
            <div class="modal-body">
              <div class="code code2">
                持仓订单触发隔夜条件系统将自动收取递延费用于过夜,未触发隔夜条件则不收取
              </div>
            </div>
            <div class="modal-footer">
              <div class="phoneCode_btn">
                <input
                  type="button"
                  name="getPhoneCode"
                  value="确定"
                  @click="closeModal3"
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import productBuy from './productBuy'
export default productBuy
</script>
<style lang="stylus" scoped>
@import './productBuy.styl'
</style>
