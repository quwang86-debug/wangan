<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useStepper } from "@/composables/useStepper";

const { goto } = useStepper();
let timer: number | undefined;

onMounted(() => {
  // 过渡动画后进入合影页（落地时改为合成完成回调）
  timer = window.setTimeout(() => goto("photo"), 2200);
});
onUnmounted(() => window.clearTimeout(timer));
</script>

<template>
  <!-- 设计稿基准画板 393×852，所有元素按 spec 坐标 1:1 绝对定位 -->
  <div class="ploading-stage">
    <!-- z1 全屏蓝底 #0050B5 -->
    <!-- z2 矩形 4 @(-10,136) 425×721 暖纸→透灰 渐变，填充不透明度 0.6 -->
    <div class="card-gradient" />

    <!-- z3 素材底部 @ (2,639) 390×218，填充不透明度 0.3 -->
    <img class="footer-deco" src="/assets/img/footer-deco.png" alt="" />

    <!-- z4 二进制装饰文本 @ (25,97) 382×722 -->
    <p class="binary-text" aria-hidden="true">
      01101010 10011100 00110111 11000101 10100011 000111010 10 1 010 01 10 1010 0 001100 1010
      11100100 01011001 10001110 01110001 11010100 00101110 10110101 01001011 11110011 00111000
      10010110 01100111 000 001 1010 001100 0 100 001 001100 11001001 00001101 10111010 01010010
      11101100
    </p>

    <!-- z5 顶部头部（白 logo 占位 + 渐隐圆 + 状态栏） -->
    <span class="brand-logo" aria-hidden="true" />
    <span class="deco-circle deco-circle-1" />
    <span class="deco-circle deco-circle-2" />
    <span class="status-time">9:41</span>
    <svg class="ico-cellular" viewBox="0 0 17 11" fill="#fff" aria-hidden="true">
      <rect x="0" y="7" width="3" height="4" rx="0.5" />
      <rect x="4.5" y="4" width="3" height="7" rx="0.5" />
      <rect x="9" y="2" width="3" height="9" rx="0.5" />
      <rect x="14" y="0" width="3" height="11" rx="0.5" />
    </svg>
    <svg class="ico-wifi" viewBox="0 0 15 11" fill="#fff" aria-hidden="true">
      <path
        d="M7.5 0C11 0 13.9 1.2 15 2.3l-1.5 1.6C12.6 3 10.2 2.1 7.5 2.1S2.4 3 1.5 3.9L0 2.3C1.1 1.2 4 0 7.5 0Z"
      />
      <path
        d="M7.5 4.2c2.1 0 4 .8 4.8 1.6L10.8 7.4C10.2 6.8 9 6.3 7.5 6.3S4.8 6.8 4.2 7.4L2.7 5.8C3.5 5 5.4 4.2 7.5 4.2Z"
      />
      <path d="M7.5 8.2c.9 0 1.7.4 2.1.9L7.5 11 5.4 9.1c.4-.5 1.2-.9 2.1-.9Z" />
    </svg>
    <svg class="ico-battery" viewBox="0 0 24 11" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" fill="none" stroke="#fff" opacity="0.35" />
      <rect x="2" y="2" width="18" height="7" rx="1.5" fill="#fff" />
      <rect x="23" y="4" width="1" height="4" rx="0.5" fill="#fff" opacity="0.4" />
    </svg>

    <!-- z6 波浪 @ (-176,1120) 393×118（设计稿层，视口外） -->
    <img class="wave-bottom" src="/assets/img/wave-bottom.png" alt="" />

    <!-- z7 进度条描边 @ (55,376) 295×50 r15 -->
    <div class="progress-track" />

    <!-- z8 进度条填充 @ (62,381) 219×40 r15 -->
    <div class="progress-fill" />

    <!-- z9 LOADING... @ (145,458) 223×43 -->
    <p class="loading-label">LOADING...</p>

    <!-- z10 标题 @ (101,216) 192×67 -->
    <h1 class="title">镜头正在就位<br />校园合影加载中</h1>

    <!-- z11 加载圆点 @ (166,303) 64×14 -->
    <div class="loading-dots" aria-label="加载中">
      <span class="dot dot-1" />
      <span class="dot dot-2" />
      <span class="dot dot-3" />
    </div>
  </div>
</template>

