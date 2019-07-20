import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import keygen from "./crypto";
import bitInt from "big-integer";

Vue.use(Vuex);
const axios = require("axios");

let save2Local = data => {
  Object.keys(data).forEach(key => {
    localStorage.setItem(key, data[key]);
  });
};

export default new Vuex.Store({
  state: {
    username: "",
    password: "",
    user: {
      name: "",
      class_no: "",
      school: "",
      semester: ""
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
    updateAccess(state, data) {
      state.token = data;
    },
    updateRefresh(state, data) {
      state.refresh = data;
    },
    cleanPassword(state) {
      state.password = "";
    },
    sign(state) {
      axios({
        url: "api/v1/sign",
        headers: {
          Authorization: "Bearer " + state.token
        },
        method: "post"
      })
        .then(({ data }) => {
          localStorage.setItem("r_", data.r_);
          localStorage.setItem("e", data.e);
          localStorage.setItem("v", data.v);
        })
        .catch(e => {
          state.snackbar = {
            ...state.snackbar,
            on: true,
            color: "error",
            text: "无法获取匿名凭据：" + e.response,
            bt: "error"
          };
        });
    },
    getInfo(state) {
      axios({
        method: "get",
        url: "/api/v1/info",
        headers: {
          Authorization: "Bearer " + state.token
        }
      })
        .then(({ data }) => {
          state.user = {
            ...data
          };
        })
        .catch(() => {
          // can't retrive info
        });
    },
    to_pes(state) {
      // TODO
      // first, get pubkey : pubkey/<str:semester>/<str:classno>
      axios
        .get(`/api/v1/pubkey/${state.user.semester}/${state.user.class_no}`)
        .then(({ data }) => {
          console.log(data);
          let { x, y, C, z1, z2, uk, r } = keygen(data);
          // then, sign : sign
          axios({
            url: "/api/v1/sign",
            method: "post",
            data: { x, y, C, z1, z2 },
            headers: {
              Authorization: "Bearer " + state.token
            }
          }).then(({ data }) => {
            let { r_, e, v } = data;
            let s = bitInt(r) + bitInt(r_).toString();
            save2Local({
              x,
              y,
              C,
              z1,
              z2,
              uk,
              s,
              e,
              v
            });
          });
        });

      // at last : save to LocalStorage
      // window.location.href = ''
    },
    updateSnackbar(state, data) {
      for (let key in data) {
        Vue.set(state.snackbar, key, data[key]);
      }
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
        .post("/api/token/refresh/", {
          refresh: state.refresh
        })
        .then(({ data, status }) => {
          if (status == 200) {
            state.token = data.access;
            Vue.cookie.set("access_token", state.token, 1);
          }
          state.token_verified = true;
        })
        .catch(() => {
          state.token_verified = false;
        });
    },
    verifyToken(state, fn) {
      axios
        .post("/api/token/verify/", {
          token: state.token
        })
        .then(({ status }) => {
          if (status == 200) {
            state.token_verified = true;
          } else {
            state.token_verified = false;
          }
        })
        .catch(() => {
          state.token_verified = false;
          if (fn) fn();
        });
    },
    getToken(state) {
      axios
        .post("/api/token/", {
          username: state.username,
          password: state.password
        })
        .then(({ data, status }) => {
          if (status == 200) {
            // LGTM
            state.token = data.access;
            state.refresh = data.refresh;
            Vue.cookie.set("access_token", state.token, 1);
            Vue.cookie.set("refresh_token", state.refresh, 1);

            state.snackbar = {
              ...state.snackbar,
              on: true,
              color: "success",
              text: "登录成功",
              bt: "check"
            };
            state.token_verified = true;
            router.push("home");
          }
        })
        .catch(e => {
          if (!e.response) {
            return;
          }
          if (e.response.status == 404) {
            state.snackbar = {
              ...state.snackbar,
              on: true,
              color: "error",
              bt: "info",
              text: "404网络异常"
            };
          } else if (e.response.status == 401) {
            state.snackbar = {
              ...state.snackbar,

              on: true,
              color: "error",
              bt: "info",
              text: "用户名或密码错误"
            };
          }
          state.token_verified = false;
        });
    }
  },
  actions: {}
});
