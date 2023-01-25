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

        const fetchServices = async (lat, lon, radius) => {
            // Make an HTTP GET request to the Georisques API with the provided latitude, longitude, and radius as query parameters
            const response = await fetch(
                "https://europe-west3-haven-5f945.cloudfunctions.net/getServices?lat=" +
                    lat +
                    "&lon=" +
                    lon +
                    "&radius=" +
                    radius +
                    ""
            );
            // Parse the JSON response
            // console.log("response", response);
            const services = await response.json();
            // Return the risks data
            return services;
        };

        const getServices = async (lat, lon, radius) => {
            // Fetching risks data
            const serv = await fetchServices(lat, lon, radius);
            // Return the risks
            return serv.data;
        };

        emitter.on("selected-result", (data) => {
            getServices(data.y, data.x, 1000);
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

            L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
                map
            );
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
                getServices(e.latlng.lat, e.latlng.lng, 1000);
                getServices(e.latlng.lat, e.latlng.lng, 1000);
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
