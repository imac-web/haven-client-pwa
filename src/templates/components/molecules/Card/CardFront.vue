<template>
  <div class="m-card-front">
    <div class="m-card-front__content">
      <div class="m-card-front__content-left">
        <h3>{{ data.label }}</h3>
      </div>
      <div class="m-card-front__content-right">
        <ve-progress
          :progress="score * 10"
          :angle="90"
          :size="100"
          emptyColor="transparent"
          :legend="score"
          color="#25c685"
        />
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
      return v % 1 ? v.toFixed(1) : v;
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
.m-card-front {
  --bg-color: var(--color-haven_dark_grey);
  background-color: var(--bg-color);
  border-radius: (2rem);

  height: 18rem;
  width: 100%;
  padding: 1rem;

  &__content {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 100%;
    &-left {
      align-self: center;
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
