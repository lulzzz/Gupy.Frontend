<template>
  <div>
    <b-form id="productForm" @submit.prevent="submitForm">
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model.trim="formProduct.name"
          type="text"
          required
          @blur="$v.formProduct.name.$touch()"
        ></b-form-input>
        <div v-if="$v.formProduct.name.$error">
          <p v-if="!$v.formProduct.name.required" class="text-danger">
            Name is required
          </p>
          <p v-else-if="!$v.formProduct.name.length" class="text-danger">
            Name should be longer than 2 characaters and shorter than 55
          </p>
        </div>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model.trim="formProduct.description"
          type="text"
          required
          rows="4"
          max-rows="4"
          @blur="$v.formProduct.description.$touch()"
        ></b-form-textarea>
        <div v-if="$v.formProduct.description.$error">
          <p v-if="!$v.formProduct.description.required" class="text-danger">
            Description is required
          </p>
          <p v-else-if="!$v.formProduct.description.length" class="text-danger">
            Description should be longer than 19 characaters and shorter than
            255
          </p>
        </div>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model.number="formProduct.price"
          required
          @blur="$v.formProduct.price.$touch()"
        ></b-form-input>
        <div v-if="$v.formProduct.price.$error">
          <p v-if="!$v.formProduct.price.required" class="text-danger">
            Price is required
          </p>
          <p v-else-if="!$v.formProduct.price.minValue" class="text-danger">
            Minimum price is 1.0
          </p>
        </div>
      </b-form-group>

      <b-form-group id="input-group-4" label="Available?" label-for="input-4">
        <b-form-checkbox
          id="input-4"
          v-model="formProduct.isAvailable"
          required
          size="lg"
          @change="$v.formProduct.isAvailable.$touch()"
        ></b-form-checkbox>
      </b-form-group>

      <b-form-group id="input-group-5" label="Category:" label-for="input-5">
        <b-form-select
          id="input-5"
          v-model="formProduct.categoryId"
          :options="categories"
          required
          @change="$v.formProduct.categoryId.$touch()"
        ></b-form-select>
        <div v-if="$v.formProduct.categoryId.$error">
          <p v-if="!$v.formProduct.categoryId.required" class="text-danger">
            Category is required
          </p>
        </div>
      </b-form-group>

      <b-form-group id="input-group-6" label="Photo:" label-for="input-6">
        <b-form-file
          id="input-6"
          v-model="$v.formProduct.photo.$model"
          placeholder="If you want to replace/add photo choose file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">
          Selected file :
          {{ formProduct.photo ? formProduct.photo.name : "No file selected" }}
          <small class="text-muted d-block">
            Note: all pictures will be scaled to 4:3 ratio
          </small>
        </div>
        <div v-if="$v.formProduct.photo.$error">
          <p v-if="!$v.formProduct.photo.allowedExtensions" class="text-danger">
            Allowed extensions are: .png, .jpg, .svg, .jpeg
          </p>
        </div>
      </b-form-group>

      <b-form-group
        v-if="!productIsNew"
        id="input-group-7"
        label="Promotion Price:"
        label-for="input-7"
      >
        <b-form-input
          id="input-7"
          v-model.number="formProduct.promotionPrice"
          @blur="$v.formProduct.promotionPrice.$touch()"
        ></b-form-input>
        <div v-if="$v.formProduct.promotionPrice.$error">
          <p v-if="!$v.formProduct.promotionPrice.between" class="text-danger">
            Promotion price should be between 1 and {{ product.price - 1 }}
          </p>
          <p
            v-else-if="!$v.formProduct.promotionPrice.required"
            class="text-danger"
          >
            Promotion price is required
          </p>
        </div>
      </b-form-group>

      <b-form-group
        v-if="!productIsNew"
        id="input-group-8"
        label="Promotion End Date:"
        label-for="input-8"
      >
        <b-form-datepicker
          id="input-8"
          v-model="$v.formProduct.promotionEndDate.$model"
          required
          reset-button
          :min="minDate"
          :max="maxDate"
        ></b-form-datepicker>
        <div v-if="$v.formProduct.promotionEndDate.$error">
          <p
            v-if="!$v.formProduct.promotionEndDate.required"
            class="text-danger"
          >
            Promotion end date is required!
          </p>
        </div>
      </b-form-group>

      <b-button
        :disabled="$v.formProduct.$invalid || !$v.formProduct.$anyDirty"
        type="submit"
        block
        variant="success"
        class="mt-3"
      >
        {{ submitButtonText }}
      </b-button>

      <b-button
        v-if="!productIsNew"
        block
        variant="danger"
        class="mt-3"
        @click="$bvModal.show('bv-modal-product')"
      >
        Delete
      </b-button>
    </b-form>
    <b-modal id="bv-modal-product" centered hide-footer>
      <template #modal-title> Delete Product? </template>
      <div class="d-block text-center">
        <p>This action is permanent and can't be undone</p>
      </div>
      <div class="mt-3 d-flex justify-content-center">
        <b-button class="mx-5" @click="deleteProduct">Delete</b-button>
        <b-button
          class="mx-5"
          variant="success"
          @click="$bvModal.hide('bv-modal-product')"
        >
          Cancel
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  required,
  requiredIf,
  minValue,
  decimal,
  helpers,
  between,
} from "vuelidate/lib/validators";
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

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default() {
        return {
          id: 0,
          name: "",
          description: "",
          price: 0,
          isAvailable: false,
          categoryId: null,
          promotionPrice: null,
          promotionEndDate: null,
        };
      },
    },
  },
  async fetch() {
    await this.$store.dispatch("categories/fetchCategories");
  },
  data() {
    return {
      formProduct: { ..._.cloneDeep(this.product), photo: null },
    };
  },
  validations() {
    return {
      formProduct: {
        name: {
          required,
          length: lengthBetween(3, 55),
        },
        description: {
          required,
          length: lengthBetween(20, 255),
        },
        price: {
          decimal,
          required,
          minValue: minValue(1.0),
        },
        isAvailable: {},
        categoryId: {
          required,
        },
        photo: {
          allowedExtensions: allowedExtensions("png", "jpg", "svg", "jpeg"),
        },
        promotionPrice: {
          decimal,
          between: between(1, this.product.price - 1),
          required: requiredIf(() => !!this.formProduct.promotionEndDate),
        },
        promotionEndDate: {
          required: requiredIf(() => !!this.formProduct.promotionPrice),
        },
      },
    };
  },
  computed: {
    ...mapState("categories", {
      categories(state) {
        return [
          {
            text: "Select One",
            value: null,
            disabled: true,
          },
          ...state.all.map((c) => ({ value: c.id, text: c.name })),
        ];
      },
    }),
    submitButtonText() {
      return this.product.id === 0 ? "Create" : "Edit";
    },
    productIsNew() {
      return this.product.id === 0;
    },
    minDate() {
      const now = new Date();
      now.setDate(now.getDate() + 2);

      return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    },
    maxDate() {
      const now = new Date();
      now.setMonth(now.getMonth() + 3);

      return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    },
  },
  created() {
    this.submitForm = _.throttle(() => {
      this.$v.formProduct.$touch();

      if (!this.$v.formProduct.$invalid) {
        this.$emit("submitProduct", this.formProduct);
      }
    }, 5000);

    this.deleteProduct = _.throttle(() => {
      this.$bvModal.hide("bv-modal-product");
      this.$emit("deleteProduct", this.formProduct);
    }, 5000);
  },
};
</script>

<style lang="scss" scoped></style>
