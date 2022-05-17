<template>
  <div class="content">
    <div class="v-layout main-layout">
      <v-card class="v-layout-item profile-component">
        <edit-profile-form/>
      </v-card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .main-layout{
    overflow:unset;
  }
  .v-card .profile-component {
    position: relative;
    margin: 10px auto;
    margin-top: 0;
    padding: 0 5px;
    width: 100%;
    background: rgb(var(--v-theme-background));
    box-shadow: none;
  }
</style>
<script>
import { EditProfileForm } from "@/pages";

export default {
  components: {
    EditProfileForm,
  },
};
</script>
