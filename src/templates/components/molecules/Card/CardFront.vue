<template>
  <div class="m-card-front">
    <div class="m-card-front__content">
      <div class="m-card-front__content-left">
        <h3>{{ data.label }}</h3>
        <p>{{ data.description }}</p>
      </div>
      <div class="m-card-front__content-right">
        <ve-progress :progress="score * 10" :angle="90" :size="80" emptyColor="transparent" :legend="score"
          :legend-formatter="myFormatter" color="#25c685" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { VeProgress } from "vue-ellipse-progress";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

export default defineComponent({
  name: "CardFront",
  components: {
    VeProgress,
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

    const myFormatter = (computed) => {
      return `
        <span style=" font-size: 2.5rem;">${score.value}</span>
      `;
    };

    return {
      data,
      score,
      setToFixed,
      myFormatter,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-card-front {
  --bg-color: var(--color-haven_dark_grey);
  background-color: var(--bg-color);
  border-radius: 1rem;

  height: 10rem;
  width: 100%;
  padding: 1rem;

  &__content {
    display: flex;
    flex-direction: row;
    height: 100%;

    &-left {
      align-self: center;
      flex: 0 0 21rem;
      text-align: left;
      padding: 0 2rem;

      h3 {
        font-variant: small-caps;
        font-size: var(--fs-small);
        font-weight: 700;
        margin: 0;
      }

      p {
        font-size: 1.3rem;
        color: var(--color-haven_grey);
      }
    }

    &-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
  }
}
</style>
