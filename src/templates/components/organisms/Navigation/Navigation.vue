<template>
  <div class="o-navigation">
    <div class="o-navigation__logo">HAVEN</div>
    <div class="o-navigation__search"><search /></div>
    <div class="o-navigation__menu">Menu</div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import Search from "@/templates/components/organisms/Search/Search.vue";

export default defineComponent({
  name: "Navigation",
  components: {
    ButtonPrimary,
    Search,
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
.o-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: var(--color-white);
}
</style>
