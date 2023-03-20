<template>
  <div class="o-navigation">
    <div class="o-navigation__logo">HAVEN</div>
    <div class="o-navigation__search"><search /></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import Search from "@/templates/components/organisms/Search/Search.vue";

export default defineComponent({
  name: "Navigation",
  components: {
    ButtonPrimary,
    Search,
  },
  setup() {
    const store = useStore();
    function openModal(data) {
      store.dispatch("modal/open", {
        component: MODAL_COMPONENTS.Modal,

        data,
      });
    }

    return {
      openModal,
    };
  },
});
</script>

<style lang="scss">
.o-navigation {
  --nav-padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: var(--color-white);

  padding: var(--nav-padding);

  &__logo {
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    background: linear-gradient(
      to right,
      var(--color-haven_white) 0%,
      var(--color-haven_white) 70%,
      transparent 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__search {
    width: calc(40rem - calc(2 * var(--nav-padding)));

    @include min(2xl) {
      width: calc(50rem - calc(2 * var(--nav-padding)));
    }
  }
}
</style>
