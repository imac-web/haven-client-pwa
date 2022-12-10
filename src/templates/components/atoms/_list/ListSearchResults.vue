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
import { defineComponent } from "vue";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";

import emitter from "@/services/emitter";

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
        const selectResult = (result) => {
            emitter.emit("selected-result", result);
        };

        return {
            selectResult,
        };
    },
});
</script>

<style lang="scss">
.c-list-search-results {
    &__list {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-top: 4rem;

        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    &__list-element {
    }
}
</style>
