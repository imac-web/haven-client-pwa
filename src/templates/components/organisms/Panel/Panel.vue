<template>
  <div ref="cupertinoRef" class="c-panel">
    <panel-content />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { CupertinoPane } from "cupertino-pane";
import PanelContent from "./PanelContent.vue";
import emitter from "@/services/emitter";

export default defineComponent({
  name: "Panel",
  components: {
    PanelContent,
  },
  setup() {
    const cupertinoRef = ref();
    let settings = {
      initialBreak: "bottom",
      bottomClose: false,
      buttonDestroy: false,
      clickBottomOpen: true,
      handleKeyboard: true,
    };
    var drawer = undefined;

    async function presentDrawer() {
      drawer.present({ animate: true });
    }

    async function destroyDrawer() {
      drawer.destroy({ animate: true });
    }

    async function hideDrawer() {
      drawer.hide();
    }

    async function isHiddenDrawer() {
      console.log(await drawer.isHidden());
    }

    async function setTopDrawer() {
      drawer.moveToBreak("top");
    }

    async function setMiddleDrawer() {
      drawer.moveToBreak("middle");
    }

    async function setBottomDrawer() {
      drawer.moveToBreak("bottom");
    }

    emitter.on("slide-up-panel", (data) => {
      if (data) {
        setTopDrawer();
      } else {
        setBottomDrawer();
      }
    });
    emitter.on("slide-down-panel", (data) => {
      console.log(data);
      if (data) {
        setBottomDrawer();
      }
    });

    onMounted(() => {
      drawer = new CupertinoPane(cupertinoRef.value, settings);
      presentDrawer();
      console.log(cupertinoRef);
    });

    return {
      cupertinoRef,
    };
  },
});
</script>

<style lang="scss">
.cupertino-pane-wrapper {
  --cupertino-pane-background: #fff;
  --cupertino-pane-color: #333333;
  --cupertino-pane-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  --cupertino-pane-border-radius: 20px;
  --cupertino-pane-move-background: #c0c0c0;
  --cupertino-pane-destroy-button-background: #ebebeb;
  --cupertino-pane-icon-close-color: #7a7a7e;
}
</style>
