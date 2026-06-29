<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useStepper } from "@/composables/useStepper";
import { useStudentStore } from "@/stores/student";
import { assetUrl } from "@/utils/asset";

const { goto } = useStepper();
const { name, studentNo } = storeToRefs(useStudentStore());

const noticeImg = assetUrl("assets/img/notice-paper.jpg");
const noticeBottomDeco = assetUrl("assets/img/verify-deco.png");

const demoCollegeName = "网络空间安全学院";
const demoMajorName = "网络空间安全";

const noticeStudentName = computed(() => {
  const value = name.value.trim();
  return value && value !== "新同学" ? value : "网小安";
});
</script>

<template>
  <div class="notice-page">
    <!-- 背景装饰层：与欢迎页 footer-deco / pattern 同级平铺 -->
    <div class="notice-bg-gradient" aria-hidden="true" />
    <p class="notice-binary-backdrop" aria-hidden="true">
      01101010 10011100 00110111 11000101 10100011 000111010 10 1 010 01 10 1010 0 001100 1010
      11100100 01011001 10001110 01110001 11010100 00101110 10110101 01001011 11110011 00111000
      10010110 01100111 000 001 1010 001100 0 100 001 001100 11001001 00001101 10111010 01010010
      11101100
    </p>
    <img class="notice-bottom-deco" :src="noticeBottomDeco" alt="" />

    <header class="brand-header">
      <img
        class="brand-logo"
        :src="assetUrl('assets/img/logo-white.png')"
        alt="网络空间安全学院"
      />
      <span class="deco-circle deco-circle-1" />
      <span class="deco-circle deco-circle-2" />
    </header>

    <!-- 主内容区：对应欢迎页 welcome-card，子元素区内绝对定位 -->
    <section class="notice-stage" aria-label="录取通知书">
      <div class="notice-paper-wrap">
        <img :src="noticeImg" alt="录取通知书" class="notice-paper" />
        <div class="notice-paper-fields" aria-hidden="true">
          <span class="paper-field paper-field-student-no">{{ studentNo }}</span>
          <span class="paper-field paper-field-student-name">{{ noticeStudentName }}</span>
          <span class="paper-field paper-field-college">{{ demoCollegeName }}</span>
          <span class="paper-field paper-field-major">{{ demoMajorName }}</span>
        </div>
      </div>

      <p class="save-tip">*长按保存通知书</p>

      <div class="action-bar">
        <button class="action-btn" type="button" @click="goto('photo-loading')">生成合影</button>
        <button class="action-btn" type="button" @click="goto('register')">查看报道说明</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.notice-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 640px;
  background: #0050b5;
  overflow: hidden;
}

/* 暖灰渐变 @ (0,120) 393×721，填充不透明度 0.6 */
.notice-bg-gradient {
  position: absolute;
  left: 0;
  right: 0;
  top: clamp(72px, 8.9vh, 76px);
  bottom: 0;
  background: linear-gradient(to top, #dbd5c5, rgba(204, 204, 204, 0));
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
}

/* 二进制底纹 @ (19,88) 382×722 */
.notice-binary-backdrop {
  position: absolute;
  left: clamp(14px, 4.8vw, 19px);
  right: clamp(8px, 2.5vw, 14px);
  top: clamp(40px, 5.2vh, 44px);
  bottom: clamp(28px, 4vh, 42px);
  margin: 0;
  overflow: hidden;
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(14px, 4.6vw, 18px);
  line-height: 1.448;
  letter-spacing: clamp(8px, 3.8vw, 15px);
  color: rgba(255, 255, 255, 0.15);
  pointer-events: none;
  z-index: 2;
}

/* 底部装饰 6.png @ (-53,660) 446×192，贴视口底 */
.notice-bottom-deco {
  position: absolute;
  left: -53px;
  bottom: 0;
  width: calc(100% + 53px);
  height: clamp(160px, 22.5vh, 192px);
  object-fit: cover;
  object-position: center bottom;
  pointer-events: none;
  z-index: 3;
}

/* 顶部品牌：与欢迎页相同安全区布局 */
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
  pointer-events: none;
}
.deco-circle-1 {
  right: 29px;
}
.deco-circle-2 {
  right: 0;
}

