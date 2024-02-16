import { defineStore } from "pinia";

import { fetchWrapper, showAlert } from "@/helpers";
import { useAuthStore } from "@/stores";

import Swal from "sweetalert2";

export const useUsersStore = defineStore({
    id: "users",
    state: () => ({
        users: [],
        user: {},
    }),
    actions: {
        async register(user) {
            try {
                await fetchWrapper.post("user", user);
                showAlert("User registered successfully");
            } catch (error) {
                if (!!error.email[0]) {
                    showAlert(error.email[0], "warning", "", 3000);
                } else {
                    showAlert(
                        "Sorry, it seems there was an error with the data you entered.",
                        "warning",
                        "Please make sure to follow the correct format for each field and try again.",
                        3000,
                    );
                }
            }
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
            try {
                await fetchWrapper.put(`user/${id}`, params);
                showAlert("User registered successfully");

                // update stored user if the logged in user updated their own record
                const authStore = useAuthStore();
                if (id === authStore.user.id) {
                    // update local storage
                    const user = { ...authStore.user, ...params };
                    localStorage.setItem("user", JSON.stringify(user));

                    // update auth user in pinia state
                    authStore.user = user;
                }
            } catch (error) {
                if (!!error.email[0]) {
                    showAlert(error.email[0], "warning", "", 3000);
                } else {
                    showAlert(
                        "Sorry, it seems there was an error with the data you entered.",
                        "warning",
                        "Please make sure to follow the correct format for each field and try again.",
                        3000,
                    );
                }
            }
        },
        async delete(id) {
            Swal.fire({
                title: "Are you sure?",
                showConfirmButton: false,
                showDenyButton: true,
                showCancelButton: true,
                denyButtonText: "Yes, delete this user.",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isDenied) {
                    this.users.find((x) => x.id === id).isDeleting = true;

                    fetchWrapper.delete(`user/${id}`);

                    showAlert("User deleted");

                    // remove user from list after deleted
                    this.users = this.users.filter((x) => x.id !== id);

                    // auto logout if the logged in user deleted their own record
                    const authStore = useAuthStore();
                    if (id === authStore.user.id) {
                        authStore.logout();
                    }
                } else {
                    Swal.fire("Changes are not saved", "", "info");
                }
            });
            // add isDeleting prop to user being deleted
        },
        setActiveUser(user) {
            this.user = user;
        },
    },
});
