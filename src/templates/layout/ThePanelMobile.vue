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
        <div class="l-panel-mobile__wrapper">
          <navigation-search
            class="l-panel-mobile__wrapper-search"
            @click="$refs.modal.$el.setCurrentBreakpoint(1)"
          />
          <component
            class="l-panel-mobile__wrapper-content"
            :is="panelMobileComponent"
            :data="panelMobileData"
            :index="panelMobileIndex"
            @close="close"
          />
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
  --ion-background-color: var(--color-haven_dark_green);

  position: absolute;
  @include min(md) {
    display: none;
  }
  display: block;

  &__wrapper {
    //temporary fix for absolute cards not being inside parent div
    margin-bottom: 20rem;
  }
}
</style>
