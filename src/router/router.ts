import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "@/components/Layouts/AdminLayout.vue";
import ClientLayout from "@/components/Layouts/ClientLayout.vue";

const routes = [
  {
    path: "/",
    component: ClientLayout,
    // children: [
    //     { path: "", component: HomeView}
    // ]
  },
  {
    path: "/admin",
    component: AdminLayout,
    // children: [
    //     { path: "dashboard", component: Dashboard},
    // ],
    meta: { requiresAdmin: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
