<script setup lang="ts">
import { assetUrl } from "@/utils/asset";

const REGISTER_URL = "https://admission.example.edu.cn/register";

function goRegister() {
  window.open(REGISTER_URL, "_blank", "noopener");
}
</script>

<template>
  <!-- 设计稿基准画板 393×852，所有元素按设计稿坐标 1:1 绝对定位 -->
  <div class="register-stage">
    <!-- z2 二进制装饰文本 @ (27,100) 382×722 -->
    <p class="binary-backdrop" aria-hidden="true">
      01101010 10011100 00110111 11000101 10100011 000111010 10 1 010 01 10 1010 0 001100 1010 11100100 01011001 10001110 01110001 11010100 00101110 10110101 01001011 11110011 00111000 10010110 01100111 000 001 1010 001100 0 100 001 001100 11001001 00001101 10111010 01010010 11101100
    </p>

    <!-- z3 头部白色 logo @ (11,41) 213×46 -->
    <img
      class="brand-logo"
      :src="assetUrl('assets/img/logo-white.png')"
      alt="网络空间安全学院"
    />
    <span class="deco-circle deco-circle-1" />
    <span class="deco-circle deco-circle-2" />

    <span class="status-time">9:41</span>
    <span class="status-icons">
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
    </span>

    <!-- z4 页面标题 -->
    <h1 class="page-title">线上注册与到校报到</h1>

    <!-- z5 信息卡片 @ (22,211) 345×501 r23 -->
    <div class="info-card" />

    <!-- z6–z8 区块标题 -->
    <h2 class="section-title section-title-1">线上注册</h2>
    <h2 class="section-title section-title-2">到校报到</h2>
    <h2 class="section-title section-title-3">报到地点</h2>

    <!-- z9–z12 左侧色条 + 内容 -->
    <span class="accent-bar accent-bar-1" />
    <p class="section-content section-content-1">
      2026年<br />8月20日09：00 — 8月28日18：00
    </p>

    <span class="accent-bar accent-bar-2" />
    <p class="section-content section-content-2">
      2026年<br />8月16日08：00 — 18：00
    </p>

    <span class="accent-bar accent-bar-3" />
    <p class="section-content section-content-3">
      武汉市东西湖区网安大道 26 号网络空间安全学院基地校区
    </p>

    <!-- z13–z14 分隔线 -->
    <span class="divider-line divider-line-1" />
    <span class="divider-line divider-line-2" />

    <!-- z15 前往线上注册按钮 @ (118,735) 156×36 -->
    <button class="register-btn" type="button" @click="goRegister">前往线上注册</button>
  </div>
</template>

<style scoped>
/* 画板：393×852，蓝底 #0050B5（z1 背景层） */
.register-stage {
  position: relative;
  width: var(--design-width);
  height: var(--design-height);
  margin: 0 auto;
  background: var(--color-brand);
  overflow: hidden;
}

/* z2 二进制装饰 @ (27,100) 382×722，文源宋体 18px rgba(255,255,255,0.15) kerning=15 */
.binary-backdrop {
  position: absolute;
  left: 27px;
  top: 100px;
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
  z-index: 2;
}

/* z3 头部白色 logo @ (11,41) 213×46 */
.brand-logo {
  position: absolute;
  left: 11px;
  top: 41px;
  width: 213px;
  height: 46px;
  object-fit: contain;
  object-position: left center;
  z-index: 3;
}

