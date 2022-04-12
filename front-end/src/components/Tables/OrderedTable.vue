<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row v-for="(customer,index) in customers" :key="index">
        <md-table-cell md-label="Name">{{ customer.name }}</md-table-cell>
        <md-table-cell md-label="Last Update">{{ customer.lastUpdate }}</md-table-cell>
        <md-table-cell md-label="Status" class="status" ><span :class="customer.status.replace(' ','-').toLowerCase()" >{{customer.status}}</span></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<style lang="scss" scoped>
  .status{
    margin:5px;
    font-weight: 500;
    .good{
      padding:5px;
      border-radius:5px;
      background-color: lawngreen !important;
      margin: 0 auto;
    }
    .upset{
      padding:5px;
      border-radius:5px;
      background-color: indianred !important;
      margin: 0 auto;
    }
    .waiting{
      padding:5px;
      border-radius:5px;
      background-color: mediumspringgreen !important;
      margin: 0 auto;
    }
    .in-progress{
      padding:5px;
      border-radius:5px;
      background-color: dodgerblue !important;
      margin: 0 auto;
    }
  }
</style>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      customers: [
        {name: "John Doe", status:"WAITING", lastUpdate:"Apr 11 @ 4:25 PM"},
        {name: "Jane Doe", status:"GOOD", lastUpdate:"Apr 6 @ 4:15 PM"},
        {name: "Ben Jerry", status:"IN PROGRESS", lastUpdate:"Apr 2 @ 10:25 AM"},
        {name: "Sue Loo", status:"UPSET", lastUpdate:"Apr 12 @ 11:25 AM"},
        {name: "Billy Joe", status:"GOOD", lastUpdate:"Apr 1 @ 1:02 PM"},
        {name: "Jimmy Jean", status:"WAITING", lastUpdate:"Mar 4 @ 2:21 PM"},
      ],
    };
  },
};
</script>
