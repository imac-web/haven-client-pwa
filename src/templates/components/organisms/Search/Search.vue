<template>
  <div class="c-search" ref="search">
    <InputSearch iconBefore="search" class="c-search__input" />
    <ListSearchResults :results="SearchResults" class="c-search__list" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

import InputSearch from "@/templates/components/atoms/_input/InputSearch.vue";
import ListSearchResults from "@/templates/components/atoms/_list/ListSearchResults.vue";

import emitter from "@/services/emitter";

export default defineComponent({
  name: "Search",
  components: {
    InputSearch,
    ListSearchResults,
  },
  setup() {
    const SearchResults = ref([]);
    emitter.on("search-results", (data) => {
      SearchResults.value = data;
    });
    emitter.on("selected-result", (data) => {
      SearchResults.value = {};
    });

    return {
      SearchResults,
    };
  },
});
</script>

<style lang="scss">
.c-search {
  text-align: center;
  width: 100%;

  &__input {
  }

  &__list {
  }
}
</style>
