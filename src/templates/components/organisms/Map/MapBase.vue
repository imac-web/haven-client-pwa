<template>
  <div class="o-map" ref="content">
    <div class="o-map__map" ref="mapContainer" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { PANEL_COMPONENTS } from "@/constants";

import fetchServices from "@/utils/fetchServices";
import "leaflet/dist/leaflet.css";
import L, { icon, map } from "leaflet";

import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.js";

import emitter from "@/services/emitter";

export default defineComponent({
  name: "MapBase",
  components: {},
  emits: ["SelectedLocation"],
  setup(props, { emit }) {
    const content = ref(null);
    const mapContainer = ref(null);
    let map = null;
    let marker = null;
    const markerIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/imac-web/haven-client-pwa/main/static/images/pinpoint-green.svg",
      iconSize: [48, 48], // size of the icon
      iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -45], // point from which the popup should open relative to the iconAnchor
    });
    const SelectedResult = ref([]);

    emitter.on("selected-result", (data) => {
      map.eachLayer((layer) => {
        if (layer["_latlng"] != undefined) layer.remove();
      });
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
      var dark = L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 20,
        }
      );

      var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      });

      var satelite = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      );

      map = L.map(mapContainer.value, {
        tap: false,
        zoomControl: false,
        layers: [dark],
      }).setView([48.84277323737967, 2.587709798324433], 13);

      const resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
      });

      resizeObserver.observe(mapContainer.value);

      var baseMaps = {
        OpenStreetMap: osm,
        Satelite: satelite,
        Dark: dark,
      };

      var lc = L.control
        .locate({
          enableHighAccuracy: true,
          //flyTo: true,
          position: "topleft",
          drawCircle: false,
          drawMarker: false,
        })
        .addTo(map);

      L.control
        .zoom({
          position: "topleft",
        })
        .addTo(map);

      var layerControl = L.control
        .layers(baseMaps, null, { position: "topleft" })
        .addTo(map);

      async function callIndexAPI(e) {
        emitter.emit("selected-location", e.latlng);
        let location = e.latlng;

        let services = await fetchServices(location.lat, location.lng, 1000);

        openPanel(location, services);
        openPanelMobile(location, services);
      }

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
        store.dispatch("panelMobile/close");
      };

      function onMapClick(e) {
        map.eachLayer((layer) => {
          if (layer["_latlng"] != undefined) layer.remove();
        });
        lc.stop();
        var newMarker = new L.marker(e.latlng, {
          icon: markerIcon,
        }).addTo(map);
        map.setView(e.latlng, 13);
        callIndexAPI(e);
      }

      map.on("click", onMapClick);

      function onLocationFound(e) {
        map.eachLayer((layer) => {
          if (layer["_latlng"] != undefined) layer.remove();
        });
        var newMarker = new L.marker(e.latlng, {
          icon: markerIcon,
        }).addTo(map);
        map.setView(e.latlng, 13);
        callIndexAPI(e);
      }

      map.on("locationfound", onLocationFound);
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
  --leaflet-controls-bg-color: var(--color-haven_green_bright);
  --leaflet-controls-shadow-color: var(--color-haven_dark_green);
  --map-width: calc(100% - var(--panel-width));
  z-index: 0;
  &__map {
    max-height: 100vh;
    height: 100vh;
    @include min(md) {
      //height: 50vh;
    }
  }

  .leaflet-control-container {
    height: calc(100% - var(--header-height));
    margin-top: var(--header-height);
    @include min(md) {
      width: 100%;
    }
  }

  .leaflet-touch .leaflet-control-layers,
  .leaflet-touch .leaflet-bar {
    border: none;
  }

  .leaflet-control-locate-location-arrow {
    filter: invert(1);
  }
  .leaflet-control-zoom-in,
  .leaflet-control-zoom-out,
  a:last-child {
    color: var(--color-haven_white);
    background-color: var(--leaflet-controls-bg-color);
    //box-shadow: 0 0 1rem var(--leaflet-controls-shadow-color);

    &:hover {
      background-color: var(--color-haven_dark_green);
    }
  }
  .leaflet-control-layers-toggle,
  .leaflet-control-layers-expanded {
    background-color: var(--leaflet-controls-bg-color);
    color: var(--color-haven_white);
  }

  .leaflet-control-locate a:first-child {
    border-radius: 3rem;
  }

  .leaflet-control-zoom {
    display: none;
    @include min(md) {
      display: block;
    }
  }
}
</style>
