<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Currently Viewing: {{getCustomerById.name}}</h4>
            <p class="category">Below you can view/update the status of the customer.</p>
          </md-card-header>
          <md-card-actions  id="customer-list-button" md-alignment="left">
            <md-button :to="'/customers/'"> &lt;&nbsp;&nbsp; Customer List</md-button>
          </md-card-actions>
          <md-card-content id="customer">
            <div class="md-layout">
              <md-card class="customer md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-100 md-large-size-100 md-size-100">
                <md-card-content>
                  <div class="md-title">
                    {{getCustomerById.name}}
                  </div>
                  <div class="status" >
                    <span :class="getCustomerById.status.replace(' ', '-').toLowerCase()" >{{getCustomerById.status}}</span>
                  </div>
                  <template v-for="logMessage in getCustomerLogsById">
                    <div class="md-subhead" :key="logMessage.id">
                        {{logMessage.timeStamp}} - {{logMessage.message}}
                    </div>
                  </template>
                </md-card-content>
                <md-card-actions layout="row" md-alignment="right">
                  <md-button data-background-color="red">Delete</md-button>
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
  #customer-list-button{
    margin-top:10px;
    margin-bottom:10px;
    padding:0;
    border-top:0;
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
      conversationLogs: [
          {id: 1, customer_id: 1, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 2, customer_id: 2, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 3, customer_id: 3, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 4, customer_id: 4, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 5, customer_id: 5, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 6, customer_id: 6, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 7, customer_id: 1, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 8, customer_id: 2, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 9, customer_id: 3, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 10, customer_id: 4, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 11, customer_id: 5, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", timeStamp: "04-11-2022 10:47:32.532"},
          {id: 12, customer_id: 6, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", timeStamp: "04-11-2022 10:47:32.532"},
      ],
    };
  },
  computed: {
    getCustomerById() {
        return this.customers.filter(customer => customer.id == this.$route.params.customer_id)[0]
    },
    getCustomerLogsById() {
        return this.conversationLogs.filter(conversationLog => conversationLog.customer_id == this.$route.params.customer_id)
    },
  }
};
</script>
