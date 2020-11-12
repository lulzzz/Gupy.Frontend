export default {
  head: {
    title: "Gupy",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: [],

  plugins: [
    "@/plugins/axios",
    "@/plugins/vuelidate",
    "@/plugins/mixinFetching",
    "@/plugins/mixinToasts",
  ],

  components: true,

  buildModules: ["@nuxtjs/eslint-module"],

  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios"],

  bootstrapVue: {
    icons: true,
  },

  axios: {
    baseURL: "https://localhost:5001/api/v1",
  },

  build: {},

  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
};
