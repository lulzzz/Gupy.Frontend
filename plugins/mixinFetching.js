import Vue from "vue";

Vue.mixin({
  computed: {
    isFetching() {
      return this.$fetchState.pending;
    },
  },
});
