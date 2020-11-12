<template>
  <b-container fluid="lg" class="my-5">
    <div class="wrapper">
      <h1 class="text-center">Create Product</h1>
      <ProductForm @submitProduct="onProductSubmit" />
      <b-button
        :to="{ name: 'products' }"
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
    async onProductSubmit(product) {
      const formData = new FormData();
      for (const key in product) {
        if (product[key] !== null) {
          formData.append(key, product[key]);
        }
      }
      try {
        const productId = await this.$store.dispatch(
          "products/createProduct",
          formData
        );
        this.$router.push(`/products/${productId}`);
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
