<template>
  <div
    class="o-nameof-panel-mobile | l-container"
    :class="{ 'o-nameof-panel-mobile--active': isOpen }"
  >
    <div class="o-nameof-panel-mobile__wrapper">
      <div class="o-nameof-panel-mobile__wrapper-draggable">
        <p>Given Address</p>
        <h2>90%</h2>
        <hr />
      </div>
      <div class="o-nameof-panel-mobile__wrapper-list">
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
  name: "ProjectPanelMobile",
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

    const isOpen = computed(() => store.getters["panelMobile/hasPanelMobile"]);

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
.o-nameof-panel-mobile {
  &--to-close {
    .l-panel-mobile {
      opacity: 0;
    }
    .backdrop {
      opacity: 0;
      visibility: hidden;
    }
  }

  color: var(--color-dark);
  //overflow-y: hidden;

  &__wrapper {
    &-draggable {
      font-size: 1.5em;
      font-weight: 600;
      margin-bottom: 10px;
    }

    &-list {
      //background-color: red;
      //max-height: 400px;
      // overflow-y: auto;
      overflow: auto !important;
      height: 50vh;
    }
  }
}
</style>
