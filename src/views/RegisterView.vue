<script setup lang="ts">
import { assetUrl } from "@/utils/asset";

const REGISTER_URL = "https://admission.example.edu.cn/register";

function goRegister() {
  window.open(REGISTER_URL, "_blank", "noopener");
}
</script>

<template>
  <div class="register-page">
    <p class="binary-backdrop" aria-hidden="true">
      01101010 10011100 00110111 11000101 10100011 000111010 10 1 010 01 10 1010 0 001100 1010 11100100 01011001 10001110 01110001 11010100 00101110 10110101 01001011 11110011 00111000 10010110 01100111 000 001 1010 001100 0 100 001 001100 11001001 00001101 10111010 01010010 11101100
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

    <h1 class="page-title">线上注册与到校报到</h1>

    <section class="info-card" aria-label="企微注册与报到信息">
      <div class="info-section">
        <h2 class="section-title">加入企微</h2>
        <div class="section-body">
          <span class="accent-bar accent-bar-tall" />
          <p class="section-content">
            2026年<br />即日起 — 8月15日18：00<br />加入校园企微完成新生注册
          </p>
        </div>
      </div>

      <span class="divider-line" />

      <div class="info-section">
        <h2 class="section-title">到校报到</h2>
        <div class="section-body">
          <span class="accent-bar accent-bar-tall" />
          <p class="section-content">
            2026年<br />8月16日8：00 — 18：00
          </p>
        </div>
      </div>

      <span class="divider-line" />

      <div class="info-section">
        <h2 class="section-title">报到地点</h2>
        <div class="section-body">
          <span class="accent-bar accent-bar-wide" />
          <p class="section-content">
            武汉市东西湖区网安大道 26 号网络空间安全学院基地校区
          </p>
        </div>
      </div>
    </section>

    <button class="register-btn" type="button" @click="goRegister">前往企微注册</button>
  </div>
</template>

<style scoped>
.register-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 640px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: var(--color-brand);
  padding-bottom: calc(max(env(safe-area-inset-bottom, 0px), 16px) + 52px);
  box-sizing: border-box;
}

/* 二进制底纹 @ (27,100) 382×722 */
.binary-backdrop {
  position: absolute;
  left: clamp(16px, 6.9vw, 27px);
  top: clamp(72px, 11.7vh, 100px);
  width: min(calc(100% - 32px), 382px);
  height: clamp(480px, 84.7vh, 722px);
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

/* 顶部品牌：安全区布局 */
.brand-header {
  position: relative;
  margin: max(env(safe-area-inset-top, 0px), 12px) clamp(26px, 7vw, 31px) 0
    clamp(11px, 3.6vw, 18px);
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
  background: linear-gradient(to left, #fff3d4, rgba(255, 243, 212, 0));
}
.deco-circle-1 {
  right: 29px;
}
.deco-circle-2 {
  right: 0;
}

/* 页面标题 @ (23,138) 32px 白 */
.page-title {
  position: relative;
  margin: clamp(20px, 4.2vh, 32px) clamp(18px, 5.9vw, 23px) clamp(16px, 3.2vh, 24px);
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(26px, 8.1vw, 32px);
  line-height: 1.22;
  color: #fff;
  z-index: 4;
}

/* 信息卡片 @ (22,211) 345×501 r23 */
.info-card {
  position: relative;
  margin: 0 clamp(18px, 5.6vw, 22px);
  min-height: clamp(420px, 58.8vh, 501px);
  border-radius: 23px;
  border: 1px solid #fff;
  background: linear-gradient(to top, #fffffa -51.3%, rgba(204, 204, 204, 0) 100%);
  display: flex;
  flex-direction: column;
  padding: clamp(28px, 5.4vh, 46px) clamp(16px, 5.9vw, 23px) clamp(24px, 4.2vh, 36px);
  box-sizing: border-box;
  z-index: 5;
}

.info-section {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  padding: clamp(8px, 1.6vh, 14px) 0;
}

.section-title {
  margin: 0 0 clamp(10px, 2vh, 18px) clamp(0px, 1.5vw, 5px);
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(20px, 6.1vw, 24px);
  line-height: 1.21;
  color: #fff;
}

.section-body {
  display: flex;
  align-items: stretch;
  gap: clamp(8px, 2.5vw, 10px);
}

.accent-bar {
  flex-shrink: 0;
  width: 7px;
  background: #ffecc4;
  border-radius: 1px;
}
.accent-bar-tall {
  min-height: 49px;
}
.accent-bar-wide {
  min-height: 54px;
}

.info-section:first-child .accent-bar-tall {
  min-height: 65px;
}

.section-content {
  flex: 1;
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(15px, 4.6vw, 18px);
  line-height: 1.22;
  color: #fff;
}

.divider-line {
  flex-shrink: 0;
  height: 1px;
  margin: clamp(6px, 1.2vh, 10px) clamp(0px, 3vw, 12px);
  background: #fff;
}

/* 按钮 @ (118,735) 156×36 r18 */
.register-btn {
  position: absolute;
  left: 50%;
  bottom: max(clamp(44px, 9.27vh, 79px), env(safe-area-inset-bottom, 0px));
  width: 156px;
  height: 36px;
  padding: 0;
  border: 0;
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
  pointer-events: auto;
  user-select: none;
  transform: translateX(-50%);
  z-index: 20;
}
.register-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(to top, #fff3d4 -35.2%, #0050b5 100%);
  z-index: -1;
}
.register-btn::after {
  content: "";
  position: absolute;
  left: -8px;
  right: -8px;
  top: -6px;
  bottom: -6px;
}
.register-btn:active::before {
  opacity: 0.85;
}

@media (max-height: 720px) {
  .page-title {
    margin-top: 16px;
    margin-bottom: 12px;
    font-size: 26px;
  }

  .info-card {
    min-height: 380px;
    padding-top: 24px;
    padding-bottom: 20px;
  }

  .info-section {
    padding: 6px 0;
  }

  .section-title {
    margin-bottom: 8px;
    font-size: 20px;
  }

  .accent-bar-tall {
    min-height: 42px;
  }

  .info-section:first-child .accent-bar-tall {
    min-height: 58px;
  }

  .accent-bar-wide {
    min-height: 46px;
  }

  .section-content {
    font-size: 15px;
    line-height: 1.32;
  }
}

</style>
