// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import makeCrudModule from './crud'
import notifications from './modules/notifications'
import userService from './../services/user'
import jeuxdelavietacheService from './../services/jeuxdelavietache'
import jeuxdelaviecategoryService from '../services/jeuxdelaviecategory'
import jeuxdelavietachefaiteService from '../services/jeuxdelavietachefaite'
import security from './security'
import dashboard from './dashboard'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    notifications,
    security,
    dashboard,
    jeuxdelavietache: makeCrudModule({
      service: jeuxdelavietacheService
    }),
    user: makeCrudModule({
      service: userService
    }),
    jeuxdelaviecategory: makeCrudModule({
      service: jeuxdelaviecategoryService
    }),
    jeuxdelavietachefaite: makeCrudModule({
      service: jeuxdelavietachefaiteService
    })
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
