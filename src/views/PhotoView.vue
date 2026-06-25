<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { POLAROID_WINDOW } from "@/composables/useCanvasMerge";
import { useStudentStore } from "@/stores/student";
import { useCanvasMerge } from "@/composables/useCanvasMerge";
import { useCamera } from "@/composables/useCamera";
import { fileToDataUrl, downloadDataUrl, shareImage } from "@/utils/image";
import { assetUrl } from "@/utils/asset";

const store = useStudentStore();
const { name, photoSource } = storeToRefs(store);
const { compose } = useCanvasMerge();
const camera = useCamera();

const fileInput = ref<HTMLInputElement | null>(null);
const videoEl = ref<HTMLVideoElement | null>(null);
const busy = ref(false);
const message = ref("");

async function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  photoSource.value = await fileToDataUrl(file);
}

async function onOpenCamera() {
  try {
    await camera.start(videoEl.value!);
  } catch {
    message.value = camera.error.value ?? "摄像头不可用";
  }
}

function onCapture() {
  if (!videoEl.value) return;
  photoSource.value = camera.capture(videoEl.value);
  camera.stop();
}

async function withComposite(fn: (dataUrl: string) => Promise<void> | void) {
  if (!photoSource.value) {
    message.value = "请先上传或拍摄一张照片";
    return;
  }
  busy.value = true;
  try {
    const dataUrl = await compose(photoSource.value);
    await fn(dataUrl);
  } finally {
    busy.value = false;
  }
}

function onDownload() {
  void withComposite((dataUrl) => downloadDataUrl(dataUrl, `网安合影-${name.value}.png`));
}

function onShare() {
  void withComposite(async (dataUrl) => {
    const r = await shareImage(dataUrl, `网安合影-${name.value}.png`, "我在网安等你");
    message.value = r === "shared" ? "已调起分享" : "已保存图片，可发布到朋友圈/小红书";
  });
}

const polaroidWinStyle = {
  top: `${POLAROID_WINDOW.top * 100}%`,
  left: `${POLAROID_WINDOW.left * 100}%`,
  width: `${POLAROID_WINDOW.width * 100}%`,
  height: `${POLAROID_WINDOW.height * 100}%`,
};
</script>

<template>
  <!-- 设计稿基准画板 393×852，所有元素按 spec 坐标 1:1 绝对定位 -->
  <div class="photo-stage">
    <!-- z1 全屏蓝底 -->
    <div class="bg-blue" />

    <!-- z2 矩形 4 @ (0,146) 425×721，渐变填充不透明度 0.6 -->
    <div class="bg-gradient-panel" />

    <!-- z3 底部装饰 @ (0,633) 390×218，填充不透明度 0.3 -->
    <img class="footer-deco" :src="assetUrl('assets/img/footer-deco.png')" alt="" />

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

    <!-- z6 标题区 @ (32,153) -->
    <h1 class="title">我在网安等你</h1>
    <p class="subtitle">{{ name || "X" }}同学·2026级新生</p>
    <img class="photo-badge" :src="assetUrl('assets/img/photo-badge.png')" alt="" />

    <!-- z7 波浪 @ (-176,1120) 393×118（设计稿位于画板下方，裁切不可见） -->
    <img class="wave-bottom" :src="assetUrl('assets/img/wave-bottom.png')" alt="" />

    <!-- z8 下载按钮 @ (35,756) 147×36 -->
    <button class="btn-download" type="button" :disabled="busy" @click="onDownload">
      下载合影图片
    </button>

    <!-- z9 分享按钮 @ (211,758) 147×35 -->
    <button class="btn-share" type="button" :disabled="busy" @click="onShare">
      分享到朋友圈/小红书
    </button>

    <!-- z10 卡片渐变 @ (36,301) 317×332 r15 -->
    <div class="card" />

    <!-- z11 拍立得相框 @ (-8,226) 416×546 -->
    <div class="polaroid">
      <!-- 照片白窗 / 摄像头预览 -->
      <div
        class="polaroid-photo"
        :style="polaroidWinStyle"
        @click="!camera.active.value && fileInput?.click()"
      >
        <img v-if="photoSource && !camera.active.value" :src="photoSource" alt="入学合影" />
        <video
          v-show="camera.active.value"
          ref="videoEl"
          playsinline
          muted
        />
      </div>
      <img class="polaroid-frame" :src="assetUrl('assets/img/polaroid.png')" alt="拍立得相框" />
    </div>

    <!-- 交互：上传 / 拍照（设计稿无对应图层，透明热区覆盖拍立得底部） -->
    <button
      class="hit-upload"
      type="button"
      aria-label="上传照片"
      @click="fileInput?.click()"
    />
    <button
      class="hit-camera"
      type="button"
      :aria-label="camera.active.value ? '拍照' : '使用摄像头'"
      @click="camera.active.value ? onCapture() : onOpenCamera()"
    />
    <input ref="fileInput" type="file" accept="image/*" hidden @change="onFileChange" />

    <p v-if="message" class="toast">{{ message }}</p>
  </div>
