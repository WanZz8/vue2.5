import noData from '@/components/public/noData/noData'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
let moment = require('moment')

export default {
  name: 'depositRecord',
  components: {
    noData
  },
  props: {
    tab: {
      type: String,
      default: ''
    },
    pageNum: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 5
    }
  },
  watch: {
    tab() {
      this.conHeight()
    }
  },
  data() {
    return {
      datas: [],
      // 可以进行上拉
      allLoaded: false,
      // 是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0,
      courrentPage: 0,
      sell: 'success',
      footTips: false,
      footText: '',
      pagaVal: 1
    }
  },
  mounted() {
    this.conHeight()
  },
  activated() {
    // this.datas = this.record
  },
  computed: {
    ...mapGetters(['fundRecord', 'record', 'recordTotal']),
    footShow() {
      let len = this.recordTotal / this.size
      len = Math.ceil(len)
      return this.pagaVal === len
    },
    footTextVal() {
      let len = this.recordTotal / this.size
      len = Math.ceil(len)
      if (this.pagaVal === len) {
        setTimeout(() => {
          this.footText = '没有更多数据了'
        }, 3000)
      }
      return this.footText
    }
  },
  methods: {
    // 充值记录
    getRecord(num, size, refresh) {
      this.$store.dispatch('record', {
        pageNum: num,
        pageSize: size,
        status: 2,
        refresh: refresh
      })
    },
    // 下拉刷新
    loadTop() {
      this.loadFrist()
    },
    // 上拉加载
    loadBottom() {
      this.pagaVal = this.pagaVal + 1
      let len = this.recordTotal / this.size
      len = Math.ceil(len)
      if (this.pagaVal <= len) {
        this.loadMore(this.pagaVal)
        // if (this.pagaVal === len) {
        //   setTimeout(() => {
        //     this.footText = '没有更多数据了'
        //   }, 2000)
        // }
      }
    },
    // 下来刷新加载
    loadFrist() {
      setTimeout(() => {
        this.allLoaded = false // 可以进行上拉
        this.size = 5
        this.getRecord(this.pageNum, this.size, false)
        this.$refs.loadmoreOne.onTopLoaded()
        console.log('刷新成功')
      }, 2000)
    },
    // 加载更多
    loadMore(pageNum) {
      setTimeout(() => {
        this.getRecord(pageNum, this.size, true)
        this.$refs.loadmoreOne.onBottomLoaded()
      }, 2000)
    },
    conHeight() {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.wrapper_entrust.getBoundingClientRect().top
    },
    forMatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
