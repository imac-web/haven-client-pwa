<template>
    <div class="c-map" ref="content">
        <div class="c-map__map" ref="mapContainer" />
    </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

import "leaflet/dist/leaflet.css";
import L, { map } from "leaflet";

import emitter from "@/services/emitter";

export default defineComponent({
    name: "MapBase",
    components: {},
    setup() {
        const content = ref(null);
        const mapContainer = ref(null);
        let map = null;
        let marker = null;
        const SelectedResult = ref([]);
        emitter.on("selected-result", (data) => {
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
            map = L.map(mapContainer.value).setView([51.505, -0.09], 13);

            L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
                map
            );
            var popup = L.popup();

            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(map);
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
.c-map {
    z-index: 0;
    &__map {
        height: 50vh;
    }
}
</style>
