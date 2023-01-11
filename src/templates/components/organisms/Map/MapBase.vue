<template>
    <div class="o-map" ref="content">
        <div class="o-map__map" ref="mapContainer" />
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

            L.tileLayer("//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
                map
            );
            var popup = L.popup();

            //need to fix bottom placement
            //L.control.zoom({position: "bottomright",}).addTo(map);
            L.control
                .zoom({
                    position: "topright",
                })
                .addTo(map);

            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(map);
                emitter.emit("selected-location", e.latlng);
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
