<template>
  <div class="o-panel-results">
    <div class="o-panel-results__wrapper">
      <p v-if="data.label">{{ data.label }}</p>
      <p v-else-if="positionCoords">{{ positionCoords }}</p>
      <p v-else>{{ positionCoordsFirst }}</p>
      <div class="o-panel-results__wrapper-number">
        {{ index.global?.score }}
      </div>
      <hr />
      <div class="o-panel-results__wrapper-result">
        <ve-progress
          :progress="index.global?.score * 10"
          :angle="90"
          emptyColor="transparent"
          :legend="index.global?.score"
        />
      </div>
      <div class="o-panel-results__wrapper-list">
        <cards-list :data="index.services" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import CardsList from "@/templates/components/molecules/Card/CardsList.vue";
import { VeProgress } from "vue-ellipse-progress";
import emitter from "@/services/emitter";

export default defineComponent({
  name: "PanelResults",
  components: {
    CardsList,
    VeProgress,
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

    const chartData = {
      labels: ["January", "February", "March"],
      datasets: [{ data: [40, 20, 12] }],
    };

    const positionCoordsFirst = ref(
      String(data.value.lat).concat(" ", String(data.value.lng))
    );
    const positionCoords = ref();

    emitter.on("selected-location", (data) => {
      if (data) {
        positionCoords.value = String(data.lat.toFixed(5)).concat(
          " ",
          String(data.lng.toFixed(5))
        );
      }
    });

    return {
      close,
      data,
      index,
      chartData,
      positionCoords,
      positionCoordsFirst,
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
    }
  }
}
</style>
