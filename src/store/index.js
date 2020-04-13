// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import makeCrudModule from './crud'
import notifications from './modules/notifications'
import jeuxdelavietacheService from './../services/jeuxdelavietache'
import jeuxdelaviecategoryService from '../services/jeuxdelaviecategory'
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
  'jeuxdelavietache',
  makeCrudModule({
    service: jeuxdelavietacheService
  })
)
store.registerModule(
  'jeuxdelaviecategory',
  makeCrudModule({
    service: jeuxdelaviecategoryService
  })
)

export default store
