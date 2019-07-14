<template>
  <!-- <v-flex fluid fill-height> -->
  <div>
    <v-layout row>
      <v-flex xs8 id="grey-color" style="height:100vh;">
        <v-layout column justify-space-between fill-height>
          <v-card flat color="#f5f6f8">
            <v-container>
              <v-layout align-center>
                <v-flex>
                  <v-icon class="icon-large">school</v-icon>
                  <span class="font-weight-bold large title-font"
                    >&nbsp;&nbsp;&nbsp;教务系统统一身份认证</span
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>

          <v-container fill-height>
            <v-layout fill-height align-center>
              <v-flex fill-height>
                <div id="my-pic"></div>
              </v-flex>
            </v-layout>
          </v-container>

          <v-card flat color="#f5f6f8">
            <v-container>
              <v-layout align-center>
                <v-flex>
                  <v-flex
                    >&copy; {{ new Date().getFullYear() }} 高校教务处</v-flex
                  >
                  <v-spacer></v-spacer>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-layout>
      </v-flex>
      <v-flex xs4 style="background:white;height:100vh;">
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <v-card flat color="white">
                <v-card-title class="super-large font-weight-bold title-font"
                  >登录</v-card-title
                >
                <v-card-text>
                  <v-form v-model="valid">
                    <template v-for="(v, index) in inputs">
                      <v-flex
                        :key="index + 'i'"
                        mt-3
                        class="font-weight-bold"
                        >{{ v.label + (v.rq ? "*" : "") }}</v-flex
                      >
                      <v-text-field
                        mt-0
                        :key="index + 'v'"
                        :placeholder="v.ph"
                        :type="v.tp"
                        :rules="v.rl"
                        v-model="v.vl"
                        background-color="#f5f6f8"
                        required
                      ></v-text-field>
                    </template>

                    <v-flex mt-5></v-flex>
                    <v-btn
                      depressed
                      round
                      block
                      dark
                      color="info"
                      class="font-weight-bold medium"
                      @click="submit"
                      >登录</v-btn
                    >
                  </v-form>
                </v-card-text>
                <v-snackbar
                  v-model="snackbar.on"
                  :timeout="snackbar.timeout"
                  top="true"
                  :color="snackbar.color"
                >
                  {{ snackbar.text }}
                  <v-btn flat @click="snackbar.on = false">关闭</v-btn>
                </v-snackbar>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const axios = require("axios");

function trans(params) {
  let length = 0;
  for (let key in params) {
    length = params[key].length;
    break;
  }
  let a = new Array(length);
  for (let i = 0; i < a.length; i++) {
    a[i] = new Object();
    for (let key in params) {
      a[i][key] = params[key][i];
    }
  }
  return a;
}

export default {
  data() {
    return {
      snackbar: {
        on: false,
        timeout: 6000,
        color: "",
        text: ""
      },
      valid: true,
      token: "",
      inputs: trans({
        label: ["学工号", "密码"],
        ph: [
          "Please input your student ID.",
          "Your credentials are kept private."
        ],
        rq: [true, true],
        tp: ["input", "password"],
        vl: ["", ""],
        rl: [
          [
            v => !!v || "Username is required",
            v => (v && v.length <= 30) || "Name must be less than 30 characters"
          ],
          [v => !!v || "Password is required"]
        ]
      }),

      myImage: require("@/assets/AIP_login_background.png")
    };
  },
  methods: {
    update_snackbar(data) {
      for (let key in data) {
        this.$set(this.snackbar, key, data[key]);
      }
    },
    submit: function() {
      if (!this.$data.valid) return;
      axios
        .post("/api/token/", {
          username: this.$data.inputs[0].vl,
          password: this.$data.inputs[1].vl
        })
        .then(({ data, status }) => {
          if (status == 200) {
            // LGTM
            this.token = data.token;
            this.update_snackbar({
              on: true,
              color: "success",
              text: "登陆成功"
            });
          } else if (status == 401) {
            this.update_snackbar({
              on: true,
              color: "error",
              text: "用户名或密码错误"
            });
          }
        })
        .catch(() => {
          // console.log(error);
          this.update_snackbar({
            on: true,
            color: "error",
            text: "404网络异常"
          });
        });
    }
  },
  computed: {
    get_username: function() {
      return this.username;
    },
    snb: function() {
      return this.snackbar;
    }
  }
};
</script>

<style>
/* @import url("https://use.fontawesome.com/releases/v5.1.0/css/all.css"); */
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+SC:400,700|Noto+Serif+SC:400,700&display=swap&subset=chinese-simplified");
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");

* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", "Noto Sans SC", sans-serif;
}
.title-font {
  font-family: "Noto Serif SC", serif;
  font-weight: 700;
}
.icon-large {
  font-size: 3em;
}
.medium {
  font-size: 1.3em;
}
.large {
  font-size: 2.4em;
}
.super-large {
  font-size: 2.8em;
}
#my-pic {
  background: url("../assets/AIP_login_background.png") no-repeat center center;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background-size: contain;
  width: auto;
  height: 100%;
  /* transform: scale(0.5); */
}
.full-height {
  height: 100vh;
}
#grey-color {
  background-color: #f5f6f8;
}
</style>
