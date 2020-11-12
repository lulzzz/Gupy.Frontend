<template>
  <div>
    <b-row class="mb-1">
      <b-col lg="12" class="d-flex justify-content-end">
        <b-button
          variant="primary"
          size="sm"
          href="https://localhost:5001/api/v1/orders/export"
        >
          Export to excel
          <b-icon
            icon="file-earmark-spreadsheet-fill"
            font-scale="1.5"
          ></b-icon>
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12" class="mb-1">
        <b-input-group size="sm" class="mb-3">
          <b-input-group-prepend is-text>
            <b-icon icon="search"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="filter"
            type="search"
            placeholder="Type to Search"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">
              Clear
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <p class="text-muted">Tip: {{ randomTip }}</p>
      </b-col>
    </b-row>
    <b-table
      responsive
      small
      striped
      bordered
      hover
      sticky-header="500px"
      :items="orders"
      :fields="fields"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(dateShipped)="data">
        {{ !!data.value ? data.value : "Not Yet Shipped" }}
      </template>

      <template #cell(orderStatus)="data">
        <span
          v-if="data.value.toLowerCase() === 'completed'"
          class="text-success"
        >
          {{ data.value }}
        </span>
        <span
          v-else-if="data.value.toLowerCase() === 'pending'"
          class="text-primary"
        >
          {{ data.value }}
        </span>
        <span v-else class="text-danger">
          {{ data.value }}
        </span>
      </template>

      <template #cell(totalSum)="data">
        <span class="font-italic">{{ data.value }}</span>
      </template>

      <template #cell(actions)="data">
        <div class="text-center">
          <b-link :to="{ name: 'orders-id', params: { id: data.item.id } }">
            <b-icon icon="eye-fill" variant="dark"></b-icon>
          </b-link>
          <b-link
            :to="{ name: 'orders-id-edit', params: { id: data.item.id } }"
          >
            <b-icon icon="pencil-fill" variant="warning"></b-icon>
          </b-link>
          <b-icon icon="trash-fill" variant="danger"></b-icon>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filter: null,
      sortBy: "orderStatus",
      sortDesc: true,
      fields: [
        "index",
        { key: "id", label: "Id" },
        { key: "dateOrdered", label: "Ordered", sortable: true },
        { key: "dateShipped", label: "Shipped", sortable: true },
        { key: "orderStatus", label: "Status", sortable: true },
        { key: "totalSum", label: "Sum", sortable: true },
        "actions",
      ],
      tips: [
        "You can scroll your orders via mouse wheel or a swipe",
        "For sortring table click on a column you want to sort by",
        "You can search via input",
        "You can choose filter criteria",
        "To reset sotring click on any non-sortable column",
      ],
    };
  },
  computed: {
    randomTip() {
      return this.tips[Math.floor(Math.random() * this.tips.length)];
    },
  },
};
</script>

<style lang="scss" scoped></style>
