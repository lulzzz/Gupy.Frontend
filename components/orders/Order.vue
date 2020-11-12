<template>
  <div>
    <b-card :title="orderTitle">
      <b-card-text>DateOrdered: {{ order.dateOrdered }} </b-card-text>
      <b-card-text>Date Shipped: {{ shippedDate }} </b-card-text>
      <b-card-text>
        Order status:
        <span v-if="orderStatus === 'completed'" class="text-success">
          {{ orderStatus }}
        </span>
        <span v-else-if="orderStatus === 'pending'" class="text-primary">
          {{ orderStatus }}
        </span>
        <span v-else-if="orderStatus === 'cancelled'" class="text-danger">
          {{ orderStatus }}
        </span>
      </b-card-text>
      <b-card-text>
        Total Sum: <b>{{ order.totalSum }} </b>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shippedDate() {
      return this.order.dateShipped === null
        ? "Not Yet Shipped"
        : this.order.dateShipped;
    },
    orderTitle() {
      return `Order #${this.order.id}`;
    },
    orderStatus() {
      return this.order.orderStatus.toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped></style>
