<template>
    <div class="l-content" ref="content">
        <!-- <button-primary
            class="c-project-modal-btn"
            label="Open Modal"
            color="light"
            @click="openModal"
        /> -->
        <map-base />
    </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import MapBase from "@/templates/components/organisms/Map/MapBase.vue";


export default defineComponent({
    name: "TheContent",
    components: {
        ButtonPrimary,
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
    height: -webkit-fill-available;
}
</style>
