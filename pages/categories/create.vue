<template>
  <b-container fluid="lg" class="my-5">
    <div class="wrapper">
      <h1 class="text-center">Create Category</h1>
      <CategoryForm @submitCategory="onCategorySubmit" />
      <b-button
        :to="{ name: 'categories' }"
        block
        variant="primary"
        class="btnBack mx-auto mt-3"
      >
        Back
      </b-button>
    </div>
  </b-container>
</template>

<script>
export default {
  methods: {
    async onCategorySubmit(category) {
      const formData = new FormData();
      for (const key in category) {
        if (category[key] !== null) {
          formData.append(key, category[key]);
        }
      }
      try {
        const categoryId = await this.$store.dispatch(
          "categories/createCategory",
          formData
        );
        this.$router.push(`/categories/${categoryId}`);
      } catch (e) {
        this.showToastError(e);
      }
    },
    showToastError(error) {
      this.$bvToast.toast(`Error: ${error}`, {
        title: "Error!",
        variant: "danger",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 0.6fr;
  justify-content: center;
}
@media (max-width: 767.98px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
