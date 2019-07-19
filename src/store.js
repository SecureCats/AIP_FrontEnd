import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const axios = require("axios");
export default new Vuex.Store({
  state: {
    username: "",
    password: "",
    user: {
      name: "",
      class_no: "",
      school: "",
    },
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
    sign(state) {
      axios.get('/api/v1/sign')
        .then(({
          data
        }) => {
          localStorage.setItem("r_", data.r_)
          localStorage.setItem("e", data.e)
          localStorage.setItem("v", data.v)
        }).catch(e => {
          state.snackbar = {
            ...state.snackbar,
            on: true,
            color: "error",
            text: "无法获取匿名凭据：" + e.response.data,
            bt: "error"
          };
        })
    },
    get_info(state) {
      axios.get(
        '/api/v1/info',
        headers = {
          Authorization: 'Bearer ' + state.token
        }
      ).then(({
        data
      }) => {
        state.user = {
          ...state.user,
          ...data
        }
      }).catch(e => {
        console.log(e)
        console.log('无法获取学生信息')
      })
    },
    to_pes(state) {
      // TODO
      console.log(state.user)
      alert("go to pes")
      // window.location.href = ''
    },
    updateSnackbar(state, data) {
      state.snackbar = {
        ...state.snackbar,
        ...data
      };
    },
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
    updateToken(state) {
      axios
        .post("/api/token/refresh", {
          refresh: state.refresh
        })
        .then(({
          data,
          status
        }) => {
          if (status == 200) {
            state.token = data.access;
          }
          state.token_verified = true;
        })
        .catch(e => {
          console.log(e);
          state.token_verified = false;
        });
    },
    verifyToken(state) {
      axios
        .post("/api/token/verify/", {
          token: state.token
        })
        .then(({
          status
        }) => {
          if (status == 200) {
            state.token_verified = true;
          } else {
            state.token_verified = false;
          }
        })
        .catch(error => {
          console.log(error);
          state.token_verified = false;
        });
    },
    getToken(state) {
      axios
        .post("/api/token/", {
          username: state.username,
          password: state.password
        })
        .then(({
          data,
          status
        }) => {
          if (status == 200) {
            // LGTM
            state.token = data.access;
            state.refresh = data.refresh;
            state.snackbar = {
              ...state.snackbar,
              on: true,
              color: "success",
              text: "登录成功",
              bt: "check"
            };
            state.token_verified = true;
          }
        })
        .catch(({
          response
        }) => {
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
          state.token_verified = false;
        });
    }
  },
  actions: {}
});