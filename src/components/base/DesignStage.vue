<script setup lang="ts">
import { computed } from "vue";
import { useDesignStageScale } from "@/composables/useDesignStageScale";

const { scale } = useDesignStageScale();

const stageStyle = computed(() => {
  if (scale.value === 1) return undefined;
  return { transform: `scale(${scale.value})` };
});
</script>

<template>
  <div class="design-viewport">
    <div class="design-stage" :style="stageStyle">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.design-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: var(--design-height);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 479px) {
  .design-viewport {
    width: 100vw;
    height: 100dvh;
    min-height: 100dvh;
  }
}

.design-stage {
  width: var(--design-width);
  height: var(--design-height);
  flex-shrink: 0;
  transform-origin: center center;
}
</style>
