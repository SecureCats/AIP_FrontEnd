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
// import LoginPage from "./components/LoginPage";

export default {
  name: "App",
  components: {},
  data() {
    return {
      //
    };
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
  }
};
</script>
