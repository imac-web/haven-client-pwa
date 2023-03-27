<!-- <template>
  <the-base />
</template>
<script>
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { isTouch } from "@/utils";
import "leaflet/dist/leaflet.css";
import "@/assets/scss/global.scss";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

import TheBase from "@/templates/layout/TheBase.vue";

import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

export default defineComponent({
  name: "App",
  components: {
    TheBase,
  },
  setup() {
    onMounted(() => {
      if (isTouch) document.documentElement.classList.add("is-touch");
    });
  },
});
</script>

<style lang="scss">
.is-touch {
  overscroll-behavior-y: contain;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
}
</style>
 -->

<template>
  <ion-app
    ><ion-header>
      <ion-toolbar>
        <ion-title>App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button id="open-modal" expand="block">Open Sheet Modal</ion-button>

      <ion-modal
        ref="modal"
        trigger="open-modal"
        :initial-breakpoint="0.25"
        :breakpoints="[0, 0.25, 0.5, 0.75]"
      >
        <ion-content class="ion-padding">
          <ion-searchbar
            @click="$refs.modal.$el.setCurrentBreakpoint(0.75)"
            placeholder="Search"
          ></ion-searchbar>
          <ion-list>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=b"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Connor Smith</h2>
                <p>Sales Rep</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=a"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Daniel Smith</h2>
                <p>Product Designer</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=d"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Greg Smith</h2>
                <p>Director of Operations</p>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-avatar slot="start">
                <ion-img src="https://i.pravatar.cc/300?u=e"></ion-img>
              </ion-avatar>
              <ion-label>
                <h2>Zoey Smith</h2>
                <p>CEO</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-app>
</template>

<script>
import { IonApp } from "@ionic/vue";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonList,
  IonAvatar,
  IonImg,
  IonLabel,
  IonSearchbar,
} from "@ionic/vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
    IonSearchbar,
  },
});
</script>
