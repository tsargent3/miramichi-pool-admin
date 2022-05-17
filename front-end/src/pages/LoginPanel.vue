<template>
  <v-card class="panel">
    <div class="login-panel">
      <span class="title">
        Login
      </span>
      <v-form>
        <v-text-field
          id="username"
          v-model="creds.username"
          label="Username"
        />
        <v-text-field
          id="password"
          v-model="creds.password"
          type="password"
          label="Password"
        />
        <v-card-actions
          layout="row"
        >
          <v-btn
            data-background-color="blue"
            type="submit"
            @click="handleLogin"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.main-panel{
  float:center;
}
.login-panel{
  display:block;
  width: 100%;
  padding:10px;
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
  name: 'LoginPanel',
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/customers');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      // this.$validator.validateAll().then(isValid => {
      //   if (!isValid) {
      //     this.loading = false;
      //     return;
      //   }
        if (this.creds.username && this.creds.password) {
          this.$store.dispatch('auth/login', this.creds).then(
            () => {
              this.$router.push('/customers');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.$notify({ 
                type: "error", 
                title: this.message,
              });
            }
          );
        }
      // });
    }
  }
};
</script>