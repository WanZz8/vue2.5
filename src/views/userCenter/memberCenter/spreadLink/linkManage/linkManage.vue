<template>
  <div class="linkMana_detail">
    <div class="top_title"
         v-show="loadFlat">
      <i class="icons icon_spinner">
        <svg-icon icon-class="Spinner"></svg-icon>
      </i>
      <span>正在加载更多数据...</span>
    </div>
    <div class="main-body commission_content"
         ref="wrapper_entrust"
         :style="{ height: (wrapperHeight-20) + 'px' }">
      <scroller :on-refresh="refresh"
                :on-infinite="infinite"
                ref="my_scroller"
                v-if="queryList.length">
        <div class="com_content"
             v-for="(item, index) in queryList"
             :key="index+'idx'">
          <div class="commiss_header">
            <p>{{item.promotionType==1?'APP推广':'域名推广'}}</p>
            <div class="header-rt">
              <i class="icons icon_Invite"
                 @click="goShareLink(item.code)">
                <svg-icon icon-class="share"></svg-icon>
              </i>
              <b>|</b>
              <i class="icons icon_Invite"
                 @click="getAllInvite(item.code)">
                <svg-icon icon-class="invite"></svg-icon>
              </i>
              <b>|</b>
              <i class="icons icon_Invite"
                 @click="goChangeLink(item)">
                <svg-icon icon-class="change"></svg-icon>
              </i>
              <b v-show="item.promotionType==2">|</b>
              <i class="icons icon_Invite"
                 v-show="item.promotionType==2"
                 @click="openModal(item.code, item.domain)">
                <svg-icon icon-class="qrcode"></svg-icon>
              </i>
              <b>|</b>
              <i class="icons icon_Invite"
                 @click="removeLink(item.code)">
                <svg-icon icon-class="trashcan"></svg-icon>
              </i>
            </div>
          </div>
          <div class="commis_type">
            <p class="commis_type_p1"
               @click="copyLinks(item)">
              <span class="span1">{{item.promotionType==1?'邀请码':'推广地址'}}</span>
              <span class="span2"
                    :style='item.promotionType==1?"line-height:40px":"margin-top:5px"'
                    style="color:#333;float:right;padding-right:10px;font-size:12px;">{{item.promotionType==1?item.code:item.domain+'/?code='+item.code+'&'+'merchant='+merchantInfo.merchantCode}}</span>
              <i class="copys">
                <svg-icon icon-class="copy"></svg-icon>
              </i>
            </p>
            <div style="clear:both"></div>
            <p class="commis_type_p2">
              <span class="span1">创建时间：</span>
              <span class="span2">{{item.createTime}}</span>
            </p>
            <p class="commis_type_p2">
              <span class="span1">到期时间：</span>
              <span class="span2">{{item.effictiveTime}}</span>
            </p>
            <p class="commis_type_p2">
              <span class="span1">最大注册人数</span>
              <span class="span2">{{item.maxRegisterNum}}</span>
            </p>
          </div>
          <div class="commis-footer">
            <p class="commis-footer-p">
              <span>类型</span>
              <span>注册人数</span>
              <span>状态</span>
            </p>
            <p class="commis-footer-p">
              <span>{{typeObj[item.type]}}</span>
              <span>{{item.currentRegisterNum}}</span>
              <span>{{item.status===1?'正常':'冻结'}}</span>
            </p>
          </div>
        </div>
        <div v-show="footShow"
             class="foot_text">{{footTextVal}}</div>
      </scroller>
      <div class="noData_icon"
           v-else>
        <i>
          <svg-icon icon-class="noDatas"></svg-icon>
        </i>
        <p>暂无内容..</p>
      </div>
      <transition name="modal-fade">
        <div class="modal-backdrop"
             @click.stop="closeBackDrop"
             v-show="isModalVisible">
          <div class="modal">
            <div class="modal-header">
              <div class="modal-close">
                <span>{{nameCode}}</span>
                <span>二维码</span>
              </div>
            </div>
            <div class="modal-body">
              <div class="code">
                <vue-qr :text="config.value"
                        :size="200"
                        :margin="0"
                        :logoSrc="config.logo"
                        id="sss">
                </vue-qr>
              </div>
            </div>
            <div class="modal-footer">
              <p class="conf_link_p">
                <span>链接:</span>
                <span class="conf_link">{{config.value}}</span>
              </p>
            </div>
          </div>
          <div class="phoneCode_btn"
               @click="copy">
            复制链接
          </div>
        </div>
      </transition>
    </div>
    <loading v-show="loading"></loading>
  </div>
</template>

