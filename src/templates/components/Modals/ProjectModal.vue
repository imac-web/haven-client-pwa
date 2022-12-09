<template>
    <div
        class="c-project-modal | l-container"
        :class="{ 'c-project-modal--active': isOpen }"
    ></div>
</template>

<script>
import { defineComponent, toRef, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    name: "ProjectModal",
    components: {},
    props: {
        data: {
            type: Object,
            required: true,
            default: {},
        },
    },
    emits: ["close"],
    setup(props, { emit }) {
        const store = useStore();

        const close = () => {
            emit("close");
        };

        const isOpen = computed(() => store.getters["modal/hasModal"]);

        const data = toRef(props, "data");
        return {
            close,
            data,
            isOpen,
        };
    },
});
</script>

<style lang="scss" scoped>
.c-project-modal {
    &--to-close {
        .l-modal {
            opacity: 0;
        }
        .backdrop {
            opacity: 0;
            visibility: hidden;
        }
    }

    color: var(--color-pistachio);
}
</style>
