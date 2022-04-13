import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Customers from "@/pages/Customers.vue";
import Customer from "@/pages/Customer.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
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
      {
        path: "/icons",
        name: "Icons",
        component: Icons,
      },
      {
        path: "/maps",
        name: "Maps",
        component: Maps,
      },
    ],
  },
];

export default routes;
