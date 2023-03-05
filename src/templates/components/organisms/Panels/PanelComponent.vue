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

  padding: 2rem;

  &__wrapper {
  }
}
</style>
