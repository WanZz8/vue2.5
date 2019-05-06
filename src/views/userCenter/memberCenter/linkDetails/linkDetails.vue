<template>
  <div class="user_body">
    <header-view :titles="'注册人数'">
      <router-link slot="header_Right" to='' class="svg-container">
        <p></p>
      </router-link>
    </header-view>
    <div class="mint-content linkDetails_view">
      <div class="links_d1">
        <p>
          <span>{{name}}</span>
          <span>注册查看</span>
        </p>
      </div>
      <div class="links_d2">
        <div class="links_d2_header">
          <span class="links_d2_p1">时间</span>
          <span class="links_d2_p2">账号</span>
        </div>
        <div class="list_content">
          <div
            class="links_d2_content"
            v-for="(item,index) in inviteList"
            :key="'idx'+index"
          >
          <span class="links_d2_p3">
            {{item.createTime}}
          </span>
            <span class="links_d2_p4">
            {{item.userPhone}}
          </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from '@/components/layout/header'
import noData from '@/components/public/noData/noData'
import { mapGetters } from 'vuex'
export default {
  name: 'linkDetails',
  components: {
    HeaderView,
    noData
  },
  data() {
    return {
      name: '',
      data: []
    }
  },
  created() {
    this.getAllInvite()
    this.name = this.$route.query.code
  },
  computed: {
    ...mapGetters(['inviteList', 'inviteTotal', 'loading'])
  },
  methods: {
    getAllInvite() {
      const code = this.$route.query.code
      const data = {
        pageNo: 1,
        pageSize: 5000,
        inviteUserUuid: code
      }
      this.$store.dispatch('queryAllInvite', data)
    }

  }
}
</script>

<style lang="stylus">
  @import './linkDetails.styl'
</style>
