<template>
  <div class="o-hero" ref="hero">
    <div class="o-hero__content">
      <h1 class="o-hero__content-title">HAVEN</h1>
      <div class="o-hero__content-search">
        <search />
      </div>
      <div class="o-hero__content-desc">
        <h2 class="o-hero__content-desc-title">Discover Your Ideal Location</h2>
        <p class="o-hero__content-desc-txt">
          the ultimate measure of a place's vivability and potential. Our tool
          takes into account factors like proximity to public transportation,
          safety, noise levels, nearby schools, and the quality of amenities to
          give you an insight into the vivability of an address.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { MODAL_COMPONENTS } from "@/constants";

import ButtonPrimary from "@/templates/components/atoms/_buttons/ButtonPrimary.vue";
import MapBase from "@/templates/components/organisms/Map/MapBase.vue";
import ObjectIcon from "@/templates/objects/ObjectIcon.vue";

import Search from "@/templates/components/organisms/Search/Search.vue";

export default defineComponent({
  name: "Hero",
  components: {
    ButtonPrimary,
    MapBase,
    ObjectIcon,
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
.o-hero {
  height: 80vh;

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &-title {
      color: var(--color-white);
      font-size: 10rem;
      font-weight: 900;
      text-align: center;
    }
    &-search {
    }

    &-desc {
      margin-top: 5rem;
      &-title {
        color: var(--color-white);
        font-size: 5rem;
        text-align: center;
      }
      &-txt {
        margin-top: 2rem;
        color: var(--color-white);
        font-size: 1.5rem;
        text-align: center;
      }
    }
  }
}
</style>
