<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header data-background-color="blue">
            <h4 class="title">Currently Viewing: {{getCustomerById.firstName}} {{getCustomerById.lastName}}</h4>
            <p class="category">Below you can view/update the status of the customer.</p>
          </md-card-header>
          <md-card-actions  id="customer-list-button" md-alignment="left">
            <md-button :to="'/customers/'" data-background-color="grey"> Back to Customer List</md-button>
          </md-card-actions>
          <md-card-content id="customer">
            <div class="md-layout">
              <md-card class="customer md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-100 md-large-size-100 md-size-100">
                <md-card-content id="main-panel">
                  <div class="md-title">
                    {{getCustomerById.firstName}} {{getCustomerById.lastName}}
                  </div>
                  <div class="status" >
                    <md-menu md-direction="bottom-middle" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect">
                      <md-button :class="status" md-menu-trigger>{{status}}<md-icon>arrow_drop_down</md-icon></md-button>
                      <md-menu-content>
                        <md-menu-item @click="status = 'good'"><p class="status-option">GOOD</p></md-menu-item>
                        <md-menu-item @click="status = 'waiting'"><p class="status-option">WAITING</p></md-menu-item>
                        <md-menu-item @click="status = 'in-progress'"><p class="status-option">IN PROGRESS</p></md-menu-item>
                        <md-menu-item @click="status = 'upset'"><p class="status-option">UPSET</p></md-menu-item>
                      </md-menu-content>
                    </md-menu>
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
                    <p>Name: {{getCustomerById.firstName}} {{getCustomerById.lastName}}</p>
                    <p>Phone Number: {{getCustomerById.phone}}</p>
                    <p>Address: {{getCustomerById.address}}</p>
                    <p>Postal Code: {{getCustomerById.postalCode}}</p>
                    <md-card-actions layout="row" md-alignment="right">
                      <md-dialog 
                              :md-active.sync="updateActive"
                              md-content="Modify the customer information and click 'Create'">
                        <md-dialog-title>Update Customer</md-dialog-title>
                        <md-card id="update-customer-card">
                          <div style="display:flex;">
                            <md-field class="name" required>
                              <label>* First Name</label>
                              <md-input v-model="getCustomerById.firstName" id="firstName"></md-input>
                            </md-field>
                            <md-field class="name" required>
                              <label>* Last Name</label>
                              <md-input v-model="getCustomerById.lastName" id="lastName"></md-input>
                            </md-field>
                          </div>
                          <md-field>
                            <label>Email</label>
                            <md-input v-model="getCustomerById.email" id="email" :value="getCustomerById.email"></md-input>
                          </md-field>
                          <md-field>
                            <label>Phone Number</label>
                            <md-input v-model="getCustomerById.phone" id="phone" :value="getCustomerById.phone"></md-input>
                          </md-field>
                          <md-field>
                            <label>Address</label>
                            <md-input v-model="getCustomerById.address" id="address">{{getCustomerById.address}}</md-input>
                          </md-field>
                          <md-field>
                            <label>Postal Code</label>
                            <md-input v-model="getCustomerById.postalCode" id="postalCode">{{getCustomerById.postalCode}}</md-input>
                          </md-field>
                          <span class="md-caption">* = required field</span>
                          <md-card-actions layout="row" md-alignment="space-between">
                              <md-button @click="updateActive = false;">
                                CANCEL
                              </md-button>
                              <md-button class="md-primary" @click="updateActive = false;">
                                UPDATE
                              </md-button>
                            </md-card-actions>
                        </md-card>
                      </md-dialog>
                      <md-button @click="updateActive = true" data-background-color="blue">Update</md-button>
                    </md-card-actions>
                  </md-card>
                </md-card-content>
                <md-card-actions layout="row" md-alignment="right">
                  <md-dialog-confirm 
                    :md-active.sync="deleteActive"
                    :md-title="'Delete customer ' + getCustomerById.name + '?'"
                    md-content="Are you sure you want to delete this customer? This action is final and cannot be reverted."
                    md-confirm-text="Delete"
                    md-cancel-text="Cancel"
                    @md-cancel="onCancel"
                    @md-confirm="onConfirm"/>
                  <md-button data-background-color="red" @click="deleteActive = true">Delete Customer</md-button>
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

  .md-field::v-deep {
    margin: 5px 4px 8px 4px;
  }
  .md-field::v-deep label{
    font-size: 0.7rem;
  }
  .md-dialog::v-deep .md-dialog-title{
    padding-top: 10px;
    margin-bottom: 6px;
  }
  .md-dialog::v-deep .md-dialog-container {
    text-align: center;
    min-width: 340px;
    width: 50vw;
    padding: 5px 20px;
    max-width: 600px;
    max-height: 80%;
    height:unset;
    border-radius:2px;
    transform:unset;
    margin: 100px;
  }
  #update-customer-card{
    position:relative;
    margin: 10px auto;
    padding:5px 20px;
    .name{
      position:relative;
      min-width:50%;
      width: 50%;
    }
  }
  .md-menu {
    margin: 10px 0;
  }
  .md-menu-content{
    margin-top:45px;
  }
  .status-option{
    width:100%;
    display: block;
    text-align: center;
    margin-bottom:0;
  }
  #important-checkbox .md-checkbox {
    display: flex;
  }
  #customer-list-button{
    margin-top:10px;
    margin-bottom:0px;
    padding:0;
    border-top:0;
  }
  .md-card .customer {
    margin: 10px auto;
    margin-top:0px;
    padding: 0 5px;
  }
  .status{
    margin:5px;
    text-align: left;
    .good{
      border-radius:5px;
      background-color: #3DC13C !important;
      font-weight: 600;
    }
    .upset{
      border-radius:5px;
      background-color: #F13637 !important;
      font-weight: 600;
    }
    .waiting{
      padding:0;
      border-radius:5px;
      background-color: #F3BB1B !important;
      font-weight: 600;
    }
    .in-progress{
      border-radius:5px;
      background-color: #3F66FB !important;
      font-weight: 600;
    }
  }

  #main-panel{
    padding: 10px 5px;
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
    let customerList = [
        {id: 1, firstName: "John", lastName: "Doe", phone: "506-310-3030", email:"example@miramichipool.com", address: "42 Wallaby Way, Sydney", postalCode: "E1N 3V4", status:"waiting", lastUpdate:"Apr 11 @ 4:25 PM"},
        {id: 2, firstName: "Jane", lastName: "Doe", phone: "506-310-3030", email:"example@miramichipool.com", address: "42 Wallaby Way, Sydney", postalCode: "E1N 3V4", status:"good", lastUpdate:"Apr 6 @ 4:15 PM"},
        {id: 3, firstName: "Ben", lastName: "Jerry", phone: "506-310-3030", email:"example@miramichipool.com", address: "42 Wallaby Way, Sydney", postalCode: "E1N 3V4", status:"in progress", lastUpdate:"Apr 2 @ 10:25 AM"},
        {id: 4, firstName: "Sue", lastName: "Loo", phone: "506-310-3030", email:"example@miramichipool.com", address: "42 Wallaby Way, Sydney", postalCode: "E1N 3V4", status:"upset", lastUpdate:"Apr 12 @ 11:25 AM"},
        {id: 5, firstName: "Billy", lastName: "Joe", phone: "506-310-3030", email:"example@miramichipool.com", address: "42 Wallaby Way, Sydney", postalCode: "E1N 3V4", status:"good", lastUpdate:"Apr 1 @ 1:02 PM"},
        {id: 6, firstName: "Jimmy", lastName: "Jean", phone: "506-310-3030", email:"example@miramichipool.com", address: "42 Wallaby Way, Sydney", postalCode: "E1N 3V4", status:"waiting", lastUpdate:"Mar 4 @ 2:21 PM"},
        ];
    let customerLogsList = [
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
          ];
    return {
      status: customerList[this.$route.params.customer_id - 1].status,
      closeOnClick: false,
      closeOnSelect: true,
      important: false,
      deleteActive: false,
      updateActive: false,
      value: null,
      customers: customerList,
      conversationLogs: customerLogsList,
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
