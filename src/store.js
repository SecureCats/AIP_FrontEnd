import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const axios = require("axios");
export default new Vuex.Store({
  state: {
    username: "",
    password: "",
    user: {},
    token: "",
    refresh: "",
    token_verified: false,
    snackbar: {
      on: false,
      timeout: 6000,
      color: "",
      text: "",
      bt: ""
    }
  },
  getters: {
    renderSnackbar(state) {
      return state.snackbar;
    }
  },
  mutations: {
    toggleSnackbar(state) {
      state.snackbar = {
        ...state.snackbar,
        on: !state.snackbar.on
      };
    },
    updateUsername(state, username) {
      state.username = username;
    },
    updatePassword(state, password) {
      state.password = password;
    },
    updateToken(state) {},
    verifyToken(state) {},
    getToken(state) {
      axios
        .post("/api/token/", {
          username: state.username,
          password: state.password
        })
        .then(({ data, status }) => {
          if (status == 200) {
            // LGTM
            state.token = data.token;
            state.snackbar = {
              ...state.snackbar,
              on: true,
              color: "success",
              text: "登录成功",
              bt: "check"
            };
            // TODO 增加跳转
            this.$router.push("/home");
          }
        })
        .catch(({ response }) => {
          if (response.status == 404) {
            state.snackbar = {
              ...state.snackbar,
              ...{
                on: true,
                color: "error",
                bt: "info",
                text: "404网络异常"
              }
            };
          } else if (response.status == 401) {
            state.snackbar = {
              ...state.snackbar,
              ...{
                on: true,
                color: "error",
                bt: "info",
                text: "用户名或密码错误"
              }
            };
          }
        });
    }
  },
  actions: {}
});
