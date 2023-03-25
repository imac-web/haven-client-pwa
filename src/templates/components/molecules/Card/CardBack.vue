<template>
  <div class="m-card-back">
    <div class="m-card-back__content">
      <div class="m-card-back__content-title">En détail</div>
      <table class="m-card-back__content-table">
        <tr v-for="(data, i) in data" :key="`detail-${i}`">
          <td v-if="data.label && data.score >= 0">{{ data.label }}</td>
          <td v-if="data.score >= 0" class="score-value">{{ data.score }}</td>
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
      return data.value.filter((obj) => obj.score !== null);
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
  border-radius: 1rem;

  height: fit-content;
  width: 100%;
  padding-top: 1rem;

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
      padding-bottom: 1rem;
      position: relative;
      color: var(--color-haven_grey);
    }

    &-title::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(37, 198, 133, 0) 0%,
        rgba(37, 198, 133, 0.9598433123249299) 50%,
        rgba(37, 198, 133, 0) 100%
      );
    }

    &-table {
      width: 100%;
      border-collapse: collapse;
      overflow: hidden;

      & tr {
        // border-bottom: 1px solid var(--color-haven_green);
        display: flex;
        justify-content: space-between;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(2, 0, 36, 1) 0%,
            rgba(37, 198, 133, 0) 0%,
            rgba(37, 198, 133, 0.9598433123249299) 50%,
            rgba(37, 198, 133, 0) 100%
          );
        }

        &:last-child {
          border: none;

          &::after {
            content: none;
          }
        }
      }

      & td {
        text-align: left;
        padding: 1rem var(--details-padding) 1rem;
        font-size: 1.4rem;
      }

      & .score-value {
        font-weight: bold;
      }
    }
  }
}
</style>
