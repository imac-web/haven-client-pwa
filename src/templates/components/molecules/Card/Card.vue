<template>
  <div class="m-card">
    {{ data }}
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import ChartsDoughnut from "@/templates/components/molecules/Charts/ChartsDoughnut.vue";

export default defineComponent({
  name: "Card",
  components: {
    ChartsDoughnut,
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: {},
    },
  },
  setup(props) {
    const data = toRef(props, "data");

    console.log("data", data.value);

    /* 
    label
    score
        label
        description
        score    
     */
    return {
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-card {
  overflow: auto;
}
</style>
