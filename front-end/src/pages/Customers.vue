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
            <md-dialog 
                    :md-active.sync="active"
                    md-content="Add in the customer information and click 'Create'">
              <md-dialog-title>Create New Customer</md-dialog-title>
              <md-card id="new-customer-card">
                <div style="display:flex;">
                  <md-field class="name" required>
                    <label>* First Name</label>
                    <md-input v-model="type" id="firstName"></md-input>
                  </md-field>
                  <md-field class="name" required>
                    <label>* Last Name</label>
                    <md-input v-model="type" id="lastName"></md-input>
                  </md-field>
                </div>
                <md-field>
                  <label>Email</label>
                  <md-input v-model="type" id="email"></md-input>
                </md-field>
                <md-field>
                  <label>Phone Number</label>
                  <md-input v-model="type" id="phone"></md-input>
                </md-field>
                <md-field>
                  <label>Address</label>
                  <md-input v-model="type" id="address"></md-input>
                </md-field>
                <span class="md-caption">* = required field</span>
                <md-card-actions layout="row" md-alignment="space-between">
                    <md-button @click="active = false;">
                      CANCEL
                    </md-button>
                    <md-button class="md-primary" @click="active = false;">
                      CREATE
                    </md-button>
                  </md-card-actions>
              </md-card>
            </md-dialog>
            <md-button @click="active = true">New Customer</md-button>
          </md-card-actions>
          <md-card-content id="customer-list">
            <div class="md-layout">
              <md-card class="customer md-layout-item md-xsmall-size-100 md-small-size-45 md-medium-size-45 md-large-size-45 md-size-45 m-sm-1" v-for="(customer,index) in customers" :key="index">
                <router-link :to="'/customer/' + customer.id">
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
                </router-link>
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

  .md-card::v-deep .md-card-content{
    padding: 15px 5px;
  }

  #new-customer-card{
    position:relative;
    margin: 10px auto;
    padding:5px 20px;
    .name{
      position:relative;
      min-width:50%;
      width: 50%;
    }
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
    color:white;
    .good{
      padding:5px;
      border-radius:5px;
      background-color: #3DC13C !important;
    }
    .upset{
      padding:5px;
      border-radius:5px;
      background-color: #F13637 !important;
    }
    .waiting{
      padding:5px;
      border-radius:5px;
      background-color: #F3BB1B !important;
    }
    .in-progress{
      padding:5px;
      border-radius:5px;
      background-color: #3F66FB !important;
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
      active: false,
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
