<template>
  <div class="l-header">
    <navigation />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import Navigation from "@/templates/components/organisms/Navigation/Navigation.vue";
export default defineComponent({
  name: "TheHeader",
  components: {
    ButtonPrimary,
    Navigation,
  },
  setup() {
    const store = useStore();
    function openModal(data) {
      store.dispatch("modal/open", {
        component: MODAL_COMPONENTS.Modal,

        data,
      });
    }

    return {
      openModal,
    };
  },
});
</script>

<style lang="scss">
.l-header {
  height: 5rem;
  background-color: var(--color-dark);
}
</style>
