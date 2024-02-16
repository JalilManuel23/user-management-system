<script setup>
import { storeToRefs } from "pinia";

import { useUsersStore, useAuthStore } from "@/stores";

const authStore = useAuthStore();
const { authUser } = storeToRefs(authStore);

authStore.me();

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();
</script>

<template>
    <div>
        <v-container fluid>
            <v-layout row justify-space-between>
                <h1 style="flex-grow: 7">Users</h1>
                <router-link to="/users/add">
                    <v-btn
                        color="blue-darken-2"
                        rounded="lg"
                        style="background-color: lightblue; flex-grow: 1"
                    >
                        <span>Add User</span>
                    </v-btn>
                </router-link>
            </v-layout>
        </v-container>
        <v-table class="user-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td class="action-buttons">
                        <router-link
                            :to="`/users/edit/${user.id}`"
                            class="mr-2"
                            @click="
                                usersStore.setActiveUser({
                                    id: user.id,
                                    email: user.email,
                                    name: user.name,
                                })
                            "
                        >
                            <v-btn color="blue-darken-4" rounded="lg">
                                <span>Update</span>
                            </v-btn>
                        </router-link>

                        <v-tooltip bottom :disabled="user.id !== authUser.id">
                            <template v-slot:activator="{ props }">
                                <div v-bind="props" class="d-inline-block">
                                    <v-btn
                                        @click="usersStore.delete(user.id)"
                                        rounded="lg"
                                        :title="hola"
                                        :disabled="user.id === authUser.id"
                                        color="red-darken-1"
                                    >
                                        <span>Delete</span>
                                    </v-btn>
                                </div>
                            </template>
                            <span>You cannot delete your user.</span>
                        </v-tooltip>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>
