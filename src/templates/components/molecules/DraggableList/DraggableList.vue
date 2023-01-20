<template>
  <div class="m-draggable-list">
    <Sortable
      :list="elements"
      item-key="rank"
      :options="options"
      @change="logEvent"
      @choose="logEvent"
      @unchoose="logEvent"
      @start="logEvent"
      @end="logEvent"
      @add="logEvent"
      @update="logEvent"
      @sort="logEvent"
      @remove="logEvent"
      @filter="logEvent"
      @move="logEvent"
      @clone="logEvent"
    >
      <template #item="{ element, index }">
        <div class="draggable-li" :key="element.rank">
          {{ element.label }}
          <Sortable
            v-if="element.contains"
            :list="element.contains"
            :item-key="(item) => item.rank"
            :options="options"
            @change="logEvent"
            @choose="logEvent"
            @unchoose="logEvent"
            @start="logEvent"
            @end="logEvent"
            @add="logEvent"
            @update="logEvent"
            @sort="logEvent"
            @remove="logEvent"
            @filter="logEvent"
            @move="logEvent"
            @clone="logEvent"
          >
            <template #item="{ element, index }">
              <div class="draggable-li" :key="element.rank">
                {{ element.label }}
              </div>
            </template>
          </Sortable>
        </div>
      </template>
    </Sortable>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { Sortable } from "sortablejs-vue3";

export default defineComponent({
  name: "DraggableList",
  components: {
    Sortable,
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

    const api = computed(() => {
      return Object.keys(data.value).map((key) => {
        return {
          id: key,
          label: data.value[key].label,
          rank: data.value[key].rank,
          contains: data.value[key].contains,
        };
      });
    });

    //order by rank and save in new array
    const elements = computed(() => {
      return api.value.sort((a, b) => {
        return a.rank - b.rank;
      });
    });

    console.log(elements.value);

    const logEvent = (evt, evt2) => {
      if (evt2) {
        //console.log(evt, evt2);
      } else {
        //console.log(evt);
      }
    };
    const animating = ref(true);
    const scrollSensitivity = ref(50);
    const scrollSpeed = ref(10);
    const options = computed(() => {
      return {
        draggable: ".draggable-li",
        animation: animating.value ? 150 : 0,
        ghostClass: "ghost",
        dragClass: "drag",
        scroll: true,
        forceFallback: true,
        scrollSensitivity: scrollSensitivity.value,
        scrollSpeed: scrollSpeed.value,
        bubbleScroll: true,
      };
    });

    return {
      data,
      elements,
      logEvent,
      options,
    };
  },
});
</script>

<style lang="scss" scoped>
.m-draggable-list {
  overflow: auto;
}

.draggable-li {
  padding: 10px;
  margin: 10px;
  border: 1px solid var(--color-white);
  cursor: move;
}
.ghost {
  opacity: 0.5;
  background: var(--color-white);
  border: 1px dashed var(--color-white);
}
.drag {
  background: var(--color-white);
  color: var(--color-dark);
}
</style>
