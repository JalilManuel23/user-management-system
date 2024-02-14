// authStore.js
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
import { fetchWrapper } from "@/helpers";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
        // Manejar errores aquí si es necesario
            try {
                const user = await fetchWrapper.post(`api/auth/login`, { email, password });

                // update pinia state
                this.user = user;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // redirect to previous url or default to home page
                //router.push(this.returnUrl || '/');
                console.log("adentro")
            } catch (error) {
                console.log(error);
            }
        }
    }
})
