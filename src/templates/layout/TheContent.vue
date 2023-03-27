<template>
  <div class="l-content" ref="content">
    <ion-content class="ion-padding">
      <div class="l-panel-mobile__wrapper">
        <ion-searchbar
          @click="inputFocus"
          @input="onInput"
          show-clear-button="always"
          placeholder="Recherche"
          class="l-panel-mobile__searchbar"
        ></ion-searchbar>
        <ion-list class="l-panel-mobile__list">
          <ion-item class="l-panel-mobile__list-item">
            <ion-label>result.label </ion-label>
          </ion-item>
          <ion-item class="l-panel-mobile__list-item">
            <ion-label>result.label </ion-label>
          </ion-item>
          <ion-item class="l-panel-mobile__list-item">
            <ion-label>result.label </ion-label>
          </ion-item>
          <ion-item class="l-panel-mobile__list-item">
            <ion-label>result.label </ion-label>
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
  </div>
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
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import Hero from "@/templates/components/organisms/Hero/Hero.vue";
import MapBase from "@/templates/components/organisms/Map/MapBase.vue";

export default defineComponent({
  name: "TheContent",
  components: {
    ButtonPrimary,
    Hero,
    MapBase,
  },
  setup() {
    const store = useStore();
    function openModal(data) {
      store.dispatch("modal/open", {
        component: MODAL_COMPONENTS.Modal,

        data,
      });
    }

    function inputFocus() {
      store.dispatch("scroll/toggleDisabledScroll", true);
    }

    return {
      openModal,
      inputFocus,
    };
  },
});
</script>

<style lang="scss">
.l-content {
  --map-width: calc(100% - var(--panel-width));
  @include max(md) {
    @include fullscreen;
  }

  @include min(md) {
    .cupertino-pane-wrapper {
      display: none !important;
    }

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__map {
    @include min(md) {
      width: 100%;
    }
  }
}
.ion-padding {
  position: fixed;
  top: 50%;
}
</style>
