<template>
  <md-card class="panel">
    <md-card-content class="register-panel">
      <h4 class="title">Register</h4>
      <md-field>
        <label>First Name</label>
        <md-input v-model="creds.firstName" id="firstName"></md-input>
      </md-field>
      <md-field>
        <label>Last Name</label>
        <md-input v-model="creds.lastName" id="lastName"></md-input>
      </md-field>
      <md-field>
        <label>Email</label>
        <md-input v-model="creds.email" id="email"></md-input>
      </md-field>
      <md-field>
        <label>Username</label>
        <md-input v-model="creds.username" id="username"></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input v-model="creds.password" id="password" type=password></md-input>
      </md-field>
      <md-card-actions layout="row" md-alignment="right">
        <md-button data-background-color="blue" type="submit" @click="handleRegister">Register</md-button>
      </md-card-actions>
    </md-card-content>
  </md-card>
</template>

<style lang="scss" scoped>
.main-panel{
  float:center;
}
.register-panel{
  display:block;
  width: 100%;
}
.md-card{
  display: flex;
  margin: 100px auto;
  width: 30vw;
  min-width:300px;
}
</style>

<script>
export default {
  name: 'Register',
  data() {
    return {
      creds:{
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
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.creds).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>