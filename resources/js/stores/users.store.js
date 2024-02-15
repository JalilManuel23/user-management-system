import { defineStore } from "pinia";

import { fetchWrapper } from "@/helpers";
import { useAuthStore } from "@/stores";

export const useUsersStore = defineStore({
    id: "users",
    state: () => ({
        users: [],
        user: {},
    }),
    actions: {
        async register(user) {
            await fetchWrapper.post("user", user);
        },
        async getAll() {
            this.users = { loading: true };
            try {
                const { users } = await fetchWrapper.get("user");

                this.users = users;
            } catch (error) {
                this.users = { error };
            }
        },
        async getById(id) {
            this.user = { loading: true };
            try {
                const { user } = await fetchWrapper.get(`user/${id}`);
                this.user = user;
            } catch (error) {
                this.user = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`user/${id}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem("user", JSON.stringify(user));

                // update auth user in pinia state
                authStore.user = user;
            }
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.users.find((x) => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`user/${id}`);

            // remove user from list after deleted
            this.users = this.users.filter((x) => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        },
    },
});
