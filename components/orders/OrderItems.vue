<template>
  <div>
    <h4 class="text-center">Items</h4>
    <b-table
      responsive
      small
      striped
      bordered
      hover
      :items="orderItems"
      :fields="fields"
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    orderItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        "index",
        { key: "productId", label: "Product id" },
        { key: "quantity", label: "QTY" },
        { key: "pricePerUnit", label: "Price per unit" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
