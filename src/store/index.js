// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

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
    user: makeCrudModule({
      service: userService
    }),
    jeuxdelavietache: makeCrudModule({
      service: jeuxdelavietacheService
    }),
    jeuxdelaviecategory: makeCrudModule({
      service: jeuxdelaviecategoryService
    }),
    jeuxdelavietachefaite: makeCrudModule({
      service: jeuxdelavietachefaiteService
    })
  },
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== 'production'
})

export default store
