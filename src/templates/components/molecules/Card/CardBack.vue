<template>
  <div class="m-card-back">
    <div class="m-card-back__content">
      {{}}
      <table class="m-card-back__content-table">
        <tr>
          <th>Label</th>
          <th>Description</th>
          <th>Score</th>
        </tr>
        <tr v-for="(data, i) in data">
          <td v-if="data.label">{{ data.label }}</td>
          <td v-else>No label</td>

          <td v-if="data.description">{{ data.description }}</td>
          <td v-else>No description</td>

          <td v-if="data.score">{{ data.score }}</td>
          <td v-else>No score</td>
        </tr>
      </table>
      <!-- <div class="m-card-back__content-top">
        <h3>{{ data.label }}</h3>
      </div>
      <div class="m-card-back__content-bottom"></div> -->
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
      required: true,
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

    return {
      data,
      score,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-card-back {
  --bg-color: var(--color-haven_dark_grey);
  background-color: var(--bg-color);
  border-radius: (2rem);

  height: fit-content;
  width: 100%;
  padding-top: 5rem;

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 100%;
    &-top {
      align-self: center;
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }

    &-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--color-haven_green);
      border-radius: 2rem;
      overflow: hidden;
      & th {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid var(--color-haven_green);
        background-color: var(--color-haven_green);
      }
      & td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid var(--color-haven_green);
      }
    }
  }
}
</style>
