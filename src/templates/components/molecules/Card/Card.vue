<template>
  <div class="m-card">
    <div class="m-card__content">
      <div class="m-card__content-left">
        <h3>{{ data.label }}</h3>
      </div>
      <div class="m-card__content-right">
        <ve-progress :progress="data.score * 100" :angle="90" size="100" />
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

    console.log("data", data.value);

    /* 
    label
    score
        label
        description
        score    
     */
    return {
      data,
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
