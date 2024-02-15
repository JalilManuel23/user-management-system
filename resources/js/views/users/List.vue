<template>
    <v-app>
        <v-container>
            <v-data-table :headers="headers" :items="users"></v-data-table>
        </v-container>
    </v-app>
</template>

<script>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useUsersStore } from "@/stores";

export const headers = [
    { text: "ID", value: "id" },
    { text: "Nombre", value: "name" },
    { text: "Email", value: "email" },
];

export default {
    setup() {
        const usersStore = useUsersStore();

        const { users } = storeToRefs(usersStore);

        usersStore.getAll();

        const filter = ref("users");

        return { usersStore, users };
    },
};
</script>
