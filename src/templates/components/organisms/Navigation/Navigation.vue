<template>
  <div class="o-navigation">
    <div class="o-navigation__logo">
      <object-icon class="o-navigation__logo-icon" name="logo" />
    </div>
    <div class="o-navigation__search"><search /></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import Search from "@/templates/components/organisms/Search/Search.vue";
import ObjectIcon from "@/templates/objects/ObjectIcon.vue";

export default defineComponent({
  name: "Navigation",
  components: {
    ButtonPrimary,
    Search,
    ObjectIcon,
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
  --nav-svg-width: 15rem;
  --nav-svg-height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: var(--color-white);

  padding: var(--nav-padding);

  &__logo {
    &-icon {
      --svg-width: var(--nav-svg-width);
      --svg-height: var(--nav-svg-height);
    }
  }

  &__search {
    width: calc(40rem - calc(2 * var(--nav-padding)));

    @include min(2xl) {
      width: calc(50rem - calc(2 * var(--nav-padding)));
    }
  }
}
</style>
