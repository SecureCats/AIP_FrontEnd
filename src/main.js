import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
var VueCookie = require("vue-cookie");
Vue.use(VueCookie);
new Vue({
  router,
  store,
  VueCookie,
  render: h => h(App)
}).$mount("#app");
