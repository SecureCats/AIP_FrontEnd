import Vue from "vue";
import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import LoginPage from "@/components/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import vuetify from "vuetify";
import Vuex, { mapState } from "vuex";
import _state from "@/state";
var VueCookie = require("vue-cookie");

describe("HomePage", () => {
  let wrapper;

  let store;
  beforeEach(() => {
    Vue.use(vuetify);
    Vue.use(Vuex);
    Vue.use(VueCookie);
    let store = {
      ..._state
    };
    _state.mutations.cleanPassword = jest.fn();
    _state.mutations.updateAccess = jest.fn();
    _state.mutations.updateRefresh = jest.fn();
    _state.mutations.verifyToken = jest.fn();
    // _state.mutations.updateSnackbar = jest.fn();

    store = new Vuex.Store(store);
    HomePage.computed = {
      ...HomePage.computed,
      ...mapState(["snackbar"])
    };
    wrapper = shallowMount(HomePage, {
      Vue,
      store
    });
  });

  it("renders a Vue Instance.", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("initalize all the data properly", () => {
    expect(wrapper.vm.navbar_navs).toBeDefined();
    expect(wrapper.vm.courses).toBeDefined();
    expect(wrapper.vm.tasks).toHaveLength(3);
    expect(wrapper.vm.pics).toHaveLength(3);
    expect(wrapper.vm.avataaar).toBeDefined();
    expect(wrapper.vm.user).toHaveProperty("name");
    expect(wrapper.vm.user).toHaveProperty("class_no");
    expect(wrapper.vm.user).toHaveProperty("semester");
    expect(wrapper.vm.user).toHaveProperty("school");
    expect(wrapper.vm.info[0][0]).toBeDefined();
  });
  it("some initialize function must be called", () => {
    expect(_state.mutations.cleanPassword).toBeCalled();
    expect(_state.mutations.updateAccess).toBeCalled();
    expect(_state.mutations.updateRefresh).toBeCalled();
    expect(_state.mutations.verifyToken).toBeCalled();
    // expect(_state.mutations.updateSnackbar).toBeCalled();
  });
  it("updateSnackbar", () => {
    wrapper.vm.$store.commit("updateSnackbar", {
      on: true,
      text: "请重新登录",
      btn: "info",
      color: "yellow"
    });
    expect(wrapper.vm.snackbar.text).toEqual("请重新登录");
  });
  it("jump function work as expect.", () => {
    wrapper.vm.jump(2);
    expect(wrapper.vm.snackbar.on).toEqual(true);
  });
});
