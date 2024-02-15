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

        <!-- Contenido Principal -->
        <v-main>
            <v-container fluid>
                <!-- Layout con fila y columna -->
                <v-row>
                    <!-- Columna de Opciones -->
                    <v-col cols="2">
                        <v-card class="fill-height">
                            <v-list>
                                <v-list-item link>
                                    <v-list-item-icon>
                                        <v-icon>mdi-home</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title
                                        >Inicio</v-list-item-title
                                    >
                                </v-list-item>
                                <v-list-item link>
                                    <v-list-item-icon>
                                        <v-icon>mdi-account</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title
                                        >Mi Perfil</v-list-item-title
                                    >
                                </v-list-item>
                                <v-list-item link>
                                    <v-list-item-icon>
                                        <v-icon>mdi-settings</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title
                                        >Configuración</v-list-item-title
                                    >
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>

                    <!-- Contenido -->
                    <v-col cols="10">
                        <!-- Contenido dinámico de la página -->
                        <v-card class="fill-height">
                            <v-card-text>
                                <!-- Aquí va el contenido dinámico de la página -->
                                <router-view></router-view>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    methods: {
        logout() {
            // Aquí puedes agregar la lógica para cerrar sesión
        },
    },
};
</script>

<style scoped>
.fill-height {
    height: 100%;
}
</style>
