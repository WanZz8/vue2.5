<template>
  <div class="trans_detail">
    <div class="top_title"
         v-if="false">
      <i class="icons icon_spinner">
        <svg-icon icon-class="Spinner"></svg-icon>
      </i>
      <span>正在加载更多数据...</span>
    </div>
    <div class="main-body"
         ref="wrapper_entrust"
         :style="{ height: (wrapperHeight-20) + 'px' }">
      <mt-loadmore :top-method="loadTop"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="footShow"
                   ref="loadmoreTwo"
                   :autoFill="isAutoFill"
                   v-if="tradeRecord.length">
        <div class="entrust_list"
             v-for="(item, index) in tradeRecord"
             :key="index+'idx'">
          <div class="entrust_title">
            <h1>交易详情</h1>
          </div>
          <div class="container_list">
            <ul>
              <li class="container_left">
                <span class="dp_successed">
                  订单编号: {{item.orderNo}}
                </span>
                <span class="dp_successed">
                  账单分类: {{item.remark}}
                </span>
                <span class="dp_successed">交易时间：{{forMatTime(item.createTime)}}</span>
              </li>
              <li class="container_center"></li>
              <li class="container_right">
                <span>交易金额：{{item.amount}} 元</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="footShow"
             class="foot_text">{{footTextVal}}</div>
      </mt-loadmore>
      <no-data v-else></no-data>
    </div>
  </div>
</template>

<script>
import TransactionDetails from './transactionDetail'
export default TransactionDetails
</script>

<style lang="stylus">
@import './transactionDetails.styl'
</style>
