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
  <div class="backdrop-search" :class="{ 'backdrop-open': showBackdrop }" />
</template>

<script>
import { defineComponent, computed, toRef } from "vue";
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
  setup(props) {
    const results = toRef(props, "results");
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
      close();
      openPanel(result);
      emitter.emit("selected-result", result);
      let services = await fetchServices(
        result.y,
        result.x,
        // 1000,
        result.raw.properties.citycode
      )
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      close();
      openPanel(result, services);
    };

    const showBackdrop = computed(() => {
      return results.value.length > 0 ? true : false;
    });

    return {
      selectResult,
      results,
      showBackdrop,
    };
  },
});
</script>

<style lang="scss">
.c-list-search-results {
  position: absolute;
  //background-color: var(--color-haven_dark_grey);
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

.backdrop-search {
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--color-haven_dark_grey_alpha);
  backdrop-filter: blur(2rem);
  width: var(--panel-width);
  height: 100%;

  opacity: 0;
  visibility: hidden;

  transition: visibility 0.2s, opacity 0.2s ease-in-out;

  &.backdrop-open {
    opacity: 1;
    visibility: visible;
  }
}
</style>
