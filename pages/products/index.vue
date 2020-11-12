<template>
  <b-container fluid="lg" class="my-5 wrapper">
    <Loader v-if="isFetching" text="Loading products..." />
    <ProductList v-else :products="products" />
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  async fetch() {
    await this.$store.dispatch("products/fetchProducts");
  },
  computed: {
    ...mapState("products", {
      products: "all",
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
