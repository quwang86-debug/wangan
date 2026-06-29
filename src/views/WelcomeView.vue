<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStudentStore } from "@/stores/student";
import { useStepper } from "@/composables/useStepper";
import { assetUrl } from "@/utils/asset";

const { name } = storeToRefs(useStudentStore());
const { next } = useStepper();
</script>

<template>
  <div class="welcome-page">
    <img class="footer-deco" :src="assetUrl('assets/img/footer-deco.png')" alt="" />
    <img class="pattern" :src="assetUrl('assets/img/pattern.png')" alt="" />

    <header class="brand-header">
      <img
        class="brand-logo"
        :src="assetUrl('assets/img/logo-white.png')"
        alt="网络空间安全学院"
      />
      <span class="deco-circle deco-circle-1" />
      <span class="deco-circle deco-circle-2" />
    </header>

    <section class="welcome-card" aria-label="欢迎页">
      <span class="divider-line divider-left" />
      <span class="divider-label">2026级新生</span>
      <span class="divider-line divider-right" />

      <img class="emblem" :src="assetUrl('assets/img/emblem.png')" alt="校徽" />

      <h1 class="title">欢迎，{{ name || "新同学" }}！</h1>

      <p class="body">
        祝贺你被网络空间安全学院录取。愿你以理性探索未知，以技术守护信任，在网络空间安全的时代征程中写下属于自己的新篇章。
      </p>

      <button class="cta" type="button" @click="next('welcome')">开始身份核验</button>
    </section>
  </div>
</template>

<style scoped>
.welcome-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 640px;
  background: var(--color-brand);
  overflow: hidden;
}

/* 顶部品牌：真实移动端安全区布局，不再保留设计稿假状态栏 */
.brand-header {
  position: absolute;
  left: clamp(11px, 3.6vw, 18px);
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

/* 底部装饰：真实视口贴底，避免设计稿高度导致裁切/滚动 */
.footer-deco {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: clamp(176px, 25.8vh, 220px);
  object-fit: cover;
  opacity: 0.2;
  pointer-events: none;
  z-index: 2;
}

.pattern {
  position: absolute;
  left: 50%;
  bottom: clamp(32px, 7.1vh, 61px);
  width: clamp(150px, 45.8vw, 180px);
  height: auto;
  opacity: 0.9;
  pointer-events: none;
  transform: translateX(-50%);
  z-index: 6;
}

/* 卡片随视口高度伸缩，保持左右设计边距 */
.welcome-card {
  position: absolute;
  left: clamp(18px, 4.8vw, 19px);
  right: clamp(18px, 4.8vw, 19px);
  top: clamp(74px, 10.8vh, 96px);
  bottom: clamp(44px, 5.2vh, 58px);
  min-height: 560px;
  border-radius: 15px;
  background: var(--gradient-welcome-card);
  overflow: hidden;
}

/* 分隔线与标签 */
.divider-line {
  position: absolute;
  top: clamp(18px, 2.7vh, 26px);
  width: min(29.3vw, 115px);
  height: 2px;
  background: var(--color-line);
  z-index: 4;
}
.divider-left {
  left: clamp(26px, 6.6vw, 45px);
}
.divider-right {
  right: clamp(26px, 6.6vw, 45px);
}
.divider-label {
  position: absolute;
  left: 0;
  right: 0;
  top: clamp(10px, 1.8vh, 18px);
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: var(--color-brand);
  z-index: 4;
}

.emblem {
  position: absolute;
  left: 50%;
  top: clamp(52px, 7vh, 62px);
  width: clamp(138px, 20vh, 170px);
  height: clamp(138px, 20vh, 170px);
  transform: translateX(-50%);
  z-index: 5;
}

.title {
  position: absolute;
  left: 0;
  right: 0;
  top: clamp(210px, 30.6vh, 259px);
  margin: 0;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(30px, 8.7vw, 36px);
  line-height: 1.22;
  color: var(--color-brand);
  z-index: 5;
}

.body {
  position: absolute;
  left: 12%;
  right: 12%;
  top: clamp(292px, 38.5vh, 326px);
  margin: 0;
  text-align: justify;
  text-justify: inter-character;
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: clamp(14px, 4.05vw, 16px);
  line-height: clamp(24px, 3.5vh, 30px);
  letter-spacing: 0;
  color: var(--color-serif-ink);
  z-index: 5;
}

.cta {
  position: absolute;
  left: 50%;
  top: 69.8%;
  width: 177px;
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  transform: translate(-50%, -50%);
  z-index: 20;
}
.cta::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--gradient-welcome-btn);
  opacity: 0.8;
  z-index: -1;
}
.cta::after {
  content: "";
  position: absolute;
  left: -8px;
  right: -8px;
  top: -6px;
  bottom: -6px;
}
.cta:active::before {
  opacity: 0.65;
}

@media (max-height: 720px) {
  .welcome-card {
    top: 70px;
    bottom: 36px;
  }

  .body {
    left: 11%;
    right: 11%;
  }
}

</style>
