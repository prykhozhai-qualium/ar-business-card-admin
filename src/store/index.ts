import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import AccessLevel from "@/enums/AccessLevel";

import Workstation from "./workstation/workstation";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_level: AccessLevel.NotAuthorized,
  },
  mutations: {
    updateAccessLevel(state){
      if(localStorage.getItem("jwt")){
        state.access_level = AccessLevel.Authorized;
      }else {
        state.access_level = AccessLevel.NotAuthorized;
      }
    }
  },
  actions: {
    async logIn(context, {
      login, password
    }){
      let response = await axios.post("https://qr.qualium-systems.com/api/v1/auth/login", {
        email: login,
        password: password,
      })

      localStorage.setItem("jwt", response.data.accessToken);

      context.commit("updateAccessLevel");
    },
    logOut(context) {
      localStorage.removeItem("jwt");

      context.commit("updateAccessLevel");
    }
  },
  modules: {
    workstation: Workstation,
  },
});
