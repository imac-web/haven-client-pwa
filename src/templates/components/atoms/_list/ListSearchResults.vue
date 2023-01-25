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
import getIndexFromLocation from "@/utils/getIndexFromLocation";

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
        function openPanelMobile(data, index) {
            store.dispatch("panelMobile/open", {
                component: PANEL_COMPONENTS.PanelMobile,
                data,
                index,
            });
        }

        const close = () => {
            store.dispatch("panel/close");
        };

        const selectResult = (result) => {
            emitter.emit("selected-result", result);
            let index = undefined;
            getIndexFromLocation().then((data) => {
                index = data;
                openPanel(result, index);
                openPanelMobile(result, index);
            });
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
