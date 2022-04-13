<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Customer List</h4>
            <p class="category">Select a customer from the list below, or add a new customer to the system.</p>
          </md-card-header>
          <md-card-actions id="new-customer" md-alignment="right">
            <md-button>New Customer</md-button>
          </md-card-actions>
          <md-card-content id="customer-list">
            <div class="md-layout">
              <md-card class="customer md-layout-item md-xsmall-size-100 md-small-size-45 md-medium-size-45 md-large-size-45 md-size-45" v-for="(customer,index) in customers" :key="index">
                <md-card-content>
                  <div class="md-title">
                    {{customer.name}}
                  </div>
                  <div class="status" >
                    <span :class="customer.status.replace(' ', '-').toLowerCase()" >{{customer.status}}</span>
                  </div>
                  <div class="md-subhead">
                    Last update to customer made on {{customer.lastUpdate}}
                  </div>
                </md-card-content>
                <md-card-actions layout="row" md-alignment="right">
                  <md-button :to="'/customer/' + customer.id">
                    OPEN
                  </md-button>
                </md-card-actions>
              </md-card>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #new-customer{
    margin-top:10px;
    margin-bottom:10px;
    padding:0;
    border-top:0;
  }

  div.md-layout{
    display:flex;
    justify-content: space-between;
  }

  #customer-list{
    margin-top:-20px;
    display: inline-block;
  }
  .md-card .customer {
    margin: 10px auto;
  }
  .status{
    margin:5px;
    text-align: left;
    font-weight: 500;
    .good{
      padding:5px;
      border-radius:5px;
      background-color: lawngreen !important;
    }
    .upset{
      padding:5px;
      border-radius:5px;
      background-color: indianred !important;
    }
    .waiting{
      padding:5px;
      border-radius:5px;
      background-color: mediumspringgreen !important;
    }
    .in-progress{
      padding:5px;
      border-radius:5px;
      background-color: dodgerblue !important;
    }
  }
</style>

<script>
export default {
  props: {
    dataBackgroundColor: {
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
