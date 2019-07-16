import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import LoginPage from "@/components/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import vuetify from "vuetify";

// describe("Components", () => {
//   it("is a instance of VUe", () => {
//     const wrapper = mount(LoginPage);
//
//   });
// });

describe("LoginPage", () => {
  let wrapper = shallowMount(LoginPage);

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(vuetify);
    wrapper = shallowMount(LoginPage, {
      localVue
    });
  });

  it("renders a Vue Instance.", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("it should be visible.", () => {
    expect(wrapper.isVisible()).toBeTruthy();
  });

  it("all data initialize property properly.", () => {
    expect(wrapper.vm.snackbar).toBeDefined();
    expect(wrapper.vm.snackbar).toHaveProperty("on", false);
    expect(wrapper.vm.snackbar).toHaveProperty("timeout");
    expect(wrapper.vm.snackbar).toHaveProperty("color");
    expect(wrapper.vm.snackbar).toHaveProperty("bt");
    expect(wrapper.vm.valid).toBeDefined();
    expect(wrapper.vm.token).toBeDefined();
    expect(wrapper.vm.inputs).toBeDefined();
    expect(wrapper.vm.inputs).toHaveLength(2);
    expect(wrapper.vm.inputs[0]).toHaveProperty("label");
    expect(wrapper.vm.inputs[0]).toHaveProperty("ph");
    expect(wrapper.vm.inputs[0]).toHaveProperty("rq");
    expect(wrapper.vm.inputs[0]).toHaveProperty("tp");
    expect(wrapper.vm.inputs[0]).toHaveProperty("vl");
  });
  it("snackbar initialize with invisible state.", () => {
    expect(wrapper.vm.snackbar.on).toBeFalsy();
  });
  it("snackbar initialize with timeout larger than 0.5 sec.", () => {
    expect(wrapper.vm.snackbar.timeout).toBeGreaterThanOrEqual(500);
  });
  it("snackbar work as expect", () => {
    wrapper.vm.update_snackbar({
      on: true,
      color: "success"
    });
    expect(wrapper.vm.snackbar.on).toEqual(true);
    expect(wrapper.vm.snackbar.color).toEqual("success");
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
});

describe("HomePage", () => {
  let wrapper;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(vuetify);

    wrapper = shallowMount(HomePage, {
      localVue
    });
  });

  it("renders a Vue Instance.", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