.deco-circle {
  position: absolute;
  top: 53px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(to left, #fff3d4, rgba(255, 243, 212, 0));
  z-index: 3;
}
.deco-circle-1 {
  left: 311px;
}
.deco-circle-2 {
  left: 340px;
}

.status-time {
  position: absolute;
  left: 18px;
  top: 12px;
  width: 54px;
  text-align: center;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #fff;
  z-index: 3;
}
.status-icons {
  position: absolute;
  right: 24px;
  top: 17px;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 3;
}
.ico-cellular {
  width: 17px;
  height: 11px;
}
.ico-wifi {
  width: 15px;
  height: 11px;
}
.ico-battery {
  width: 24px;
  height: 11px;
}

/* z4 标题 @ (23,138) 288×39，数黑体 32px #FFFFFF */
.page-title {
  position: absolute;
  left: 23px;
  top: 138px;
  width: 288px;
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;
  color: #fff;
  z-index: 4;
}

/* z5 卡片 @ (22,211) 345×501 r23，1px 白描边
   渐变轴 from{y=1.51306}(#FFFFFA) -> to{y=0}(透明)，#FFFFFA 停止点在卡片底边之外；
   映射 CSS「to top」：底边=0%、顶边=100%，#FFFFFA 落在 -51.3%，
   使「到校报到」以下区域呈半透明奶白而非纯白，与设计稿一致。 */
.info-card {
  position: absolute;
  left: 22px;
  top: 211px;
  width: 345px;
  height: 501px;
  border-radius: 23px;
  border: 1px solid #fff;
  background: linear-gradient(to top, #fffffa -51.3%, rgba(204, 204, 204, 0) 100%);
  z-index: 5;
}

/* z6–z8 区块标题 @ y=257/413/563，数黑体 24px #FFFFFF */
.section-title {
  position: absolute;
  left: 45px;
  width: 96px;
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #fff;
}
.section-title-1 {
  top: 257px;
  z-index: 6;
}
.section-title-2 {
  top: 413px;
  z-index: 7;
}
.section-title-3 {
  top: 563px;
  z-index: 8;
}

/* 左侧色条 #FFECC4 */
.accent-bar {
  position: absolute;
  left: 50px;
  width: 7px;
  background: #ffecc4;
}
.accent-bar-1 {
  top: 311px;
  height: 49px;
  z-index: 9;
}
.accent-bar-2 {
  top: 461px;
  height: 49px;
  z-index: 11;
}
.accent-bar-3 {
  top: 609px;
  height: 54px;
  z-index: 12;
}

/* 区块内容，数黑体 18px #FFFFFF（行高按设计稿定高文本框推算） */
.section-content {
  position: absolute;
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 18px;
  color: #fff;
}
.section-content-1 {
  left: 67.5px;
  top: 318.1px;
  width: 287.5px;
  height: 62.9px;
  /* textBehaviour=2 定框 62.9px，两行 → 行高≈31.45px */
  line-height: 31.45px;
  z-index: 10;
}
.section-content-2 {
  left: 67px;
  top: 466px;
  width: 280px;
  height: 44px;
  /* 分组内文本框 280×44，两行 → 行高 22px */
  line-height: 22px;
  z-index: 11;
}
.section-content-3 {
  left: 69px;
  top: 619px;
  width: 280px;
  height: 44px;
  line-height: 22px;
  z-index: 12;
}

/* z13–z14 分隔线 @ (34,389)(34,544) 328×1 #FFFFFF */
.divider-line {
  position: absolute;
  left: 34px;
  width: 328px;
  height: 1px;
  background: #fff;
}
.divider-line-1 {
  top: 389px;
  z-index: 13;
}
.divider-line-2 {
  top: 544px;
  z-index: 14;
}

/* z15 按钮 @ (118,735) 156×36，底 #FFF3D4 → 顶 #0050B5 */
.register-btn {
  position: absolute;
  left: 118px;
  top: 735px;
  width: 156px;
  height: 36px;
  padding: 0;
  border: 0;
  /* 设计稿按钮为胶囊形（半径=高度一半=18px） */
  border-radius: 18px;
  background: transparent;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 14px;
  line-height: 36px;
  letter-spacing: 2px;
  text-indent: 2px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  z-index: 15;
}
/* z15 按钮 @ (118,735) 156×36，渐变 from{y=1.35227}(#FFF3D4)→to{y=0}(#0050B5) */
.register-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  /* #FFF3D4 停止点在按钮底边外 -35.2%，与合影/欢迎页按钮同一套映射 */
  background: linear-gradient(to top, #fff3d4 -35.2%, #0050b5 100%);
  z-index: -1;
}
.register-btn:active::before {
  opacity: 0.85;
}
</style>
