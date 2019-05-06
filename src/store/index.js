import Vue from 'vue'
import Vuex from 'vuex'

import common from './common'
import user from './user'
import userMsg from './userMsg'
import deposit from './deposit'
import market from './market'
import trade from './trade'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    userMsg,
    deposit,
    market,
    trade
  }
})
