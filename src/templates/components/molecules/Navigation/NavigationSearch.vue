<template>
  <div class="m-navigation-search">
    <search />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import Search from "@/templates/components/organisms/Search/Search.vue";

export default defineComponent({
  name: "NavigationSearch",
  components: {
    Search,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss">
.m-navigation-search {
}
</style>
