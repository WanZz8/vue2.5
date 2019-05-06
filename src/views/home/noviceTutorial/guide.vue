<template>
  <div v-show="num!==0">
    <div class="novice_All">
      <novice-one v-show="num==1"
                  @tradeLook="tradeLook"
                  :template="template"
      ></novice-one>
      <novice-two v-show="num==2"
                  @tradeLook="tradeLook"
                  :template="template"
      ></novice-two>
      <novice-three v-show="num==3"
                    @tradeLook="tradeLook"></novice-three>
      <novice-four v-show="num==4"
                   @tradeLook="tradeLook"></novice-four>
      <novice-five v-show="num==5"
                   @tradeLook="tradeLook"></novice-five>
      <novice-six v-show="num==6"
                  @tradeLook="tradeLook"></novice-six>
    </div>
  </div>
</template>

<script>
import NoviceOne from './guide1'
import NoviceTwo from './guide2'
import NoviceThree from './guide3'
import NoviceFour from './guide4'
import NoviceFive from './guide5'
import NoviceSix from './guide6'

import { setLocal } from '@/utils/storage'
import Hub from '@/utils/hub'
import { mapGetters } from 'vuex'
export default {
  components: {
    NoviceOne,
    NoviceTwo,
    NoviceThree,
    NoviceFour,
    NoviceFive,
    NoviceSix
  },
  data () {
    return {
      num: 0,
      template: []
    }
  },
  created () {
    Hub.$on('guide', v => {
      this.num = v
      this.template = this.templates
    })
  },
  computed: {
    ...mapGetters(['templates'])
  },
  methods: {
    tradeLook (val) {
      if (val === 0) {
        setLocal('isFirstLogin', '0')
      }
      this.num = val
      this.template = this.templates
    }
  }
}
</script>

<style lang="stylus">
.novice_All
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  z-index 99999
  background #fff
</style>
