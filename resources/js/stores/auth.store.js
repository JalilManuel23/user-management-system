import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { fetchWrapper } from "@/helpers";
import { router } from "@/router";

import { showAlert } from "@/helpers";

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")),
        authUser: {},
        returnUrl: null,
    }),
    actions: {
        async login(email, password) {
            try {
                const user = await fetchWrapper.post("auth/login", {
                    email,
                    password,
                });

                this.user = user;

                localStorage.setItem("user", JSON.stringify(user));

                router.push(this.returnUrl || "/users");

                showAlert("Welcome!");
            } catch (error) {
                showAlert("Wrong credentials", "warning");
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem("user");
            router.push("/");
        },
        async me() {
            try {
                const user = await fetchWrapper.post("auth/me");
                this.authUser = user;
            } catch (error) {
                showAlert("Error", "warning");
            }
        },
    },
});
