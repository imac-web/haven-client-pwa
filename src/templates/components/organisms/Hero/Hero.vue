<template>
    <div class="c-hero" ref="hero">
        <div class="c-hero__content">
            <h1 class="c-hero__content-title">HAVEN</h1>
            <div class="c-hero__content-search">
                <object-icon
                    class="c-hero__content-search-icon c-hero__content-search-icon--before"
                    name="close"
                />
                <input
                    type="text"
                    placeholder="Enter your desired location"
                    class="c-hero__content-search-input"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import MapBase from "@/templates/components/organisms/Map/MapBase.vue";
import ObjectIcon from "@/templates/objects/ObjectIcon.vue";

export default defineComponent({
    name: "Hero",
    components: {
        ButtonPrimary,
        MapBase,
        ObjectIcon,
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
.c-hero {
    height: -webkit-fill-available;
    //background-color: var(--color-black);

    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &-title {
            color: var(--color-white);
            font-size: 10rem;
            font-weight: 900;
            text-align: center;
        }
        &-search {
            display: flex;
            align-items: center;
            flex-direction: row;

            border: 1px solid var(--color-white);
            border-radius: 10rem;
            padding: 1rem 2rem;

            &-icon {
                color: var(--color-white);
            }

            &-input {
                margin-left: 1rem;
                width: 100%;
                color: var(--color-white);
            }
        }
    }
}
</style>
