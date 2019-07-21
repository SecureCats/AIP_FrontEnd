import Vue from "vue";
import { shallowMount, createLocalVue, Wrapper } from "@vue/test-utils";
import LoginPage from "@/components/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import vuetify from "vuetify";
import Vuex from "vuex";
import _state from "@/state";

// describe("Components", () => {
//   it("is a instance of VUe", () => {
//     const wrapper = mount(LoginPage);
//
//   });
// });

describe("LoginPage", () => {
  let wrapper;

  let store;
  beforeEach(() => {
    Vue.use(vuetify);
    Vue.use(Vuex);
    store = new Vuex.Store({
      ..._state
      // state: {
      //   username: "",
      //   password: "",
      //   token_verified: false
      // },

      // mutations
    });

    wrapper = shallowMount(LoginPage, {
      Vue,
      store
    });
  });

  it("renders a Vue Instance.", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("it should be visible.", () => {
    expect(wrapper.isVisible()).toBeTruthy();
  });

  it("all data initialize property properly.", () => {
    expect(wrapper.vm.valid).toBeDefined();
    expect(wrapper.vm.token).toBeDefined();
    expect(wrapper.vm.inputs).toBeDefined();
    expect(wrapper.vm.inputs).toHaveLength(2);
    expect(wrapper.vm.inputs[0]).toHaveProperty("label");
    expect(wrapper.vm.inputs[0]).toHaveProperty("ph");
    expect(wrapper.vm.inputs[0]).toHaveProperty("rq");
    expect(wrapper.vm.inputs[0]).toHaveProperty("tp");
    expect(wrapper.vm.inputs[0]).toHaveProperty("vl");
    expect(wrapper.vm.myImage).toBeDefined();
    expect(wrapper.vm.myIcon).toBeDefined();
    expect(wrapper.vm.username).toBeDefined();
    expect(wrapper.vm.password).toBeDefined();
    expect(wrapper.vm.token_verified).toBeDefined();
  });
  it("trans function work as expected", () => {
    expect(wrapper.vm.trans).toBeDefined();
    expect(
      wrapper.vm.trans({
        a: [1, 2, 3, 4],
        b: [4, 3, 2, 1]
      })
    ).toEqual([
      {
        a: 1,
        b: 4
      },
      {
        a: 2,
        b: 3
      },
      {
        a: 3,
        b: 2
      },
      {
        a: 4,
        b: 1
      }
    ]);
  });
  it("username work as expect", () => {
    let val = Math.random().toString();

    wrapper.vm.updateUsername(val);
    expect(wrapper.vm.username).toEqual(val);
  });
  it("password work as expect", () => {
    let val = Math.random().toString();

    wrapper.vm.updatePassword(val);
    expect(wrapper.vm.password).toEqual(val);
  });
  it("should not success when submit", () => {
    expect(wrapper.vm.token_verified).toBeFalsy();
    wrapper.vm.submit();
    expect(wrapper.vm.token_verified).toBeFalsy();
  });
  //   it("snackbar initialize with invisible state.", () => {
  //     expect(wrapper.vm.snackbar.on).toBeFalsy();
  //   });
  //   it("snackbar initialize with timeout larger than 0.5 sec.", () => {
  //     expect(wrapper.vm.snackbar.timeout).toBeGreaterThanOrEqual(500);
  //   });
  //   it("snackbar work as expect", () => {
  //     wrapper.vm.update_snackbar({
  //       on: true,
  //       color: "success"
  //     });
  //     expect(wrapper.vm.snackbar.on).toEqual(true);
  //     expect(wrapper.vm.snackbar.color).toEqual("success");
  //   });

  //   it("snb function should return snackbar object", () => {
  //     let random = {
  //       a: Math.random(),
  //       b: Math.random()
  //     };
  //     wrapper.vm.snackbar = random;
  //     expect(wrapper.vm.snb).toEqual(random);
  //   });
  // it("get_username should listen the data `username`", () => {
  //   let name = Math.random();
  //   wrapper.vm.username = name;
  //   expect(wrapper.vm.username).toEqual(name);
  // });
  //   it("update_snackbar work as expect.", () => {
  //     let snb = {
  //       on: Math.random(),
  //       timeout: Math.random(),
  //       color: Math.random().toString(),
  //       text: Math.random().toString(),
  //       bt: Math.random().toString()
  //     };
  //     wrapper.vm.update_snackbar(snb);
  //     expect(wrapper.vm.snackbar).toEqual(snb);
  //   });
  // });
});
