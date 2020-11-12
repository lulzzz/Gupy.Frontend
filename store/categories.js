export const state = () => ({
  all: [],
});

export const getters = {};

export const actions = {
  async fetchCategories({ commit }) {
    const { data } = await this.$axios.$get("categories");
    commit("setCategories", data);
  },
  async fetchCategory({ commit }, categoryId) {
    const { data } = await this.$axios.$get(`categories/${categoryId}`);
    commit("addOrUpdateCategory", data);
  },
  async createCategory({ commit }, category) {
    const { data } = await this.$axios.$post(`categories`, category);
    commit("addOrUpdateCategory", data);
    return data.id;
  },
  async updateCategory({ commit }, category) {
    const { data } = await this.$axios.$put("categories", category);
    commit("addOrUpdateCategory", data);
  },
  async deleteCategory({ commit }, categoryId) {
    await this.$axios.$delete(`categories/${categoryId}`);
    commit("deleteCategory", categoryId);
  },
};

export const mutations = {
  setCategories(state, categories) {
    state.all = categories;
  },
  addOrUpdateCategory(state, category) {
    const index = state.all.findIndex((p) => p.id === category.id);
    if (index === -1) {
      state.all.push(category);
    } else {
      state.all.splice(index, 1, category);
    }
  },
  deleteCategory(state, categoryId) {
    const index = state.all.findIndex((p) => p.id === categoryId);
    if (index !== -1) {
      state.all.splice(index, 1);
    }
  },
};
