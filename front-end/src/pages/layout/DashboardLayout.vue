<template>
  <v-card style="min-height:100vh; height: 100%; border-radius: 0; background: rgb(var(--v-theme-background));">
    <v-layout style="z-index: 1001;">
      <v-toolbar 
        prominent
        style="box-shadow: unset; background: rgb(var(--v-theme-background));width:100%;"
      >
        <v-app-bar-nav-icon 
          class="included"
          @click="openNavDrawer()"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-switch
          prepend-icon="mdi-theme-light-dark"
          @change="toggleDarkTheme()"
          style="display:flex"
        ></v-switch>
      </v-toolbar>
      <div
        v-click-outside="{
          handler:onClickOutside,
          include: include,
        }"
      >
        <v-navigation-drawer
          v-model="navDrawer"
        >
          <v-list>
            <v-list-item
              :prepend-avatar="imgLogo"
              title="Miramichi Pool"
              :subtitle="routeName"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list nav>
            <router-link v-if="!user" to="/login" style="text-decoration: none; color: inherit;" @click="navDrawer = false;"><v-list-item prepend-icon="mdi-login" title="Login" value="login"></v-list-item></router-link>
            <template v-if="user">
              <router-link to="/customers" style="text-decoration: none; color: inherit;" @click="navDrawer = false;"><v-list-item prepend-icon="mdi-account-multiple" title="Customers" value="customers"></v-list-item></router-link>
              <router-link to="/profile" style="text-decoration: none; color: inherit;" @click="navDrawer = false;"><v-list-item prepend-icon="mdi-account" title="Profile" value="profile"></v-list-item></router-link>
              <a class="nav-link" href @click.prevent="logOut"><v-list-item prepend-icon="mdi-logout" title="Logout" value="logout"></v-list-item></a>
            </template>
          </v-list>
        </v-navigation-drawer>
      </div>
    </v-layout>
    <dashboard-content>
    </dashboard-content>
    <notifications position="bottom right"/>
  </v-card>
</template>
<style lang="scss" scoped>
  .v-input{
    flex:unset;
  }
</style>
<script>
import DashboardContent from "./ContentPanel.vue";

export default {
  data(){
    return{
      routeName: this.$route.name,
      navDrawer: false,
      user: localStorage.getItem('user'),
    }
  },
  updated(){
      this.user = localStorage.getItem('user');
  },
  mounted(){
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
        if (theme === "true") {
            this.$vuetify.theme.dark = true;
        } else {
            this.$vuetify.theme.dark = false;
        }
    } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        this.$vuetify.theme.dark = true;
        localStorage.setItem(
            "dark_theme",
            this.$vuetify.theme.dark.toString()
        );
    }
  },
  components: {
    DashboardContent,
  },
  props: {
    imgLogo: {
      type: String,
      default: require("@/assets/img/miramichipool.png"),
    }
  },
  methods: {
    onClickOutside(){
      this.navDrawer = false;
    },
    openNavDrawer(){
      this.navDrawer = true;
    },
    toggleDarkTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      // this.$vuetify.theme.current = this.$vuetify.theme.dark ? "dark" : "light";
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
      console.log(this.$vuetify.theme);
      console.log(this.$vuetify.theme.current);
    },
    include () {
      return [document.querySelector('.included')]
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
      this.navDrawer = false;
    },
  }
}

</script>
