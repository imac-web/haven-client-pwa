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
  --panel-padding: 2rem;
  --panel-width: min-content;
  --panel-height: min-content;

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
    width: var(--panel-width);
    height: var(--panel-height);
  }

  @include min(md) {
    padding: var(--panel-padding);
  }
  @include max(md) {
    @include container("default");
  }

  @include min(md) {
    display: block;
  }
  display: none;

  &.is-open {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
