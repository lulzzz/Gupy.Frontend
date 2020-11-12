<template>
  <div>
    <h1 class="display-4 text-center mb-3">Your products</h1>
    <div class="products">
      <ProductListItem
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
      <EmptyCard :to="{ name: 'products-create' }">
        <template v-slot:content>
          <p class="text-center">Create Product</p>
        </template>
      </EmptyCard>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  computed: {
    anyProducts() {
      return this.products.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
}

@media (max-width: 767.98px) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
