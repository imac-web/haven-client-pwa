<template>
  <div class="m-cards-list">
    <card v-for="(card, i) in data" :key="`card-${i}`" :data="card" />
  </div>
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
  @include reset-list;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}
</style>
