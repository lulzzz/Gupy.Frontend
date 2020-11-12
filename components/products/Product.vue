<template>
  <b-card class="product text-center">
    <template #header>
      <b-card-img-lazy
        :src="product.photo"
        :alt="product.name"
      ></b-card-img-lazy>
    </template>
    <b-card-title>
      <div>
        {{ product.name }} -
        <span v-if="product.promotionPrice">
          <small class="text-muted oldPrice">{{ product.price }}</small>
          <span class="text-danger">{{ product.promotionPrice }}</span>
        </span>
        <span v-else class="font-weight-bold">{{ product.price }}</span>
      </div>
    </b-card-title>
    <b-card-text class="text-justify">{{ product.description }}</b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.oldPrice {
  text-decoration: line-through;
}
</style>
