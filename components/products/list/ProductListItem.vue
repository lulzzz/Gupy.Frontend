<template>
  <b-card :title="product.name" class="product text-center">
    <template #header>
      <b-card-img-lazy
        :src="product.photo"
        :alt="product.name"
      ></b-card-img-lazy>
    </template>

    <b-card-text class="text-justify">{{ descriptionSummary }}</b-card-text>
    <b-button
      block
      variant="info"
      :to="{ name: 'products-id', params: { id: product.id } }"
    >
      Edit
    </b-button>
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
  computed: {
    descriptionSummary() {
      if (this.product.description.length <= 100) {
        return this.product.description;
      }

      const description = [];
      let descriptionLength = 0;

      for (const word of this.product.description.split(" ")) {
        if (descriptionLength + word.length > 100) {
          break;
        }

        description.push(word);
        descriptionLength += word.length;
      }

      return description.join(" ") + "...";
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
