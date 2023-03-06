<template>
  <the-base />
</template>
<script>
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { isTouch } from "@/utils";
import "leaflet/dist/leaflet.css";
import "@/assets/scss/global.scss";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

import TheBase from "@/templates/layout/TheBase.vue";

export default defineComponent({
  name: "App",
  components: {
    TheBase,
  },
  setup() {
    onMounted(() => {
      if (isTouch) document.documentElement.classList.add("is-touch");
    });
  },
});
</script>

<style lang="scss">
.is-touch {
  overscroll-behavior-y: contain;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
}
</style>
