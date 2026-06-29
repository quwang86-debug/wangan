<script setup lang="ts">
import { ref } from "vue";
import BackgroundCarousel from "@/components/base/BackgroundCarousel.vue";
import { VERIFY_CAROUSEL_SLIDES, verifyCarouselSrc } from "@/data/verifyCarousel";
import { useStudentStore } from "@/stores/student";
import { useStepper } from "@/composables/useStepper";
import { assetUrl } from "@/utils/asset";

const verifyBgSlides = VERIFY_CAROUSEL_SLIDES.map(verifyCarouselSrc);

const store = useStudentStore();
const { next } = useStepper();

const name = ref("");
const idCard = ref("");

function onVerify() {
  // TODO: 调用后端实名核验 /api/verify（见蓝本 §8）
  store.setProfile({ name: name.value.trim() || "新同学", idCard: idCard.value });
  store.markVerified();
  next("verify");
}
</script>

<template>
  <div class="verify-page">
    <BackgroundCarousel
      class="bg-carousel"
      :slides="verifyBgSlides"
      effect="ken-burns-drift"
      :interval="9000"
      :fade-ms="1200"
    />
    <div class="verify-scrim" aria-hidden="true" />

    <header class="brand-header">
      <img
        class="brand-logo"
        :src="assetUrl('assets/img/verify-header-logo.png')"
        alt="网络空间安全学院"
      />
      <svg class="deco-circle deco-circle-1" viewBox="0 0 22 22" aria-hidden="true">
        <defs>
          <linearGradient
            id="verify-deco-grad-1"
            x1="0"
            y1="11"
            x2="22"
            y2="11"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#FFF3D4" stop-opacity="0" />
            <stop offset="1" stop-color="#0050B5" />
          </linearGradient>
        </defs>
        <circle cx="11" cy="11" r="11" fill="url(#verify-deco-grad-1)" />
      </svg>
      <svg class="deco-circle deco-circle-2" viewBox="0 0 22 22" aria-hidden="true">
        <defs>
          <linearGradient
            id="verify-deco-grad-2"
            x1="22"
            y1="11"
            x2="0"
            y2="11"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#0050B5" />
            <stop offset="1" stop-color="#FFF3D4" stop-opacity="0" />
          </linearGradient>
        </defs>
        <circle cx="11" cy="11" r="11" fill="url(#verify-deco-grad-2)" />
      </svg>
    </header>

    <main class="verify-content">
      <h1 class="page-title">身份核验</h1>

      <div class="form-card">
        <label class="field-label field-label-name" for="verify-name">学生姓名</label>
        <label class="field-label field-label-id" for="verify-id">身份证号</label>
        <input
          id="verify-name"
          v-model="name"
          class="field-input field-input-name"
          type="text"
          placeholder="请输入..."
          autocomplete="name"
        />
        <input
          id="verify-id"
          v-model="idCard"
          class="field-input field-input-id"
          type="text"
          placeholder="请输入..."
          maxlength="18"
          autocomplete="off"
        />
      </div>

      <button class="submit-btn" type="button" @click="onVerify">去认证</button>
    </main>
  </div>
</template>

<style scoped>
.verify-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 640px;
  overflow: hidden;
  background: #0a1628;
}

/* 轮播背景铺满真实视口 */
.bg-carousel {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.verify-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 80, 181, 0.1)),
    radial-gradient(circle at 50% 45%, rgba(255, 243, 212, 0.08), rgba(0, 80, 181, 0) 58%);
  z-index: 1;
  pointer-events: none;
}

/* 顶部品牌：安全区布局，不再保留设计稿假状态栏 */
.brand-header {
  position: absolute;
  left: clamp(11px, 3.6vw, 18px);
  right: clamp(26px, 7vw, 31px);
  top: max(env(safe-area-inset-top, 0px), 12px);
  height: 46px;
  z-index: 10;
  pointer-events: none;
}

.brand-logo {
  position: absolute;
  left: 0;
  top: 0;
  width: clamp(178px, 50.6vw, 199px);
  height: 40px;
  object-fit: contain;
  object-position: left center;
}

.deco-circle {
  position: absolute;
  top: 12px;
  width: 22px;
  height: 22px;
  pointer-events: none;
}
.deco-circle-1 {
  right: 29px;
}
.deco-circle-2 {
  right: 0;
}

.verify-content {
  position: absolute;
  left: clamp(18px, 5.35vw, 21px);
  right: clamp(18px, 5.35vw, 21px);
  top: clamp(178px, 24vh, 210px);
  z-index: 5;
}

.page-title {
  margin: 0 0 clamp(28px, 5vh, 40px);
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(28px, 8.1vw, 32px);
  line-height: 1.22;
  color: #0a4ea1;
  pointer-events: none;
}

.form-card {
  position: relative;
  width: 100%;
  height: clamp(200px, 25.5vh, 217px);
  border: 1px solid #fff;
  border-radius: 23px;
  background: linear-gradient(to top, #5483bc -51.3%, rgba(204, 204, 204, 0) 100%);
}

.field-label {
  position: absolute;
  left: 6.8%;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #0a4ea1;
  pointer-events: none;
}
.field-label-name {
  top: 11.1%;
}
.field-label-id {
  top: 53.5%;
}

.field-input {
  position: absolute;
  left: 6%;
  width: 87%;
  height: clamp(40px, 5vh, 43px);
  padding: 0 15px;
  border: 0;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  font-family: "Source Han Serif SC", "Songti SC", "STSong", serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: #1a1a1a;
  outline: none;
  z-index: 2;
  pointer-events: auto;
}
.field-input::placeholder {
  color: #7a7a7a;
}
.field-input-name {
  top: 24.4%;
}
.field-input-id {
  top: 65.4%;
}

.submit-btn {
  position: relative;
  display: block;
  width: clamp(148px, 40.2vw, 158px);
  height: 34px;
  margin: clamp(34px, 5.5vh, 47px) auto 0;
  padding: 0;
  border: 0;
  border-radius: 17px;
  background: transparent;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 16px;
  line-height: 34px;
  letter-spacing: 2px;
  text-indent: 2px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  z-index: 20;
  pointer-events: auto;
}
.submit-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(to bottom, #fff3d4 -86.3%, #0050b5 154.9%);
  z-index: -1;
}
.submit-btn::after {
  content: "";
  position: absolute;
  left: -8px;
  right: -8px;
  top: -6px;
  bottom: -6px;
}
.submit-btn:active::before {
  opacity: 0.85;
}

@media (max-height: 720px) {
  .verify-content {
    top: clamp(150px, 21vh, 180px);
  }

  .page-title {
    margin-bottom: clamp(20px, 4vh, 28px);
  }

  .form-card {
    height: 200px;
  }

  .submit-btn {
    margin-top: 32px;
  }
}

</style>
