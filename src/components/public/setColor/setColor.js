import {
  mapGetters
} from 'vuex'
import baColor from '@/config/basic.config'

export default {
  data() {
    return {
      changColor: false,
      childrenClass: '.color-cycle',
      colorData: baColor.colorList
    }
  },
  watch: {
    changColor(newData, oldData) {
      this.isShowBox = newData
    }
  },
  computed: {
    ...mapGetters(['skins'])
  },
  methods: {
    changeSkin(val) {
      this.changColor = false
      this.$store.dispatch('changeColor', 'theme-' + val)
    },
    closeOnClickModal() {
      this.changColor = false
    }
  }
}
