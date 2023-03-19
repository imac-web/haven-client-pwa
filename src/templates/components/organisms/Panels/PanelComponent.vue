<template>
  <div class="o-nameof-panel" :class="{ 'o-nameof-panel--active': isOpen }">
    <div class="o-nameof-panel__wrapper">
      <panel-results :data="data" :index="index" />
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import PanelResults from "@/templates/components/organisms/Panels/PanelResults.vue";

export default defineComponent({
  name: "PanelComponent",
  components: {
    PanelResults,
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: {},
    },
    index: {
      type: Object,
      required: false,
      default: {},
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();

    const close = () => {
      emit("close");
    };

    const isOpen = computed(() => store.getters["panel/hasPanel"]);

    const data = toRef(props, "data");
    const index = toRef(props, "index");

    return {
      close,
      data,
      isOpen,
      index,
    };
  },
});
</script>

<style lang="scss" scoped>
.o-nameof-panel {
  &--to-close {
    .l-panel {
      width: 0;
    }
  }

  color: var(--color-white);
  height: 100%;
  padding: 0 2rem 0;

  &__wrapper {
    padding-top: 2rem;
    --scrollbar-width: 6px;
    --mask-height: 32px;
    overflow-y: auto;
    height: 100%;
    padding-bottom: var(--mask-height);
    --mask-image-content: linear-gradient(
      to bottom,
      transparent,
      black var(--mask-height),
      black calc(100% - var(--mask-height)),
      transparent
    );
    --mask-size-content: calc(100% - var(--scrollbar-width)) 100%;
    --mask-image-scrollbar: linear-gradient(black, black);

    --mask-size-scrollbar: var(--scrollbar-width) 100%;

    -webkit-mask-image: var(--mask-image-content), var(--mask-image-scrollbar);
    -webkit-mask-size: var(--mask-size-content), var(--mask-size-scrollbar);
    -webkit-mask-position: 0 0, 100% 0;
    -webkit-mask-repeat: no-repeat, no-repeat;

    & {
      --scrollbarBG: transparent;
      --thumbBG: #90a4ae;

      scrollbar-width: thin;
      scrollbar-color: var(--thumbBG) var(--scrollbarBG);
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: var(--scrollbarBG);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--thumbBG);
      border-radius: 6px;
      border: 3px solid var(--scrollbarBG);
    }
  }
}
</style>
