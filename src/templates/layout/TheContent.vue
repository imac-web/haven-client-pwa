<template>
    <div class="l-content" ref="content">
        <!-- <hero /> -->
        <map-base />
        <panel class="l-content__panel" />
    </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import Hero from "@/templates/components/organisms/Hero/Hero.vue";
import MapBase from "@/templates/components/organisms/Map/MapBase.vue";
import Panel from "@/templates/components/organisms/Panel/Panel.vue";

export default defineComponent({
    name: "TheContent",
    components: {
        ButtonPrimary,
        Hero,
        Panel,
        MapBase,
    },
    setup() {
        const store = useStore();
        function openModal(data) {
            store.dispatch("modal/open", {
                component: MODAL_COMPONENTS.Modal,

                data,
            });
        }

        return {
            openModal,
        };
    },
});
</script>

<style lang="scss">
.l-content {
    @include max(md) {
        @include fullscreen;
    }
}
</style>
