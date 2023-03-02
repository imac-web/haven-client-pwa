<template>
  <div class="m-card">
    <ve-progress :progress="50" />
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { VeProgress } from "vue-ellipse-progress";
export default defineComponent({
  name: "Card",
  components: {
    VeProgress,
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
