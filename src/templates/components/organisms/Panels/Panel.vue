<template>
  <div class="o-panel">
    <!-- <panel-content /> -->
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import PanelContent from "./PanelContent.vue";

export default defineComponent({
  name: "Panel",
  components: {
    PanelContent,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.o-panel {
  padding: 2rem;
}
</style>
