<template>
  <div class="c-list-search-results">
    <div v-if="results.length > 0" class="c-list-search-results__list">
      <button-primary
        v-for="result in results"
        :key="result.id"
        :label="result.label"
        tag="a"
        @click="selectResult(result)"
        class="c-list-search-results__list-element"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

import emitter from "@/services/emitter";

export default defineComponent({
  name: "ListSearchResults",
  components: {
    ButtonPrimary,
  },
  props: {
    results: {
      type: Object,
      default: {},
      required: true,
    },
  },
  emits: ["SelectedResult"],
  setup() {
    const selectResult = (result) => {
      emitter.emit("selected-result", result);
    };

    return {
      selectResult,
    };
  },
});
</script>

<style lang="scss">
.c-list-search-results {
  background-color: var(--color-dark);
  z-index: 99;
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    padding-top: 4rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .c-button-primary {
    @include min(md) {
      --btn-txt-size: var(--fs-small);
    }
    @include max(md) {
      --btn-txt-size: var(--fs-xsmall);
    }
  }
}
</style>
