<template>
  <div class="content">
    <v-layout>
      <v-card class="customers-panel">
        <v-card-title>
          <h4 class="title">
            Customer List
          </h4>
          <p class="category">
            Select a customer from the list below, or add a new customer to the system.
          </p>
        </v-card-title>
        <v-card-actions id="new-customer">
          <v-dialog 
            v-model="active"
          >
            <v-card id="new-customer-card">
              <h3>Create New Customer</h3>
              <div style="display:flex;">
                <v-text-field hide-details label="* First Name" class="name" id="firstName" v-model="newCustomer.firstName" required>
                </v-text-field>
                <v-text-field hide-details label="* Last Name"  class="name" id="lastName" v-model="newCustomer.lastName" required>
                </v-text-field>
              </div>
              <v-text-field hide-details label="Email" v-model="newCustomer.email" id="email">
              </v-text-field>
              <v-text-field hide-details label="Phone Number" v-model="newCustomer.phone" id="phone">
              </v-text-field>
              <v-text-field hide-details label="Address" v-model="newCustomer.address" id="address">
              </v-text-field>
              <v-text-field hide-details label="Postal Code" v-model="newCustomer.postalCode" id="postalCode">
              </v-text-field>
              <span class="v-caption">* = required field</span>
              <v-card-actions>
                  <v-btn @click="active = false;"
                  style="color: rgba(var(--v-theme-on-surface),var(--v-high-emphasis-opacity));">
                    CANCEL
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="createCustomer();"
                  style="background-color: #3FA2C7;">
                    CREATE
                  </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn @click="active = true"
            style="background-color: #3FA2C7;"
          >
            New Customer
          </v-btn>
        </v-card-actions>
        <v-layout id="customer-list">
          <v-card
            v-for="(customer,index) in customers"
            :key="index"
            :class="isMobile() ? 'customer mobile v-layout-item v-xsmall-size-100 v-small-size-45 v-medium-size-45 v-large-size-45 v-size-45 m-sm-1' : 'customer v-layout-item v-xsmall-size-100 v-small-size-45 v-medium-size-45 v-large-size-45 v-size-45 m-sm-1'"
            :style="isMobile() ? 'width: 98%' : 'width: 49%;'"
          >
            <router-link :to="'/customer/' + customer._id">
              <div class="v-card-content">
                <div class="v-title">
                  {{ customer.firstName + " " + customer.lastName }}
                </div>
                <div class="status">
                  <span :class="customer.status.replace(' ', '-').toLowerCase()">{{ customer.status.toUpperCase() }}</span>
                </div>
                <div class="v-subhead">
                  Last update to customer made on {{ new Date(customer.updatedAt).toLocaleString() }}
                </div>
              </div>
              <v-card-actions
                layout="row"
              >
                <v-spacer></v-spacer>
                <v-btn 
                  :to="'/customer/' + customer.id"
                  style="background-color: #3FA2C7;"
                  color="white"
                >
                  OPEN
                </v-btn>
              </v-card-actions>
            </router-link>
          </v-card>
          <div 
          class="filter-empty-space">
          </div>
        </v-layout>
      </v-card>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
  .customers-panel{
    width: 100%;
    height: 100%;
    background: rgb(var(--v-theme-background));
  }
  #new-customer{
    margin: 10px;
    padding:0;
    border-top:0;
  }

  #new-customer-card{
    padding:5px 20px;
    min-width:330px;
    width:33vw;
    .name{
      position:relative;
      min-width:50%;
      width: 50%;
    }
    .v-text-field{
      padding: 5px;
    }
  }

  div.v-layout{
    display:flex;
    justify-content: space-around;
  }

  #customer-list{
    width:100%;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    overflow-y:visible;
  }
  .v-card-title{
    display:block;
    padding: 8px;
  }
  .v-card.customer {
    position:relative;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .customer:nth-child(odd):not(.mobile){
    margin-left: 8px;
    margin-right: 4px;
  }

  .customer:nth-child(even):not(.mobile){
    margin-left: 4px;
    margin-right: 8px;
  }
  .v-card.customer.mobile{
    margin: 8px 16px;
  }

  .status{
    margin:5px auto;
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

  a{
    color: rgba(var(--v-theme-on-surface),var(--v-high-emphasis-opacity));
    text-decoration: unset;
  }

  .v-btn{
    color: white;
  }

  .category{
    font-weight: 400;
  }
  .v-dialog .v-overlay__content{
    margin:0;
  }
  .filter-empty-space{
    height: 0;
    width: 49%;
    margin-left: 4px;
    margin-right: 8px;
  }
</style>

<script>
import CustomerService from "../services/customer.service";
export default {
  name:"CustomersPanel",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      active: false,
      customers: '',
      newCustomer: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        postalCode: "",
      }
    };
  },
  methods:{
    getAllCustomers() {
      CustomerService.getAll()
        .then( response => {
          this.customers = response.data.customers;
          console.log(this.customers);
        })
        .catch(e => {
          console.log(e);
        });
    },
    createCustomer(){
      var data = {
        firstName: this.newCustomer.firstName,
        lastName: this.newCustomer.lastName,
        email: this.newCustomer.email,
        phone: this.newCustomer.phone,
        address: this.newCustomer.address,
        postalCode: this.newCustomer.postalCode,
      };
      CustomerService.create(data)
        .then(response => {
          console.log(response.data);
          this.active = false;
          this.$notify({ 
            type: "success", 
            title: "User created successfully!",
          });
          this.$router.push("/customer/" + response.data.customer_id);
        })
        .catch(e => {
          console.log(e);
        });
    },
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  },
  mounted(){
    this.getAllCustomers();
  }
};
</script>
