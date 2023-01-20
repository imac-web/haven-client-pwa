<template>
  <div class="o-map" ref="content">
    <div class="o-map__map" ref="mapContainer" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { PANEL_COMPONENTS } from "@/constants";

import getIndexFromLocation from "@/utils/getIndexFromLocation";
import "leaflet/dist/leaflet.css";
import L, { map } from "leaflet";

import emitter from "@/services/emitter";

export default defineComponent({
  name: "MapBase",
  components: {},
  emits: ["SlideDownPanel", "SelectedLocation"],
  setup(props, { emit }) {
    const content = ref(null);
    const mapContainer = ref(null);
    let map = null;
    let marker = null;
    const SelectedResult = ref([]);
    emitter.on("selected-result", (data) => {
      emitter.emit("slide-down-panel", true);
      SelectedResult.value = data;
      map.setView(
        [
          SelectedResult.value.raw.geometry.coordinates[1],
          SelectedResult.value.raw.geometry.coordinates[0],
        ],
        13
      );
      marker = L.marker([
        SelectedResult.value.raw.geometry.coordinates[1],
        SelectedResult.value.raw.geometry.coordinates[0],
      ]).addTo(map);
    });

    // ----- Mapbox -----
    function setupGeoSearch() {
      map = L.map(mapContainer.value, { zoomControl: false }).setView(
        [51.505, -0.09],
        13
      );

      L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
      var popup = L.popup();

      //need to fix bottom placement
      //L.control.zoom({position: "bottomright",}).addTo(map);
      L.control
        .zoom({
          position: "topleft",
        })
        .addTo(map);

      //open and close panel functions
      const store = useStore();

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
      };

      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
        emitter.emit("selected-location", e.latlng);
        let location = e.latlng;
        let index = undefined;
        getIndexFromLocation().then((data) => {
          index = data;
          openPanel(location, index);
          openPanelMobile(location, index);
        });
      }

      map.on("click", onMapClick);
    }

    onMounted(() => {
      setupGeoSearch();
    });

    return {
      content,
      mapContainer,
      SelectedResult,
    };
  },
});
</script>

<style lang="scss">
.o-map {
  z-index: 0;
  &__map {
    max-height: 100vh;
    height: 100vh;
    @include min(md) {
      //height: 50vh;
    }
  }
}
</style>
