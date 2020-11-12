<template>
  <div>
    <h1 class="display-4 text-center mb-3">Your categories</h1>
    <div class="categories">
      <CategoryListItem
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
      <EmptyCard :to="{ name: 'categories-create' }">
        <template v-slot:content>
          <p class="text-center">Create Category</p>
        </template>
      </EmptyCard>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
}

@media (max-width: 767.98px) {
  .categories {
    grid-template-columns: 1fr;
  }
}
</style>
