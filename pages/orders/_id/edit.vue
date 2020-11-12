<template>
  <b-container fluid="lg" class="my-5 wrapper">
    <Loader v-if="isFetching" text="Loading order..." />
    <div v-else class="content">
      <OrderForm class="form" :order="order" @editOrder="onOrderEdit" />
      <Order class="preview" :order="order" />
    </div>
    <b-button
      :to="{ name: 'orders' }"
      block
      variant="primary"
      class="btnBack mx-auto mt-3"
    >
      Back
    </b-button>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  async fetch() {
    await this.$store.dispatch("orders/fetchOrder", this.id);
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("orders", {
      order(state) {
        const index = state.all.findIndex((p) => p.id === Number(this.id));
        return state.all[index];
      },
    }),
  },
  methods: {
    async onOrderEdit(order) {
      const data = {};
      for (const key in order) {
        if (order[key]) {
          data[key] = order[key];
        }
      }
      try {
        await this.$store.dispatch("orders/updateOrder", data);
        this.showToastSuccess("Order was modified.");
      } catch (e) {
        this.showToastError(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: 0.45fr 0.55fr;
  grid-template-rows: 1fr;
  grid-template-areas: "form preview";

  column-gap: 2rem;
  .form {
    grid-area: form;
  }
  .preview {
    grid-area: preview;
  }
}

.btnBack {
  max-width: 35vh;
}

@media (max-width: 767.98px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
      "preview"
      "form";
    row-gap: 2rem;
  }
}
</style>
