<template>
  <div class="l-content" ref="content">
    <!-- <panel class="l-content__panel" /> -->
    <map-base class="l-content__map" />
    <panel-mobile class="l-content__panel-mobile" />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import Hero from "@/templates/components/organisms/Hero/Hero.vue";
import MapBase from "@/templates/components/organisms/Map/MapBase.vue";
import PanelMobile from "@/templates/components/organisms/PanelMobile/PanelMobile.vue";
//import Panel from "@/templates/components/organisms/Panel/Panel.vue";

export default defineComponent({
  name: "TheContent",
  components: {
    ButtonPrimary,
    Hero,
    PanelMobile,
    //Panel,
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

  &__panel {
    @include max(md) {
      display: none;
    }

    @include min(md) {
      position: fixed;
      top: 5vh;
      right: 0;
      z-index: 102;
      background: var(--color-beige);
      //opacity: 0;
      pointer-events: none;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      overflow-y: auto;

      transition: opacity 0.4s linear;
      width: 30vw;
      height: 90vh;
    }
  }

  &__map {
    @include min(md) {
      width: 100vw;
    }
  }
}
</style>
