import Vuex from "vuex";
import users from "./users";

const state = () => ({
  isLoading: false,
  loadingQueue: [],
  apiErrors: [],
  alertMessages: {}
});

const mutations = {
  setIsLoading(state, queueName) {
    state.isLoading = true;
    state.loadingQueue.push(queueName);
  },
  setLoaded(state, queueName) {
    const index = state.loadingQueue.indexOf(queueName);
    if (index > -1) {
      state.loadingQueue.splice(index, 1);
    }

    if (state.loadingQueue.length > 0) {
      return;
    }

    state.isLoading = false;
  },
  setApiErrors(state, errors) {
    state.apiErrors = errors;
  },
  deleteApiError(state, error) {
    if (state.apiErrors.hasOwnProperty(error)) {
      delete state.apiErrors[error];
    }
  },
  addAlertMessage(state, payload) {
    const type = payload.type || "info";
    if (state.alertMessages.hasOwnProperty(type) === false) {
      state.alertMessages[type] = [];
    }
    state.alertMessages[type].push(payload.message);
  },
  deleteAlertMessage(state, type) {
    state.alertMessages[type] = [];
  },
  clearAlertMessages(state) {
    state.alertMessages = {};
  }
};

const createStore = () => {
  return new Vuex.Store({
    state,
    getters: {},
    mutations,
    actions: {},
    modules: {
      users
    }
  });
};

export default createStore;
