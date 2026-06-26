<script setup lang="ts">
import { assetUrl } from "@/utils/asset";

defineProps<{
  /** 用户照片（dataURL 或 url），为空时透出下层卡片渐变 */
  src?: string | null;
}>();
</script>

<template>
  <div class="polaroid-art">
    <div class="polaroid-photo">
      <img v-if="src" :src="src" alt="入学合影" />
    </div>
    <img
      :src="assetUrl('assets/img/polaroid.png')"
      alt="拍立得相框"
      class="polaroid-frame"
    />
  </div>
</template>

<style scoped>
.polaroid-art {
  position: absolute;
  left: -194px;
  top: -27px;
  width: 779px;
  height: 550px;
}
.polaroid-photo {
  position: absolute;
  left: 209px;
  top: 37px;
  width: 376px;
  height: 463px;
  overflow: hidden;
  background: transparent;
  z-index: 1;
}
.polaroid-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.polaroid-frame {
  position: absolute;
  left: 0;
  top: 0;
  width: 779px;
  height: 550px;
  pointer-events: none;
  z-index: 2;
}
</style>
