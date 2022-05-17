<template>
  <div class="content">
    <div class="v-layout main-layout">
      <v-card class="customer-panel">
        <v-card-title data-background-color="blue">
          <h4 class="title">
            Currently Viewing: {{ customer.firstName }} {{ customer.lastName }}
          </h4>
          <p class="category">
            Below you can view/update the status of the customer.
          </p>
        </v-card-title>
        <div class="v-layout main-layout">
          <v-card class="customer v-layout-item v-xsmall-size-100 v-small-size-100 v-medium-size-100 v-large-size-100 v-size-100">
            <v-card-actions class="main-action">
              <router-link
                to="/customers"
              >
                <v-btn
                  style="background-color: #3FA2C7;"
                  color="white"
                  ml-10
                >
                  Back to Customer List
                </v-btn>
              </router-link>
            </v-card-actions>
            <v-card-text id="main-panel">
              <div class="status">
                  <v-btn-toggle
                    v-model="customer.status"
                    color="primary"
                    mandatory
                    v-if="!isMobile()"
                  >
                    <v-btn prepend-icon="mdi-emoticon-happy-outline" value="good" color="#3DC13C" @click="() => updateCustomerStatus()">
                        GOOD
                    </v-btn>
                    <v-btn prepend-icon="mdi-clock-outline" value="waiting" color="#F3BB1B" @click="() => updateCustomerStatus()">
                        WAITING
                    </v-btn>
                    <v-btn prepend-icon="mdi-pencil" value="in progress" color="#3F66FB" @click="() => updateCustomerStatus()">
                        IN PROGRESS
                    </v-btn>
                    <v-btn prepend-icon="mdi-emoticon-sad-outline" value="upset" color="#F13637" @click="() => updateCustomerStatus()">
                        UPSET
                    </v-btn>
                  </v-btn-toggle>
                  <v-btn-toggle
                    v-model="customer.status"
                    color="primary"
                    mandatory
                    v-else
                  >
                    <v-btn icon="mdi-emoticon-happy-outline" value="good" color="#3DC13C" @click="() => updateCustomerStatus()">
                    </v-btn>
                    <v-btn icon="mdi-clock-outline" value="waiting" color="#F3BB1B" @click="() => updateCustomerStatus()">
                    </v-btn>
                    <v-btn icon="mdi-pencil" value="in progress" color="#3F66FB" @click="() => updateCustomerStatus()">
                    </v-btn>
                    <v-btn icon="mdi-emoticon-sad-outline" value="upset" color="#F13637" @click="() => updateCustomerStatus()">
                    </v-btn>
                  </v-btn-toggle>
              </div>
              <v-card class="panel">
                <h3 class="title">
                  Customer Interactions
                </h3>
                <div class="v-card-content panel-content" v-if="interactions !== ''">
                  <v-hover
                    v-slot="{ isHovering, props }"
                    v-for="(logMessage, index) in interactions"
                    :key="logMessage._id"
                  >
                    <v-card class="log-message"
                    :style="{border: logMessage.important ? '1px solid #F13637' : ''}"
                    :class="{ 'on-hover': isHovering }"
                    v-bind="props">
                      <v-card-header
                        class="timestamp"
                      >
                        <p>
                          {{logMessage.authorName + " - " + new Date(logMessage.updatedAt).toLocaleString() }}
                        </p>
                      </v-card-header>
                      <div>{{logMessage.message}}</div>
                      <v-btn
                      :class="isHovering ? 'hovering delete-button' : 'delete-button'"
                      @click="deleteInteractionActive[index] = true;"
                      icon="mdi-trash-can-outline">
                      </v-btn>
                      <v-dialog
                        v-model="deleteInteractionActive[index]">
                        <v-card id="delete-card">
                          <h3>Delete {{logMessage.authorName}}'s interaction with {{ customer.firstName }} {{ customer.lastName }}?</h3>
                          <p>Are you sure you want to delete this interaction?</p>
                          <v-card-actions>
                            <v-btn @click="deleteInteractionActive[index] = false;"
                            style="color: rgba(var(--v-theme-on-surface),var(--v-high-emphasis-opacity));">
                              CANCEL
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn @click="deleteInteraction(logMessage._id)"
                            style="background-color: #F13637;">
                              DELETE
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card>
                  </v-hover>
                </div>
              </v-card>
              <v-card class="panel">
                <h3 class="title">
                  New Interaction
                </h3>
                <v-textarea 
                  outlined
                  name="interaction-text"
                  label="Record a customer interaction"
                  v-model="newInteraction"
                  hide-details
                />
                <v-card-actions
                >
                  <div id="important-checkbox">
                    Important?
                    <v-checkbox v-model="important">
                    </v-checkbox>
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn @click="createInteraction()">
                    Submit
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card class="panel">
                <h3 class="title">
                  Customer Information
                </h3>
                <p>Name: {{ customer.firstName }} {{ customer.lastName }}</p>
                <p>Phone Number: {{ customer.phone }}</p>
                <p>Email: {{ customer.email }}</p>
                <p>Address: {{ customer.address }}</p>
                <p>Postal Code: {{ customer.postalCode }}</p>
                <v-card-actions
                  layout="row"
                >
                  <v-dialog 
                    v-model="updateActive"
                  >
                    <v-card id="update-customer-card">
                      <h3>Update Customer Info</h3>
                      <div style="display:flex;">
                        <v-text-field hide-details label="* First Name" class="name" id="firstName" v-model="customerUpdate.firstName" required>
                        </v-text-field>
                        <v-text-field hide-details label="* Last Name"  class="name" id="lastName" v-model="customerUpdate.lastName" required>
                        </v-text-field>
                      </div>
                      <v-text-field hide-details label="Email" v-model="customerUpdate.email" id="email">
                      </v-text-field>
                      <v-text-field hide-details label="Phone Number" v-model="customerUpdate.phone" id="phone">
                      </v-text-field>
                      <v-text-field hide-details label="Address" v-model="customerUpdate.address" id="address">
                      </v-text-field>
                      <span class="v-caption">* = required field</span>
                      <v-card-actions>
                          <v-btn @click="updateActive = false;"
                          style="color: rgba(var(--v-theme-on-surface),var(--v-high-emphasis-opacity));">
                            CANCEL
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn @click="updateCustomer();"
                          style="background-color: #3FA2C7;">
                            UPDATE
                          </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-spacer></v-spacer>
                  <v-btn
                    data-background-color="blue"
                    @click="updateActive = true"
                  >
                    Update
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card-text>
            <v-card-actions class="main-action">
              <v-dialog
                v-model="deleteActive">
                <v-card id="delete-card">
                  <h3>Delete Customer {{ customer.firstName }} {{ customer.lastName }}?</h3>
                  <p>Are you sure you want to delete this customer? This action is final and cannot be reverted.</p>
                  <v-card-actions>
                    <v-btn @click="deleteActive = false;"
                    style="color: rgba(var(--v-theme-on-surface),var(--v-high-emphasis-opacity));">
                      CANCEL
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="deleteCustomer()"
                    style="background-color: #F13637;">
                      DELETE
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-btn
                @click="deleteActive = true"
                style="background-color: #F13637;"
              >
                DELETE CUSTOMER
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .v-btn.delete-button{
    display:none;
    position: absolute;
    right: 8px;
    top:50%;
    transform: translateY(-50%);
  }

  .v-btn.delete-button.hovering{
    display: block;
  }
  .customer-panel{
    width: 100%;
    height: 100%;
    background: rgb(var(--v-theme-background));
  }
  #update-customer-card{
    position:relative;
    margin: 10px auto;
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
  .v-card-title{
    padding: 10px;
    display:block;
  }
  .status-option{
    width:100%;
    display: block;
    text-align: center;
    margin-bottom:0;
  }
  #important-checkbox{
    display: inline-flex;
    line-height:56px;
  }
  #important-checkbox .v-checkbox {
    display: flex;
  }
  .v-card .customer {
    position: relative;
    margin: 10px auto;
    margin-top:0px;
    padding: 0 5px;
    width:100%;
    background: rgb(var(--v-theme-background));
    box-shadow:none;
  }
  .status{
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
    background: rgb(var(--v-theme-background));
  }

  .panel{
    padding:10px;
    margin: 10px 0;
    .panel-content{
      overflow-y: scroll;
      height: 300px;
    }
  }

  .log-message{
    padding: 10px;
    margin: 10px 0;
    background: rgb(var(--v-theme-background));
    white-space: pre-wrap;
  }

  .v-card .timestamp{
    padding:0;
    font-size:12px;
  }

  .main-layout{
    overflow:unset;
  }

  a{
    color: black;
    text-decoration: unset;
  }

  .category{
    font-weight: 400;
  }

  .v-card-actions{
    background: rgb(var(--v-theme-surface));
    border-radius: 4px;
  }

  .main-action{
    padding: 5px;
    background: rgb(var(--v-theme-background));
    box-shadow:none;
  }
  #delete-card{
    position:relative;
    margin: 10px auto;
    padding:5px 20px;
    min-width:330px;
    width:33vw;
  }
