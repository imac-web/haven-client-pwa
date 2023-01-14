<template>
  <Teleport to="body">
    <div
      class="l-panel"
      :class="{ 'is-open': isReady }"
      role="dialog"
      aria-labelledby="panelTitle"
      aria-describedby="panelDescription"
    >
      <component :is="panelComponent" :data="panelData" @close="close" />
    </div>
    <div class="backdrop" :class="{ 'is-open': isReady }" @click="close"></div>
  </Teleport>
</template>

<script>
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";

import PanelComponent from "@/templates/components/organisms/Panels/PanelComponent.vue";

export default defineComponent({
  name: "ThePanel",
  components: {
    PanelComponent,
  },
  props: {},
  setup(props) {
    const store = useStore();

    const isOpen = ref(false);

    const close = () => {
      isOpen.value = false;
      setTimeout(() => {
        store.dispatch("panel/close");
      }, 600);
    };

    const currentScroll = ref(0);

    const isReady = computed(() => {
      return store.getters["panel/hasPanel"] && isOpen.value;
    });
    const hasPanel = computed(() => {
      return store.getters["panel/hasPanel"];
    });

    const panelData = computed(() => {
      return store.state.panel.data;
    });

    const panelComponent = computed(() => {
      return store.state.panel.component;
    });

    watch(hasPanel, (open) => {
      if (open) {
        isOpen.value = true;
        currentScroll.value = window.scrollY;
        store.dispatch("scroll/toggleDisabledScroll", true);
      } else {
        window.scrollTo(0, currentScroll.value);
        store.dispatch("scroll/toggleDisabledScroll", false);
      }
    });

    return {
      isReady,
      currentScroll,
      isOpen,
      panelData,
      panelComponent,
      close,
      hasPanel,
    };
  },
});
</script>

<style lang="scss">
.l-panel {
  //@include full-screen-dom();
  position: fixed;
  top: 50%;
  right: 5%;
  z-index: 102;
  background: var(--color-dark);
  opacity: 0;
  pointer-events: none;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow-y: auto;

  transition: opacity 0.4s linear;
  @include min(md) {
    width: min-content;
    height: min-content;
  }

  @include min(md) {
    padding: 5rem;
  }
  @include max(md) {
    @include container("default");
  }

  &.is-open {
    opacity: 1;
    pointer-events: auto;
  }
}

.backdrop {
  background-color: var(--color-green);

  height: 100%;
  width: 100%;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0.4s, opacity 0.4s linear;
  z-index: 100;

  &.is-open {
    visibility: visible;
    opacity: 0.4;
  }
}
</style>
