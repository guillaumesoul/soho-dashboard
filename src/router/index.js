/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'
import store from '../store'

// Routes
import security from './security'
import paths from './paths'
import jeuxdelavietacheRoutes from './jeuxdelavietache'
import jeuxdelaviecategoryRoutes from './jeuxdelaviecategory'
import jeuxdelavietachefaiteRoutes from './jeuxdelavietachefaite'

function route (path, view, name) {
  return {
    name: name || view,
    path,
    component: (resovle) => import(
      `@/views/${view}.vue`
    ).then(resovle)
  }
}

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name)).concat([
    { path: '*', redirect: '/' },
    jeuxdelavietacheRoutes,
    jeuxdelaviecategoryRoutes,
    jeuxdelavietachefaiteRoutes,
    security
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isAuthenticated && to.name != 'login') {
    next('/login')
  } else {
    next()
  }
})

Vue.use(Meta)

export default router
