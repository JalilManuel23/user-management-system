import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores";
import { Login } from "@/views";
import usersRoutes from "./users.routes";

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: "active",
    routes: [
        { path: "/", component: Login },
        // { ...usersRoutes },
        // catch all redirect to home page
        { path: "/:pathMatch(.*)*", redirect: "/" },
    ],
});

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ["/login"];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return "/login";
    }
});
