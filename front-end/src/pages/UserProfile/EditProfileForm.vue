<template>
  <form>
    <v-card class="form-card">
      <v-card-title>
        <h4 class="title">
          Edit Profile
        </h4>
        <p class="category">
          Change your username, email, or password.
        </p>
      </v-card-title>
      <div class="wrapper">
        <v-card id="main-panel">
          <h3 class="title"> Change username/email </h3>
          <v-text-field hide-details label="Username" v-model="username" id="username">
          </v-text-field>
          <v-text-field hide-details label="Email Address" v-model="email" id="email">
          </v-text-field>
          
          <v-spacer></v-spacer>
          <v-btn class="v-raised v-success" @click="changeUsernameEmail()">
            Update Profile
          </v-btn>
        </v-card>
        <v-card id="main-panel">
          <h3 class="title"> Change password </h3>
          <v-text-field hide-details label="New Password" v-model="newPassword.password" id="password" type="password">
          </v-text-field>
          <v-text-field hide-details label="Confirm Password" v-model="newPassword.passwordConfirm" id="passwordConfirm" type="password">
          </v-text-field>
          
          <v-spacer></v-spacer>
          <v-btn class="v-raised v-success" @click="changeUserPassword()">
            Change Password
          </v-btn>
        </v-card>
      </div>
    </v-card>
  </form>
</template>
<style lang="scss" scoped>
  .form-card{
    background: rgb(var(--v-theme-background));
  }
  .wrapper{
    padding: 10px 5px;
    background: rgb(var(--v-theme-background));
  }
  .v-card-title{
    display:block;
    background: rgb(var(--v-theme-background));
    padding: 5px;
  }
  .v-text-field{
    padding: 5px;
  }
  #main-panel{  
    padding: 10px;
    margin: 10px 0;
    background: rgb(var(--v-theme-surface));
  }
</style>
<script>
import AuthService from "../../services/auth.service";
export default {
  name: "EditProfileForm",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      username: null,
      email: null,
      disabled: null,
      newPassword: {
        password: '',
        passwordConfirm: ''
      }
    };
  },
  mounted() {
    this.username = this.$store.state.auth.user.username;
    this.email = this.$store.state.auth.user.email;
  },
  methods: {
    changeUserPassword(){
      if(this.newPassword.password === this.newPassword.passwordConfirm){
        const creds = {username: this.username, password: this.newPassword.password};
        AuthService.changePass(creds)
        .then( () => {
          this.$notify({ 
            type: "success", 
            title: "Password changed successfully.",
          });
        })
        .catch(e => {
          console.log(e);
        });
      }
    },
    changeUsernameEmail(){
      const creds = {currentUsername: this.$store.state.auth.user.username, username: this.username, email: this.email};
      AuthService.changeUsernameEmail(creds)
      .then( response => {
        this.username = response.data.username;
        this.email = response.data.email;
        this.$notify({ 
          type: "success", 
          title: "Username/email changed successfully.",
          text: "If you changed your username, login with your new username now."
        });
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      })
      .catch(e => {
        console.log(e);
      });
    }
  }
};
</script>
<style></style>
