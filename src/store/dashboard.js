import { set, toggle } from './../utils/vuex'

export default {
  namespaced: true,
  state: {
    drawer: true,
    color: 'success',
    image: 'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg'
  },
  getters: {
    drawer: state => state.drawer
  },
  mutations: {
    setDrawer: set('drawer'),
    setImage: set('image'),
    setColor: set('color'),
    toggleDrawer: toggle('drawer'),
  }
}