<script>
import noData from '@/components/public/noData/noData'
import Loading from '@/components/public/loading/loadings'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
import { setLocal, getSession } from '@/utils/storage'
import { MessageBox, Toast } from 'mint-ui'
import VueQr from 'vue-qr'
const img = require('../../../../../assets/images/common/loginHeader.png')
export default {
  name: 'linkManage',
  components: {
    noData,
    VueQr,
    Loading
  },
  props: ['showLoading'],
  data () {
    return {
      pageNum: 1,
      size: 10,
      pageTotal: 1,
      loadFlat: false,
      allLoaded: false,
      isAutoFill: false,
      wrapperHeight: 0,
      courrentPage: 0,
      footTips: false,
      footText: '',
      pagaVal: 1,
      isModalVisible: false,
      typeObj: {
        0: '会员',
        1: '代理',
        2: '总代'
      },
      nameCode: '',
      merchantInfo: getSession('merchantInfo'),
      config: {
        logo: img,
        value: ''
      }
    }
  },
  watch: {
    tab () {
      this.conHeight()
    }
  },
  computed: {
    ...mapGetters(['queryList', 'queryListTotal', 'loading']),
    footShow () {
      let len = this.queryListTotal / this.size
      len = Math.ceil(len)
      return this.pagaVal === len
    },
    footTextVal () {
      // let len = this.recordTotal / this.size
      // len = Math.ceil(len)
      let txt
      // if (this.pagaVal === len) {
      //   setTimeout(() => {
      //     txt = '没有更多数据了'
      //   }, 3000)
      // }
      return txt
    }
  },
  mounted () {
    this.conHeight()
    this.loadFlat = this.showLoading
  },
  methods: {
    getQueryPage (done) {
      const data = {
        pageNo: 1,
        pageSize: 10,
        status: ''
      }
      this.$store.dispatch('queryPage', data).then(res => {
        this.loadFlat = false
        if (res.status) {
          this.pageTotal = res.data.pages
          this.pageNum = 1
          this.size = 10
          if (done) {
            done()
          }
        }
      }).catch(() => {
        this.loadFlat = false
      })
    },
    addTuiGuang (done) {
      if (this.pageNum < this.pageTotal) {
        let das = {
          pageNum: (this.pageNum += 1),
          pageSize: this.size
        }
        this.$store.dispatch('addQueryPage', das).then(res => {
          if (res.status) {
            this.pageTotal = res.data.pages
            if (done) {
              done()
            }
          }
        })
      } else {
        done(true)
      }
    },
    refresh (done) {
      this.getQueryPage(done)
    },
    infinite (done) {
      this.addTuiGuang(done)
    },
    getAllInvite (code) {
      this.$router.push(
        {
          path: '/userCenter/LinkDetails',
          query: {
            code: code
          }
        }
      )
    },
    conHeight () {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_entrust.getBoundingClientRect().top
    },
    // 打开模态框
    openModal (name, url) {
      this.nameCode = name
      // this.config.value = url + '//' + name + '/power/register'
      this.config.value = `http://${url}/?code=${name}&merchant=${this.merchantInfo.merchantCode}`
      this.isModalVisible = true
    },
    // 复制链接
    copy () {
      this.isModalVisible = false
      this.$copyText(this.config.value).then(e => {
        Toast({
          message: '复制成功',
          position: 'middle',
          duration: 1000,
          iconClass: 'mintui mintui-success'
        })
      })
    },
    copyLinks (item) {
      if (item.promotionType === 1) {
        this.copyFunc(item.code)
      } else {
        this.copyFunc(`http://${item.domain}/?code=${item.code}&merchant=${this.merchantInfo.merchantCode}`)
      }
    },
    copyFunc (txt) {
      this.$copyText(txt).then(e => {
        Toast({
          message: '复制成功',
          position: 'middle',
          duration: 1000,
          iconClass: 'mintui mintui-success'
        })
      })
    },
    // 分享推广
    goShareLink (code) {
      console.log(code)
    },
    // 关闭
    closeBackDrop () {
      this.isModalVisible = false
    },
    // 去修改链接
    goChangeLink (item) {
      setLocal('linkData', item)
      this.$router.push({ path: '/userCenter/changeLink' })
    },
    // 删除选中链接
    removeLink (code) {
      const _that = this
      MessageBox.confirm('确定要删除这条链接吗?').then(action => {
        _that.$store.dispatch('showLoading')
        setTimeout(() => {
          this.$store.dispatch('updateLinks', { code: code }).then(res => {
            if (res && res.status) {
              _that.$store.dispatch('hideLoading')
              _that.getQueryPage(this.pageNum, this.size, false)
              _that.$toast({
                message: '操作成功',
                position: 'middle',
                iconClass: 'mintui mintui-success',
                duration: 1000
              })
            } else {
              _that.$store.dispatch('hideLoading')
            }
          }).catch(() => {
            _that.$store.dispatch('hideLoading')
          })
        }, 500)
      }).catch(() => {
        _that.$store.dispatch('hideLoading')
      })
    }
  }
}
</script>

<style lang="stylus">
@import './linkManage.styl'
</style>
