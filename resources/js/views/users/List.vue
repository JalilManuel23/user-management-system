<script setup>
import { storeToRefs } from "pinia";

import { useUsersStore } from "@/stores";

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();
</script>

<template>
    <h1>Users</h1>

    <router-link to="/users/add" class="btn btn-sm btn-success mb-2"
        >Add User</router-link
    >

    <table>
        <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
        </thead>
    </table>

    <tbody>
        <template v-if="users.length">
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
            </tr>
        </template>
    </tbody>
</template>
