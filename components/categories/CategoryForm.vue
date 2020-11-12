<template>
  <div>
    <b-form id="categoryForm" @submit.prevent="submitForm">
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model.trim="formCategory.name"
          type="text"
          required
          @blur="$v.formCategory.name.$touch()"
        ></b-form-input>
        <div v-if="$v.formCategory.name.$error">
          <p v-if="!$v.formCategory.name.required" class="text-danger">
            Name is required
          </p>
          <p v-else-if="!$v.formCategory.name.length" class="text-danger">
            Name should be longer than 2 characaters and shorter than 55
          </p>
          <p v-else-if="!$v.formCategory.name.validName" class="text-danger">
            Category with such name exists
          </p>
        </div>
      </b-form-group>

      <b-form-group id="input-group-6" label="Photo:" label-for="input-6">
        <b-form-file
          id="input-6"
          v-model="$v.formCategory.photo.$model"
          placeholder="If you want to replace/add photo choose file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">
          Selected file :
          {{
            formCategory.photo ? formCategory.photo.name : "No file selected"
          }}
          <small class="text-muted d-block">
            Note: all pictures will be scaled to 4:3 ratio
          </small>
        </div>
        <div v-if="$v.formCategory.photo.$error">
          <p
            v-if="!$v.formCategory.photo.allowedExtensions"
            class="text-danger"
          >
            Allowed extensions are: .png, .jpg, .svg, .jpeg
          </p>
        </div>
      </b-form-group>

      <b-button
        :disabled="$v.formCategory.$invalid || !$v.formCategory.$anyDirty"
        type="submit"
        block
        variant="success"
        class="mt-3"
      >
        {{ submitButtonText }}
      </b-button>

      <b-button
        v-if="!categoryIsNew"
        block
        variant="danger"
        class="mt-3"
        @click="$bvModal.show('bv-modal-category')"
      >
        Delete
      </b-button>
    </b-form>
    <b-modal id="bv-modal-category" centered hide-footer>
      <template #modal-title> Delete Category? </template>
      <div class="d-block text-center">
        <p>
          This will delete all related products to this category. This action is
          permanent and can't be undone.
        </p>
      </div>
      <div class="mt-3 d-flex justify-content-center">
        <b-button class="mx-5" @click="deleteCategory">Delete</b-button>
        <b-button
          class="mx-5"
          variant="success"
          @click="$bvModal.hide('bv-modal-category')"
        >
          Cancel
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { required, helpers } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import _ from "lodash";

const lengthBetween = (minValue, maxValue) => (obj) =>
  obj.length >= minValue && obj.length <= maxValue;

const allowedExtensions = (...extensions) => (file) => {
  if (!helpers.req(file)) {
    return true;
  }
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return (
    extensions.find((extension) => extension === fileExtension) !== undefined
  );
};

const validName = (...disallowedNames) => (nameToCheck) => {
  const result = disallowedNames.find(
    (name) => name === nameToCheck.toLowerCase()
  );
  return result === undefined;
};

export default {
  props: {
    category: {
      type: Object,
      required: false,
      default() {
        return {
          id: 0,
          name: "",
        };
      },
    },
  },
  async fetch() {
    await this.$store.dispatch("categories/fetchCategories");
  },
  data() {
    return {
      formCategory: { ..._.cloneDeep(this.category), photo: null },
    };
  },
  validations() {
    return {
      formCategory: {
        name: {
          required,
          length: lengthBetween(3, 55),
          validName: validName(...this.categories),
        },
        photo: {
          allowedExtensions: allowedExtensions("png", "jpg", "svg", "jpeg"),
        },
      },
    };
  },
  computed: {
    ...mapState("categories", {
      categories(state) {
        return state.all
          .filter((c) => c.id !== this.category.id)
          .map((c) => c.name.toLowerCase());
      },
    }),
    submitButtonText() {
      return this.category.id === 0 ? "Create" : "Edit";
    },
    categoryIsNew() {
      return this.category.id === 0;
    },
  },
  created() {
    this.submitForm = _.throttle(() => {
      this.$v.formCategory.$touch();

      if (!this.$v.formCategory.$invalid) {
        this.$emit("submitCategory", this.formCategory);
      }
    }, 5000);

    this.deleteCategory = _.throttle(() => {
      this.$bvModal.hide("bv-modal-category");
      this.$emit("deleteCategory", this.formCategory);
    }, 5000);
  },
};
</script>

<style lang="scss" scoped></style>
