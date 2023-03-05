<template>
  <div class="o-panel-results">
    <div class="o-panel-results__wrapper">
      <p v-if="data.label">{{ data.label }}</p>
      <p v-else-if="positionCoords">{{ positionCoords }}</p>
      <p v-else>{{ positionCoordsFirst }}</p>
      <hr />
      <div class="o-panel-results__wrapper-result">
        <card-main :score="+totalScore" />
      </div>
      <div class="o-panel-results__wrapper-list">
        <cards-list :data="index" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  toRef,
  computed,
  onMounted,
  ref,
  isProxy,
  toRaw,
} from "vue";
import CardsList from "@/templates/components/molecules/Card/CardsList.vue";
import CardMain from "@/templates/components/molecules/Card/CardMain.vue";
import { VeProgress } from "vue-ellipse-progress";
import emitter from "@/services/emitter";

export default defineComponent({
  name: "PanelResults",
  components: {
    CardsList,
    CardMain,
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

    function setToFixed(v) {
      return v % 1 ? v.toFixed(1) : v;
    }

    function getTotalScore(obj) {
      let total = 0;

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          total += obj[key].score;
        }
      }

      return total;
    }

    function getAverageScore(obj) {
      let totalScore = 0;
      let count = 0;

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key].score === "number") {
            totalScore += obj[key].score;
            count++;
          }
        }
      }

      return totalScore / count;
    }

    //loop through index and find all scores and add them together
    const totalScore = computed(() => {
      const total = getAverageScore(index.value);
      return setToFixed(total);
    });

    return {
      close,
      data,
      index,
      positionCoords,
      positionCoordsFirst,
      totalScore,
    };
  },
});
</script>

<style lang="scss" scoped>
.o-panel-results {
  --results-txt-color: var(--color-white);
  color: var(--results-txt-color);

  &__wrapper {
    & p {
      margin-bottom: 3rem;
    }
    text-align: center;
    &-result {
      margin-top: 3rem;
    }

    &-list {
      //max-height: 400px;
    }
  }
}
</style>
