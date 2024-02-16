<script setup>
import { useAuthStore } from "@/stores";

const logout = () => {
    const authStore = useAuthStore();
    authStore.logout();
};
</script>

<template>
    <v-app>
        <!-- Navbar -->
        <v-app-bar app color="primary">
            <v-toolbar-title>User Management System</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="logout">Logout</v-btn>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row>
                    <v-navigation-drawer>
                        <v-list-item title="" subtitle="Dashboard"></v-list-item>
                        <v-divider></v-divider>

                        <router-link :to="`/users/add`" class="mr-2 router-link-custom">
                            <v-list-item link title="Add User"></v-list-item>
                        </router-link>

                         <router-link :to="`/users`" class="mr-2 router-link-custom">
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
