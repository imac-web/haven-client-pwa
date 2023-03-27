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

import TheBase from "@/templates/layout/TheBase.vue";

import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

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

.scroll-content {
  padding-bottom: 0 !important;
}
</style>
