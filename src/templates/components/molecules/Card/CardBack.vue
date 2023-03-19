<template>
  <div class="m-card-back">
    <div class="m-card-back__content">
      <div class="m-card-back__content-title">Détails de la note</div>
      <table class="m-card-back__content-table">
        <tr v-for="(data, i) in filteredData" :key="`detail-${i}`">
          <td v-if="data.label && data.score">{{ data.label }}</td>
          <td v-if="data.score">{{ data.score }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

export default defineComponent({
  name: "CardBack",
  components: {
    ButtonPrimary,
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: {},
    },
  },
  setup(props) {
    const data = toRef(props, "data");

    function setToFixed(v) {
      const value = +v;
      return value % 1 ? value.toFixed(1) : value;
    }

    const score = computed(() => {
      return setToFixed(data.value.score);
    });

    const filteredData = computed(() => {
      return data.value.filter((obj) => obj.score !== 0);
    });

    return {
      data,
      score,
      filteredData,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-card-back {
  --details-padding: 2rem;
  --bg-color: var(--color-haven_dark_grey);
  background-color: var(--bg-color);
  border-radius: (2rem);

  height: fit-content;
  width: 100%;
  padding-top: 2rem;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;

    &-title {
      text-align: left;
      font-variant: small-caps;
      padding-left: var(--details-padding);
      font-size: var(--fs-small);
      font-weight: 700;
    }

    &-table {
      width: 100%;
      border-collapse: collapse;
      overflow: hidden;
      margin-top: 2rem;

      & tr {
        border-bottom: 1px solid var(--color-haven_green);
        &:last-child {
          border: none;
        }
      }

      & td {
        text-align: left;
        padding: 1rem var(--details-padding) 1rem;
      }
    }
  }
}
</style>
