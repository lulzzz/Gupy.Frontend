<template>
  <b-container fluid="lg" class="my-5">
    <div class="wrapper">
      <div class="productForm">
        <h3 class="text-center">Product</h3>
        <ProductForm
          :product="product"
          @submitProduct="onProductSubmit"
          @deleteProduct="onProductDelete"
        />
      </div>
      <div class="productPreview">
        <h3 class="text-center">Product Preview</h3>
        <Product :product="product" />
        <small class="text-muted text-center d-block">
          This is how customers will see the product
        </small>
      </div>
    </div>
    <b-button
      :to="{ name: 'products' }"
      block
      variant="primary"
      class="btnBack mx-auto mt-3"
      >Back</b-button
    >
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  async fetch() {
    await this.$store.dispatch("products/fetchProduct", this.id);
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("products", {
      product(state) {
        const index = state.all.findIndex((p) => p.id === Number(this.id));
        return state.all[index];
      },
    }),
  },
  methods: {
    async onProductSubmit(product) {
      const formData = new FormData();
      for (const key in product) {
        if (product[key] !== null) {
          formData.append(key, product[key]);
        }
      }
      try {
        await this.$store.dispatch("products/updateProduct", formData);
        this.showToastSuccess("Product was modified.");
      } catch (e) {
        this.showToastError(e);
      }
    },
    async onProductDelete(product) {
      try {
        await this.$store.dispatch("products/deleteProduct", product.id);
        this.$router.push("/products");
      } catch (e) {
        this.showToastError(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 0.55fr 0.45fr;
  grid-template-areas: "productForm productPreview";
  column-gap: 3rem;

  .productForm {
    grid-area: productForm;
  }

  .productPreview {
    grid-area: productPreview;
  }
}
.btnBack {
  max-width: 35vh;
}
@media (max-width: 767.98px) {
  .wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    grid-template-areas: "productPreview" "productForm";
    row-gap: 3rem;
  }
}
</style>
