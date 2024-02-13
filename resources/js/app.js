import "./bootstrap";
import { createApp } from "vue";
import app from "./components/app.vue";
import vuetify from "./vuetify";
import { createPinia } from "pinia";

const pinia = createPinia();

createApp(app).use(vuetify).use(pinia).mount("#app");
