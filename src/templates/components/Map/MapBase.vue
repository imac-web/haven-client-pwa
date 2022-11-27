<template>
    <div class="c-map" ref="content">
        <div class="c-map__map" ref="mapContainer" />
    </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, GeoApiFrProvider } from "leaflet-geosearch";
import L from "leaflet";

export default defineComponent({
    name: "MapBase",
    components: {},
    setup() {
        const content = ref(null);
        const mapContainer = ref(null);

        // ----- Mapbox -----
        //TODO: Move to store when request form input in frontend, send to firebase functions then get result

        const provider = new GeoApiFrProvider();

        function setupGeoSearch() {
            const map = L.map(mapContainer.value).setView([51.505, -0.09], 13);

            L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
                map
            );

            const searchControl = new GeoSearchControl({
                notFoundMessage: "Sorry, that address could not be found.",
                provider: provider,
                style: "bar",
            });

            map.addControl(searchControl);
        }

        onMounted(() => {
            setupGeoSearch();
        });

        return {
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