/*
 * 主舞台：设计稿 paper @(18,138) → 去状态栏后 top≈94
 * bottom 留 btn @(693)+30 + 页底边距 ≈ 129px
 */
.notice-stage {
  position: absolute;
  left: clamp(18px, 4.6vw, 18px);
  right: clamp(18px, 4.6vw, 18px);
  top: clamp(88px, 11vh, 94px);
  bottom: max(clamp(100px, 12vh, 129px), env(safe-area-inset-bottom, 0px));
  z-index: 5;
}

/* 通知书 @(18,138) 357×505 */
.notice-paper-wrap {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 357px;
  aspect-ratio: 2480 / 3508;
  container-type: inline-size;
  overflow: hidden;
  pointer-events: none;
}

.notice-paper {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center top;
  -webkit-touch-callout: default;
  user-select: none;
  pointer-events: auto;
}

.notice-paper-fields {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.paper-field {
  position: absolute;
  font-family: "Founder", "FangSong", "STFangsong", var(--font-serif);
  font-weight: 400;
  font-size: calc(100cqw * 0.033613);
  line-height: 1.1667;
  color: #000;
  white-space: nowrap;
}

/* 位置按通知书原图真实下划线 / 学号冒号后空白区域换算 */
.paper-field-student-no {
  left: 68.63%;
  top: 38.10%;
  font-family: "SourceHanSans-Regular", "Source Han Sans SC", var(--font-mono);
  font-size: calc(100cqw * 0.02521);
  line-height: 1.4444;
  letter-spacing: 0;
}

/* 姓名 / 学院 / 专业：以各自下划线中心点为锚点 */
.paper-field-student-name,
.paper-field-college,
.paper-field-major {
  transform: translateX(-50%);
  text-align: center;
}

.paper-field-student-name {
  left: 23.69%;
  top: 40.99%;
}

.paper-field-college {
  left: 63.63%;
  top: 48.12%;
}

.paper-field-major {
  left: 47.22%;
  top: 51.49%;
}

/* *长按保存：设计稿 @(280,628)，相对通知书图 @(18,138) => 舞台内 @(262,490) */
.save-tip {
  position: absolute;
  left: 248px;
  top: 485px;
  margin: 0;
  width: 102px;
  font-family: "Founder", "FangSong", "STFangsong", var(--font-serif);
  font-weight: 400;
  font-size: 9px;
  line-height: 21px;
  letter-spacing: 0;
  color: #fff;
  text-align: right;
  pointer-events: none;
  z-index: 6;
}

/* 按钮 @(25,693)(228,693) 154×30，间距 49px */
.action-bar {
  position: absolute;
  left: 7px;
  right: -7px;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  z-index: 20;
  pointer-events: auto;
}

.action-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  width: min(154px, calc((100% - 49px) / 2));
  height: 30px;
  border-radius: 15px;
  background: transparent;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(14px, 4.07vw, 16px);
  line-height: 19px;
  letter-spacing: 0;
  color: #fff;
  text-align: center;
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
  flex-shrink: 0;
}
.action-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(to top, #0a4ea1, #fff3d4);
  z-index: -1;
}
.action-btn::after {
  content: "";
  position: absolute;
  left: -8px;
  right: -8px;
  top: -6px;
  bottom: -6px;
}
.action-btn:active::before {
  opacity: 0.85;
}

@media (max-height: 720px) {
  .notice-stage {
    top: clamp(76px, 10vh, 88px);
    bottom: max(clamp(80px, 10vh, 100px), env(safe-area-inset-bottom, 0px));
  }

  .notice-bg-gradient {
    top: clamp(60px, 8vh, 72px);
  }

  .notice-paper-wrap {
    max-width: min(357px, calc((100dvh - 215px) * 0.707));
  }
}
</style>
