import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Customers from "@/pages/Customers.vue";
import Customer from "@/pages/Customer.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/user",
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
    ],
  },
];

export default routes;
