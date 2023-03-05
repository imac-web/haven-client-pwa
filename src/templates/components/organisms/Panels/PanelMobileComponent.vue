<template>
  <div
    class="o-nameof-panel-mobile | l-container"
    :class="{ 'o-nameof-panel-mobile--active': isOpen }"
  >
    <div class="o-nameof-panel-mobile__wrapper">
      <panel-results
        class="o-nameof-panel-mobile__wrapper-results"
        :data="data"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import PanelResults from "@/templates/components/organisms/Panels/PanelResults.vue";

export default defineComponent({
  name: "PanelMobileComponent",
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

    const isOpen = computed(() => store.getters["panelMobile/hasPanelMobile"]);

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
.o-nameof-panel-mobile {
  &--to-close {
    .l-panel-mobile {
      opacity: 0;
    }
  }

  margin-top: 3rem;
}
</style>
