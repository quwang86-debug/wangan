<script setup lang="ts">
import { computed } from "vue";
import { useDesignStageScale, type DesignStageScaleMode } from "@/composables/useDesignStageScale";

const props = withDefaults(
  defineProps<{
    /**
     * contain：完整显示 393×852（不裁切底部）
     * cover：铺满视口（可能裁切）
     * width：按视口宽度缩放，移动端左右贴满
     */
    scaleMode?: DesignStageScaleMode;
    /** 移动端允许在视口内纵向滚动查看完整画板 */
    scrollable?: boolean;
  }>(),
  { scaleMode: "contain", scrollable: false },
);

const { scale } = useDesignStageScale(() => props.scaleMode);

const stageStyle = computed(() => {
  if (scale.value === 1) return undefined;
  return { transform: `scale(${scale.value})` };
});

const stageShellStyle = computed(() => {
  if (scale.value === 1) return undefined;
  return {
    width: `${393 * scale.value}px`,
    height: `${852 * scale.value}px`,
  };
});
</script>

<template>
  <div class="design-viewport" :class="{ 'design-viewport--scrollable': scrollable }">
    <div class="design-stage-shell" :style="stageShellStyle">
      <div class="design-stage" :style="stageStyle">
        <slot />
      </div>
    </div>
    <div class="design-viewport-overlay">
      <slot name="viewport-overlay" />
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
  align-items: flex-start;
  justify-content: center;
}

@media (max-width: 479px) {
  .design-viewport {
    width: 100%;
    height: 100dvh;
    min-height: 100dvh;
    max-height: 100dvh;
    /* 仅保留刘海安全区，不再叠加设计稿假状态栏占位 */
    padding-top: env(safe-area-inset-top, 0px);
    box-sizing: border-box;
  }

  .design-viewport--scrollable {
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.design-stage-shell {
  position: relative;
  width: var(--design-width);
  height: var(--design-height);
  flex-shrink: 0;
}

.design-stage {
  position: absolute;
  left: 0;
  top: 0;
  width: var(--design-width);
  height: var(--design-height);
  transform-origin: top left;
}

.design-viewport-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
</style>
