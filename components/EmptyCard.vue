<template>
  <div class="card-empty">
    <b-link :to="to">
      <b-icon class="card-icon" icon="plus" font-scale="10" variant="dark">
      </b-icon>
    </b-link>
    <div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-empty {
  border: 3px solid #343a40;
  border-style: dashed;
  max-width: 25rem;
  display: grid;
  justify-content: center;
  align-content: center;
}

.card-icon {
  &:hover {
    cursor: pointer;
  }
}
</style>
