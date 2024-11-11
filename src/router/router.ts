import { createRouter, createWebHistory } from "vue-router";
import ClientLayout from "@/components/Layouts/ClientLayout.vue";
import HomeView from "@/components/Client/views/HomeView.vue";
import AdminLayout from "@/components/Layouts/AdminLayout.vue";
import Dashboard from "@/components/Admin/views/Dashboard.vue";
import { useAuthStore } from "@/store/authStore";
import Account from "@/components/Client/views/Account.vue";

const routes = [
  {
    path: "/",
    component: ClientLayout,
    children: [
      { path: "", component: HomeView },
      { path: "account", component: Account, meta: { requiresAuth: true } },
    ],
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

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return authStore.login();
    }
  }

  next();
});

export default router;
