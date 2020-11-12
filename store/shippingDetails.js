export const state = () => ({
  all: [],
});

export const getters = {};

export const actions = {
  async fetchDetails({ commit }, detailsId) {
    const { data } = await this.$axios.$get(`shippingDetails/${detailsId}`);
    commit("addOrUpdateDetails", data);
    return data;
  },
};

export const mutations = {
  addOrUpdateDetails(state, details) {
    const index = state.all.findIndex((p) => p.id === details.id);
    if (index === -1) {
      state.all.push(details);
    } else {
      state.all.splice(index, 1, details);
    }
  },
};
