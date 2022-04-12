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
            <md-card class="customer">
              <md-card-content>
                <div class="md-title">
                  John Doe
                </div>
                <div class="md-subhead">
                  Last Update: Apr 7, 2022 @ 12:35PM
                </div>
              </md-card-content>
              <md-card-actions layout="row" md-alignment="space-between">
                <md-button>Open</md-button>
                <md-button>Delete</md-button>
              </md-card-actions>
            </md-card>
            <md-card class="customer">
              <md-card-content>
                <div class="md-title">
                  Jane Doe
                </div>
                <div class="md-subhead">
                  Last Update: Apr 11, 2022 @ 9:47AM
                </div>
              </md-card-content>
              <md-card-actions layout="row" md-alignment="space-between">
                <md-button>Open</md-button>
                <md-button>Delete</md-button>
              </md-card-actions>
            </md-card>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #new-customer{
    margin-top:10px;
    margin-bottom:0px;
  }

  #customer-list{
    margin-top:-20px;
  }
  .customer {
    margin-bottom: 5px;
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
};
</script>
