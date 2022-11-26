<template>
    <footer class="l-footer"></footer>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
    name: "TheFooter",
    components: {},
    setup() {},
});
</script>

<style lang="scss">
.l-footer {
    height: 5rem;
    background-color: var(--color-black);
}
</style>
