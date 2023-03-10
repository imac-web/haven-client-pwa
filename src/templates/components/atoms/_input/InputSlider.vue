<template>
  <ion-range
    :min="1"
    :max="10"
    :value="1"
    :pin="true"
    :ticks="true"
    :snaps="true"
    :pin-formatter="pinFormatter"
    @ionChange="onIonChange"
  ></ion-range>
</template>

<script>
import { IonRange } from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";

import emitter from "@/services/emitter";

import fetchServices from "@/utils/fetchServices";

export default defineComponent({
  components: { IonRange },
  emits: ["SelectedRadius"],
  setup() {
    const value = ref(1);
    const currentValue = ref(null);

    function onIonChange(e) {
      currentValue.value = e.detail.value;
      emitter.emit("selected-radius", currentValue.value);
    }

    return {
      value,
      currentValue,
      onIonChange,
      pinFormatter: (value) => `${value}km`,
    };
  },
});
</script>

<style>
ion-range::part(tick) {
  background: var(--color-haven_dark_green);
}

ion-range::part(tick-active) {
  background: var(--color-haven_dark_green);
}

ion-range::part(pin) {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: var(--color-haven_green);
  color: #fff;

  border-radius: 50%;
  transform: scale(1.01);

  top: -20px;

  min-width: 28px;
  height: 28px;
  transition: transform 120ms ease, background 120ms ease;
}

ion-range::part(pin)::before {
  content: none;
}

ion-range::part(knob) {
  background: var(--color-haven_green);
}

ion-range::part(bar) {
  background: var(--color-haven_green);
}

ion-range::part(bar-active) {
  background: var(--color-haven_white);
}
</style>
