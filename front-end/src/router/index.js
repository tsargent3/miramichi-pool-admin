import DashboardLayout from "@/pages/layout/DashboardLayout.vue"
// import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Customers from "@/pages/CustomersPanel.vue";
import Customer from "@/pages/CustomerPanel.vue";
import LoginPanel from "@/pages/LoginPanel.vue";
import RegisterPanel from "@/pages/RegisterPanel.vue";
import { createWebHistory, createRouter } from "vue-router";

// mode: 'history',
const routes = [
    {
      path: "/",
      name: "Dashboard",
      component: DashboardLayout,
      redirect: "/login",
      children: [
        {
          path: "/login",
          name: "Login",
          component: LoginPanel,
        },
        {
          path: "/register",
          name: "Register",
          component: RegisterPanel,
        },
    //     {
    //       path: "/dashboard",
    //       name: "Dashboard",
    //       component: Dashboard,
    //     },
        {
          path: "/profile",
          name: "User Profile",
          component: UserProfile,
        },
        {
          path: "/customers",
          name: "Customers",
          component: Customers,
        },
        {
          path: "/customer/:customer_id",
          name: "Customer View",
          component: Customer,
        },
      ]
    }]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});


export default router;
