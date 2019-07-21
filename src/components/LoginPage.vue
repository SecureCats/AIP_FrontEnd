<template>
  <!-- <v-flex fluid fill-height> -->
  <div>
    <v-layout row>
      <v-flex xs8 id="grey-color" style="height:100vh;">
        <v-layout column justify-space-between fill-height>
          <v-toolbar flat color="transparent">
            <v-toolbar-side-icon>
              <v-img :src="myIcon" width="24px" height="24px" contain />
            </v-toolbar-side-icon>
            <v-toolbar-title class="headline text-uppercase">
              <span class="title-font">教务系统统一身份认证</span>
            </v-toolbar-title>
          </v-toolbar>

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
                <v-card-title class="headline text-uppercase">
                  <span class="title-font">登录</span>
                </v-card-title>
                <v-card-text>
                  <v-form v-model="valid">
                    <!-- <template v-for="(v, index) in inputs"> -->
                    <v-flex mt-3 class="font-weight-bold">学工号 *</v-flex>
                    <v-text-field
                      autofocus
                      mt-0
                      :placeholder="inputs[0].ph"
                      :type="inputs[0].tp"
                      :rules="inputs[0].rl"
                      @keyup.enter="submit"
                      :value="username"
                      @input="updateUsername"
                      background-color="#f5f6f8"
                      required
                    ></v-text-field>
                    <v-flex mt-3 class="font-weight-bold">密码 * </v-flex>
                    <v-text-field
                      mt-0
                      :placeholder="inputs[1].ph"
                      :type="inputs[1].tp"
                      :rules="inputs[1].rl"
                      :value="password"
                      @input="updatePassword"
                      @keyup.enter="submit"
                      background-color="#f5f6f8"
                      required
                    ></v-text-field>
                    <!-- </template> -->

                    <v-flex mt-5></v-flex>
                    <v-btn
                      depressed
                      round
                      block
                      dark
                      color="primary"
                      class="font-weight-bold medium"
                      @click="submit"
                      >登录</v-btn
                    >
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      valid: true,
      token: "",
      inputs: [],

      myImage: require("@/assets/AIP_login_background.png"),
      myIcon: require("@/assets/icon.png")
    };
  },
  methods: {
    updateUsername(e) {
      this.$store.commit("updateUsername", e);
    },
    updatePassword(e) {
      this.$store.commit("updatePassword", e);
    },
    submit: function() {
      if (!this.valid) return;
      this.$store.commit("getToken");
    },
    trans: params => {
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
  },
  computed: {
    ...mapState(["username", "password", "token_verified"])
  },
  created: function() {
    this.inputs = this.trans({
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
    });
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
