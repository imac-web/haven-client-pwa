<template>
  <div
    class="l-base"
    :class="`${globalUserContext}`"
    :style="`--app-height: ${appHeight}px;`"
  >
    <the-loader></the-loader>

    <main class="l-main" ref="main">
      <the-content />
      <!-- <the-footer></the-footer> -->
    </main>
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
import TheModal from "@/templates/layout/TheModal.vue";

export default defineComponent({
  name: "TheBase",
  components: {
    TheLoader,
    TheContent,
    TheFooter,
    TheModal,
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
    const isScrollingUp = computed(() => store.getters["scroll/isScrollingUp"]);

    ////////////////////////////////
    //       START SET USER CONTEXT
    ////////////////////////////////
    store.dispatch("userContext/setUserContext", userContext);

    ////////////////////////////////
    //       END SET USER CONTEXT
    ////////////////////////////////

    //======= START SCROLL TOP =======//

    function checkIfUserScrollTop(progress) {
      progress !== isScrollTop.value ? toggleUserScrolled(progress) : null;
    }

    function toggleUserScrolled(bool) {
      store.dispatch("scroll/toggleScrollTop", bool);
    }

    //======= END SCROLL TOP =======//

    ////////////////////////////////
    //       END SMOOTHSCROLL
    ////////////////////////////////

    ////////////////////////////////
    //       START SCROLL DIRECTION
    ////////////////////////////////
    function onScroll() {
      toggleScrollDirection(currentScrollProgress.value > window.pageYOffset);

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
    };
  },
});
</script>

<style lang="scss">
.l-base {
}

.l-main {
  background-color: var(--color-green);
  min-height: 100vh;
  overflow: hidden;
}
</style>
