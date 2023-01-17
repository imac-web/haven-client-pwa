<template>
  <Teleport to="body">
    <div
      class="l-panel-mobile"
      ref="cupertinoRef"
      :class="{ 'is-open': true }"
      role="dialog"
      aria-labelledby="panelMobileTitle"
      aria-describedby="panelMobileDescription"
    >
      <navigation-search />
      <component
        :is="panelMobileComponent"
        :data="panelMobileData"
        @close="close"
      />
    </div>
  </Teleport>
</template>

<script>
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { CupertinoPane } from "cupertino-pane";
import emitter from "@/services/emitter";
import PanelMobileComponent from "@/templates/components/organisms/Panels/PanelMobileComponent.vue";
import NavigationSearch from "@/templates/components/molecules/Navigation/NavigationSearch.vue";

export default defineComponent({
  name: "ThePanelMobile",
  components: {
    PanelMobileComponent,
    NavigationSearch,
  },
  props: {},
  setup(props) {
    //cupertino Pane
    const cupertinoRef = ref();
    let settings = {
      initialBreak: "bottom",
      bottomClose: false,
      buttonDestroy: false,
      clickBottomOpen: true,
      handleKeyboard: true,
      fitScreenHeight: true,
      backdrop: true,
      backdropOpacity: 0.4,
      dragBy: [".m-navigation-search", ".draggable"],
    };
    var drawer = undefined;

    async function presentDrawer() {
      drawer.present({ animate: true });
    }

    async function destroyDrawer() {
      drawer.destroy({ animate: true });
    }

    async function hideDrawer() {
      drawer.hide();
    }

    async function isHiddenDrawer() {
      console.log(await drawer.isHidden());
    }

    async function setTopDrawer() {
      drawer.moveToBreak("top");
    }

    async function setMiddleDrawer() {
      drawer.moveToBreak("middle");
    }

    async function setBottomDrawer() {
      drawer.moveToBreak("bottom");
    }
    emitter.on("slide-up-panel", (data) => {
      if (data) {
        setTopDrawer();
      } else {
        setBottomDrawer();
      }
    });
    emitter.on("slide-down-panel", (data) => {
      console.log(data);
      if (data) {
        setBottomDrawer();
      }
    });

    //panelmobile
    const store = useStore();

    const isOpen = ref(false);

    const close = () => {
      isOpen.value = false;
      setTimeout(() => {
        store.dispatch("panelMobile/close");
      }, 600);
    };

    const currentScroll = ref(0);

    const isReady = computed(() => {
      return store.getters["panelMobile/hasPanelMobile"] && isOpen.value;
    });
    const hasPanelMobile = computed(() => {
      return store.getters["panelMobile/hasPanelMobile"];
    });

    const panelMobileData = computed(() => {
      return store.state.panelMobile.data;
    });

    const panelMobileComponent = computed(() => {
      return store.state.panelMobile.component;
    });

    const isMobile = computed(() => {
      return store.state.userContext.isMobile;
    });

    watch(hasPanelMobile, (open) => {
      if (open) {
        isOpen.value = true;
        currentScroll.value = window.scrollY;
        store.dispatch("scroll/toggleDisabledScroll", true);
      } else {
        window.scrollTo(0, currentScroll.value);
        store.dispatch("scroll/toggleDisabledScroll", false);
      }
    });
    onMounted(() => {
      if (isMobile.value) {
        drawer = new CupertinoPane(cupertinoRef.value, settings);
        presentDrawer();
      }
    });

    return {
      cupertinoRef,
      isReady,
      currentScroll,
      isOpen,
      panelMobileData,
      panelMobileComponent,
      close,
      hasPanelMobile,
    };
  },
});
</script>

<style lang="scss">
.l-panel-mobile {
  --panel-mobile-padding: 2rem;
  --panel-mobile-width: 100vw;
  --panel-mobile-height: 20rem;

  //position: fixed;
  //top: 50%;
  //right: 5%;
  //z-index: 102;
  //background: var(--color-dark);
  opacity: 0;
  pointer-events: none;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow-y: hidden !important;

  transition: opacity 0.4s linear;

  //width: var(--panel-mobile-width);
  // height: var(--panel-mobile-height);
  /*   @include min(md) {
    width: var(--panel-mobile-width);
    height: var(--panel-mobile-height);
  }

  @include min(md) {
    padding: var(--panel-mobile-padding);
  }
  @include max(md) {
    @include container("default");
  }

  @include min(md) {
    display: block;
  }
  display: none; */

  &.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  @include min(md) {
    display: none;
  }
  display: block;
}

.cupertino-pane-wrapper {
  --cupertino-pane-background: #fff;
  --cupertino-pane-color: #333333;
  --cupertino-pane-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  --cupertino-pane-border-radius: 20px;
  --cupertino-pane-move-background: #c0c0c0;
  --cupertino-pane-destroy-button-background: #ebebeb;
  --cupertino-pane-icon-close-color: #7a7a7e;
  @include min(md) {
    display: none;
  }
  display: block;
}
</style>
