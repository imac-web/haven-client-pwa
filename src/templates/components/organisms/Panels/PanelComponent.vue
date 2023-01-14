<template>
  <div
    class="o-nameof-panel | l-container"
    :class="{ 'o-nameof-panel--active': isOpen }"
  >
    <button-primary
      class="o-nameof-panel__btn"
      label="Close Panel"
      color="light"
      @click="close"
    />
  </div>
</template>

<script>
import { defineComponent, toRef, computed } from "vue";
import { useStore } from "vuex";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

export default defineComponent({
  name: "ProjectPanel",
  components: {
    ButtonPrimary,
  },
  props: {
    data: {
      type: Object,
      required: true,
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
    return {
      close,
      data,
      isOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
.o-nameof-panel {
  &--to-close {
    .l-panel {
      opacity: 0;
    }
    .backdrop {
      opacity: 0;
      visibility: hidden;
    }
  }

  &__btn {
    --btn-txt-color: var(--color-black);
    --btn-border-color: var(--color-black);
  }

  color: var(--color-pistachio);
}
</style>
