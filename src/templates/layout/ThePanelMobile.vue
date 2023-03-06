<!-- <template>
  <Teleport to="body">
    <div
      class="l-panel-mobile |"
      ref="cupertinoRef"
      :class="{ 'is-open': true }"
      role="dialog"
      aria-labelledby="panelMobileTitle"
      aria-describedby="panelMobileDescription"
    >
      <div class="l-panel-mobile__wrapper">
        <navigation-search class="l-panel-mobile__wrapper-search" />
        <component
          class="l-panel-mobile__wrapper-content"
          :is="panelMobileComponent"
          :data="panelMobileData"
          :index="panelMobileIndex"
          @close="close"
        />
      </div>
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
      dragBy: [".l-panel-mobile__wrapper-search", ".draggable"],
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

    const panelMobileIndex = computed(() => {
      return store.state.panelMobile.index;
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
      panelMobileIndex,
    };
  },
});
</script>

<style lang="scss">
.l-panel-mobile {
  --panel-mobile-padding: 2rem;
  --panel-mobile-width: 100vw;
  --panel-mobile-height: 100%;

  opacity: 0;
  pointer-events: none;

  transition: opacity 0.4s linear;
  margin-left: 2rem;
  margin-right: 2rem;
  border-radius: 1.2rem;

  &.is-open {
    opacity: 1;
    pointer-events: auto;
  }
  .l-panel-mobile__wrapper {
    border-radius: 1.2rem;
  }
  .l-panel-mobile__wrapper-search {
    z-index: 9;
    position: sticky;
    top: 0;
  }

  .l-panel-mobile__wrapper-content {
    margin-bottom: 5rem;
  }

  @include min(md) {
    display: none;
  }
  display: block;
}

.cupertino-pane-wrapper {
  --cupertino-pane-background: var(--color-haven_dark_green);
  --cupertino-pane-color: var(--color-haven_grey);
  --cupertino-pane-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  --cupertino-pane-border-radius: 2rem;
  --cupertino-pane-move-background: var(--color-haven_grey);
  @include min(md) {
    display: none;
  }
  display: block;
}
</style>
 -->

<template>
  <Teleport to="body">
    <ion-modal
      ref="modal"
      :is-open="true"
      :initial-breakpoint="0.1"
      :breakpoints="[0.1, 0.25, 0.5, 0.75, 1]"
      handle-behavior="cycle"
      :backdrop-dismiss="false"
      :backdrop-breakpoint="0.75"
      class="l-panel-mobile"
    >
      <ion-content class="ion-padding">
        <div class="ion-margin-top">
          <div class="l-panel-mobile__wrapper">
            <navigation-search class="l-panel-mobile__wrapper-search" />
            <component
              class="l-panel-mobile__wrapper-content"
              :is="panelMobileComponent"
              :data="panelMobileData"
              :index="panelMobileIndex"
              @close="close"
            />
          </div>
        </div>
      </ion-content>
    </ion-modal>
  </Teleport>
</template>

<script>
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonLabel,
} from "@ionic/vue";
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import emitter from "@/services/emitter";
import PanelMobileComponent from "@/templates/components/organisms/Panels/PanelMobileComponent.vue";
import NavigationSearch from "@/templates/components/molecules/Navigation/NavigationSearch.vue";

export default defineComponent({
  components: {
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonLabel,
    PanelMobileComponent,
    NavigationSearch,
  },
  setup(props) {
    const store = useStore();

    const currentScroll = ref(0);

    const isOpen = ref(false);

    const isReady = computed(() => {
      return store.getters["panelMobile/hasPanelMobile"] && isOpen.value;
    });
    const hasPanelMobile = computed(() => {
      return store.getters["panelMobile/hasPanelMobile"];
    });

    const panelMobileData = computed(() => {
      return store.state.panelMobile.data;
    });

    const panelMobileIndex = computed(() => {
      return store.state.panelMobile.index;
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

    return {
      isReady,
      panelMobileData,
      panelMobileComponent,
      close,
      hasPanelMobile,
      panelMobileIndex,
    };
  },
});
</script>

<style lang="scss">
.l-panel-mobile {
  position: absolute;

  @include min(md) {
    display: none;
  }
  display: block;
}
</style>
