<template>
  <md-card class="panel">
    <md-card-content class="login-panel">
      <h4 class="title">Login</h4>
      <md-field>
        <label>Username</label>
        <md-input v-model="creds.username" id="username"></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input v-model="creds.password" id="password" type=password></md-input>
      </md-field>
      <md-card-actions layout="row" md-alignment="right">
        <md-button data-background-color="blue" type="submit" @click="handleLogin">Login</md-button>
      </md-card-actions>
    </md-card-content>
  </md-card>
</template>

<style lang="scss" scoped>
.main-panel{
  float:center;
}
.login-panel{
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
  name: 'Login',
  data() {
    return {
      creds:{
        username: "",
        password: "",
      },
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.creds.username && this.creds.password) {
          this.$store.dispatch('auth/login', this.creds).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>