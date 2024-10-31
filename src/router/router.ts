import { createRouter, createWebHistory } from "vue-router";
import ClientLayout from "@/components/Layouts/ClientLayout.vue";
import HomeView from "@/components/UserViews/HomeView.vue";
import AdminLayout from "@/components/Layouts/AdminLayout.vue";
import Dashboard from "@/components/AdminViews/Dashboard.vue";
import { useAuthStore } from "@/store/authStore";

const routes = [
  {
    path: "/",
    component: ClientLayout,
    children: [{ path: "", component: HomeView }],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [{ path: "dashboard", component: Dashboard }],
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    authStore.initAuth();
  }

  if (to.meta.requiresAdmin) {
    if (!authStore.isAuthenticated) {
      return authStore.login();
    }
    if (!authStore.isAdmin) {
      return next("/");
    }
  }

  next();
});

export default router;