</template>

<style scoped>
/* 画板 393×852 */
.photo-stage {
  position: relative;
  width: var(--design-width);
  height: var(--design-height);
  margin: 0 auto;
  overflow: hidden;
  background: #fff;
}

/* z1 全屏蓝 #0050B5 */
.bg-blue {
  position: absolute;
  left: 0;
  top: 0;
  width: 393px;
  height: 852px;
  background: var(--color-brand);
  z-index: 1;
}

/* z2 矩形 4 @ (0,146) 425×721，from 底→顶 #DBD5C5→透明灰，填充不透明度 0.6 */
.bg-gradient-panel {
  position: absolute;
  left: 0;
  top: 146px;
  width: 425px;
  height: 721px;
  background: linear-gradient(to top, #dbd5c5, rgba(204, 204, 204, 0));
  opacity: 0.6;
  z-index: 2;
}

/* z3 底部装饰 @ (0,633) 390×218，填充不透明度 0.3 */
.footer-deco {
  position: absolute;
  left: 0;
  top: 633px;
  width: 390px;
  height: 218px;
  object-fit: cover;
  opacity: 0.3;
  z-index: 3;
}

/* z4 二进制文本 @ (25,97) 382×722，文源宋体 18px 白 15% 字距 15 */
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

/* z5 头部 */
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
  left: 33px;
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
.status-icons {
  position: absolute;
  left: 309px;
  top: 17px;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 5;
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

/* z6 标题区（分组 2 @ 32,153） */
.title {
  position: absolute;
  left: 32px;
  top: 160px;
  width: 198px;
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;
  color: #fff;
  z-index: 6;
}
.subtitle {
  position: absolute;
  left: 36px;
  top: 215px;
  width: 152px;
  margin: 0;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 2px;
  color: #fff;
  z-index: 6;
}
.photo-badge {
  position: absolute;
  left: 283px;
  top: 153px;
  width: 86px;
  height: 83px;
  object-fit: contain;
  z-index: 6;
}

/* z7 波浪（画板外，overflow hidden 裁切） */
.wave-bottom {
  position: absolute;
  left: -176px;
  top: 1120px;
  width: 393px;
  height: 118px;
  object-fit: cover;
  z-index: 7;
}

/* z8 下载按钮 @ (35,756) 147×36，底暖纸→顶蓝 渐变，填充不透明度 0.8，胶囊形 */
.btn-download {
  position: absolute;
  left: 35px;
  top: 756px;
  width: 147px;
  height: 36px;
  border: 0;
  padding: 0;
  border-radius: 18px;
  background: transparent;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 14px;
  line-height: 36px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  z-index: 8;
}
.btn-download::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(to top, #fff3d4, #0050b5);
  opacity: 0.8;
  z-index: -1;
}
.btn-download:disabled {
  cursor: not-allowed;
}
.btn-download:disabled::before {
  opacity: 0.5;
}

/* z9 分享按钮 @ (211,758) 147×35，渐变 + 图层不透明度 0.8，胶囊形 */
.btn-share {
  position: absolute;
  left: 211px;
  top: 758px;
  width: 147px;
  height: 35px;
  border: 0;
  padding: 0;
  border-radius: 17.5px;
  background: transparent;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 13px;
  line-height: 35px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  z-index: 9;
}
.btn-share::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(to top, #fff3d4, #0050b5);
  opacity: 0.8;
  z-index: -1;
}
.btn-share:disabled {
  cursor: not-allowed;
}
.btn-share:disabled::before {
  opacity: 0.5;
}

/* z10 卡片 @ (36,301) 317×332 r15 */
.card {
  position: absolute;
  left: 36px;
  top: 301px;
  width: 317px;
  height: 332px;
  border-radius: 15px;
  background: linear-gradient(
    to bottom,
    #a4cddb 0%,
    rgba(255, 255, 255, 0.69) 45.15%,
    #4283d4 100%
  );
  z-index: 10;
}

/* z11 拍立得 @ (-8,226) 416×546 */
.polaroid {
  position: absolute;
  left: -8px;
  top: 226px;
  width: 416px;
  height: 546px;
  overflow: hidden;
  z-index: 11;
}
.polaroid-photo {
  position: absolute;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
}
.polaroid-photo img,
.polaroid-photo video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.polaroid-frame {
  position: absolute;
  left: 0;
  top: 0;
  width: 416px;
  height: 546px;
  object-fit: contain;
  pointer-events: none;
}

/* 交互热区（透明，不影响视觉 1:1） */
.hit-upload {
  position: absolute;
  left: 36px;
  top: 680px;
  width: 155px;
  height: 36px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  z-index: 12;
}
.hit-camera {
  position: absolute;
  left: 200px;
  top: 680px;
  width: 155px;
  height: 36px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  z-index: 12;
}

/* 提示信息（设计稿无对应图层） */
.toast {
  position: absolute;
  left: 36px;
  top: 810px;
  width: 321px;
  margin: 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.9);
  z-index: 12;
}
</style>
