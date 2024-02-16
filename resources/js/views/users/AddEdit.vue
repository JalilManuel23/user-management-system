<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useUsersStore } from "@/stores";
import { router } from "@/router";

import { showAlert } from "@/helpers";

const usersStore = useUsersStore();
const route = useRoute();
const id = route.params.id;

let title = "Add User";
let user = null;

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .transform((x) => (x === "" ? undefined : x))
        .concat(id ? null : Yup.string().required("Password is required"))
        .min(8, "Password must be at least 8 characters"),
});

const { handleSubmit, handleReset } = useForm({
    validationSchema,
});

const name = useField("name", validationSchema);
const email = useField("email", validationSchema);
const password = useField("password", validationSchema);

if (id) {
    title = "Edit User";
    ({ user } = storeToRefs(usersStore));

    name.value.value = user.value.name;
    email.value.value = user.value.email;
}

const onSubmit = handleSubmit(async (values) => {
    let message;
    if (user) {
        await usersStore.update(id, values);
    } else {
        await usersStore.register(values);
    }

    await router.push("/users");
});
</script>

<template>
    <v-container fluid>
        <v-layout row justify-space-between>
            <h1 style="flex-grow: 5">{{ title }}</h1>

            <router-link to="/users">
                <v-btn
                    color="grey-darken-1"
                    rounded="lg"
                    style="background-color: lightblue; flex-grow: 1"
                >
                    <span>Return</span>
                </v-btn>
            </router-link>
        </v-layout>
    </v-container>

    <div class="d-flex align-center justify-center" style="height: 50vh">
        <v-container fluid fill-height>
            <v-row align="center" justify="center">
                <v-col cols="10">
                    <v-card elevation="0">
                        <v-card-text>
                            <v-form @submit.prevent="onSubmit">
                                <v-text-field
                                    label="Name"
                                    v-model="name.value.value"
                                    :error-messages="name.errorMessage.value"
                                ></v-text-field>

                                <v-text-field
                                    label="E-mail"
                                    v-model="email.value.value"
                                    :error-messages="email.errorMessage.value"
                                ></v-text-field>

                                <v-text-field
                                    :label="
                                        id
                                            ? 'Password (Leave blank to keep the same password)'
                                            : 'Password'
                                    "
                                    type="password"
                                    v-model="password.value.value"
                                    :error-messages="
                                        password.errorMessage.value
                                    "
                                ></v-text-field>
                                <div class="text-center">
                                    <v-btn color="primary" type="submit"
                                        >Save</v-btn
                                    >
                                </div>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
