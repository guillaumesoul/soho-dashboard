/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'
import notifications from './modules/notifications'
import tacheService from './../services/tache'
import makeCrudModule from './modules/crud'
import security from './security'
import crud from './modules/crud'
import notification from './modules/notifications'
import mutationmod from './modules/app/mutations'
import statemod from './modules/app/state'
//import security from './security'

Vue.use(Vuex)

// Create a new store
/*const store = new Vuex.Store({
  actions,
  getters,
  modules,
  mutations,
  state
})*/

const store = new Vuex.Store({
  modules: {
    notifications,
    security,
    crud,
    notification,
    mutationmod,
    statemod,
  },
  strict: process.env.NODE_ENV !== 'production'
});

store.registerModule(
  'tache',
  makeCrudModule({
    service: tacheService
  })
);

/*store.registerModule(
  'notifications',
  notifications
);*/

export default store
