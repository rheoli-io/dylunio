import merge from "deepmerge";

export const state = () => ({
  isLoading: false,
  loadingQueue: [],
  apiErrors: []
});

export const mutations = {
  setIsLoading(state, queueName) {
    state.isLoading = true;
    state.loadingQueue.push(queueName);
  },
  setLoaded(state, queueName) {
    let index = state.loadingQueue.indexOf(queueName);
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
  }
};
