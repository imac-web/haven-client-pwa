<template>
    <div class="o-panel-results">
        <div class="o-panel-results__wrapper">
            <p v-if="data.label">{{ data.label }}</p>
            <p v-else>{{ positionCoords }}</p>
            <div class="o-panel-results__wrapper-number">
                {{ index.global?.score }}
            </div>
            <hr />
            <div class="o-panel-results__wrapper-charts">
                <charts-doughnut :data="chartData" />
            </div>
            <div class="o-panel-results__wrapper-list">
                <DraggableList :data="index.services" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import DraggableList from "@/templates/components/molecules/DraggableList/DraggableList.vue";
import ChartsDoughnut from "@/templates/components/molecules/Charts/ChartsDoughnut.vue";
export default defineComponent({
    name: "PanelResults",
    components: {
        DraggableList,
        ChartsDoughnut,
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
        const data = toRef(props, "data");
        const index = toRef(props, "index");

        const chartData = {
            labels: ["January", "February", "March"],
            datasets: [{ data: [40, 20, 12] }],
        };
        //TODO - recalculate lat and long on click
        const positionCoords = String(data.value.lat).concat(
            " ",
            String(data.value.lng)
        );

        return {
            close,
            data,
            index,
            chartData,
            positionCoords,
        };
    },
});
</script>

<style lang="scss" scoped>
.o-panel-results {
    --results-txt-color: var(--color-white);
    color: var(--results-txt-color);

    &__wrapper {
        &-number {
            font-size: 1.5em;
            font-weight: 600;
            margin-bottom: 10px;
        }

        &-list {
            max-height: 400px;
            overflow-y: auto;
        }
    }
}
</style>
