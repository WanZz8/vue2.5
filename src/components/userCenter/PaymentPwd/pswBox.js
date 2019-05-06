/**
 * 交易密码弹出组件
 * 使用方法：接收参数:isTrue,参数类型为Boolean,true为显示,false为隐藏
 * 该组件发送监听参数:backFnc,参数类型为Object,分别为组件状态以及组件执行后的数据{isTrue:'',password:''}
 */
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]
// let sendFlag = true // 防止重复发送密码
export default {
  name: 'pswBox',
  props: {
    isTrue: {
      type: Boolean,
      default: false
    },
    tradePwd: {
      type: [String, Number, Array]
    }
  },
  data() {
    return {
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      keys: keys(),
      password: [],
      pswDatas: {}
    }
  },
  watch: {
    isTrue(n, o) {
      if (n && !!this.tradePwd && this.tradePwd !== '') {
        let copyPwd = (this.tradePwd + '').split('').map(Number).reverse()
        this.password = this.password.concat(copyPwd)
      }
    }
  },
  methods: {
    backHandle() {
      this.clearPasswordHandle() // 返回时清除password
      this.pswDatas.isTrue = false
      this.$emit('backFnc', this.pswDatas) // 返回上级
    },
    keyUpHandle(e) {
      // if (e.target.dataset.item === 'clear') {
      //   this.pswDatas = {
      //     isTrue: false,
      //     password: []
      //   }
      //   this.password = []
      //   this.$emit('backFnc', this.pswDatas)
      // } else {
      let text = e.currentTarget.innerText
      let len = this.password.length
      if (!text || len >= 10) return
      if (this.password[0] === '.' || this.getSameNum('.', this.password) > 1) return
      this.password.push(text)
      // this.ajaxData()
    },
    delHandle() {
      if (this.password.length <= 0) return false
      this.password.pop()
    },
    confirm() {
      if (this.password[this.password.length - 1] === '.' || this.password[0] === '.' || this.password.length === 0) {
        return false
      }
      let pswData = this.password.join(' ').replace(/\s/g, '')
      this.pswDatas = {
        isTrue: true,
        password: pswData
      }
      this.$emit('backFnc', this.pswDatas)
    },
    getSameNum(val, arr) {
      let processArr = arr.filter(function (value) {
        return value === val
      })
      return processArr.length
    },
    clearPasswordHandle: function () {
      this.password = []
    }
  }
}
