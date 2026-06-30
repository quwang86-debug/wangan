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

/* 卡片随视口高度伸缩；内部元素相对卡片容器定位，避免与正文重叠 */
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
  container-type: size;
  container-name: welcome-card;
}

/* 分隔线与标签 — 设计稿卡片 356×708 内坐标（组 @(26,18)，线 y+8） */
.divider-line {
  position: absolute;
  top: calc(26 / 708 * 100cqh);
  width: calc(115 / 356 * 100cqw);
  height: max(2px, calc(2 / 708 * 100cqh));
  display: block;
  background: var(--color-line);
  z-index: 4;
}
.divider-left {
  left: calc(26 / 356 * 100cqw);
}
.divider-right {
  left: calc(217 / 356 * 100cqw);
}
.divider-label {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(18 / 708 * 100cqh);
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: calc(13 / 356 * 100cqw);
  line-height: calc(16 / 708 * 100cqh);
  color: var(--color-brand);
  z-index: 4;
}

.emblem {
  position: absolute;
  left: 50%;
  top: calc(62 / 708 * 100cqh);
  width: calc(170 / 356 * 100cqw);
  height: calc(170 / 708 * 100cqh);
  max-width: 170px;
  max-height: 170px;
  transform: translateX(-50%);
  z-index: 5;
}

.title {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(259 / 708 * 100cqh);
  margin: 0;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: calc(36 / 356 * 100cqw);
  line-height: 1.22;
  color: var(--color-brand);
  z-index: 5;
}

/* 正文 @(62,426) 278×175 → 卡片内 (43,326) */
.body {
  position: absolute;
  left: calc(43 / 356 * 100cqw);
  right: calc(35 / 356 * 100cqw);
  top: calc(326 / 708 * 100cqh);
  max-height: calc(175 / 708 * 100cqh);
  margin: 0;
  text-align: justify;
  text-justify: inter-character;
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: calc(16 / 356 * 100cqw);
  line-height: calc(30 / 16);
  letter-spacing: 0;
  color: var(--color-serif-ink);
  z-index: 5;
}

/* 按钮 @(108,580) 177×44 → 卡片内 top 480；与正文区至少留 24px */
.cta {
  position: absolute;
  left: 50%;
  top: max(
    calc(480 / 708 * 100cqh),
    calc((326 + 175 + 24) / 708 * 100cqh)
  );
  width: calc(177 / 356 * 100cqw);
  max-width: 177px;
  height: calc(44 / 708 * 100cqh);
  max-height: 44px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: calc(16 / 356 * 100cqw);
  color: #fff;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
  transform: translateX(-50%);
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

@media (max-width: 420px) {
  .body {
    font-size: calc(15 / 356 * 100cqw);
    line-height: 1.45;
  }

  .cta {
    top: max(
      calc(480 / 708 * 100cqh),
      calc((326 + 190 + 20) / 708 * 100cqh)
    );
  }
}

@media (max-height: 720px) {
  .welcome-card {
    top: 70px;
    bottom: 36px;
  }

  .body {
    line-height: 1.45;
    max-height: calc(160 / 708 * 100cqh);
  }

  .cta {
    top: max(
      calc(468 / 708 * 100cqh),
      calc((326 + 160 + 18) / 708 * 100cqh)
    );
  }
}

</style>
