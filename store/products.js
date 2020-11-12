export const state = () => ({
  all: [],
});

export const getters = {};

export const actions = {
  async fetchProducts({ commit }) {
    const { data } = await this.$axios.$get("products");
    commit("setProducts", data);
  },
  async fetchProduct({ commit }, productId) {
    const { data } = await this.$axios.$get(`products/${productId}`);
    commit("addOrUpdateProduct", data);
  },
  async createProduct({ commit }, product) {
    const { data } = await this.$axios.$post(`products`, product);
    commit("addOrUpdateProduct", data);
    return data.id;
  },
  async updateProduct({ commit }, product) {
    const { data } = await this.$axios.$put(`products`, product);
    commit("addOrUpdateProduct", data);
  },
  async deleteProduct({ commit }, productId) {
    await this.$axios.$delete(`products/${productId}`);
    commit("deleteProduct", productId);
  },
};

export const mutations = {
  setProducts(state, products) {
    state.all = products;
  },
  addOrUpdateProduct(state, product) {
    const index = state.all.findIndex((p) => p.id === product.id);
    if (index === -1) {
      state.all.push(product);
    } else {
      state.all.splice(index, 1, product);
    }
  },
  deleteProduct(state, productId) {
    const index = state.all.findIndex((p) => p.id === productId);
    if (index !== -1) {
      state.all.splice(index, 1);
    }
  },
};
