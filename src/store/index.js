// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import notifications from './modules/notifications'
import tacheService from './../services/tache'
import makeCrudModule from './modules/crud'
import security from './security'
import dashboard from './dashboard'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    notifications,
    security,
    dashboard
  },
  strict: process.env.NODE_ENV !== 'production'
})

store.registerModule(
  'tache',
  makeCrudModule({
    service: tacheService
  })
)

export default store
