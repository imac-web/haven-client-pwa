<template>
  <Teleport to="body">
    <div
      class="l-panel"
      :class="{ 'is-open': isReady }"
      role="dialog"
      aria-labelledby="panelTitle"
      aria-describedby="panelDescription"
      ref="panel"
    >
      <component
        :is="panelComponent"
        :data="panelData"
        :index="panelIndex"
        @close="close"
      />
    </div>
  </Teleport>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  watch,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
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
    const panelIndex = computed(() => {
      return store.state.panel.index;
    });

    const panelComponent = computed(() => {
      return store.state.panel.component;
    });

    const panel = ref(null);

    const isMobile = computed(() => {
      return store.state.userContext.isMobile;
    });

    const width = ref(null);

    function setPanelStoreWidth(width) {
      store.dispatch("panel/setPanelWidthGlobally", width);
    }

    function setPanelWidth() {
      width.value = panel.value.clientWidth;
      setPanelStoreWidth(width.value);
    }

    function onResize() {
      !isMobile.value ? setPanelWidth() : null;
    }

    onMounted(() => {
      setPanelWidth();
      window.addEventListener("resize", onResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", onResize);
    });

    watch(hasPanel, (open) => {
      if (open) {
        isOpen.value = true;
        currentScroll.value = window.scrollY;
        store.dispatch("scroll/toggleDisabledScroll", true);
        nextTick(() => {
          setPanelWidth();
        });
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
      panelIndex,
      panel,
    };
  },
});
</script>

<style lang="scss">
.l-panel {
  --panel-height: 100%;
  --panel-bg: var(--color-haven_dark_grey_alpha);
  --navbar-height: 5rem;

  @include full-screen-dom();
  z-index: 10;
  pointer-events: none;

  width: var(--panel-width, 40rem);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow-y: auto;
  background-color: var(--panel-bg);
  backdrop-filter: blur(0.7rem);
  transition: clip-path 0.4s ease;

  clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
  @include min(md) {
    height: var(--panel-height);

    left: calc(100% - var(--panel-width));
    padding-top: calc(var(--navbar-height) + 3rem);

    display: block;
  }
  @include min(2xl) {
    --panel-width: 50rem;
  }

  display: none;

  &.is-open {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    pointer-events: auto;
  }
}
</style>
