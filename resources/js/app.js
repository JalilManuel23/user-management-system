import "./bootstrap";
import { createApp } from "vue";
import app from "./app.vue";
import vuetify from "./vuetify";
import { createPinia } from "pinia";
import { router } from "./router";

const pinia = createPinia();

createApp(app).use(vuetify).use(pinia).use(router).mount("#app");
