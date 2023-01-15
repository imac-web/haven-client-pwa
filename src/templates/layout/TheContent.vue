<template>
  <div class="l-content" ref="content">
    <map-base class="l-content__map" />
    <!-- <panel-mobile class="l-content__panel-mobile" /> -->
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import Hero from "@/templates/components/organisms/Hero/Hero.vue";
import MapBase from "@/templates/components/organisms/Map/MapBase.vue";
import PanelMobile from "@/templates/components/organisms/PanelMobile/PanelMobile.vue";

export default defineComponent({
  name: "TheContent",
  components: {
    ButtonPrimary,
    Hero,
    PanelMobile,
    MapBase,
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
.l-content {
  @include max(md) {
    @include fullscreen;
  }

  @include min(md) {
    .cupertino-pane-wrapper {
      display: none !important;
    }

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__map {
    @include min(md) {
      width: 100vw;
    }
  }
}
</style>
