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
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { PANEL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

import emitter from "@/services/emitter";
import fetchServices from "@/utils/fetchServices";

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
    //open and close panel functions
    const store = useStore();

    function openPanel(data, index) {
      store.dispatch("panel/open", {
        component: PANEL_COMPONENTS.Panel,
        data,
        index,
      });
    }

    const close = () => {
      store.dispatch("panel/close");
    };

    const selectResult = async (result) => {
      emitter.emit("selected-result", result);
      let services = await fetchServices(
        result.y,
        result.x,
        1000,
        result.raw.properties.citycode
      )
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      openPanel(result, services);
    };

    return {
      selectResult,
    };
  },
});
</script>

<style lang="scss">
.c-list-search-results {
  background-color: var(--color-haven_dark_grey);
  width: 100%;
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
    --btn-txt-color: var(--color-haven_white);

    --btn-border-color: var(--color-haven_white);
    --btn-hover-color: var(--color-haven_green);
    @include min(md) {
      --btn-txt-size: var(--fs-small);
    }
    @include max(md) {
      --btn-txt-size: var(--fs-xsmall);
    }
  }
}
</style>
