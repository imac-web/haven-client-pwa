<template>
  <Teleport to="body">
    <ion-modal
      ref="modal"
      :is-open="true"
      :initial-breakpoint="0.15"
      :breakpoints="[0.15, 0.25, 0.5, 0.75, 1]"
      handle-behavior="cycle"
      :backdrop-dismiss="false"
      :backdrop-breakpoint="0.5"
      class="l-panel-mobile"
    >
      <ion-content class="ion-padding">
        <div class="l-panel-mobile__wrapper">
          <ion-searchbar
            @click="$refs.modal.$el.setCurrentBreakpoint(0.75)"
            @input="onInput"
            show-clear-button="always"
            placeholder="Recherche"
            class="l-panel-mobile__searchbar"
          ></ion-searchbar>
          <ion-list v-if="results.length > 0" class="l-panel-mobile__list">
            <ion-item
              class="l-panel-mobile__list-item"
              v-for="result in results"
              :key="result.id"
              @click="selectResult(result)"
            >
              <ion-label>{{ result.label }}</ion-label>
            </ion-item>
          </ion-list>
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
  IonModal,
  IonContent,
  IonLabel,
  IonSearchbar,
  IonItem,
  IonList,
} from "@ionic/vue";
import { defineComponent, computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import PanelMobileComponent from "@/templates/components/organisms/Panels/PanelMobileComponent.vue";
import emitter from "@/services/emitter";
import { GeoApiFrProvider } from "leaflet-geosearch";
import { PANEL_COMPONENTS } from "@/constants";

import fetchServices from "@/utils/fetchServices";
export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonLabel,
    IonSearchbar,
    IonItem,
    IonList,
    PanelMobileComponent,
  },
  setup(props) {
    const modal = ref(null);
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

    const provider = new GeoApiFrProvider();

    const results = ref([]);

    async function onInput(event) {
      const query = event.target.value;
      if (query.length > 0) {
        results.value = await provider.search({ query });
      } else {
        results.value = [];
      }
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
      store.dispatch("panelMobile/close");
    };

    const selectResult = async (result) => {
      close();
      openPanelMobile(result);
      modal.value.$el.setCurrentBreakpoint(1);
      results.value = [];
      let services = await fetchServices(result.y, result.x, 1000)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      results.value = [];
      openPanelMobile(result, services);
    };

    emitter.on("selected-location", (data) => {
      modal.value.$el.setCurrentBreakpoint(1);
    });

    return {
      isReady,
      panelMobileData,
      panelMobileComponent,
      close,
      hasPanelMobile,
      panelMobileIndex,
      isMobile,
      onInput,
      results,
      selectResult,
      modal,
    };
  },
});
</script>

<style lang="scss">
.l-panel-mobile {
  --ion-background-color: var(--color-haven_dark_grey);

  position: fixed;
  @include min(md) {
    display: none;
  }
  display: block;

  &__searchbar {
    color: var(--color-haven_white);
    padding: 0;
  }

  &__list {
    &-item {
      color: var(--color-haven_white);
    }
  }
}

ion-item::part(native) {
  //WRITE ALL YOUR CSS RULES HERE
  padding-left: unset;
  /** and lots more **/
}
</style>
