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
        <md-button data-background-color="blue" type="submit" @click="registerUser">Register</md-button>
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
import AuthDataService from "../services/AuthDataService";
export default {
  data: () => {
    return {
      creds:{
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }
    };
  },
  methods: {
    async registerUser() {
      try{
        const response = await AuthDataService.register(this.creds);
        console.log(response);
        let token = response.data.token;
        if (token) {
            localStorage.setItem("jwt", token);
            console.log("Successful login");
            this.$router.push("/");
        } else {
            console.log("Something went wrong");
        }
      } catch (err) {
        let error = err.response;
        console.log("Error: " + error.data.message);
      }
    },
  },
};
</script>