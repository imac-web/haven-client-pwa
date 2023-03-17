<template>
  <div class="m-card-main">
    <div class="m-card-main__content">
      <div class="m-card-main__content-top">
        <h3>Vivability</h3>
      </div>
      <div class="m-card-main__content-bottom">
        <ve-progress
          v-if="loading"
          :loading="loading"
          :size="160"
          emptyColor="rgba(255, 255, 255, 0.1)"
          :thickness="15"
          :empty-thickness="15"
          :legend="score"
          :legend-formatter="myFormatter"
          legend-class="legend-custom-style"
          color="#25c685"
        ></ve-progress>
        <ve-progress
          v-else
          :progress="score * 10"
          :angle="90"
          :size="160"
          emptyColor="rgba(255, 255, 255, 0.1)"
          :thickness="15"
          :empty-thickness="15"
          :legend="score"
          :legend-formatter="myFormatter"
          legend-class="legend-custom-style"
          color="#25c685"
        ></ve-progress>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { VeProgress } from "vue-ellipse-progress";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

export default defineComponent({
  name: "CardMain",
  components: {
    VeProgress,
    ButtonPrimary,
  },
  props: {
    score: {
      type: Number,
      required: false,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const score = toRef(props, "score");
    const loading = toRef(props, "loading");

    function setToFixed(v) {
      return v % 1 ? v.toFixed(1) : v;
    }

    const myFormatter = ({ currentValue }) => {
      return `
        <span style="font-weight: bold; font-size: 6rem;">${currentValue}</span>
        <span style="opacity:0.5; font-size: 2rem; text-transform:uppercase;"> / 10</span>
      `;
    };

    return {
      score,
      loading,
      setToFixed,
      myFormatter,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-card-main {
  --bg-color: var(--color-haven_dark_grey);
  background-color: var(--bg-color);
  border-radius: (2rem);

  height: 30rem;
  width: 100%;
  padding: 1rem;

  &__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    &-top {
      text-align: center;
    }
    &-bottom {
      text-align: center;
    }
    &-right {
      position: absolute;
      right: 0;
      top: 0;
      &-btn {
        --color-white-alpha: rgba(255, 255, 255, 0.15);
        --btn-txt-display: none;
        --btn-bg-color: var(--color-white-alpha);
        --btn-border-color: transparent;
        --btn-padding-v: 0.5em;
        --btn-padding-h: 0.5em;
        --btn-svg-width: 0.7em;
      }
    }
  }
}
</style>
