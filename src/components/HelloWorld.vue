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
                  <span class="font-weight-bold large"
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
                <v-card-title class="super-large font-weight-bold"
                  >登录</v-card-title
                >
                <v-card-text>
                  <template v-for="(v, index) in inputs">
                    <v-flex :key="index + 'i'" mt-3 class="font-weight-bold">{{
                      v.label + (v.rq ? "*" : "")
                    }}</v-flex>
                    <v-text-field
                      mt-0
                      :key="index + 'v'"
                      :placeholder="v.ph"
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
                    color="#3A9BFC"
                    class="font-weight-bold medium"
                    >登录</v-btn
                  >
                </v-card-text>

                <v-card-action>{{ select }}</v-card-action>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
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
      select: null,
      inputs: trans({
        label: ["学工号", "密码"],
        ph: [
          "Please input your student ID.",
          "Your credentials are kept private."
        ],
        rq: [true, true, true]
      }),

      myImage: require("@/assets/AIP_login_background.png")
    };
  },
  methods: {
    get_first_identity: function() {
      return this.$data.identities[0];
    }
  }
};
</script>

<style>
/* @import url("https://use.fontawesome.com/releases/v5.1.0/css/all.css"); */
@import url("https://fonts.googleapis.com/css?family=Noto+Serif+SC&display=swap");
* {
  font-family: "Noto Serif SC", serif;
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
