<template>
  <b-container fluid="lg" class="my-5 wrapper">
    <Loader v-if="isFetching" text="Loading categories..." />
    <CategoryList v-else :categories="categories" />
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  async fetch() {
    await this.$store.dispatch("categories/fetchCategories");
  },
  computed: {
    ...mapState("categories", {
      categories: "all",
    }),
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
}
</style>
