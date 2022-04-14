<template>
  <div>
    <h1>LOGIN</h1>
    <form @submit="login">
      <input v-model="creds.username" placeholder="username" />
      <br />
      <br />
      <input v-model="creds.password" placeholder="password" type="password" />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

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
    async login(e) {
      e.preventDefault();
      const response = await AuthDataService.login(this.creds);
      console.log(response);
      const { user, token } = await response.json();
      this.setUser(user);
      this.setToken(token);
      this.$router.push("/");
    },
  },
};
</script>