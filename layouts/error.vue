<template>
  <b-container fluid="lg" class="my-5 text-center">
    <div>
      <h1 v-if="error.statusCode === 404">
        <b-icon icon="search" font-scale="1"></b-icon>
        Not Found
      </h1>
      <h1 v-else>
        <b-icon icon="server" font-scale="1"></b-icon> An Internal Error Occured
      </h1>
      <p>{{ error.message }}</p>
    </div>

    <nuxt-link to="/">Home page</nuxt-link>
  </b-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>
