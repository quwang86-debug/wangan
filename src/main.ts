import { createApp } from "vue";
import { createPinia } from "pinia";
import "virtual:uno.css";
import "@/styles/tokens.css";
import "@/styles/design-space.css";
import "@/styles/reset.css";
import { injectFonts } from "@/styles/injectFonts";
import App from "@/App.vue";
import { router } from "@/router";

injectFonts();

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
