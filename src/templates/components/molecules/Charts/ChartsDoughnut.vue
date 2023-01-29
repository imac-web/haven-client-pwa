<template>
  <Doughnut :data="data" :options="options" />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

import { defineComponent, toRef } from "vue";

export default defineComponent({
  name: "ChartsDoughnut",
  components: {
    Doughnut,
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: {},
    },
  },
  setup(props) {
    const data = toRef(props, "data");

    const options = {
      responsive: true,
      maintainAspectRatio: false,

      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
    };

    return {
      data,
      options,
    };
  },
});
</script>
