import Vue from 'vue'
import App from './App'
// vue路由组件
import VueRouter from 'vue-router'
// vue状态管理
import Vuex from 'vuex'
// 导入路由文件
import router from './router'
// 导入状态树文件
import store from './store'
// 滚动
import VueScroller from 'vue-scroller'
// 300秒延迟
import FastClick from 'fastclick'
// 剪贴版
import VueClipboard from 'vue-clipboard2'
// css单位转换(目前不能转行间样式,如果无特殊要求,务必把样式分开写,设计图乘2)
import 'lib-flexible/flexible'
// svg图标
import './assets/icons'
// 按需组件
import './components/public/uiElement'
// 引入mint UI
import MintUI from 'mint-ui'
// 全局样式
import './assets/styles/common.styl'
// 颜色主题库
import './assets/styles/theme/theme.styl'
// 全局引入
Vue.use(VueClipboard)
Vue.use(VueRouter)
Vue.use(MintUI)
Vue.use(Vuex)
Vue.use(VueScroller)
// 解决移动端点击300秒延迟
/* eslint-disable */
FastClick.attach(document.body)
FastClick.prototype.focus = function (targetElement) {
  var length
  if (
    targetElement.setSelectionRange &&
    targetElement.type.indexOf('date') !== 0 &&
    targetElement.type !== 'time' &&
    targetElement.type !== 'month'
  ) {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
  // render: h => h(App),
  // mounted () {
  //   document.dispatchEvent(new Event('render-event'))
  // }
})
