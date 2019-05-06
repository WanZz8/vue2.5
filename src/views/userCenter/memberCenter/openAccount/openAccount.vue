<template>
  <div class="user_body">
    <header-view :titles="'开户'">
      <router-link slot="header_Right"
                   to=''
                   class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content open_view">
      <div class="dis_content">
        <Accurate :templateInfo="templateInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import layouts from '@/components/layout/contentView'
import HeaderView from '@/components/layout/header'
import Accurate from './accurate/accurate.vue'
import { getLocal } from '@/utils/storage'
export default {
  name: 'openAccount',
  components: {
    layouts,
    HeaderView,
    Accurate
  },
  data () {
    return {
      selectStyle: {
        background: '#F2F2F2'
      },
      templateInfo: [],
      showLoding: true
    }
  },
  created () {
    this.$store.dispatch('getImgCode')
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
  }
}
</script>

<style lang="stylus" scoped>
@import 'openAccount.styl'
</style>
