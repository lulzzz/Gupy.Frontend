import Vue from "vue";

Vue.mixin({
  methods: {
    showToastError(error) {
      this.$bvToast.toast(`Error: ${error}`, {
        title: "Error!",
        variant: "danger",
      });
    },
    showToastSuccess(message) {
      this.$bvToast.toast(`${message}`, {
        title: "Success!",
        variant: "success",
      });
    },
  },
});
