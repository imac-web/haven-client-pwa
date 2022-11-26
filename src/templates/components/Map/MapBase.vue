<template>
    <div class="c-map" ref="content">
        <button-primary
            class="c-project-modal-btn"
            label="Map"
            color="light"
            @click="openModal"
        />
        <div class="c-map__map" ref="mapContainer" />
    </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";

import ButtonPrimary from "@/templates/components/_buttons/ButtonPrimary.vue";

export default defineComponent({
    name: "MapBase",
    components: {
        ButtonPrimary,
    },
    setup() {
        const store = useStore();
        const content = ref(null);
        const mapContainer = ref(null);

        const center = computed(() => {
            return [43.664924, 5.156901];
        });
        function openModal(data) {
            store.dispatch("modal/open", {
                component: MODAL_COMPONENTS.Project,
                data,
            });
        }

        // ----- Mapbox -----
        //TODO: Move to store when request form input in frontend, send to firebase functions then get result
        function setupLeafletMap() {
            const mapDiv = L.map(mapContainer.value).setView(center.value, 13);
            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapDiv);

            L.marker(center.value)
                .addTo(mapDiv)
                .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
                .openPopup();
        }

        const provider = new OpenStreetMapProvider();

        function setupGeoSearch() {
            const map = L.map(mapContainer.value).setView([51.505, -0.09], 13);

            L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
                map
            );

            /* const search = new GeoSearch.GeoSearchControl({
                provider: new GeoSearch.OpenStreetMapProvider(),
            });

            map.addControl(search); */

            const searchControl = new GeoSearchControl({
                notFoundMessage: "Sorry, that address could not be found.",
                provider: new OpenStreetMapProvider(),
                style: "bar",
            });

            map.addControl(searchControl);
        }

        onMounted(() => {
            //setupLeafletMap();

            setupGeoSearch();
        });

        return {
            openModal,
            content,
            mapContainer,
        };
    },
});
</script>

<style lang="scss">
.c-map {
    &__map {
        height: 80vh;
        width: 100vw;
        z-index: 2;
    }
}
</style>
