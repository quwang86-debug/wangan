<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { assetUrl } from "@/utils/asset";

export type CarouselEffect = "fade" | "ken-burns" | "ken-burns-drift";

const props = withDefaults(
  defineProps<{
    /** public/ 下相对路径，不含 base */
    slides: readonly string[];
    /** 切换动效 */
    effect?: CarouselEffect;
    /** 每张停留毫秒（Ken Burns 推镜时长与此一致） */
    interval?: number;
    /** 交叉淡入淡出毫秒 */
    fadeMs?: number;
    /** 非激活帧透明度（0–1） */
    maxOpacity?: number;
  }>(),
  {
    effect: "fade",
    interval: 5000,
    fadeMs: 1500,
    maxOpacity: 1,
  },
);

const current = ref(0);
const reduceMotion = ref(false);
let timer: ReturnType<typeof setInterval> | undefined;

function slideSrc(path: string): string {
  return assetUrl(path);
}

function slideSrcSet(path: string): string | undefined {
  const at2x = path.replace(/(\/)([^/]+)(\.[^./]+)$/, "$1@2x/$2$3");
  return `${slideSrc(path)} 1x, ${slideSrc(at2x)} 2x`;
}

function goNext() {
  if (props.slides.length <= 1) return;
  current.value = (current.value + 1) % props.slides.length;
}

function startTimer() {
  if (reduceMotion.value || props.slides.length <= 1) return;
  timer = setInterval(goNext, props.interval);
}

function stopTimer() {
  if (timer) clearInterval(timer);
  timer = undefined;
}

onMounted(() => {
  reduceMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  props.slides.forEach((path) => {
    const img = new Image();
    img.src = slideSrc(path);
    img.srcset = slideSrcSet(path) ?? "";
  });
  startTimer();
});

onUnmounted(stopTimer);
</script>

<template>
  <div
    class="bg-carousel"
    :class="{
      'bg-carousel--ken-burns': effect === 'ken-burns' && !reduceMotion,
      'bg-carousel--ken-burns-drift': effect === 'ken-burns-drift' && !reduceMotion,
      'bg-carousel--fade': effect === 'fade' || reduceMotion,
    }"
    aria-hidden="true"
    :style="{
      '--fade-ms': `${fadeMs}ms`,
      '--ken-burns-ms': `${interval}ms`,
      '--slide-opacity': maxOpacity,
    }"
  >
    <div
      v-for="(path, index) in slides"
      :key="path"
      class="bg-carousel__frame"
      :class="{
        'is-active': index === current,
        'ken-burns-a': index % 2 === 0,
        'ken-burns-b': index % 2 === 1,
      }"
    >
      <img
        class="bg-carousel__slide"
        :src="slideSrc(path)"
        :srcset="slideSrcSet(path)"
        alt=""
        decoding="async"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-carousel {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.bg-carousel__frame {
  position: absolute;
  inset: 0;
  opacity: 0;
  overflow: hidden;
  transition: opacity var(--fade-ms, 1500ms) ease-in-out;
  will-change: opacity;
}

.bg-carousel__frame.is-active {
  opacity: var(--slide-opacity, 1);
}

.bg-carousel__slide {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1) translate(0, 0);
  transform-origin: center center;
}

/* 方案 A：Ken Burns 慢推镜 + 交叉淡入 */
.bg-carousel--ken-burns .bg-carousel__frame.is-active.ken-burns-a .bg-carousel__slide {
  animation: ken-burns-a var(--ken-burns-ms, 9000ms) ease-out forwards;
  will-change: transform;
}

.bg-carousel--ken-burns .bg-carousel__frame.is-active.ken-burns-b .bg-carousel__slide {
  animation: ken-burns-b var(--ken-burns-ms, 9000ms) ease-out forwards;
  will-change: transform;
}

.bg-carousel--ken-burns .bg-carousel__frame:not(.is-active) .bg-carousel__slide {
  animation: none;
  transform: scale(1) translate(0, 0);
}

@keyframes ken-burns-a {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(1.08) translate(-2%, -1.5%);
  }
}

@keyframes ken-burns-b {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(1.08) translate(1.5%, 2%);
  }
}

/* 方案 A+D：Ken Burns 慢推镜 + 竖向漂移 + 交叉淡入 */
.bg-carousel--ken-burns-drift .bg-carousel__frame.is-active.ken-burns-a .bg-carousel__slide {
  animation: ken-burns-drift-a var(--ken-burns-ms, 9000ms) ease-out forwards;
  will-change: transform;
}

.bg-carousel--ken-burns-drift .bg-carousel__frame.is-active.ken-burns-b .bg-carousel__slide {
  animation: ken-burns-drift-b var(--ken-burns-ms, 9000ms) ease-out forwards;
  will-change: transform;
}

.bg-carousel--ken-burns-drift .bg-carousel__frame:not(.is-active) .bg-carousel__slide {
  animation: none;
  transform: scale(1) translate(0, 0);
}

@keyframes ken-burns-drift-a {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    /* 推镜略收 + 主方向向上漂移（俯瞰缓升） */
    transform: scale(1.06) translate(-1%, -2.5%);
  }
}

@keyframes ken-burns-drift-b {
  from {
    transform: scale(1) translate(0, 0);
  }
  to {
    transform: scale(1.06) translate(1%, -2%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-carousel__frame {
    transition: none;
  }

  .bg-carousel--ken-burns .bg-carousel__frame.is-active .bg-carousel__slide,
  .bg-carousel--ken-burns-drift .bg-carousel__frame.is-active .bg-carousel__slide {
    animation: none;
  }
}
</style>
