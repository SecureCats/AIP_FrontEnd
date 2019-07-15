import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "111"
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
    }
  },
  actions: {}
});
