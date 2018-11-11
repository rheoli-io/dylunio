import axios from "axios";

import apiResponse from "../mixins/apiResponseMixin";

import { USER_REGISTER_SUCCESS } from "./mutation-types";

const state = () => ({
  registered: false
});

const getters = {};

const mutations = {
  [USER_REGISTER_SUCCESS](state) {
    state.registered = true;
  }
};

const actions = {
  register({ commit }, user) {
    commit("setIsLoading", "register", { root: true });
    return axios
      .post(CONFIG.backend.url + "users", user)
      .then(() => {
        commit("setLoaded", "register", { root: true });
        commit(USER_REGISTER_SUCCESS);
        return true;
      })
      .catch(error => {
        commit("setLoaded", "register", { root: true });
        if (error.response) {
          commit(
            "setApiErrors",
            apiResponse.methods.parseErrorMessage(error.response.data.errors),
            { root: true }
          );
        } else {
          commit(
            "setApiErrors",
            { generic: "Invalid request" },
            { root: true }
          );
        }
      });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
