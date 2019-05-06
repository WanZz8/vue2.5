import VueRouter from 'vue-router'
import routes from './routes'
import {
  getNoLocal
} from '@/utils/storage'
import {
  MessageBox
} from 'mint-ui'
const Router = new VueRouter({
  // mode: 'history',
  routes
})

// 路由白名单
const whiteList = [
  '/power',
  '/home',
  '/live',
  '/market',
  '/recharge',
  '/service',
  '/notice',
  '/activityRule'
]
Router.beforeEach((to, from, next) => {
  if (getNoLocal('token')) {
    if (to.path === '/power/login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    const p = to.path.split('/')
    if (whiteList.indexOf(to.path) > -1 ||
      whiteList.indexOf(`/${p[p.length - 2]}`) > -1 ||
      whiteList.indexOf(`/${p[p.length - 3]}`) > -1) {
      next()
    } else {
      MessageBox.confirm('您还未登录,去登录?').then(() => {
        next('/power/login')
      }).catch(() => {
        next(from.path)
      })
    }
  }
})
Router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  MessageBox.close()
})
export default Router
