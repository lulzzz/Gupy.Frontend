<template>
  <b-container fluid="lg" class="my-5 wrapper">
    <Loader v-if="isFetching" text="Loading orders..." />
    <div v-else>
      <h1 class="text-center display-4 mb-5">Orders</h1>
      <OrderTable :orders="orders" />
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  async fetch() {
    await this.$store.dispatch("orders/fetchOrders");
  },
  computed: {
    ...mapState("orders", {
      orders: "all",
    }),
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
}
.loader {
  align-self: center;
}
</style>
