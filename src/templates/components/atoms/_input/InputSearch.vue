<template>
  <div class="c-input-search">
    <span class="c-button-primary__bg"></span>
    <object-icon
      v-if="iconBefore"
      class="c-input-search__icon c-input-search__icon--before"
      :name="iconBefore"
    />
    <input
      ref="searchInput"
      @input="onInput"
      :placeholder="label"
      class="c-input-search__input"
    />
    <object-icon
      v-if="iconAfter"
      class="c-input-search__icon c-input-search__icon--before"
      :name="iconAfter"
    />
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
      default: "Input placeholder",
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
  emits: ["SearchResults", "SlideUpPanel"],
  setup(props, { emit }) {
    // setup provider
    const provider = new GeoApiFrProvider();

    const searchInput = ref(null);
    const results = ref([]);

    async function onInput(event) {
      const query = event.target.value;
      if (query.length > 0) {
        results.value = await provider.search({ query });

        emitter.emit("slide-up-panel", true);
      } else {
        results.value = [];
        emitter.emit("slide-up-panel", false);
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
  --input-txt-color: var(--color-black);
  --input-txt-size: var(--fs-small);

  --input-padding-v: 0.5em;
  --input-padding-h: 1em;
  --input-padding: var(--input-padding-v) var(--input-padding-h);
  --input-border-color: var(--color-black);
  --input-border-radius: 50rem;

  --svg-spacing: 0.5em;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--svg-spacing);
  font-size: var(--input-txt-size);
  padding: var(--input-padding);
  z-index: 2;

  border: var(--input-border-color) solid 1px;
  border-radius: var(--input-border-radius);

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
