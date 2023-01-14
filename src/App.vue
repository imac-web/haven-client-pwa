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

import "@/assets/scss/global.scss";
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

<style lang="scss"></style>
