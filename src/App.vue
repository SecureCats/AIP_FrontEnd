<template>
  <v-app style="background-color:white;">
    <router-view></router-view>
    <v-snackbar
      v-model="snackbar.on"
      :timeout="snackbar.timeout"
      top
      :color="snackbar.color"
      id="snackbar"
    >
      <v-icon dark>{{ snackbar.bt }}</v-icon>
      {{ snackbar.text }}
      <v-btn flat @click="snackbar.on = false">好的</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  computed: {
    snackbar() {
      return this.$store.getters.renderSnackbar;
    }
  },
  methods: {
    toggleSnackbar: function() {
      this.$store.commit("toggleSnackbar");
    }
  },
  created: function() {
    if (localStorage.getItem("seed")) {
      console.log("po" + process.env.VUE_APP_PES_url);
      parent.postMessage(
        localStorage.getItem("seed"),
        process.env.VUE_APP_PES_url
      );
      console.log("posted");
    }

    let access_token = this.$cookie.get("access_token") || "";
    let refresh_token = this.$cookie.get("refresh_token") || "";
    this.$store.commit("updateAccess", access_token);
    this.$store.commit("updateRefresh", refresh_token);
  }
};
</script>
