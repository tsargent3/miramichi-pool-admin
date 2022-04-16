// =========================================================
// * Vue Material Dashboard - v1.5.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "@/App";
import store from "@/store";

// router setup
import { router } from "@/routes/router";

// Plugins
import GlobalComponents from "@/globalComponents";
import GlobalDirectives from "@/globalDirectives";
import Notifications from "@/components/NotificationPlugin";
import VeeValidate from 'vee-validate';

// MaterialDashboard plugin
import MaterialDashboard from "@/material-dashboard";

import Chartist from "chartist";

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(VeeValidate);


Vue.use(Vuex);

new Vue({
  router,
  store,
  data: {
    Chartist: Chartist,
  },
  render: h => h(App)
}).$mount('#app');