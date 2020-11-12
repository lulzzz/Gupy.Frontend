<template>
  <b-card :title="category.name" class="category text-center">
    <template #header>
      <b-card-img-lazy
        :src="category.photo"
        :alt="category.name"
      ></b-card-img-lazy>
    </template>

    <b-button
      block
      variant="info"
      :to="{ name: 'categories-id', params: { id: category.id } }"
    >
      Edit
    </b-button>
  </b-card>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
