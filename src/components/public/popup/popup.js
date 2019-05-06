export default {
  name: 'popup',
  props: {
    popupVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    popupClose(e) {
      this.$emit('closePopup', false)
      this.$store.dispatch('lossBox', false)
    }
  }
}
