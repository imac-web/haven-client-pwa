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

import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.js";

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
            var dark = L.tileLayer(
                "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
                {
                    maxZoom: 20,
                }
            );

            var osm = L.tileLayer(
                "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    maxZoom: 19,
                }
            );

            var satelite = L.tileLayer(
                "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            );

            map = L.map(mapContainer.value, {
                tap: false,
                zoomControl: false,
                layers: [dark, osm, satelite],
            }).setView([48.84277323737967, 2.587709798324433], 13);

            var baseMaps = {
                OpenStreetMap: osm,
                Satelite: satelite,
                Dark: dark,
            };

            var layerControl = L.control.layers(baseMaps).addTo(map);
            var lc = L.control
                .locate({
                    enableHighAccuracy: true,
                    //flyTo: true,
                    position: "topleft",
                    drawCircle: false,
                    drawMarker: false,
                })
                .addTo(map);

            var popup = L.popup();

            L.control
                .zoom({
                    position: "topleft",
                })
                .addTo(map);

            async function callIndexAPI(e) {
                emitter.emit("selected-location", e.latlng);
                let location = e.latlng;
                let services = await getServices(
                    location.lat,
                    location.lng,
                    1000
                );

                openPanel(location, services);
                openPanelMobile(location, services);
            }

            function onLocationFound(e) {
                L.marker(e.latlng, {
                    icon: markerIcon,
                }).addTo(map);
                callIndexAPI(e);
            }

            map.on("locationfound", onLocationFound);

            function onLocationError(e) {
                alert(e.message);
            }

            map.on("locationerror", onLocationError);

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
                lc.stop();
                popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(map);
                callIndexAPI(e);
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

    .leaflet-control-container {
        height: calc(100% - var(--header-height));
        margin-top: var(--header-height);
    }
}
</style>
