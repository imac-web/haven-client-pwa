import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';



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
app.use(IonicVue);
app.directive("magnet", magnet);

app.directive("view", view);


app.mount('#app');

