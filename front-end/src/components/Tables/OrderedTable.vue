<template>
  <div>
    <md-table :table-header-color="tableHeaderColor">
      <md-table-row v-for="(customer,index) in customers" :key="index">
        <md-table-cell md-label="Name"><router-link :to="'/customer/' + customer.id ">{{ customer.name }}</router-link></md-table-cell>
        <md-table-cell md-label="Last Update">{{ customer.lastUpdate }}</md-table-cell>
        <md-table-cell md-label="Status" class="status" ><span :class="customer.status.replace(' ','-').toLowerCase()" >{{customer.status}}</span></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<style lang="scss" scoped>
  .status{
    margin:5px;
    font-weight: 600;
    white-space: nowrap;
    color: white;
    .good{
      padding:5px;
      border-radius:5px;
      background-color: #3DC13C !important;
      margin: 0 auto;
    }
    .upset{
      padding:5px;
      border-radius:5px;
      background-color: #F13637 !important;
      margin: 0 auto;
    }
    .waiting{
      padding:5px;
      border-radius:5px;
      background-color: #F3BB1B !important;
      margin: 0 auto;
    }
    .in-progress{
      padding:5px;
      border-radius:5px;
      background-color: #3F66FB !important;
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
        {id: 1, name: "John Doe", status:"WAITING", lastUpdate:"Apr 11 @ 4:25 PM"},
        {id: 2, name: "Jane Doe", status:"GOOD", lastUpdate:"Apr 6 @ 4:15 PM"},
        {id: 3, name: "Ben Jerry", status:"IN PROGRESS", lastUpdate:"Apr 2 @ 10:25 AM"},
        {id: 4, name: "Sue Loo", status:"UPSET", lastUpdate:"Apr 12 @ 11:25 AM"},
        {id: 5, name: "Billy Joe", status:"GOOD", lastUpdate:"Apr 1 @ 1:02 PM"},
        {id: 6, name: "Jimmy Jean", status:"WAITING", lastUpdate:"Mar 4 @ 2:21 PM"},
      ],
    };
  },
};
</script>
