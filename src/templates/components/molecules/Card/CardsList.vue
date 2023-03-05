<template>
  <card
    class="m-cards-list"
    v-for="card in data"
    :key="data.label"
    :data="card"
  />
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import Card from "@/templates/components/molecules/Card/Card.vue";

export default defineComponent({
  name: "CardsList",
  components: {
    Card,
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

    const numberOfCards = computed(() => {
      return data.value.length;
    });

    return {
      data,
      numberOfCards,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-cards-list {
  margin-top: 3rem;
}
</style>
