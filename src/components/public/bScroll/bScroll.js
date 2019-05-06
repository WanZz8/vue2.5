/**
 * scrollbar: true,
 * scrollbarFade: true,
 * pullDownRefresh: true,
 * pullUpLoad: true,
 * pullDownRefreshObj: {
 *  threshold: 50,
 *  stop: 40
 * },
 * pullUpLoadObj: true,
 * wrapperHeight: 0,
 * courrentPage: 0
 */
import BScroll from 'better-scroll'
import {
  getRect
} from '@/utils/dom'

const COMPONENT_NAME = 'scroll'
const DIRECTION_V = 'vertical'

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: [Object, Array],
      default: function () {
        return []
      }
    },
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    listenScrollEnd: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: DIRECTION_V
    },
    scrollbar: {
      type: null,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    startY: {
      type: Number,
      default: 0
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    },
    mouseWheel: {
      type: Boolean,
      default: false
    },
    bounce: {
      default: true
    },
    Freestop: {
      type: null,
      default: 40
    },
    zoom: {
      default: false
    },
    /* 横向滚动需要 */
    childrenClass: {
      type: String,
      default: ''
    },
    /**
     * 用于重新渲染
     */
    isShowBox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      beforePullDown: true,
      isRebounding: false,
      isPullingDown: false,
      isPullUpLoad: false,
      pullUpDirty: true,
      pullDownStyle: '',
      pullDownTextLoad: '下拉刷新',
      pullDownClass: 'rotateLeft'
    }
  },
  computed: {
    pullUpTxt() {
      const moreTxt =
        (this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more) ||
        '加载完成'

      const noMoreTxt =
        (this.pullUpLoad &&
          this.pullUpLoad.txt &&
          this.pullUpLoad.txt.noMore) ||
        '已经到底了'

      return this.pullUpDirty ? moreTxt : noMoreTxt
    },
    refreshTxt() {
      return (this.pullDownRefresh && this.pullDownRefresh.txt) || '刷新成功'
    }
  },
  created() {
    this.pullDownInitTop = -50
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
      if (this.scrollX) {
        this.scrollContentX()
        this.initScroll()
      }
    }, 20)
  },
  destroyed() {
    this.$refs.scroll && this.$refs.scroll.destroy()
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
        this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper)
          .height + 1}px`
      }

      const options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.scrollX,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll,
        mouseWheel: this.mouseWheel,
        bounce: this.bounce,
        zoom: this.zoom
      }

      this.scroll = new BScroll(this.$refs.wrapper, options)

      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }

      if (this.listenScrollEnd) {
        this.scroll.on('scrollEnd', pos => {
          this.$emit('scroll-end', pos)
        })
      }

      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })

        this.scroll.on('scrollStart', () => {
          this.$emit('scroll-start')
        })
      }

      if (this.pullDownRefresh) {
        this._initPullDownRefresh()
      }

      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    scrollContentX() {
      const conList = document.querySelector('.scroll-content')
      const aSpan = conList.querySelectorAll(this.childrenClass)
      let conWidth = 0
      for (let i = 0; i < aSpan.length; i++) {
        // aSpan[i].style.paddingLeft = '24px'
        // aSpan[i].style.paddingRight = '24px'
        conWidth += aSpan[i].offsetWidth + 1
      }
      conList.style.width = conWidth + 'px'
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    clickItem(e, item) {
      this.$emit('click', item)
    },
    destroy() {
      this.scroll.destroy()
    },
    forceUpdate(dirty) {
      if (this.pullDownRefresh && this.isPullingDown) {
        this.isPullingDown = false
        this._reboundPullDown().then(() => {
          this._afterPullDown()
        })
      } else if (this.pullUpLoad && this.isPullUpLoad) {
        this.isPullUpLoad = false
        this.scroll.finishPullUp()
        this.pullUpDirty = dirty
        this.refresh()
      } else {
        this.refresh()
      }
    },
    _initPullDownRefresh() {
      this.scroll.on('pullingDown', () => {
        this.beforePullDown = false
        this.isPullingDown = true
        this.$emit('pullingDown')
      })

      this.scroll.on('scroll', pos => {
        if (!this.pullDownRefresh) {
          return
        }
        if (this.beforePullDown) {
          this.pullDownStyle = `top:${Math.min(
            pos.y + this.pullDownInitTop,
            10
          )}px`
          if (pos.y >= this.pullDownRefresh.threshold) {
            this.pullDownClass = 'rotateRight'
            this.pullDownTextLoad = '释放刷新'
          } else {
            this.pullDownClass = 'rotateLeft'
            this.pullDownTextLoad = '下拉刷新'
          }
        }
        if (this.isRebounding) {
          this.pullDownStyle = `top:${10 - (this.Freestop - pos.y)}px`
          // console.log(this.pullDownStyle)
          // this.pullDownRefresh.stop
        }
      })
    },
    _initPullUpLoad() {
      this.scroll.on('pullingUp', () => {
        this.isPullUpLoad = true
        this.$emit('pullingUp')
      })
    },
    _reboundPullDown() {
      const {
        stopTime = 600
      } = this.pullDownRefresh
      return new Promise(resolve => {
        setTimeout(() => {
          this.isRebounding = true
          this.scroll.finishPullDown()
          resolve()
        }, stopTime)
      })
    },
    _afterPullDown() {
      setTimeout(() => {
        this.pullDownStyle = `top:${this.pullDownInitTop}px`
        this.beforePullDown = true
        this.isRebounding = false
        this.refresh()
      }, this.scroll.options.bounceTime)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.forceUpdate(true)
      }, this.refreshDelay)
    },
    // 用于弹出或使用tab的时候初始化better-scroll滚动
    isShowBox: function () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
      if (this.scrollX) {
        this.scrollContentX()
      }
    }
  }
}
