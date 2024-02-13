// authStore.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),

    actions: {
        async login(email, password) {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/auth/login",
                    {
                        email,
                        password,
                    },
                );
                const userData = response.data.user;

                // Guardar información del usuario y establecer autenticado como true
                this.isAuthenticated = true;
                this.user = userData;
            } catch (error) {
                console.error("Error during login:", error);
                throw new Error(
                    "Failed to login. Please check your credentials.",
                );
            }
        },

        logout() {
            // Lógica de cierre de sesión
            this.isAuthenticated = false;
            this.user = null;
        },
    },
});
