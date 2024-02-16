<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useUsersStore } from "@/stores";
import { router } from "@/router";

import Swal from 'sweetalert2';

const usersStore = useUsersStore();
const route = useRoute();
const id = route.params.id;

let title = "Add User";
let user = null;

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
        .transform((x) => (x === "" ? undefined : x))
        .concat(id ? null : Yup.string().required("Password is required"))
        .min(6, "Password must be at least 6 characters"),
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
    try {
        let message;
        if (user) {
            await usersStore.update(id, values);
            message = "User updated";
        } else {
            await usersStore.register(values);
            message = "User added";
        }
        Swal.fire({
            title: message,
            position: "top-end",
            showConfirmButton: false,
            icon: "success",
            toast: true,
            timer: 1500
        });
        await router.push("/users");
    } catch (error) {
        Swal.fire({
            title: error,
            position: "top-end",
            showConfirmButton: false,
            icon: "error",
            toast: true,
            timer: 1500
        });

    }
});
</script>

<template>
    <h1>{{ title }}</h1>

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
                                    label="Password"
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
