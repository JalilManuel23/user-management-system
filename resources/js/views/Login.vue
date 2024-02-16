<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

import { useAuthStore } from "@/stores";

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

const { handleSubmit, handleReset } = useForm({
    validationSchema,
});

const email = useField("email", validationSchema);
const password = useField("password", validationSchema);

const onSubmit = handleSubmit(async (values) => {
    const authStore = useAuthStore();
    const { email, password } = values;
    await authStore.login(email, password);
});

const inputType = ref("password");
const buttonText = ref("Show");

const toggleInputType = () => {
    inputType.value = inputType.value === "password" ? "text" : "password";
    buttonText.value = buttonText.value === "Show" ? "Hide" : "Show";
};
</script>

<template>
    <div class="d-flex align-center justify-center" style="height: 100vh">
        <v-container fluid fill-height>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="6" lg="4">
                    <v-card elevation="3">
                        <v-card-title class="grey lighten-4">
                            <span class="headline">Login</span>
                        </v-card-title>
                        <v-card-text>
                            <v-form @submit.prevent="onSubmit">
                                <v-text-field
                                    label="E-mail"
                                    v-model="email.value.value"
                                    :error-messages="email.errorMessage.value"
                                ></v-text-field>

                                <v-text-field
                                    label="Password"
                                    :type="inputType"
                                    v-model="password.value.value"
                                    :error-messages="
                                        password.errorMessage.value
                                    "
                                >
                                    <template v-slot:append-inner>
                                        <v-btn
                                            variant="plain"
                                            @click="toggleInputType"
                                            color="grey darken-3"
                                            small
                                            >{{ buttonText }}</v-btn
                                        >
                                    </template>
                                </v-text-field>
                                <div class="text-center">
                                    <v-btn color="primary" type="submit"
                                        >Sign In</v-btn
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
