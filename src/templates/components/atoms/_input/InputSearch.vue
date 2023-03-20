<template>
  <div class="c-input-search">
    <object-icon
      v-if="iconBefore"
      class="c-input-search__icon c-input-search__icon--before"
      :name="iconBefore"
      color="var(--input-txt-color)"
    />
    <div class="c-input-search__inner">
      <input
        ref="searchInput"
        @input="onInput"
        :placeholder="label"
        class="c-input-search__input"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { GeoApiFrProvider } from "leaflet-geosearch";

import ObjectIcon from "@/templates/objects/ObjectIcon.vue";

import emitter from "@/services/emitter";

export default defineComponent({
  name: "InputSearch",
  components: {
    ObjectIcon,
  },
  props: {
    label: {
      type: [String, Number],
      default: "Recherche",
    },
    //--- Icons ---//
    iconBefore: {
      type: String,
      default: null,
    },
    iconAfter: {
      type: String,
      default: null,
    },
  },
  emits: ["SearchResults"],
  setup(props, { emit }) {
    // setup provider
    const provider = new GeoApiFrProvider();

    const searchInput = ref(null);
    const results = ref([]);

    async function onInput(event) {
      const query = event.target.value;
      if (query.length > 0) {
        results.value = await provider.search({ query });
      } else {
        results.value = [];
      }

      emitter.emit("search-results", results.value);
    }

    return {
      searchInput,
      results,
      onInput,
    };
  },
});
</script>

<style lang="scss">
.c-input-search {
  --input-txt-color: var(--color-haven_grey);
  --input-txt-size: var(--fs-small);

  --input-padding-v: 0.5em;
  --input-padding-h: 1em;
  --input-padding: var(--input-padding-v) var(--input-padding-h);
  --input-border-color: var(--color-haven_grey);
  --input-bg-color: var(--color-haven_dark_grey);
  --input-border-radius: 1.2rem;

  --svg-spacing: 0.5em;

  display: inline-flex;
  align-items: center;
  gap: var(--svg-spacing);
  font-size: var(--input-txt-size);
  color: var(--input-txt-color);
  padding: var(--input-padding);
  z-index: 2;

  border: var(--input-border-color) solid 1px;
  border-radius: var(--input-border-radius);
  background-color: var(--input-bg-color);

  width: 100%;
  @include min(md) {
  }
  &__inner {
    width: 100%;
    text-align: left;
  }

  &__icon {
    --svg-width: 1.25em;
    --svg-height: var(--svg-width);

    &:deep(svg) {
      color: var(--input-txt-color);
      transition: color 1s $out-expo;
    }
  }
}
</style>
