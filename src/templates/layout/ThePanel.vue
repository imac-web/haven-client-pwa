<template>
    <Teleport to="body">
        <div
            class="l-panel"
            :class="{ 'is-open': isReady }"
            role="dialog"
            aria-labelledby="panelTitle"
            aria-describedby="panelDescription"
            ref="panel"
        >
            <component
                :is="panelComponent"
                :data="panelData"
                :index="panelIndex"
                @close="close"
            />
        </div>
    </Teleport>
</template>

<script>
import {
    defineComponent,
    computed,
    ref,
    watch,
    onMounted,
    onBeforeUnmount,
    nextTick,
} from "vue";
import { useStore } from "vuex";

import PanelComponent from "@/templates/components/organisms/Panels/PanelComponent.vue";

export default defineComponent({
    name: "ThePanel",
    components: {
        PanelComponent,
    },
    props: {},
    setup(props) {
        const store = useStore();

        const isOpen = ref(false);

        const close = () => {
            isOpen.value = false;
            setTimeout(() => {
                store.dispatch("panel/close");
            }, 600);
        };

        const currentScroll = ref(0);

        const isReady = computed(() => {
            return store.getters["panel/hasPanel"] && isOpen.value;
        });
        const hasPanel = computed(() => {
            return store.getters["panel/hasPanel"];
        });

        const panelData = computed(() => {
            return store.state.panel.data;
        });
        const panelIndex = computed(() => {
            return store.state.panel.index;
        });

        const panelComponent = computed(() => {
            return store.state.panel.component;
        });

        const panel = ref(null);

        const isMobile = computed(() => {
            return store.state.userContext.isMobile;
        });

        const width = ref(null);

        function setPanelStoreWidth(width) {
            store.dispatch("panel/setPanelWidthGlobally", width);
        }

        function setPanelWidth() {
            width.value = panel.value.clientWidth;
            setPanelStoreWidth(width.value);
        }

        function onResize() {
            !isMobile.value ? setPanelWidth() : null;
        }

        onMounted(() => {
            setPanelWidth();
            window.addEventListener("resize", onResize);
        });
        onBeforeUnmount(() => {
            window.removeEventListener("resize", onResize);
        });

        watch(hasPanel, (open) => {
            if (open) {
                isOpen.value = true;
                currentScroll.value = window.scrollY;
                store.dispatch("scroll/toggleDisabledScroll", true);
                nextTick(() => {
                    setPanelWidth();
                });
            } else {
                window.scrollTo(0, currentScroll.value);
                store.dispatch("scroll/toggleDisabledScroll", false);
            }
        });

        return {
            isReady,
            currentScroll,
            isOpen,
            panelData,
            panelComponent,
            close,
            hasPanel,
            panelIndex,
            panel,
        };
    },
});
</script>

<style lang="scss">
.l-panel {
    --panel-padding: 2rem;
    --panel-height: 100%;
    --panel-bg: var(--color-dark);
    --navbar-height: 5rem;

    @include full-screen-dom();
    z-index: 102;
    background: var(--color-beige);
    //opacity: 0;
    pointer-events: none;

    width: var(--panel-width, 0rem) ;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    overflow-y: auto;
    background-color: var(--panel-bg);
    transition: opacity 0.4s linear;
    @include min(md) {
        height: var(--panel-height);
        max-height: calc(100vh - var(--navbar-height));

        left: calc(100vw - var(--panel-width));
        top: var(--navbar-height);

        display: block;
    }
    @include max(md) {
        @include container("default");
    }

    display: none;

    &.is-open {
        //opacity: 1;
        --panel-width:45rem
        pointer-events: auto;
    }
}
</style>
