import { createApp } from 'vue'
import App from '@/App.vue'
import store from "@/store";
import "virtual:svg-icons-register";

import magnet from "@/directives/magnet.js";
import { view } from "@/directives/view.js";
import { resizeEnd } from "@/utils";

import veProgress from "vue-ellipse-progress";

// Initial load
store.dispatch("global/initLoad");
resizeEnd();


const app = createApp(App);

app.use(store);
app.use(veProgress);
app.directive("magnet", magnet);

app.directive("view", view);


app.mount('#app');

