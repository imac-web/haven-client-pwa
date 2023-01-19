<template>
  <div class="o-panel-results">
    <div class="o-panel-results__wrapper">
      <p>{{ data.label }}</p>
      <div class="o-panel-results__wrapper-number">
        {{ index.global }}
      </div>
      <hr />
      <div class="o-panel-results__wrapper-list">
        <DraggableList :data="index.services" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import DraggableList from "@/templates/components/molecules/DraggableList/DraggableList.vue";
export default defineComponent({
  name: "PanelResults",
  components: {
    DraggableList,
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
  setup(props) {
    const data = toRef(props, "data");
    const index = toRef(props, "index");

    return {
      close,
      data,
      index,
    };
  },
});
</script>

<style lang="scss" scoped>
.o-panel-results {
  --results-txt-color: var(--color-white);
  color: var(--results-txt-color);

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