<style scoped>
/* 画板 393×852，z1 全屏蓝 #0050B5 */
.ploading-stage {
  position: relative;
  width: var(--design-width);
  height: var(--design-height);
  margin: 0 auto;
  background: var(--color-brand);
  overflow: hidden;
}

/* z2 矩形 4：from{0.54,0.96}->to{0.54,0.03} 底暖纸→顶透灰，填充不透明度 0.6 */
.card-gradient {
  position: absolute;
  left: -10px;
  top: 136px;
  width: 425px;
  height: 721px;
  border-radius: 0;
  background: linear-gradient(to top, #fff9e6, rgba(204, 204, 204, 0));
  opacity: 0.6;
  z-index: 2;
}

/* z3 底部装饰，填充不透明度 0.3 */
.footer-deco {
  position: absolute;
  left: 2px;
  top: 639px;
  width: 390px;
  height: 218px;
  object-fit: cover;
  opacity: 0.3;
  z-index: 3;
}

/* z4 二进制文本：文源宋体 Light 18px #FFF 15% 字距 15px */
.binary-text {
  position: absolute;
  left: 25px;
  top: 97px;
  width: 382px;
  height: 722px;
  margin: 0;
  overflow: hidden;
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: 18px;
  line-height: 1.448;
  letter-spacing: 15px;
  color: rgba(255, 255, 255, 0.15);
  z-index: 4;
}

/* z5 头部 — 分组 5 @(15,0) 内各子元素换算为画板绝对坐标 */
.brand-logo {
  position: absolute;
  left: 17px;
  top: 41px;
  width: 213px;
  height: 46px;
  z-index: 5;
}

.deco-circle {
  position: absolute;
  top: 53px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(to left, var(--color-paper), rgba(255, 243, 212, 0));
  z-index: 5;
}
.deco-circle-1 {
  left: 317px;
}
.deco-circle-2 {
  left: 346px;
}

.status-time {
  position: absolute;
  left: 24px;
  top: 12px;
  width: 54px;
  text-align: center;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #fff;
  z-index: 5;
}

.ico-cellular {
  position: absolute;
  left: 309px;
  top: 18px;
  width: 17px;
  height: 11px;
  z-index: 5;
}
.ico-wifi {
  position: absolute;
  left: 331px;
  top: 17px;
  width: 15px;
  height: 11px;
  z-index: 5;
}
.ico-battery {
  position: absolute;
  left: 351px;
  top: 17px;
  width: 24px;
  height: 11px;
  z-index: 5;
}

/* z6 波浪（spec 坐标在视口外） */
.wave-bottom {
  position: absolute;
  left: -176px;
  top: 1120px;
  width: 393px;
  height: 118px;
  object-fit: cover;
  z-index: 6;
}

/* z7 进度条描边 #FDF2D4 3px */
.progress-track {
  position: absolute;
  left: 55px;
  top: 376px;
  width: 295px;
  height: 50px;
  border: 3px solid #fdf2d4;
  border-radius: 15px;
  box-sizing: border-box;
  background: transparent;
  z-index: 7;
}

/* z8 进度条填充：左→右 #4379BB→#FFF3D4，加载动画 0→219px */
.progress-fill {
  position: absolute;
  left: 62px;
  top: 381px;
  width: 0;
  height: 40px;
  border-radius: 15px;
  background: linear-gradient(to right, #4379bb, var(--color-paper));
  animation: progress-grow 2.2s ease-out forwards;
  z-index: 8;
}
@keyframes progress-grow {
  to {
    width: 219px;
  }
}

/* z9 LOADING... 普惠体 20px 字距 1px */
.loading-label {
  position: absolute;
  left: 145px;
  top: 458px;
  width: 223px;
  height: 43px;
  margin: 0;
  font-family: var(--font-button);
  font-weight: 400;
  font-size: 20px;
  line-height: normal;
  letter-spacing: 1px;
  color: #fff;
  z-index: 9;
}

/* z10 标题 数黑体 24px 左对齐 */
.title {
  position: absolute;
  left: 101px;
  top: 216px;
  width: 192px;
  height: 67px;
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 24px;
  line-height: normal;
  letter-spacing: 0;
  color: #fff;
  z-index: 10;
}

/* z11 三个加载圆点 14×14 #FFF，间距 25px */
.loading-dots {
  position: absolute;
  left: 166px;
  top: 303px;
  width: 64px;
  height: 14px;
  z-index: 11;
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
</style>
