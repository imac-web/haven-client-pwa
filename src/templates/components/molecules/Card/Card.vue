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
        <div class="m-card__content-right-more">
          <button-primary
            tag="a"
            class="m-card__content-right-more-btn"
            iconBefore="dots"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { VeProgress } from "vue-ellipse-progress";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

export default defineComponent({
  name: "Card",
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
.m-card {
  --bg-color: var(--color-haven_dark_grey);
  background-color: var(--bg-color);
  border-radius: (2rem);

  height: 18rem;
  width: 100%;
  padding: 1rem;

  &__content {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    &-left {
      align-self: center;
    }
    &-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      &-more {
        height: 100%;
        &-btn {
          --color-white-alpha: rgba(255, 255, 255, 0.15);
          --btn-txt-display: none;
          --btn-bg-color: var(--color-white-alpha);
          --btn-border-color: transparent;
          --btn-padding-v: 0.5em;
          --btn-padding-h: 0.5em;
        }
      }
    }
  }
}
</style>
