import Vue from "vue";
import Vuex from "vuex";
// import router from "./router";
// import keygen from "./crypto";
// import bitInt from "big-integer";
import state from "./state";
Vue.use(Vuex);
// const axios = require("axios");

export default new Vuex.Store(state);
