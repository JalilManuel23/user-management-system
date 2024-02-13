<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { useAuthStore } from "../store/authStore";

export default {
    setup() {
        const authStore = useAuthStore();
        let email = "";
        let password = "";

        const login = async () => {
            try {
                await authStore.login(email, password);
                // Redirigir a una ruta después de iniciar sesión
                // router.push('/dashboard') // Asegúrate de importar vue-router y configurar el enrutador
            } catch (error) {
                console.error("Error during login:", error);
                // Manejar errores de inicio de sesión, por ejemplo, mostrar un mensaje de error al usuario
            }
        };

        return { email, password, login };
    },
};
</script>
