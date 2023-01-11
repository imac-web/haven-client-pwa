<template>
    <div lass="o-panel-content">
        <navigation-search />
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import NavigationSearch from "@/templates/components/molecules/Navigation/NavigationSearch.vue";

export default defineComponent({
    name: "PanelContent",
    components: {
        NavigationSearch,
    },
    setup() {
        return {};
    },
});
</script>

<style lang="scss">
.o-panel-content {
}
</style>
