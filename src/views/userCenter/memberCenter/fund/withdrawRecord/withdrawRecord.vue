<template>
  <div class="withdraw_detail">
    <div class="top_title" v-if="false">
      <i class="icons icon_spinner">
        <svg-icon icon-class="Spinner"></svg-icon>
      </i>
      <span>正在加载更多数据...</span>
    </div>
    <div class="main-body" ref="wrapper_entrust" :style="{ height: (wrapperHeight-20) + 'px' }">
      <mt-loadmore :top-method="loadTop"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="footShow"
                   ref="loadmoreThree"
                   :autoFill="isAutoFill"
                   v-if="withDrawRecord.length"
      >
        <div class="entrust_list" v-for="(item, index) in withDrawRecord" :key="index+'idx'">
          <div class="entrust_title">
            <h1>提现详情</h1>
          </div>
          <div class="container_list">
            <ul>
              <li class="container_left">
                <span class="dp_successed">
                  提现状态: 成功
                </span>
                <span>交易时间：{{forMatTime(item.updateTime)}}</span>
              </li>
              <li class="container_center"></li>
              <li class="container_right">
                <span>提现金额：{{item.amount}} 元</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="footShow" class="foot_text">{{footTextVal}}</div>
      </mt-loadmore>
      <no-data v-else></no-data>
    </div>
  </div>
</template>

<script>
import WithdrawDetails from './withdrawRecord'
export default WithdrawDetails
</script>

<style lang="stylus">
  @import './withdrawRecord.styl'
</style>
