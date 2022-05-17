<template>
  <router-view />
</template>
<style>
  html{
    height: 100%;
  }
  body{
    min-height: 100%;
  }
  #app{
    min-height: 100vh;
    height:100%;
  }
  *{
    scrollbar-width: thin;
  }
  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #F0F0F0;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #CDCDCD;
  }
  a{
    text-decoration: none;
    color: rgb(var(--v-theme-on-surface));
  }
</style>
<script>
export default {};
</script>
