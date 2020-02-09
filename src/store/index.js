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
import notifications from './modules/notifications';
import tacheService from './../services/tache'
import makeCrudModule from './modules/crud'

Vue.use(Vuex)

// Create a new store
const store = new Vuex.Store({
  actions,
  getters,
  modules,
  mutations,
  state
})

store.registerModule(
  'tache',
  makeCrudModule({
    service: tacheService
  })
);

export default store
