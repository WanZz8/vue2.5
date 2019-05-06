import Vue from 'vue'
import {
  Popup,
  Navbar,
  TabItem,
  Cell,
  Picker,
  Loadmore,
  Switch
} from 'mint-ui'
import {
  Swipe,
  SwipeItem
} from 'vue-swipe'

// mint-ui
Vue.component(Popup.name, Popup)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Cell.name, Cell)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Picker.name, Picker)
Vue.component(Switch.name, Switch)
// vue-swipe
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
