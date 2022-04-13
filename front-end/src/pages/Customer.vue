<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="grey">
            <h4 class="title">Currently Viewing: {{getCustomerById.name}}</h4>
            <p class="category">Below you can view/update the status of the customer.</p>
          </md-card-header>
          <md-card-actions  id="customer-list-button" md-alignment="left">
            <md-button :to="'/customers/'" data-background-color="blue"> Back to Customer List</md-button>
          </md-card-actions>
          <md-card-content id="customer">
            <div class="md-layout">
              <md-card class="customer md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-100 md-large-size-100 md-size-100">
                <md-card-content id="main-panel">
                  <div class="md-title">
                    {{getCustomerById.name}}
                  </div>
                  <div class="status" >
                    <span :class="getCustomerById.status.replace(' ', '-').toLowerCase()" >{{getCustomerById.status}}</span>
                  </div>
                  <md-card class="panel">
                    <h4 class="title">Customer Interactions</h4>
                    <md-card-content class="panel-content">
                      <template v-for="(logMessage, index) in getCustomerLogsById">
                        <md-card class="log-message" :key="index">
                          <md-card-header class="timestamp" :data-background-color="logMessage.important ? 'red' : 'grey'">
                            <p class="title">{{logMessage.timeStamp.toLocaleString("en-US")}}</p>
                          </md-card-header>
                          {{logMessage.message}}
                        </md-card>
                      </template>
                    </md-card-content>
                  </md-card>
                  <md-card class="panel">
                    <h4 class="title">New Interaction</h4>
                    <md-field>
                      <label>Record a customer interaction</label>
                      <md-textarea v-model="textarea"></md-textarea>
                    </md-field>
                    <md-card-actions layout="row" md-alignment="space-between">
                      <div id="important-checkbox">
                        <md-checkbox v-model="important">Important?</md-checkbox>
                      </div>
                      <md-button data-background-color="blue">Submit</md-button>
                    </md-card-actions>
                  </md-card>
                  <md-card class="panel">
                    <h4 class="title">Customer Information</h4>
                    <p>Name: {{getCustomerById.name}}</p>
                    <p>Phone Number: {{getCustomerById.phone}}</p>
                    <p>Address: {{getCustomerById.address}}</p>
                    <md-card-actions layout="row" md-alignment="right">
                      <md-button data-background-color="blue">Update </md-button>
                    </md-card-actions>
                  </md-card>
                </md-card-content>
                <md-card-actions layout="row" md-alignment="right">
                  <md-dialog-confirm 
                    :md-active.sync="active"
                    :md-title="'Delete customer ' + getCustomerById.name + '?'"
                    md-content="Are you sure you want to delete this customer? This action is final and cannot be reverted."
                    md-confirm-text="Delete"
                    md-cancel-text="Cancel"
                    @md-cancel="onCancel"
                    @md-confirm="onConfirm"/>
                  <md-button data-background-color="red" @click="active = true">Delete Customer</md-button>
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
  #important-checkbox .md-checkbox {
    display: flex;
  }
  #customer-list-button{
    margin-top:20px;
    margin-bottom:0px;
    padding:0;
    border-top:0;
  }
  .md-card .customer {
    margin: 10px auto;
    padding: 0 5px;
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

  #main-panel{
    padding: 15px 5px;
  }

  .panel{
    padding:5px;
    padding-top:10px;
    margin: 10px 0;
    .panel-content{
      overflow-y: scroll;
      height: 300px;
    }
  }

  .log-message{
    padding: 5px;
    margin: 10px 0;
  }

  .md-card .timestamp{
    padding:0 5px;
    width: intrinsic;           /* Safari/WebKit uses a non-standard name */
    width: -moz-max-content;    /* Firefox/Gecko */
    width: -webkit-max-content; /* Chrome */
    width: max-content;
    font-size:5px;
  }
</style>

<script>
export default {
  props: {
    dataBackgroundColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      important: false,
      active: false,
      value: null,
      customers: [
        {id: 1, name: "John Doe", phone: "506-310-3030", address: "42 Wallaby Way, Sydney", status:"WAITING", lastUpdate:"Apr 11 @ 4:25 PM"},
        {id: 2, name: "Jane Doe", phone: "506-310-3030", address: "42 Wallaby Way, Sydney", status:"GOOD", lastUpdate:"Apr 6 @ 4:15 PM"},
        {id: 3, name: "Ben Jerry", phone: "506-310-3030", address: "42 Wallaby Way, Sydney", status:"IN PROGRESS", lastUpdate:"Apr 2 @ 10:25 AM"},
        {id: 4, name: "Sue Loo", phone: "506-310-3030", address: "42 Wallaby Way, Sydney", status:"UPSET", lastUpdate:"Apr 12 @ 11:25 AM"},
        {id: 5, name: "Billy Joe", phone: "506-310-3030", address: "42 Wallaby Way, Sydney", status:"GOOD", lastUpdate:"Apr 1 @ 1:02 PM"},
        {id: 6, name: "Jimmy Jean", phone: "506-310-3030", address: "42 Wallaby Way, Sydney", status:"WAITING", lastUpdate:"Mar 4 @ 2:21 PM"},
      ],
      conversationLogs: [
          {id: 1, customer_id: 1, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", important: false, timeStamp: new Date()},
          {id: 1, customer_id: 1, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", important: true, timeStamp: new Date()},
          {id: 1, customer_id: 1, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", important: false, timeStamp: new Date()},
          {id: 1, customer_id: 5, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", important: true, timeStamp: new Date()},
          {id: 1, customer_id: 1, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", important: false, timeStamp: new Date()},
          {id: 1, customer_id: 1, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", important: false, timeStamp: new Date()},
          {id: 1, customer_id: 2, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", important: false, timeStamp: new Date()},
          {id: 1, customer_id: 3, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", important: true, timeStamp: new Date()},
          {id: 1, customer_id: 1, message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur feugiat justo. Sed bibendum pretium ligula. Quisque hendrerit pretium lobortis. Nunc erat enim, ultrices et ipsum vitae, semper volutpat magna.", important: false, timeStamp: new Date()},
          {id: 7, customer_id: 1, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", important: true, timeStamp: new Date()},
          {id: 8, customer_id: 2, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", important: false, timeStamp: new Date()},
          {id: 9, customer_id: 3, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", important: false, timeStamp: new Date()},
          {id: 10, customer_id: 4, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", important: true, timeStamp: new Date()},
          {id: 11, customer_id: 5, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", important: false, timeStamp: new Date()},
          {id: 12, customer_id: 6, message: "Morbi vitae quam tincidunt, eleifend diam vitae, commodo metus. Maecenas turpis enim, lacinia porta malesuada eget, sodales non libero.", important: false, timeStamp: new Date()},
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
  },
  methods: {
    onConfirm () {
      this.value = 'delete'
    },
    onCancel () {
      this.value = 'don\'t delete'
    }
  }
};
</script>
