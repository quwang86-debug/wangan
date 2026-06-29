<script setup lang="ts">
import DesignStage from "@/components/base/DesignStage.vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "@/stores/student";
import { useStepper } from "@/composables/useStepper";
import { assetUrl } from "@/utils/asset";

const { name } = storeToRefs(useStudentStore());
const { next } = useStepper();
</script>

<template>
  <DesignStage class="welcome-viewport">
    <!-- 设计稿基准画板 393×852，所有元素按设计稿坐标 1:1 绝对定位 -->
    <div class="welcome-stage">
    <!-- z2 卡片（暖纸→半透明白→蓝 渐变，圆角 15） -->
    <div class="card" />

    <!-- z3 主标题 -->
    <h1 class="title">欢迎，{{ name || "新同学" }}！</h1>

    <!-- z4 底部装饰图 393×220 @ (0,637) -->
    <img class="footer-deco" :src="assetUrl('assets/img/footer-deco.png')" alt="" />

    <!-- z5 校徽 170×170 @ (111,158) -->
    <img class="emblem" :src="assetUrl('assets/img/emblem.png')" alt="校徽" />

    <!-- z6 花纹 180×44 @ (111,747) -->
    <img class="pattern" :src="assetUrl('assets/img/pattern.png')" alt="" />

    <!-- z7 主按钮 177×44 @ (111,594)，12px 圆角 -->
    <button class="cta" type="button" @click="next('welcome')">开始身份核验</button>

    <!-- z8 分隔（2026级新生 + 两侧 115×2 线） -->
    <span class="divider-line divider-left" />
    <span class="divider-label">2026级新生</span>
    <span class="divider-line divider-right" />

    <!-- z9 正文（文源宋体 16px #012A5C，定宽 278） -->
    <p class="body">
      祝贺你被网络空间安全学院录取。愿你以理性探索未知，以技术守护信任，在网络空间安全的时代征程中写下属于自己的新篇章。
    </p>

    <!-- z10 头部白色 logo @ (11,41) 213×46 + 渐隐圆 + 状态栏 -->
    <img
      class="brand-logo"
      :src="assetUrl('assets/img/logo-white.png')"
      alt="网络空间安全学院"
    />
    <span class="deco-circle deco-circle-1" />
    <span class="deco-circle deco-circle-2" />
    </div>
  </DesignStage>
</template>

<style scoped>
.welcome-viewport {
  background: var(--color-brand);
}

/* 画板：393×852，蓝底铺满（对应设计稿全屏蓝色路径 #0050B5） */
.welcome-stage {
  position: relative;
  width: var(--design-width);
  height: var(--design-height);
  background: var(--color-brand);
  overflow: hidden;
}

/* z2 卡片 @ (19,100) 356×708 r15 */
.card {
  position: absolute;
  left: 19px;
  top: 100px;
  width: 356px;
  height: 708px;
  border-radius: 15px;
  background: var(--gradient-welcome-card);
  z-index: 2;
}

/* z3 标题 @ y359，数黑体 36px 蓝 */
.title {
  position: absolute;
  left: 19px;
  top: 359px;
  width: 356px;
  margin: 0;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;
  color: var(--color-brand);
  z-index: 3;
}

/* z4 底部装饰 @ (0,637) 393×220，填充不透明度 20%（设计稿 fill opacity 0.2） */
.footer-deco {
  position: absolute;
  left: 0;
  top: 637px;
  width: 393px;
  height: 220px;
  object-fit: cover;
  opacity: 0.2;
  z-index: 4;
}

/* z5 校徽 @ (111,158) 170×170 */
.emblem {
  position: absolute;
  left: 111px;
  top: 158px;
  width: 170px;
  height: 170px;
  z-index: 5;
}

/* z6 花纹 @ (111,747) 180×44，填充不透明度 90%（设计稿 fill opacity 0.9） */
.pattern {
  position: absolute;
  left: 111px;
  top: 747px;
  width: 180px;
  height: 44px;
  object-fit: contain;
  opacity: 0.9;
  z-index: 6;
}

/* z7 主按钮 @ (111,594) 177×44 r12，顶蓝→底暖纸 渐变（填充不透明度 80%，文字不透明） */
.cta {
  position: absolute;
  left: 111px;
  top: 594px;
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
  user-select: none;
  z-index: 7;
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
.cta:active::before {
  opacity: 0.65;
}

/* z8 分隔线与标签 */
.divider-line {
  position: absolute;
  top: 126px;
  width: 115px;
  height: 2px;
  background: var(--color-line);
  z-index: 8;
}
.divider-left {
  left: 45px;
}
.divider-right {
  left: 236px;
}
.divider-label {
  position: absolute;
  left: 45px;
  top: 118px;
  width: 306px;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: var(--color-brand);
  z-index: 8;
}

/* z9 正文 @ (62,426) 278×175，文源宋体 Regular 16px #012A5C
   设计稿 paragraphStyle：alignment=3(两端对齐)、行高固定 30px、kerning=0、顶对齐
   16px + 278 宽 + justify 自然每行约 17 字 → 57 字共 4 行（与设计稿一致） */
.body {
  position: absolute;
  left: 62px;
  top: 426px;
  width: 278px;
  height: 175px;
  margin: 0;
  text-align: justify;
  text-justify: inter-character;
  font-family: var(--font-serif);
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 0;
  color: var(--color-serif-ink);
  z-index: 9;
}

/* z10 头部白色 logo @ (11,41) 213×46，contain 适配不溢出 */
.brand-logo {
  position: absolute;
  left: 11px;
  top: 41px;
  width: 213px;
  height: 46px;
  object-fit: contain;
  object-position: left center;
  z-index: 10;
}

/* 顶部右侧两个水平渐隐圆 22×22 @ (311,53)(340,53) */
.deco-circle {
  position: absolute;
  top: 53px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  /* 设计稿：右侧实色 → 左侧透明（from{1,0.5}→to{0,0.5}） */
  background: linear-gradient(to left, var(--color-paper), rgba(255, 243, 212, 0));
  z-index: 10;
}
.deco-circle-1 {
  left: 311px;
}
.deco-circle-2 {
  left: 340px;
}
</style>
