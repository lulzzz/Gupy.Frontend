<template>
  <b-container fluid="lg" class="my-5">
    <div class="wrapper">
      <div class="CategoryForm">
        <h3 class="text-center">Category</h3>
        <CategoryForm
          :category="category"
          @submitCategory="onCategorySubmit"
          @deleteCategory="onCategoryDelete"
        />
      </div>
      <div class="categoryPreview">
        <h3 class="text-center">Category Preview</h3>
        <Category :category="category" />
        <small class="text-muted text-center d-block">
          This is how customers will see the category
        </small>
      </div>
    </div>
    <b-button
      :to="{ name: 'categories' }"
      block
      variant="primary"
      class="btnBack mx-auto mt-3"
    >
      Back
    </b-button>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  async fetch() {
    await this.$store.dispatch("categories/fetchCategory", this.id);
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("categories", {
      category(state) {
        const index = state.all.findIndex((p) => p.id === Number(this.id));
        return state.all[index];
      },
    }),
  },
  methods: {
    async onCategorySubmit(category) {
      const formData = new FormData();
      for (const key in category) {
        if (category[key] !== null) {
          formData.append(key, category[key]);
        }
      }
      try {
        await this.$store.dispatch("categories/updateCategory", formData);
        this.showToastSuccess("Category was modified.");
      } catch (e) {
        this.showToastError(e);
      }
    },
    async onCategoryDelete(category) {
      try {
        await this.$store.dispatch("categories/deleteCategory", category.id);
        this.$router.push("/categories");
      } catch (e) {
        this.showToastError(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 0.55fr 0.45fr;
  grid-template-areas: "categoryForm categoryPreview";
  column-gap: 3rem;

  .categoryForm {
    grid-area: categoryForm;
  }

  .categoryPreview {
    grid-area: categoryPreview;
  }
}
.btnBack {
  max-width: 35vh;
}
@media (max-width: 767.98px) {
  .wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    grid-template-areas: "categoryPreview" "categoryForm";
    row-gap: 3rem;
  }
}
</style>
