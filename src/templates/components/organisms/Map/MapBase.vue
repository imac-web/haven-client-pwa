<template>
  <div class="o-map" ref="content">
    <div class="o-map__map" ref="mapContainer" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { PANEL_COMPONENTS } from "@/constants";

import getServices from "@/utils/getServices";
import "leaflet/dist/leaflet.css";
import L, { icon, map } from "leaflet";

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
    const markerIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/imac-web/haven-client-pwa/main/static/images/pinpoint-filled.svg",
      iconSize: [48, 48], // size of the icon
      iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
    });
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
      marker = L.marker(
        [
          SelectedResult.value.raw.geometry.coordinates[1],
          SelectedResult.value.raw.geometry.coordinates[0],
        ],
        {
          icon: markerIcon,
        }
      ).addTo(map);
    });

    // ----- Mapbox -----
    function setupGeoSearch() {
      map = L.map(mapContainer.value, { zoomControl: false }).setView(
        [48.84277323737967, 2.587709798324433],
        13
      );

      // L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
      L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 20,
          attribution:
            '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        }
      ).addTo(map);
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

      async function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
        emitter.emit("selected-location", e.latlng);
        let location = e.latlng;
        let services = await getServices(location.lat, location.lng, 1000)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            console.log(err);
          });
        openPanel(location, services);
        openPanelMobile(location, services);
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
