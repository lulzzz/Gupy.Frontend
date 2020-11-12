<template>
  <b-container fluid="lg" class="my-5 wrapper">
    <Loader v-if="isFetching" text="Loading order..." />
    <div v-else class="content">
      <Order class="order" :order="order" />
      <OrderItems class="items" :order-items="order.orderItems" />
      <ShippingDetails class="details" :details="details" />
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
    const order = await this.$store.dispatch("orders/fetchOrder", this.id);
    const details = await this.$store.dispatch(
      "shippingDetails/fetchDetails",
      order.shippingDetailsId
    );

    this.detailsId = details.id;
  },
  data() {
    return {
      id: this.$route.params.id,
      detailsId: 0,
    };
  },
  computed: {
    ...mapState("orders", {
      order(state) {
        const index = state.all.findIndex((p) => p.id === Number(this.id));
        return state.all[index];
      },
    }),
    ...mapState("shippingDetails", {
      details(state) {
        const index = state.all.findIndex((d) => d.id === this.detailsId);
        return state.all[index];
      },
    }),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  row-gap: 1rem;
  column-gap: 1rem;

  grid-template-areas:
    "order items"
    "details items";

  .order {
    grid-area: order;
  }
  .items {
    grid-area: items;
  }
  .details {
    grid-area: details;
  }
}

.btnBack {
  max-width: 35vh;
}

@media (max-width: 767.98px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "order"
      "details"
      "items";
    row-gap: 2rem;
  }
}
</style>
