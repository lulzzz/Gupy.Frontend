<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-brand to="/">Gupy</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Product" right>
            <b-dropdown-item :to="{ name: 'products' }">
              Products
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'products-create' }">
              Create Product
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Category" right>
            <b-dropdown-item :to="{ name: 'categories' }">
              Categories
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'categories-create' }">
              Create Categories
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item :to="{ name: 'orders' }"> Orders </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped></style>
