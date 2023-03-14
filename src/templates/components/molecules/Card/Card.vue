<template>
  <div class="m-card" :class="{ 'is-switched': flip }">
    <button-primary
      tag="a"
      class="m-card__btn"
      iconBefore="dots"
      @click="flip = !flip"
    />

    <div class="m-card__wrapper">
      <div class="m-card__side" :class="{ 'is-active': !flip }">
        <card-front :data="data" />
      </div>
      <div
        class="m-card__side m-card__side--back"
        :class="{ 'is-active': flip }"
      >
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
$card-transition-time: 0.5s;

.m-card {
  perspective: 600px;
  position: relative;

  &.is-switched {
    .m-card__wrapper {
      animation: rotate $card-transition-time linear both;
    }
  }

  &__wrapper {
    transform-style: preserve-3d;
    animation: rotate-inverse $card-transition-time linear both;
  }

  &__side {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    &.is-active {
      position: static;
    }
  }

  &__side--back {
    transform: rotateY(180deg);
  }

  &__btn {
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

@keyframes rotate {
  0% {
    transform: rotateY(0);
  }
  70% {
    transform: rotateY(200deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}

@keyframes rotate-inverse {
  0% {
    transform: rotateY(180deg);
  }
  70% {
    transform: rotateY(-20deg);
  }
  100% {
    transform: rotateY(0);
  }
}
</style>
