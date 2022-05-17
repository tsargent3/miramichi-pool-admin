<template>
  <v-card class="panel">
    <div class="register-panel">
      <h4 class="title">
        Register
      </h4>
      <v-text-field label="First Name" id="firstName" v-model="creds.firstName">
      </v-text-field>
      <v-text-field label="Last Name" id="lastName" v-model="creds.lastName">
      </v-text-field>
      <v-text-field label="Email Address" id="email" v-model="creds.email">
      </v-text-field>
      <v-text-field label="Username" id="username" v-model="creds.username">
      </v-text-field>
      <v-text-field label="Password" id="password" type="password" v-model="creds.password">
      </v-text-field>
      <v-card-actions>
        <v-btn
          type="submit"
          @click="handleRegister"
        >
          Register
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.main-panel{
  float:center;
}
.register-panel{
  display:block;
  width: 100%;
}
.v-card{
  display: flex;
  margin: 100px auto;
  width: 30vw;
  min-width:300px;
}
</style>

<script>
export default {
  name: 'RegisterPanel',
  data() {
    return {
      creds:{
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      },
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/customers');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      // this.$validator.validate().then(isValid => {
      //   if (isValid) {
          this.$store.dispatch('auth/register', this.creds).then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.$notify({ 
                type: "success", 
                title: this.message,
              });
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.$notify({ 
                type: "error", 
                title: this.message,
              });
              this.successful = false;
            }
          );
      //   }
      // });
    }
  }
};
</script>