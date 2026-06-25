<script setup lang="ts">
import { POLAROID_WINDOW } from "@/composables/useCanvasMerge";
import { assetUrl } from "@/utils/asset";

defineProps<{
  /** 用户照片（dataURL 或 url），为空时显示占位 */
  src?: string | null;
}>();

// 与合成时共用同一组白窗坐标
const winStyle = {
  top: `${POLAROID_WINDOW.top * 100}%`,
  left: `${POLAROID_WINDOW.left * 100}%`,
  width: `${POLAROID_WINDOW.width * 100}%`,
  height: `${POLAROID_WINDOW.height * 100}%`,
};
</script>

<template>
  <div class="relative w-full" style="aspect-ratio: 779 / 550">
    <!-- 照片层（在相框下方的白窗显示） -->
    <div class="absolute overflow-hidden bg-paper flex items-center justify-center" :style="winStyle">
      <img v-if="src" :src="src" alt="入学合影" class="w-full h-full object-cover" />
      <span v-else class="text-ink/40 text-[13px]">点此添加照片</span>
    </div>
    <!-- 相框层（社媒风格，含 Hello! new student） -->
    <img
      :src="assetUrl('assets/img/polaroid.png')"
      alt="拍立得相框"
      class="absolute inset-0 w-full h-full object-contain pointer-events-none"
    />
  </div>
</template>
