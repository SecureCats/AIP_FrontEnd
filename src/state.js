import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import { keygen } from "./crypto";
import bigInt from "big-integer";

Vue.use(Vuex);
const axios = require("axios");

export default {
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
      // first, get pubkey : pubkey/<str:semester>/<str:classno>
      axios
        .get(`/api/v1/pubkey/${state.user.semester}/${state.user.class_no}`)
        .then(({ data }) => {
          let { a, b, c, g, h, n } = data;
          let { x, y, C, z1, z2, uk, r } = keygen(data);
          // then, sign : sign
          axios({
            url: "/api/v1/sign",
            method: "post",
            data: {
              x,
              y,
              C,
              z1,
              z2
            },
            headers: {
              Authorization: "Bearer " + state.token
            }
          })
            .then(({ data }) => {
              let { r_, e, v } = data;
              let s = bigInt(r)
                .add(bigInt(r_))
                .toString();
              localStorage.setItem(
                "seed",
                JSON.stringify({
                  pubkey: {
                    a,
                    b,
                    c,
                    g,
                    h,
                    n
                  },
                  signature: {
                    e,
                    s,
                    v
                  },
                  uk
                })
              );
            })
            .catch(e => {
              state.snackbar = {
                ...state.snackbar,
                on: true,
                bt: "info",
                color: "blue",
                text: "凭证已经获取"
              };
              console.log(e.response.data);
            });
        });

      // at last : save to LocalStorage
      window.open(
        `https://pes.fates.felinae98.cn/class/${state.user.class_no}/semester/${state.user.semester}`
      );
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
    updateToken(state, fn) {
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
          if (fn) fn();
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
};
