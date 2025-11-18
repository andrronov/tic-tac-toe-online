import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import { createPinia } from "pinia";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).mount("#app");
