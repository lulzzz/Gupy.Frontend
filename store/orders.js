export const state = () => ({
  all: [],
});

export const getters = {};

export const actions = {
  async fetchOrders({ commit }) {
    const { data } = await this.$axios.$get("orders");
    commit("setOrders", data);
  },
  async fetchOrder({ commit }, orderId) {
    const { data } = await this.$axios.$get(`orders/${orderId}`);
    commit("addOrUpdateOrder", data);
    return data;
  },
  async updateOrder({ commit }, order) {
    const { data } = await this.$axios.$put(`orders/${order.id}`, order);
    commit("addOrUpdateOrder", data);
  },
};

export const mutations = {
  setOrders(state, orders) {
    state.all = orders;
  },
  addOrUpdateOrder(state, order) {
    const index = state.all.findIndex((p) => p.id === order.id);
    if (index === -1) {
      state.all.push(order);
    } else {
      state.all.splice(index, 1, order);
    }
  },
};
