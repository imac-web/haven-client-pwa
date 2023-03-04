<template>
  <div class="m-card">
    <div class="m-card__content">
      <div class="m-card__content-left">
        <h3>{{ data.label }}</h3>
      </div>
      <div class="m-card__content-right">
        <ve-progress
          :progress="score * 10"
          :angle="90"
          :size="100"
          emptyColor="transparent"
          :legend="score"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { VeProgress } from "vue-ellipse-progress";

export default defineComponent({
  name: "Card",
  components: {
    VeProgress,
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

    /* 
    label
    score
        label
        description
        score    
     */
    return {
      data,
      score,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-card {
  --bg-color: var(--color-green);
  background-color: var(--bg-color);

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &-left {
    }
    &-right {
    }
  }
}
</style>
