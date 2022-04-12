import Vue from "vue";
import Vuex from "vuex";

import AccessLevel from "@/enums/AccessLevel";

import Workstation from "./workstation/workstation";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_level: AccessLevel.NotAuthorized,
  },
  mutations: {},
  actions: {},
  modules: {
    workstation: Workstation,
  },
});
