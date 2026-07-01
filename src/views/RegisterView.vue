<script setup lang="ts">
import { ref } from "vue";
import { assetUrl } from "@/utils/asset";

const showWecomCard = ref(false);

function openWecomCard() {
  showWecomCard.value = true;
}

function closeWecomCard() {
  showWecomCard.value = false;
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
      <div class="info-block info-block-wecom">
        <h2 class="section-title">新生注册</h2>
        <div class="section-body">
          <span class="accent-bar accent-bar-wecom" />
          <p class="section-content">
            2026年<br />即日起 — 8月15日18：00<br /><span class="single-line">添加校园企微客服完成新生注册</span>
          </p>
        </div>
      </div>

      <div class="info-block-group">
        <span class="divider-line divider-top" aria-hidden="true" />

        <div class="info-block info-block-arrival">
          <h2 class="section-title">到校报到</h2>
          <div class="section-body">
            <span class="accent-bar accent-bar-medium" />
            <p class="section-content">
              2026年<br />8月16日8：00 — 18：00
            </p>
          </div>
        </div>

        <span class="divider-line divider-middle" aria-hidden="true" />

        <div class="info-block info-block-location">
          <h2 class="section-title">报到地点</h2>
          <div class="section-body">
            <span class="accent-bar accent-bar-medium" />
            <p class="section-content">
              武汉市东西湖区网安大道 26 号网络空间安全学院基地校区
            </p>
          </div>
        </div>
      </div>
    </section>

    <button class="register-btn" type="button" @click="openWecomCard">添加企微客服</button>

    <Teleport to="body">
      <div
        v-if="showWecomCard"
        class="wecom-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wecom-card-title"
        @click.self="closeWecomCard"
      >
        <div class="wecom-card">
          <button class="wecom-card-close" type="button" aria-label="关闭" @click="closeWecomCard">
            ×
          </button>

          <div class="wecom-card-header">
            <div class="wecom-card-avatar" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="8" fill="#0050B5" />
                <circle cx="24" cy="19" r="8" fill="#fff" opacity="0.92" />
                <path
                  d="M10 40c0-7.732 6.268-14 14-14s14 6.268 14 14"
                  fill="#fff"
                  opacity="0.92"
                />
              </svg>
            </div>
            <div class="wecom-card-meta">
              <h3 id="wecom-card-title" class="wecom-card-name">校园企微客服</h3>
              <p class="wecom-card-org">@网络空间安全学院</p>
            </div>
          </div>

          <div class="wecom-card-qr-wrap">
            <svg class="wecom-card-qr" viewBox="0 0 120 120" aria-label="企微客服二维码">
              <rect width="120" height="120" fill="#fff" />
              <rect x="8" y="8" width="28" height="28" rx="2" fill="#111" />
              <rect x="12" y="12" width="20" height="20" rx="1" fill="#fff" />
              <rect x="16" y="16" width="12" height="12" fill="#111" />
              <rect x="84" y="8" width="28" height="28" rx="2" fill="#111" />
              <rect x="88" y="12" width="20" height="20" rx="1" fill="#fff" />
              <rect x="92" y="16" width="12" height="12" fill="#111" />
              <rect x="8" y="84" width="28" height="28" rx="2" fill="#111" />
              <rect x="12" y="88" width="20" height="20" rx="1" fill="#fff" />
              <rect x="16" y="92" width="12" height="12" fill="#111" />
              <rect x="44" y="8" width="8" height="8" fill="#111" />
              <rect x="60" y="8" width="8" height="8" fill="#111" />
              <rect x="44" y="24" width="8" height="8" fill="#111" />
              <rect x="52" y="44" width="8" height="8" fill="#111" />
              <rect x="68" y="44" width="8" height="8" fill="#111" />
              <rect x="44" y="60" width="8" height="8" fill="#111" />
              <rect x="60" y="68" width="8" height="8" fill="#111" />
              <rect x="76" y="60" width="8" height="8" fill="#111" />
              <rect x="44" y="84" width="8" height="8" fill="#111" />
              <rect x="60" y="92" width="8" height="8" fill="#111" />
              <rect x="84" y="44" width="8" height="8" fill="#111" />
              <rect x="100" y="52" width="8" height="8" fill="#111" />
              <rect x="92" y="68" width="8" height="8" fill="#111" />
              <rect x="84" y="84" width="8" height="8" fill="#111" />
              <rect x="100" y="84" width="8" height="8" fill="#111" />
              <rect x="92" y="100" width="8" height="8" fill="#111" />
              <rect x="108" y="92" width="4" height="4" fill="#111" />
            </svg>
          </div>

          <p class="wecom-card-tip">使用微信扫一扫添加或长按保存到本地</p>
        </div>
      </div>
    </Teleport>
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
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 68px);
  box-sizing: border-box;
}

