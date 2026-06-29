<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "@/stores/student";
import { assetUrl } from "@/utils/asset";
import { copyToClipboard } from "@/utils/clipboard";

const REGISTER_URL = "https://admission.example.edu.cn/register";

const { studentNo } = storeToRefs(useStudentStore());
const copyTip = ref("");

let copyTimer: ReturnType<typeof setTimeout> | null = null;

function goRegister() {
  window.open(REGISTER_URL, "_blank", "noopener");
}

async function copyStudentNo() {
  if (copyTimer) clearTimeout(copyTimer);
  const ok = await copyToClipboard(studentNo.value);
  copyTip.value = ok ? "学号已复制" : "复制失败，请长按学号手动复制";
  copyTimer = setTimeout(() => {
    copyTip.value = "";
    copyTimer = null;
  }, 2500);
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
      <!-- 加入企微 @ card(19,26) -->
      <div class="info-block info-block-wecom">
        <h2 class="section-title">加入企微</h2>
        <div class="section-body">
          <span class="accent-bar accent-bar-wecom" />
          <p class="section-content">
            2026年<br />即日起 — 8月15日18：00<br />加入校园企微完成新生注册
          </p>
        </div>
      </div>

      <!-- 学号说明 @ card(41,164) 205×38 -->
      <div class="register-note">
        <p class="register-note-main">注：使用学号与身份证后6位进行注册登录</p>
        <p class="register-note-row">
          <span class="register-note-id">你的学号：{{ studentNo }}</span>
          <button class="copy-btn" type="button" @click="copyStudentNo">点击复制</button>
        </p>
        <p class="register-note-sub">如身份证号码最后一位为x需小写</p>
      </div>

      <!-- 到校报到 / 报到地点 @ card(8,232) -->
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

    <button class="register-btn" type="button" @click="goRegister">前往企微注册</button>

    <p v-if="copyTip" class="copy-tip">{{ copyTip }}</p>
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

/* 二进制底纹 @ (29,100) 382×722 */
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

/* 顶部品牌 @ logo (11,41) */
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

/* 页面标题 @ (24,135) 32px */
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

/* 信息卡片 @ (24,196) 345×543 r23 — 内部按设计稿绝对坐标 */
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
  width: 238.5px;
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

/* 竖线相对卡片 left:24 = 区块 left:19 + body padding-left:5 */
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
  height: 120px;
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

/* 设计稿正文框 216×65，需保证第三行「加入校园企微完成新生注册」不换行 */
.info-block-wecom .section-content {
  flex: 0 0 216px;
  width: 216px;
}

/* 学号说明 @ card(41,164) 205×38 */
.register-note {
  position: absolute;
  left: 41px;
  top: 164px;
  width: 205px;
}

.register-note-main {
  margin: 0 0 4px;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 11px;
  line-height: 1.27;
  color: #fff;
}

.register-note-row {
  position: relative;
  display: block;
  margin: 0 0 2px;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 9px;
  line-height: 1.44;
  color: #dbdbdb;
  white-space: nowrap;
}

.register-note-id {
  display: inline-block;
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
  user-select: text;
  -webkit-user-select: text;
}

.copy-btn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0 0 1px;
  border: 0;
  background: transparent;
  font: inherit;
  color: #dbdbdb;
  border-bottom: 0.5px solid #dbd5c8;
  cursor: pointer;
}

.copy-btn:active {
  opacity: 0.75;
}

.register-note-sub {
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 9px;
  line-height: 1.44;
  color: #dbdbdb;
}

/* 分组2 @ card(8,232) 329×274 */
.info-block-group {
  position: absolute;
  left: 8px;
  top: 232px;
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

/* 按钮 @ (112,763) 156×36 r18 — 移动端略靠下，PC 预览保持设计稿 53px */
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

.copy-tip {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 72px);
  margin: 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.92);
  z-index: 21;
  pointer-events: none;
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

  .register-note {
    top: 148px;
  }

  .info-block-group {
    top: 210px;
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

  .accent-bar-wecom {
    height: 100px;
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

/* PC 预览壳内按设计稿距底 53px */
@media (min-width: 480px) {
  .register-btn {
    bottom: 53px;
  }

  .copy-tip {
    bottom: 96px;
  }
}
</style>
