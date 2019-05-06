<template>
  <div class="user_body">
    <header-view :titles="'推广管理'">
      <div slot="header_Right"
           class="svg-container">
        <p></p>
      </div>
    </header-view>
    <div class="mint-content open_view">
      <!-- <div class="open_navBar">
        <mt-navbar v-model="selected"
                   @click.native="tableIdx(selected)">
          <mt-tab-item class="st_tab_con"
                       v-for="item in items"
                       :key="item.id"
                       :id="item.id">
            {{item.name}}
          </mt-tab-item>
        </mt-navbar>
      </div> -->
      <div class="dis_content">
        <div class="btnLinkrouter">
          <div class="btn_box">
            <p class="app_tuiGuang"
               @click="goAppSpread">APP推广</p>
            <p class="link_tuiGuang"
               @click="goLinkSpread">域名推广</p>
          </div>
        </div>
        <LinkManage ref='warperLoad'
                    :showLoading='showLoading' />
        <!-- <mt-tab-container v-model="selected">
          <mt-tab-container-item id="0">
            <Links :tab="selected"
                   :templateInfo="templateInfo" />
          </mt-tab-container-item>
          <mt-tab-container-item id="1">
            <LinkManage :tab="selected"
                        :showLoding="showLoding" />
          </mt-tab-container-item> -->
        <!-- </mt-tab-container> -->
      </div>
    </div>
    <app-spread :appSpreadFlat='appSpreadFlat'
                :templateInfo="templateInfo"
                @appSpread="appSpread"></app-spread>
    <link-spread :linkSpreadFlat='linkSpreadFlat'
                 :templateInfo='templateInfo'
                 @linkSpread='linkSpread'></link-spread>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import Links from './link/link.vue'
import LinkManage from './linkManage/linkManage.vue'
import AppSpread from './app/app'
import LinkSpread from './link/link'
import { setLocal, getLocal } from '@/utils/storage'
export default {
  name: 'openAccount',
  components: {
    layouts,
    HeaderView,
    Links,
    LinkManage,
    AppSpread,
    LinkSpread
  },
  data () {
    return {
      selectStyle: {
        background: '#F2F2F2'
      },
      templateInfo: [],
      showLoading: true,
      appSpreadFlat: false,
      linkSpreadFlat: false
    }
  },
  created () {
    this.$store.dispatch('getImgCode')
    this.getTemplateInfo()
  },
  mounted () {
    let speradNum = getLocal('spreadNum')
    this.$refs.warperLoad.getQueryPage()
    if (!speradNum && speradNum !== 1 && speradNum !== 2) {
      this.appSpreadFlat = false
      this.linkSpreadFlat = false
      return false
    }
    if (speradNum === 1) {
      this.appSpreadFlat = true
      this.linkSpreadFlat = false
      return
    }
    if (speradNum === 2) {
      this.appSpreadFlat = false
      this.linkSpreadFlat = true
    }
  },
  methods: {
    getTemplateInfo () {
      let sessInfo = getLocal('userInfo')
      this.$store.dispatch('getMyTemplateList', { rebateType: sessInfo.rebateType }).then(res => {
        if (res && res.status) {
          let data = res.data.slice()
          data.forEach(({ templateName, templateCode, rebate }) => {
            if (rebate) {
              let rbt = rebate === 1 ? 0 : 1
              this.templateInfo.push({ templateName, templateCode, rebate: rbt })
            }
          })
        }
      })
    },
    goAppSpread () {
      this.appSpreadFlat = true
      if (this.linkSpreadFlat) {
        this.appSpreadFlat = true
        this.linkSpreadFlat = false
      }
      this.getTemplateInfo()
      setLocal('spreadNum', 1)
    },
    goLinkSpread () {
      this.linkSpreadFlat = true
      if (this.appSpreadFlat) {
        this.appSpreadFlat = false
        this.linkSpreadFlat = true
      }
      this.getTemplateInfo()
      setLocal('spreadNum', 2)
    },
    appSpread (val) {
      this.appSpreadFlat = val
    },
    linkSpread (val) {
      this.linkSpreadFlat = val
    }
  }
}
</script>

<style lang="stylus">
@import 'spreadLink.styl'
</style>
