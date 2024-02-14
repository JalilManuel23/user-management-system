<script setup>
import { useAuthStore } from "@/stores";

const logout = () => {
    const authStore = useAuthStore();
    authStore.logout();
};
</script>

<template>
    <div class="container">
        <div class="row">
            <p @click="logout">Logout</p>
        </div>
        <div class="row">
            <div class="col-sm-8 offset-sm-2 mt-5">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
