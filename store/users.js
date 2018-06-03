import axios from "axios";

import apiResponse from "../mixins/apiResponseMixin";

import { USER_REGISTER_SUCCESS } from "./mutation-types";

export const state = () => ({
  list: []
});

export const mutations = {
  [USER_REGISTER_SUCCESS](state) {
    state.user = true;
  }
};

export const actions = {
  register({ commit }, user) {
    commit("setIsLoading", "register", { root: true });
    axios
      .post(CONFIG.backend.url + "users", user)
      .then(() => commit(USER_REGISTER_SUCCESS))
      .catch(error => {
        commit("setLoaded", "register", { root: true });
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          commit(
            "setApiErrors",
            apiResponse.methods.parseErrorMessage(error.response.data.errors),
            { root: true }
          );
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }
};
