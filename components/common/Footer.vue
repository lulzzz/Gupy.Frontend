<template>
  <footer class="ml-3">&copy; {{ currentYear }} - Gupy Services Inc</footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="sass" scoped></style>
