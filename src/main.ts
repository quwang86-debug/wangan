import { createApp } from "vue";
import { createPinia } from "pinia";
import "virtual:uno.css";
import "@/styles/tokens.css";
import "@/styles/fonts.css";
import "@/styles/reset.css";
import App from "@/App.vue";
import { router } from "@/router";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
