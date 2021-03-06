import Vue from 'vue'
import { getField, updateField } from 'vuex-map-fields'
import remove from 'lodash/remove'
import SubmissionError from '../error/SubmissionError'

const handleError = (commit, e) => {
  commit(ACTIONS.TOGGLE_LOADING)

  if (e instanceof SubmissionError) {
    commit(ACTIONS.SET_VIOLATIONS, e.errors)
    // eslint-disable-next-line
    commit(ACTIONS.SET_ERROR, e.errors._error);

    return
  }

  // eslint-disable-next-line
  commit(ACTIONS.SET_ERROR, e.message);
}

const ACTIONS = {
  ADD: 'ADD',
  MERCURE_DELETED: 'MERCURE_DELETED',
  MERCURE_MESSAGE: 'MERCURE_MESSAGE',
  MERCURE_OPEN: 'MERCURE_OPEN',
  RESET_LIST: 'RESET_LIST',
  SET_CREATED: 'SET_CREATED',
  SET_DELETED: 'SET_DELETED',
  SET_ERROR: 'SET_ERROR',
  SET_SELECT_ITEMS: 'SET_SELECT_ITEMS',
  SET_TOTAL_ITEMS: 'SET_TOTAL_ITEMS',
  SET_UPDATED: 'SET_UPDATED',
  SET_VIEW: 'SET_VIEW',
  SET_VIOLATIONS: 'SET_VIOLATIONS',
  TOGGLE_LOADING: 'TOGGLE_LOADING'
}

export default function makeCrudModule({
  normalizeRelations = x => x,
  resolveRelations = x => x,
  service
} = {}) {
  return {
    actions: {
      create: ({ commit }, values) => {
        commit(ACTIONS.SET_ERROR, '');
        commit(ACTIONS.TOGGLE_LOADING);

        service
          .create(values)
          .then(response => response.json())
          .then(data => {
            commit(ACTIONS.TOGGLE_LOADING);
            commit(ACTIONS.ADD, data);
            commit(ACTIONS.SET_CREATED, data);
          })
          .catch(e => handleError(commit, e));
      },
      del: ({ commit }, item) => {
        commit(ACTIONS.TOGGLE_LOADING);

        service
          .del(item)
          .then(response => response.json())
          .then(() => {
            commit(ACTIONS.TOGGLE_LOADING);
            commit(ACTIONS.SET_DELETED, item);
          })
          .catch(e => handleError(commit, e));
      },
      fetchAll: ({ commit, state }, params) => {
        if (!service) throw new Error('No service specified!');

        service
          .findAll({ params })
          .then(response => response.json())
          .then(retrieved => {
            commit(
              ACTIONS.SET_TOTAL_ITEMS,
              retrieved['hydra:totalItems']
            );
            commit(ACTIONS.SET_VIEW, retrieved['hydra:view']);

            if (true === state.resetList) {
              commit(ACTIONS.RESET_LIST);
            }

            retrieved['hydra:member'].forEach(item => {
              commit(ACTIONS.ADD, normalizeRelations(item));
            });
          })
          .catch(e => handleError(commit, e));
      },
      fetchSelectItems: (
        { commit },
        { params = { properties: ['@id', 'name'] } } = {}
      ) => {
        commit(ACTIONS.TOGGLE_LOADING);

        if (!service) throw new Error('No service specified!');

        service
          .findAll({ params })
          .then(response => response.json())
          .then(retrieved => {
            commit(
              ACTIONS.SET_SELECT_ITEMS,
              retrieved['hydra:member']
            );
          })
          .catch(e => handleError(commit, e));
      },
      load: ({ commit }, id) => {
        if (!service) throw new Error('No service specified!');

        commit(ACTIONS.TOGGLE_LOADING);
        service
          .find(id)
          .then(response => response.json())
          .then(item => {
            commit(ACTIONS.TOGGLE_LOADING);
            commit(ACTIONS.ADD, normalizeRelations(item));
          })
          .catch(e => handleError(commit, e));
      },
      update: ({ commit }, item) => {
        commit(ACTIONS.SET_ERROR, '');
        commit(ACTIONS.TOGGLE_LOADING);

        service
          .update(item)
          .then(response => response.json())
          .then(data => {
            commit(ACTIONS.TOGGLE_LOADING);
            commit(ACTIONS.SET_UPDATED, data);
          })
          .catch(e => handleError(commit, e));
      }
    },
    getters: {
      find: state => id => {
        return resolveRelations(state.byId[id]);
      },
      getField,
      list: (state, getters) => {
        return state.allIds.map(id => getters.find(id));
      }
    },
    mutations: {
      updateField,
      [ACTIONS.ADD]: (state, item) => {
        Vue.set(state.byId, item['@id'], item)
        if (state.allIds.includes(item['@id'])) return
        state.allIds.push(item['@id'])
      },
      [ACTIONS.RESET_LIST]: state => {
        Object.assign(state, {
          allIds: [],
          byId: {},
          resetList: false
        })
      },
      [ACTIONS.SET_CREATED]: (state, created) => {
        Object.assign(state, { created });
      },
      [ACTIONS.SET_DELETED]: (state, deleted) => {
        if (!state.allIds.includes(deleted['@id'])) return;
        Object.assign(state, {
          allIds: remove(state.allIds, item => item['@id'] === deleted['@id']),
          byId: remove(state.byId, id => id === deleted['@id']),
          deleted
        })
      },
      [ACTIONS.SET_ERROR]: (state, error) => {
        Object.assign(state, { error, isLoading: false });
      },
      [ACTIONS.SET_SELECT_ITEMS]: (state, selectItems) => {
        Object.assign(state, {
          error: '',
          isLoading: false,
          selectItems
        })
      },
      [ACTIONS.SET_TOTAL_ITEMS]: (state, totalItems) => {
        Object.assign(state, { totalItems })
      },
      [ACTIONS.SET_UPDATED]: (state, updated) => {
        Object.assign(state, {
          byId: {
            [updated['@id']]: updated
          },
          updated
        })
      },
      [ACTIONS.SET_VIEW]: (state, view) => {
        Object.assign(state, { view })
      },
      [ACTIONS.SET_VIOLATIONS]: (state, violations) => {
        Object.assign(state, { violations })
      },
      [ACTIONS.TOGGLE_LOADING]: state => {
        Object.assign(state, { error: '', isLoading: !state.isLoading })
      }
    },
    namespaced: true,
    state: {
      allIds: [],
      byId: {},
      created: null,
      deleted: null,
      error: '',
      isLoading: false,
      resetList: false,
      selectItems: null,
      totalItems: 0,
      updated: null,
      view: null,
      violations: null
    }
  }
}