</style>

<script>
import CustomerService from "../services/customer.service";
import InteractionService from "../services/interaction.service";
export default {
  name:"CustomerPanel",
  data() {
    return {
      customer: '',
      interactions: [],
      customerUpdate: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
      },
      closeOnClick: false,
      closeOnSelect: true,
      newInteraction: '',
      important: false,
      deleteActive: false,
      deleteInteractionActive: [],
      updateActive: false,
      value: null,
    };
  },
  methods: {
    // Customer
    getCustomer(id) {
      CustomerService.get(id)
        .then( response => {
          this.customer = response.data;

          this.customerUpdate.firstName = this.customer.firstName;
          this.customerUpdate.lastName = this.customer.lastName;
          this.customerUpdate.email = this.customer.email;
          this.customerUpdate.phone = this.customer.phone;
          this.customerUpdate.address = this.customer.address;
          this.customerUpdate.postalCode = this.customer.postalCode;
          
          console.log(this.customer);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateCustomer() {
      var data = {
        firstName: this.customerUpdate.firstName,
        lastName: this.customerUpdate.lastName,
        email: this.customerUpdate.email,
        phone: this.customerUpdate.phone,
        address: this.customerUpdate.address,
        postalCode: this.customerUpdate.postalCode,
      }
      CustomerService.update(this.$route.params.customer_id, data)
        .then( response => {
          this.customer = response.data.customer;
          this.updateActive = false;
          this.$notify({ 
            type: "success", 
            title: "User updated successfully!",
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateCustomerStatus() {
      var data = {
        status: this.customer.status,
      }
      CustomerService.updateStatus(this.$route.params.customer_id, data)
        .then( response => {
          this.customer = response.data.customer;
          this.$notify({ 
            type: "success", 
            title: "User status updated!",
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
    notifyCustomerUpdate(timestamp) {
      CustomerService.notifyUpdate(this.$route.params.customer_id, timestamp)
        .then( response => {
          this.customer = response.data.customer;
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteCustomer() {
      CustomerService.delete(this.$route.params.customer_id)
        .then( () => {
          this.deleteActive = false;
          this.$notify({ 
            type: "success", 
            title: "Customer deleted successfully!",
          });
          this.$router.push("/customers/" );
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Interactions
    getInteractions() {
      InteractionService.get(this.$route.params.customer_id)
        .then( response => {
          this.interactions = response.data.interactions;
          this.interactions.forEach((interaction,index) => this.deleteInteractionActive[index] = false);
        })
        .catch(e => {
          console.log(e);
        });
    },
    createInteraction(){
      const user = this.$store.state.auth.user;
      var data = {
        customerId: this.$route.params.customer_id,
        author: user,
        message: this.newInteraction,
        important: this.important,
      };
      InteractionService.create(data)
        .then(response => {
          this.interactions.push(response.data.interaction);
          this.newInteraction = '';
          this.important = false;
          this.$notify({ 
            type: "success", 
            title: "Interaction created successfully!",
          });
          this.notifyCustomerUpdate(response.data.interaction.createdAt);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteInteraction(id) {
      this.interactions.forEach((interaction,index) => {if(interaction._id === id){ this.deleteInteractionActive[index] = false; console.log(this.deleteInteractionActive + " found")}});
      InteractionService.delete(id)
        .then( () => {
          this.interactions = this.interactions.filter(interaction => interaction._id !== id);
          this.$notify({ 
            type: "success", 
            title: "Interaction deleted successfully!",
          });
        })
        .catch(e => {
          console.log(e);
        });
    },

    // Other
    onConfirm () {
      this.value = 'delete'
    },
    onCancel () {
      this.value = 'don\'t delete'
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
    this.getCustomer(this.$route.params.customer_id);
    this.getInteractions();
  }
};
</script>
