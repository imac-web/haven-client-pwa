<template>
  <div class="o-panel-results">
    <div class="o-panel-results__wrapper">
      <p v-if="data.label">{{ data.label }}</p>
      <p v-else-if="positionCoords">{{ positionCoords }}</p>
      <p v-else>{{ positionCoordsFirst }}</p>
      <div class="o-panel-results__wrapper-result">
        <card-main v-if="loading" :loading="true" />
        <card-main v-else-if="isResultEmpty" :isResultsEmpty="true" />
        <card-main v-else :score="+totalScore" />
      </div>
      <div class="o-panel-results__wrapper-list">
        <cards-list v-if="index" :data="index" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, watch, ref } from "vue";
import { useStore } from "vuex";
import { PANEL_COMPONENTS } from "@/constants";

import fetchServices from "@/utils/fetchServices";
import invertGeocoding from "@/utils/invertGeocoding";
import CardsList from "@/templates/components/molecules/Card/CardsList.vue";
import CardMain from "@/templates/components/molecules/Card/CardMain.vue";
import { VeProgress } from "vue-ellipse-progress";
import emitter from "@/services/emitter";

export default defineComponent({
  name: "PanelResults",
  components: {
    CardsList,
    CardMain,
    VeProgress,
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: {},
    },
    index: {
      type: Object,
      required: false,
      default: {},
    },
  },
  setup(props) {
    const store = useStore();
    const data = toRef(props, "data");
    const index = toRef(props, "index");

    const positionCoordsFirst = ref(
      String(data.value.lat).concat(" ", String(data.value.lng))
    );
    const positionCoords = ref();

    emitter.on("selected-location", (data) => {
      console.log("selected-location", data);
      if (data) {
        positionCoords.value = String(data.lat.toFixed(5)).concat(
          " ",
          String(data.lng.toFixed(5))
        );
      }
    });

    function setToFixed(v) {
      return v % 1 ? v.toFixed(1) : v;
    }

    function getTotalScore(obj) {
      let total = 0;

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          total += obj[key].score;
        }
      }

      return total;
    }

    function getAverageScore(obj) {
      let totalScore = 0;
      let count = 0;

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key].score === "number") {
            totalScore += obj[key].score;
            count++;
          }
        }
      }

      return totalScore / count;
    }

    //loop through index and find all scores and add them together
    const totalScore = computed(() => {
      const total = getAverageScore(index.value);
      return setToFixed(total);
    });

    const loading = ref(true);
    const isResultEmpty = ref(true);
    let timer = null;

    // Set up timer to check if index is still empty after 10 seconds
    function startTimer() {
      timer = setInterval(() => {
        if (Object.keys(props.index).length === 0) {
          isResultEmpty.value = true;
        } else {
          isResultEmpty.value = false;
        }
        loading.value = false;
        clearInterval(timer);
      }, 10000);
    }

    // Watch for changes to props.index and update variables accordingly
    watch(
      props,
      () => {
        loading.value = true;
        clearInterval(timer);
        if (Object.keys(props.index).length === 0) {
          startTimer();
        } else {
          isResultEmpty.value = false;
          loading.value = false;
        }
      },
      { immediate: true }
    );

    async function callIndexAPI(e) {
      const invertedGeocoding = await invertGeocoding(e.lat, e.lng);
      close();
      let location;
      let address = invertedGeocoding.features[0]?.properties?.label;
      if (address) {
        location = {
          lat: e.lat,
          lng: e.lng,
          label: address,
        };
      } else {
        location = {
          lat: e.lat,
          lng: e.lng,
        };
      }
      let services = await fetchServices(location.lat, location.lng);
      openPanel(location, services);
      openPanelMobile(location, services);
    }

    function openPanel(data, index) {
      store.dispatch("panel/open", {
        component: PANEL_COMPONENTS.Panel,
        data,
        index,
      });
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

    emitter.on("restart-calculations", (e) => {
      console.log("restart-calculations", data.value);
      callIndexAPI(data.value);
    });

    return {
      close,
      data,
      index,
      positionCoords,
      positionCoordsFirst,
      totalScore,
      loading,
      isResultEmpty,
    };
  },
});
</script>

<style lang="scss" scoped>
.o-panel-results {
  --results-txt-color: var(--color-white);
  color: var(--results-txt-color);

  &__wrapper {
    & p {
      margin-bottom: 3rem;
      font-variant: small-caps;
      font-size: var(--fs-small);
      font-weight: 700;
      color: var(--color-haven_grey);
    }
    text-align: center;
    &-result {
      margin-top: 2rem;
    }
    &-list {
      margin-top: 2rem;
    }
  }

  hr {
    background-color: var(--color-haven_white);
  }
}
</style>
