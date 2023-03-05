<template>
  <div class="m-card">
    <button-primary
      tag="a"
      class="m-card__flip-btn"
      iconBefore="dots"
      @click="flip = !flip"
    />
    <div class="m-card__flip" :class="{ 'do-flip': flip }">
      <div class="m-card__flip-front">
        <card-front :data="data" />
      </div>
      <div class="m-card__flip-back">
        <card-back :data="data.components" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { VeProgress } from "vue-ellipse-progress";

import CardFront from "@/templates/components/molecules/Card/CardFront.vue";
import CardBack from "@/templates/components/molecules/Card/CardBack.vue";
import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

export default defineComponent({
  name: "Card",
  components: {
    VeProgress,
    ButtonPrimary,
    CardFront,
    CardBack,
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
      return v % 1 ? v.toFixed(1) : v;
    }

    const score = computed(() => {
      return setToFixed(data.value.score);
    });

    const flip = ref(false);

    return {
      data,
      score,
      flip,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-card {
  &__flip {
    transition: transform 0.8s;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
    transform: rotateY(0deg);
    &.do-flip {
      transform: rotateY(180deg);
    }

    &-btn {
      --color-white-alpha: rgba(255, 255, 255, 0.15);
      --btn-txt-display: none;
      --btn-bg-color: var(--color-white-alpha);
      --btn-hover-color: var(--color-haven_green);
      --btn-border-color: transparent;
      --btn-padding-v: 0.5em;
      --btn-padding-h: 0.5em;
      --btn-svg-width: 0.7em;

      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 3;
      cursor: pointer;
    }
  }
  &__flip-front,
  &__flip-back {
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  &__flip-front {
    z-index: 2;
    transform: rotateY(0deg);
  }
  &__flip-back {
    transform: rotateY(180deg);
  }
}
</style>
