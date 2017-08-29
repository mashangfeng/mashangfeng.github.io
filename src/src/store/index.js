import Vuex from 'vuex'
import Vue from 'vue'
import getters from './getter'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    restaurants: [],
    isScroll: false,
    maxOffSet: 3,
    rstCategoriesId: null,
    isSpecShow: false
  },
  getters,
  mutations,
  actions
})
