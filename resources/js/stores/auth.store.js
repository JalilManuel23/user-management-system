import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { fetchWrapper } from "@/helpers";
import { router } from "@/router";

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")),
        returnUrl: null,
    }),
    actions: {
        async login(email, password) {
            try {
                const user = await fetchWrapper.post(`api/auth/login`, {
                    email,
                    password,
                });

                this.user = user;

                localStorage.setItem("user", JSON.stringify(user));

                router.push(this.returnUrl || "/users");
            } catch (error) {
                console.log(error);
            }
        },
    },
});
