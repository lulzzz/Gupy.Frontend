<template>
  <b-card class="category text-center">
    <template #header>
      <b-card-img-lazy
        :src="category.photo"
        :alt="category.name"
      ></b-card-img-lazy>
    </template>
    <b-card-title>
      {{ category.name }}
    </b-card-title>
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
