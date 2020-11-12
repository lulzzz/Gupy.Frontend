<template>
  <div class="layout">
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100vh;
  display: grid;
}
.layout {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
#__layout {
  height: 100vh;
}
</style>
