<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);

authStore.me();

const logout = () => {
    const authStore = useAuthStore();
    authStore.logout();
};
</script>

<template>
    <v-app>
        <!-- Navbar -->
        <v-app-bar app color="primary">
            <router-link to="/users" style="color: #fff; text-decoration: none">
                <v-toolbar-title style="font-weight: bold; padding-left: 20px"
                    >User Management System</v-toolbar-title
                >
            </router-link>
            <v-spacer></v-spacer>
            <v-btn @click="logout">Logout</v-btn>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row>
                    <v-navigation-drawer>
                        <v-list-item
                            :title="`Welcome ${authUser.name}!`"
                            :subtitle="`${authUser.email}`"
                        ></v-list-item>
                        <v-divider></v-divider>

                        <router-link
                            :to="`/users`"
                            class="mr-2 router-link-custom"
                        >
                            <v-list-item link title="Users"></v-list-item>
                        </router-link>
                    </v-navigation-drawer>

                    <v-col cols="10">
                        <v-card>
                            <v-card-text>
                                <router-view></router-view>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<style scoped>
.router-link-custom {
    text-decoration: none;
    color: #52514f;
}
</style>
