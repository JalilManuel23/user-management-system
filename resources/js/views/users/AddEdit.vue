<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useUsersStore } from "@/stores";
import { router } from "@/router";

const usersStore = useUsersStore();
const route = useRoute();
const id = route.params.id;

let title = "Add User";
let user = null;

if (id) {
    // edit mode
    title = "Edit User";
    ({ user } = storeToRefs(usersStore));
    // usersStore.getById(id);
}

const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string()
        .transform((x) => (x === "" ? undefined : x))
        // password optional in edit mode
        .concat(user ? null : Yup.string().required("Password is required"))
        .min(6, "Password must be at least 6 characters"),
});

async function onSubmit(values) {
    try {
        let message;
        if (user) {
            await usersStore.update(id, values);
            message = "User updated";
        } else {
            await usersStore.register(values);
            message = "User added";
        }
        await router.push("/users");
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <h1>{{ title }}</h1>
    <router-link to="/users" class="btn btn-sm btn-success mb-2"
        >Back</router-link
    >

    <Form
        @submit="onSubmit"
        :validation-schema="schema"
        :initial-values="user"
        v-slot="{ errors, isSubmitting }"
    >
        <div class="form-row">
            <div class="form-group col">
                <label>Name</label>
                <Field
                    name="name"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.name }"
                />
                <div class="invalid-feedback">{{ errors.name }}</div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label>Email</label>
                <Field
                    name="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                />
                <div class="invalid-feedback">{{ errors.email }}</div>
            </div>
            <div class="form-group col">
                <label>
                    Password
                    <em v-if="user">(Leave blank to keep the same password)</em>
                </label>
                <Field
                    name="password"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                />
                <div class="invalid-feedback">{{ errors.password }}</div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" :disabled="isSubmitting">
                <span
                    v-show="isSubmitting"
                    class="spinner-border spinner-border-sm mr-1"
                ></span>
                Save
            </button>
            <router-link to="/users" class="btn btn-link">Cancel</router-link>
        </div>
    </Form>
</template>
