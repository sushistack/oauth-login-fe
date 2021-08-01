import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import account from './modules/account'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  plugins: [ createPersistedState({ storage: window.sessionStorage }) ],
  modules: { account },
  strict: debug
})
