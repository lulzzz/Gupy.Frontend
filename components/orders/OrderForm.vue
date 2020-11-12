<template>
  <div>
    <b-form id="productForm" @submit.prevent="submitForm">
      <b-form-group id="input-group-1" label="Status:" label-for="input-1">
        <b-form-select
          id="input-1"
          v-model="formOrder.orderStatus"
          :options="statuses"
          required
          @change="onStatusChanged"
        ></b-form-select>
        <div v-if="$v.formOrder.orderStatus.$error">
          <p v-if="!$v.formOrder.orderStatus.required" class="text-danger">
            Order status is required
          </p>
        </div>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Date shipped:"
        label-for="input-2"
      >
        <b-form-datepicker
          id="input-2"
          v-model="formOrder.dateShipped"
          :disabled="formOrder.orderStatus !== 'Completed'"
          reset-button
          required
          :min="minDate"
          :max="maxDate"
          @selected="$v.formOrder.dateShipped.$touch()"
        ></b-form-datepicker>
        <div v-if="$v.formOrder.dateShipped.$invalid">
          <p v-if="!$v.formOrder.dateShipped.required" class="text-danger">
            Date shipped is required!
          </p>
        </div>
      </b-form-group>

      <b-button
        :disabled="$v.formOrder.$invalid || !$v.formOrder.$anyDirty"
        type="submit"
        block
        variant="success"
        class="mt-3"
      >
        Edit
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { required, requiredIf } from "vuelidate/lib/validators";
import _ from "lodash";

export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  fetch() {
    // TODO: fetch order statuses
  },
  data() {
    return {
      formOrder: { ..._.cloneDeep(this.order) },
      statuses: [
        { value: "Pending", text: "Pending" },
        { value: "Completed", text: "Completed" },
        { value: "Cancelled", text: "Cancelled" },
      ],
    };
  },
  validations() {
    return {
      formOrder: {
        orderStatus: {
          required,
        },
        dateShipped: {
          required: requiredIf(
            () => this.formOrder.orderStatus === "Completed"
          ),
        },
      },
    };
  },
  computed: {
    minDate() {
      const dateShipped = new Date(this.formOrder.dateOrdered);
      return `${dateShipped.getFullYear()}-${dateShipped.getMonth() + 1}-${
        dateShipped.getDate() + 1
      }`;
    },
    maxDate() {
      const now = new Date();
      return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    },
  },
  created() {
    this.submitForm = _.throttle(() => {
      this.$v.formOrder.$touch();

      if (!this.$v.formOrder.$invalid) {
        this.$emit("editOrder", this.formOrder);
      }
    }, 5000);
  },
  methods: {
    onStatusChanged() {
      this.$v.formOrder.orderStatus.$touch();
      if (this.formOrder.orderStatus !== "Completed") {
        this.formOrder.dateShipped = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
