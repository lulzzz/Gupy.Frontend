<template>
  <div>
    <b-card title="Shipping Details">
      <b-card-text>Receiver Name: {{ details.receiverName }}</b-card-text>
      <b-card-text>Shipping Address: {{ details.address }}</b-card-text>
      <b-card-text>Phone Number: {{ details.phoneNumber }}</b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
