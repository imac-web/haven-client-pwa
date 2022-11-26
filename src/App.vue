<template>
    <the-base />
</template>
<script>
import {
    defineComponent,
    ref,
    onMounted,
    onBeforeUnmount,
    nextTick,
} from "vue";

import "@/assets/scss/global.scss";

import TheBase from "@/templates/layout/TheBase.vue";

export default defineComponent({
    name: "App",
    components: {
        TheBase,
    },
});
</script>

<style lang="scss"></style>
