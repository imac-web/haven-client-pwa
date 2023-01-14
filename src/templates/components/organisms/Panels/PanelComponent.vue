<template>
  <div
    class="o-nameof-panel | l-container"
    :class="{ 'o-nameof-panel--active': isOpen }"
  >
    <div class="o-nameof-panel__wrapper">
      <p>Given Address</p>
      <div class="o-nameof-panel__wrapper-number">90%</div>
      <hr />
      <div class="o-nameof-panel__wrapper-list">
        <Sortable
          :list="elements"
          item-key="id"
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
            <div class="draggable" :key="element.id">
              {{ element.text }}
              <Sortable
                v-if="element.children"
                :list="element.children"
                :item-key="(item) => item.id"
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
                  <div class="draggable" :key="element.id">
                    {{ element.text }}
                  </div>
                </template>
              </Sortable>
            </div>
          </template>
        </Sortable>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { Sortable } from "sortablejs-vue3";

export default defineComponent({
  name: "ProjectPanel",
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
  emits: ["close"],
  setup(props, { emit }) {
    const store = useStore();

    const close = () => {
      emit("close");
    };

    const isOpen = computed(() => store.getters["panel/hasPanel"]);

    const data = toRef(props, "data");

    const elements = computed(() => {
      return [
        {
          id: "1",
          text: "One",
          children: [
            {
              id: "1-1",
              text: "One-One",
              children: [
                {
                  id: "1-1-1",
                  text: "One-One-One",
                },
                {
                  id: "1-1-2",
                  text: "One-One-Two",
                },
              ],
            },
            {
              id: "1-2",
              text: "One-Two",
            },
          ],
        },
        {
          id: "2",
          text: "Two",
        },
        {
          id: "3",
          text: "Three",
        },
        {
          id: "4",
          text: "Four",
        },
      ];
    });
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
        draggable: ".draggable",
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
      close,
      data,
      isOpen,
      elements,
      logEvent,
      options,
    };
  },
});
</script>

<style lang="scss" scoped>
.o-nameof-panel {
  &--to-close {
    .l-panel {
      opacity: 0;
    }
    .backdrop {
      opacity: 0;
      visibility: hidden;
    }
  }

  color: var(--color-white);

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

.draggable {
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
