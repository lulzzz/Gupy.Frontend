<template>
  <div class="text-center loader">
    <Spinner />
    <p class="mt-1">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: "Loading...",
    },
  },
};
</script>

<style lang="scss" scoped>
.loader {
  align-self: center;
}
</style>
