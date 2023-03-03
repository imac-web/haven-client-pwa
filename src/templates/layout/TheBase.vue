<template>
    <div
        class="l-base"
        :class="`${globalUserContext}`"
        :style="`--header-height: ${headerHeight}px; --app-height: ${appHeight}px;`"
        id="base"
    >
        <!-- <the-loader></the-loader> -->
        <the-header class="l-base__header" />

        <main class="l-main" ref="main">
            <the-content />
            <!-- <the-footer></the-footer> -->
            <the-panel-mobile />
        </main>
        <the-panel />
        <the-modal />
    </div>
</template>

<script>
import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    nextTick,
    computed,
    watch,
} from "vue";
import { useStore } from "vuex";
import { userContext } from "@/utils";

import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import TheLoader from "@/templates/layout/TheLoader.vue";
import TheContent from "@/templates/layout/TheContent.vue";
import TheFooter from "@/templates/layout/TheFooter.vue";
import TheHeader from "@/templates/layout/TheHeader.vue";
import TheModal from "@/templates/layout/TheModal.vue";
import ThePanel from "@/templates/layout/ThePanel.vue";
import ThePanelMobile from "@/templates/layout/ThePanelMobile.vue";

export default defineComponent({
    name: "TheBase",
    components: {
        TheLoader,
        TheContent,
        TheFooter,
        TheHeader,
        TheModal,
        ThePanel,
        ThePanelMobile,
    },
    setup() {
        const store = useStore();

        const currentScrollProgress = ref(0);

        const isLoading = computed(() => store.getters["loader/isLoading"]);
        const isScrollDisabled = computed(
            () => store.state.scroll.isScrollDisabled
        );

        const globalUserContext = computed(
            () => store.getters["userContext/globalUserContext"]
        );
        const isScrollTop = computed(() => store.getters["scroll/isScrollTop"]);
        const isScrollingUp = computed(
            () => store.getters["scroll/isScrollingUp"]
        );

        ////////////////////////////////
        //       START SET USER CONTEXT
        ////////////////////////////////
        store.dispatch("userContext/setUserContext", userContext);

        ////////////////////////////////
        //       END SET USER CONTEXT
        ////////////////////////////////

        //======= START SCROLL TOP =======//

        function checkIfUserScrollTop(progress) {
            progress !== isScrollTop.value
                ? toggleUserScrolled(progress)
                : null;
        }

        function toggleUserScrolled(bool) {
            store.dispatch("scroll/toggleScrollTop", bool);
        }

        //======= END SCROLL TOP =======//

        ////////////////////////////////
        //       START SCROLL DIRECTION
        ////////////////////////////////
        function onScroll() {
            toggleScrollDirection(
                currentScrollProgress.value > window.pageYOffset
            );

            nextTick(() => {
                currentScrollProgress.value = window.pageYOffset;
            });
        }

        function toggleScrollDirection(bool) {
            isScrollingUp.value !== bool
                ? store.dispatch("scroll/toggleScrollDirection", bool)
                : null;
        }
        ////////////////////////////////
        //       END SCROLL DIRECTION
        ////////////////////////////////

        ////////////////////////////////
        //       APP SIZE
        ////////////////////////////////
        const appHeight = ref(window.innerHeight);

        const headerHeight = computed(() => {
            return store.state.navigation.navHeight;
        });

        const isMobile = computed(() => {
            return store.state.userContext.isMobile;
        });
        ////////////////////////////////
        //      END APP SIZE
        ////////////////////////////////

        ////////////////////////////////
        //       START RESIZE
        ////////////////////////////////
        function refreshScrollTrigger() {
            ScrollTrigger.refresh();
        }

        function onResize() {
            !isMobile.value ? refreshScrollTrigger() : null;
        }
        ////////////////////////////////
        //       END RESIZE
        ////////////////////////////////

        onMounted(() => {
            window.addEventListener("resize", onResize);
            window.addEventListener("scroll", onScroll);
            refreshScrollTrigger();
        });
        onBeforeUnmount(() => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onScroll);
        });

        watch(() => {
            refreshScrollTrigger();
        });

        return {
            isLoading,
            globalUserContext,
            appHeight,
            headerHeight,
        };
    },
});
</script>

<style lang="scss">
.l-base {
    &__header {
        @include min(md) {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            z-index: 100;
        }
        display: none;
    }
}

.l-main {
    background-color: var(--color-dark);
    overflow: hidden;
    margin: 0;
    padding: 0;
    position: fixed;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    transform: translateZ(0);
    text-rendering: optimizeLegibility;
    overflow: hidden;
    touch-action: manipulation;
    -webkit-user-drag: none;
    -ms-content-zooming: none;
    word-wrap: break-word;
    overscroll-behavior-y: none;
    text-size-adjust: none;
}
</style>
