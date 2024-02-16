<script setup>
import { storeToRefs } from "pinia";

import { useUsersStore } from "@/stores";

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();
</script>

<template>
    <div>
        <h1>Users</h1>

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
                        <router-link :to="`/users/edit/${user.id}`" class="mr-2" @click="usersStore.setActiveUser(user)">
                            <v-btn  color="blue-darken-4" rounded="lg">
                                <span>Update</span>
                            </v-btn>
                        </router-link>
                         
                        <v-btn @click="usersStore.delete(user.id)" rounded="lg" color="red-darken-1">
                            <span>Delete</span>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>
