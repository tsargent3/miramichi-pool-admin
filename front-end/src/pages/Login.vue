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
        <md-button data-background-color="blue" type="submit" @click='loginUser'>Login</md-button>
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
import { mapMutations } from "vuex";
import AuthDataService from "../services/AuthDataService";
export default {
  data: () => {
    return {
      creds:{
        username: "",
        password: "",
      }
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    
    async loginUser() {
      try {
        let response = await AuthDataService.login(this.creds);
        let token = response.data.token;
        localStorage.setItem("jwt", token);
        if (token) {
          swal("Success", "Login Successful", "success");
          this.$router.push("/dashboard");
        }
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
    },
  },
};
</script>