.binary-backdrop {
  position: absolute;
  left: clamp(16px, 7.4vw, 29px);
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

.brand-header {
  position: relative;
  margin: max(env(safe-area-inset-top, 0px), 12px) clamp(26px, 7vw, 31px) 0
    clamp(11px, 2.8vw, 11px);
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

.page-title {
  position: relative;
  margin: clamp(32px, 5.6vh, 48px) 24px 16px;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(26px, 8.1vw, 32px);
  line-height: 1.22;
  color: #fff;
  z-index: 4;
}

.info-card {
  position: relative;
  margin: 0 24px;
  height: 543px;
  border-radius: 23px;
  border: 1px solid #fff;
  background: linear-gradient(to top, #fffffa -51.3%, rgba(204, 204, 204, 0) 100%);
  box-sizing: border-box;
  z-index: 5;
}

.info-block-wecom {
  position: absolute;
  left: 19px;
  top: 26px;
  right: 19px;
  width: auto;
}

.info-block-wecom .section-body {
  align-items: stretch;
}

.section-title {
  margin: 0 0 24px;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 24px;
  line-height: 1.21;
  color: #fff;
}

.info-block-location .section-title {
  margin-bottom: 27px;
}

.section-body {
  display: flex;
  align-items: flex-start;
  padding-left: 5px;
  gap: 10.5px;
}

.info-block-location .section-body {
  gap: 12px;
}

.accent-bar {
  flex-shrink: 0;
  width: 7px;
  background: #ffecc4;
}

.accent-bar-wecom {
  align-self: stretch;
  height: auto;
}

.accent-bar-medium {
  height: 43px;
}

.section-content {
  flex: 1;
  min-width: 0;
  margin: 1px 0 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 18px;
  line-height: 1.22;
  color: #fff;
}

.info-block-wecom .section-content {
  flex: 1 1 auto;
  width: auto;
}

.single-line {
  white-space: nowrap;
}

.info-block-group {
  position: absolute;
  left: 8px;
  top: 180px;
  width: 329px;
  height: 274px;
}

.info-block-arrival {
  position: absolute;
  left: 11px;
  top: 24px;
  width: 310px;
}

.info-block-location {
  position: absolute;
  left: 11px;
  top: 174px;
  width: 304px;
}

.divider-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: #fff;
}

.divider-top {
  top: 0;
}

.divider-middle {
  top: 148px;
}

.register-btn {
  position: absolute;
  left: 50%;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 24px);
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

.wecom-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.55);
  box-sizing: border-box;
}

.wecom-card {
  position: relative;
  width: min(100%, 300px);
  padding: 28px 24px 24px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
  box-sizing: border-box;
}

.wecom-card-close {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 22px;
  line-height: 28px;
  color: #999;
  cursor: pointer;
}

.wecom-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.wecom-card-avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
}

.wecom-card-avatar svg {
  display: block;
  width: 100%;
  height: 100%;
}

.wecom-card-meta {
  min-width: 0;
}

.wecom-card-name {
  margin: 0 0 4px;
  font-family: var(--font-title);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
  color: #111;
}

.wecom-card-org {
  margin: 0;
  font-family: var(--font-title);
  font-size: 13px;
  line-height: 1.3;
  color: #888;
}

.wecom-card-qr-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.wecom-card-qr {
  width: 160px;
  height: 160px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.wecom-card-tip {
  margin: 0;
  text-align: center;
  font-family: var(--font-title);
  font-size: 13px;
  line-height: 1.5;
  color: #666;
}

@media (max-height: 720px) {
  .page-title {
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 26px;
  }

  .info-card {
    height: 500px;
  }

  .info-block-wecom {
    top: 20px;
  }

  .info-block-group {
    top: 158px;
    height: 250px;
  }

  .info-block-arrival {
    top: 20px;
  }

  .info-block-location {
    top: 158px;
  }

  .divider-middle {
    top: 136px;
  }

  .section-title {
    margin-bottom: 20px;
    font-size: 20px;
  }

  .info-block-location .section-title {
    margin-bottom: 22px;
  }

  .accent-bar-medium {
    height: 38px;
  }

  .section-content {
    font-size: 16px;
    line-height: 1.32;
  }

  .register-btn {
    bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
  }
}

@media (min-width: 480px) {
  .register-btn {
    bottom: 53px;
  }
}
</style>
