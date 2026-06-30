<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useStepper } from "@/composables/useStepper";
import { useStudentStore } from "@/stores/student";
import { assetUrl } from "@/utils/asset";

const { goto } = useStepper();
const { photoSource } = storeToRefs(useStudentStore());
let timer: number | undefined;

onMounted(() => {
  if (!photoSource.value) {
    goto("notice");
    return;
  }
  timer = window.setTimeout(() => goto("photo"), 2200);
});
onUnmounted(() => window.clearTimeout(timer));
</script>

<template>
  <div class="ploading-page">
    <div class="card-gradient" aria-hidden="true" />
    <img class="footer-deco" :src="assetUrl('assets/img/footer-deco.png')" alt="" />
    <p class="binary-text" aria-hidden="true">
      01101010 10011100 00110111 11000101 10100011 000111010 10 1 010 01 10 1010 0 001100 1010
      11100100 01011001 10001110 01110001 11010100 00101110 10110101 01001011 11110011 00111000
      10010110 01100111 000 001 1010 001100 0 100 001 001100 11001001 00001101 10111010 01010010
      11101100
    </p>

    <header class="brand-header">
      <img
        class="brand-logo"
        :src="assetUrl('assets/img/logo-white.png')"
        alt="网络空间安全学院"
      />
      <span class="deco-circle deco-circle-1" />
      <span class="deco-circle deco-circle-2" />
    </header>

    <section class="loading-content" aria-label="合影加载中">
      <h1 class="title">镜头正在就位<br />校园合影加载中</h1>

      <div class="loading-dots" aria-label="加载中">
        <span class="dot dot-1" />
        <span class="dot dot-2" />
        <span class="dot dot-3" />
      </div>

      <div class="progress-track">
        <div class="progress-fill" />
      </div>

      <p class="loading-label">LOADING...</p>
    </section>
  </div>
</template>

<style scoped>
.ploading-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 640px;
  background: var(--color-brand);
  overflow: hidden;
}

/* 暖纸渐变铺底 */
.card-gradient {
  position: absolute;
  left: -2.5vw;
  right: -2.5vw;
  top: clamp(100px, 16vh, 136px);
  bottom: 0;
  background: linear-gradient(to top, #fff9e6, rgba(204, 204, 204, 0));
  opacity: 0.6;
  pointer-events: none;
  z-index: 2;
}

.footer-deco {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: clamp(160px, 25.6vh, 218px);
  object-fit: cover;
  opacity: 0.3;
  pointer-events: none;
  z-index: 3;
}

.binary-text {
  position: absolute;
  left: clamp(12px, 6.4vw, 25px);
  right: clamp(12px, 6.4vw, 25px);
  top: clamp(72px, 11.4vh, 97px);
  bottom: clamp(32px, 6vh, 48px);
  margin: 0;
  overflow: hidden;
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(14px, 4.6vw, 18px);
  line-height: 1.448;
  letter-spacing: clamp(8px, 3.8vw, 15px);
  color: rgba(255, 255, 255, 0.15);
  pointer-events: none;
  z-index: 4;
}

.brand-header {
  position: absolute;
  left: clamp(11px, 4.3vw, 17px);
  right: clamp(26px, 7vw, 31px);
  top: max(env(safe-area-inset-top, 0px), 12px);
  height: 46px;
  z-index: 10;
}

.brand-logo {
  position: absolute;
  left: 0;
  top: 0;
  width: clamp(190px, 54vw, 213px);
  height: 46px;
  object-fit: contain;
  object-position: left center;
}

.deco-circle {
  position: absolute;
  top: 12px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(to left, var(--color-paper), rgba(255, 243, 212, 0));
}
.deco-circle-1 {
  right: 29px;
}
.deco-circle-2 {
  right: 0;
}

/* 主内容：视口中部居中，避免不同高度裁切 */
.loading-content {
  position: absolute;
  left: clamp(16px, 4vw, 24px);
  right: clamp(16px, 4vw, 24px);
  top: clamp(108px, 16vh, 140px);
  bottom: clamp(100px, 14vh, 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 2.2vh, 22px);
  z-index: 10;
}

.title {
  margin: 0;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(20px, 6.1vw, 24px);
  line-height: 1.35;
  letter-spacing: 0;
  color: #fff;
}

.loading-dots {
  position: relative;
  width: 64px;
  height: 14px;
  flex-shrink: 0;
}

.dot {
  position: absolute;
  top: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  animation: dot-bounce 1s infinite ease-in-out;
}
.dot-1 {
  left: 0;
}
.dot-2 {
  left: 25px;
  animation-delay: 0.16s;
}
.dot-3 {
  left: 50px;
  animation-delay: 0.32s;
}
@keyframes dot-bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.progress-track {
  width: min(295px, 75vw);
  height: 50px;
  border: 3px solid #fdf2d4;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 2px 4px;
  background: transparent;
  flex-shrink: 0;
}

.progress-fill {
  height: 40px;
  width: 0;
  border-radius: 12px;
  background: linear-gradient(to right, #4379bb, var(--color-paper));
  animation: progress-grow 2.2s ease-out forwards;
}
@keyframes progress-grow {
  to {
    width: 219px;
  }
}

.loading-label {
  margin: 0;
  font-family: var(--font-button);
  font-weight: 400;
  font-size: clamp(18px, 5.1vw, 20px);
  line-height: normal;
  letter-spacing: 1px;
  color: #fff;
}

@media (max-height: 720px) {
  .loading-content {
    top: 96px;
    bottom: 88px;
    gap: 12px;
  }

  .title {
    font-size: 20px;
    line-height: 1.3;
  }

  .progress-track {
    height: 44px;
  }

  .progress-fill {
    height: 34px;
  }

  .card-gradient {
    top: 88px;
  }
}

</style>
