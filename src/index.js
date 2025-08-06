import { createApp } from "vue";
import "./assets/css/style.css";
import root from "./root.vue";
import store from "./store/index.js";
import router from "./router/index.js";

createApp(root).use(router).use(store).mount("#root");
