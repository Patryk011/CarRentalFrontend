import { createRouter, createWebHistory } from "vue-router";
import ClientLayout from "@/components/Layouts/ClientLayout.vue";
import HomeView from "@/components/Client/views/HomeView.vue";
import AdminLayout from "@/components/Layouts/AdminLayout.vue";
import Dashboard from "@/components/Admin/views/Dashboard.vue";
import RentsView from "@/components/Admin/views/RentsView.vue";
import CarsView from "@/components/Admin/views/CarsView.vue";
import { useAuthStore } from "@/store/authStore";
import Account from "@/components/Client/views/Account.vue";
import Users from "@/components/Admin/views/Users.vue";
import RentView from "@/components/Client/views/RentView.vue";
import About from "@/components/Client/views/About.vue";
import Faq from "@/components/Client/views/Faq.vue";
import Contact from "@/components/Client/views/Contact.vue";

const routes = [
  {
    path: "/",
    component: ClientLayout,
    children: [
      { path: "", component: HomeView },
      { path: "account", component: Account, meta: { requiresAuth: true } },
      { path: "wynajem-auta", component: RentView },
      { path: "o-nas", component: About },
      { path: "faq", component: Faq },
      { path: "kontakt", component: Contact },
      {
        path: "rental-details/:id",
        component: () => import("@/components/Client/views/RentalDetails.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", component: Dashboard },
      { path: "wypozyczenia", component: RentsView },
      { path: "auta", component: CarsView },
      { path: "users", component: Users },
    ],
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
