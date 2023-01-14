<template>
  <div
    class="o-nameof-panel | l-container"
    :class="{ 'o-nameof-panel--active': isOpen }"
  >
    <div class="o-nameof-panel__wrapper">
      <p>Given Address</p>
      <div class="o-nameof-panel__wrapper-number">90%</div>
      <hr />
      <div class="o-nameof-panel__wrapper-list">
        <DraggableList />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import DraggableList from "@/templates/components/molecules/DraggableList/DraggableList.vue";

export default defineComponent({
  name: "ProjectPanel",
  components: {
    DraggableList,
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

  color: var(--color-white);

  &__wrapper {
    &-number {
      font-size: 1.5em;
      font-weight: 600;
      margin-bottom: 10px;
    }

    &-list {
      max-height: 400px;
      overflow-y: auto;
    }
  }
}
</style>
