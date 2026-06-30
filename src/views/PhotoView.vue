<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "@/stores/student";
import { useCanvasMerge, preparePhotoForPolaroidWindow, POLAROID_PLACEHOLDER_SRC } from "@/composables/useCanvasMerge";
import PhotoPickerInput from "@/components/base/PhotoPickerInput.vue";
import { downloadDataUrl, shareImage } from "@/utils/image";
import { assetUrl } from "@/utils/asset";

const store = useStudentStore();
const { name, photoSource } = storeToRefs(store);
const { compose } = useCanvasMerge();
const photoPickerRef = ref<InstanceType<typeof PhotoPickerInput> | null>(null);

const photoFrame = ref<HTMLElement | null>(null);
const placeholderPhoto = ref<string | null>(null);
const busy = ref(false);
const message = ref("");
const UPLOAD_PROMPT = "请先上传或拍摄一张照片";

let messageTimer: ReturnType<typeof setTimeout> | null = null;

function clearMessageTimer() {
  if (messageTimer) {
    clearTimeout(messageTimer);
    messageTimer = null;
  }
}

function showMessage(text: string, autoHideMs?: number) {
  clearMessageTimer();
  message.value = text;
  if (autoHideMs && autoHideMs > 0) {
    messageTimer = setTimeout(() => {
      if (message.value === text) message.value = "";
      messageTimer = null;
    }, autoHideMs);
  }
}

watch(photoSource, (value, prev) => {
  if (value && value !== prev) {
    photoRatio.value = null;
    resetCrop();
    activePointers.clear();
  }
  if (value && message.value === UPLOAD_PROMPT) {
    message.value = "";
    clearMessageTimer();
  }
});

onUnmounted(clearMessageTimer);

onMounted(() => {
  void preparePhotoForPolaroidWindow(POLAROID_PLACEHOLDER_SRC)
    .then((dataUrl) => {
      placeholderPhoto.value = dataUrl;
    })
    .catch(() => {
      placeholderPhoto.value = null;
    });
});

const hasUserPhoto = computed(() => !!photoSource.value);
const displayPhoto = computed(() => photoSource.value ?? placeholderPhoto.value);

const cropScale = ref(1);
const cropX = ref(0);
const cropY = ref(0);
const photoRatio = ref<number | null>(null);

const MIN_CROP_SCALE = 1;
const MAX_CROP_SCALE = 3;
const PHOTO_WINDOW_RATIO = 1375 / 1369;
const activePointers = new Map<number, PointerEvent>();

let dragStartX = 0;
let dragStartY = 0;
let dragOriginX = 0;
let dragOriginY = 0;
let pinchStartDistance = 0;
let pinchStartScale = 1;

const verifiedStudentName = computed(() => {
  const n = name.value.trim();
  return n && n !== "新同学" ? n : "新同学";
});

/** 使用核验页填入的姓名；若姓名本身带“同学”，避免重复显示。 */
const subtitleLabel = computed(() => {
  let label = verifiedStudentName.value;
  if (label.endsWith("同学")) label = label.slice(0, -2);
  return `${label}同学·2026级新生`;
});

const cropTransform = computed(() => ({
  scale: cropScale.value,
  x: cropX.value,
  y: cropY.value,
}));

const photoStyle = computed(() => ({
  "--photo-scale": cropScale.value.toString(),
  "--photo-x": `${cropX.value * 100}%`,
  "--photo-y": `${cropY.value * 100}%`,
}));

function openChangePhotoPicker() {
  photoPickerRef.value?.openPhotoPicker();
}

async function withComposite(fn: (dataUrl: string) => Promise<void> | void) {
  const photo = displayPhoto.value;
  if (!photo) {
    showMessage(UPLOAD_PROMPT, 3000);
    return;
  }
  busy.value = true;
  try {
    const dataUrl = await compose(photo, hasUserPhoto.value ? cropTransform.value : { scale: 1, x: 0, y: 0 });
    await fn(dataUrl);
  } finally {
    busy.value = false;
  }
}

function onDownload() {
  void withComposite((dataUrl) => downloadDataUrl(dataUrl, `网安合影-${verifiedStudentName.value}.png`));
}

function isWeChatBrowser() {
  return /micromessenger/i.test(navigator.userAgent);
}

function isMobileBrowser() {
  return /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
}

function getShareFallbackMessage() {
  if (isWeChatBrowser()) {
    return "微信内无法直接发朋友圈图片，已尝试保存合影，请从相册发布";
  }
  if (isMobileBrowser()) {
    return "已保存合影，请打开微信/小红书从相册选择发布";
  }
  return "已下载合影，请发送到手机后发布到朋友圈/小红书";
}

function onShare() {
  void withComposite(async (dataUrl) => {
    const r = await shareImage(dataUrl, `网安合影-${verifiedStudentName.value}.png`, "我在网安等你");
    const text =
      r === "shared"
        ? "已调起系统分享，请选择微信/小红书等应用"
        : r === "cancelled"
          ? "已取消分享"
          : getShareFallbackMessage();
    showMessage(text, r === "cancelled" ? 2500 : 5000);
  });
}

function onPhotoLoad(e: Event) {
  if (!hasUserPhoto.value) return;
  const img = e.target as HTMLImageElement;
  photoRatio.value = img.naturalWidth / img.naturalHeight;
  clampCrop();
}

function resetCrop() {
  cropScale.value = 1;
  cropX.value = 0;
  cropY.value = 0;
}

function getCropBounds() {
  const imageRatio = photoRatio.value ?? PHOTO_WINDOW_RATIO;
  const baseWidth = imageRatio > PHOTO_WINDOW_RATIO ? imageRatio / PHOTO_WINDOW_RATIO : 1;
  const baseHeight = imageRatio > PHOTO_WINDOW_RATIO ? 1 : PHOTO_WINDOW_RATIO / imageRatio;
  return {
    x: Math.max(0, (baseWidth * cropScale.value - 1) / 2),
    y: Math.max(0, (baseHeight * cropScale.value - 1) / 2),
  };
}

function clampCrop() {
  cropScale.value = Math.min(MAX_CROP_SCALE, Math.max(MIN_CROP_SCALE, cropScale.value));
  const bounds = getCropBounds();
  cropX.value = Math.min(bounds.x, Math.max(-bounds.x, cropX.value));
  cropY.value = Math.min(bounds.y, Math.max(-bounds.y, cropY.value));
}

function setCropScale(value: number) {
  cropScale.value = value;
  clampCrop();
}

function adjustZoom(delta: number) {
  setCropScale(Number((cropScale.value + delta).toFixed(2)));
}

function distance(a: PointerEvent, b: PointerEvent) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function startSinglePointerDrag(pointer: PointerEvent) {
  dragStartX = pointer.clientX;
  dragStartY = pointer.clientY;
  dragOriginX = cropX.value;
  dragOriginY = cropY.value;
}

function onCropPointerDown(e: PointerEvent) {
  if (!hasUserPhoto.value) return;
  e.preventDefault();
  photoFrame.value?.setPointerCapture(e.pointerId);
  activePointers.set(e.pointerId, e);
  if (activePointers.size === 1) {
    startSinglePointerDrag(e);
  } else if (activePointers.size === 2) {
    const [a, b] = [...activePointers.values()];
    pinchStartDistance = distance(a, b);
    pinchStartScale = cropScale.value;
  }
}

function onCropPointerMove(e: PointerEvent) {
  if (!hasUserPhoto.value || !activePointers.has(e.pointerId)) return;
  e.preventDefault();
  activePointers.set(e.pointerId, e);
  if (activePointers.size >= 2) {
    const [a, b] = [...activePointers.values()];
    if (pinchStartDistance > 0) {
      setCropScale(pinchStartScale * (distance(a, b) / pinchStartDistance));
    }
    return;
  }

  const frame = photoFrame.value;
  if (!frame) return;
  cropX.value = dragOriginX + (e.clientX - dragStartX) / frame.clientWidth;
  cropY.value = dragOriginY + (e.clientY - dragStartY) / frame.clientHeight;
  clampCrop();
}

function onCropPointerEnd(e: PointerEvent) {
  if (!activePointers.has(e.pointerId)) return;
  activePointers.delete(e.pointerId);
  photoFrame.value?.releasePointerCapture(e.pointerId);
  if (activePointers.size === 1) {
    startSinglePointerDrag([...activePointers.values()][0]);
  }
}

function onCropWheel(e: WheelEvent) {
  if (!hasUserPhoto.value) return;
  e.preventDefault();
  adjustZoom(e.deltaY > 0 ? -0.08 : 0.08);
}
</script>

<template>
  <div class="photo-page">
    <div class="bg-gradient-panel" aria-hidden="true" />

    <img class="footer-deco" :src="assetUrl('assets/img/footer-deco.png')" alt="" />

    <p class="binary-text" aria-hidden="true">
      01101010 10011100 00110111 11000101 10100011 000111010 10 1 010 01 10 1010 0 001100 1010
      11100100 01011001 10001110 01110001 11010100 00101110 10110101 01001011 11110011 00111000
      10010110 01100111 000 001 1010 001100 0 100 001 001100 11001001 00001101 10111010 01010010
      11101100
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

    <div class="photo-body">
      <h1 class="title">我在网安等你</h1>
      <p class="subtitle">{{ subtitleLabel }}</p>
      <img class="photo-badge" :src="assetUrl('assets/img/photo-badge.png')" alt="" />

      <div class="polaroid-stage">
        <div class="card" aria-hidden="true" />

        <div class="polaroid-scaler">
          <div class="polaroid">
            <div class="polaroid-art">
              <div
                ref="photoFrame"
                class="polaroid-photo"
                :class="{ 'polaroid-photo--empty': !displayPhoto }"
                aria-label="合影照片"
                @pointerdown="onCropPointerDown"
                @pointermove="onCropPointerMove"
                @pointerup="onCropPointerEnd"
                @pointercancel="onCropPointerEnd"
                @wheel="onCropWheel"
              >
                <img
                  v-if="displayPhoto"
                  :src="displayPhoto"
                  :style="hasUserPhoto ? photoStyle : undefined"
                  alt="入学合影"
                  @load="onPhotoLoad"
                />
              </div>
              <img class="polaroid-frame" :src="assetUrl('assets/img/polaroid.png')" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="displayPhoto" class="crop-panel" aria-label="照片裁剪调整">
        <template v-if="hasUserPhoto">
          <p class="crop-hint">拖动调整位置，双指或滑块缩放</p>
          <div class="crop-controls">
            <button class="crop-btn" type="button" aria-label="缩小照片" @click="adjustZoom(-0.1)">
              -
            </button>
            <input
              v-model.number="cropScale"
              class="crop-range"
              type="range"
              :min="MIN_CROP_SCALE"
              :max="MAX_CROP_SCALE"
              step="0.01"
              aria-label="照片缩放"
              @input="clampCrop"
            />
            <button class="crop-btn" type="button" aria-label="放大照片" @click="adjustZoom(0.1)">
              +
            </button>
            <button class="change-photo-btn" type="button" @click="openChangePhotoPicker">更换照片</button>
          </div>
        </template>
        <template v-else>
          <p class="crop-hint crop-hint-placeholder">当前为默认展示，点击更换为你的照片</p>
          <div class="crop-controls crop-controls-placeholder">
            <button class="change-photo-btn change-photo-btn--solo" type="button" @click="openChangePhotoPicker">
              更换照片
            </button>
          </div>
        </template>
      </div>

      <div class="action-bar">
        <button class="btn-download" type="button" :disabled="busy" @click="onDownload">
          下载合影图片
        </button>
        <button class="btn-share" type="button" :disabled="busy" @click="onShare">
          分享到朋友圈/小红书
        </button>
      </div>

      <p v-if="message" class="toast" :class="{ 'toast-with-photo': displayPhoto }">
        {{ message }}
      </p>
    </div>

    <PhotoPickerInput ref="photoPickerRef" />
  </div>
</template>

<style scoped>
.photo-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 640px;
  overflow: hidden;
  background: var(--color-brand);
}

/* 顶部品牌：真实移动端安全区布局，不再保留设计稿假状态栏 */
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
}
.deco-circle-1 {
  right: 29px;
}
.deco-circle-2 {
  right: 0;
}

/* z2 矩形 4 @ (0,146) 425×721，from 底→顶 #DBD5C5→透明灰，填充不透明度 0.6 */
.bg-gradient-panel {
  position: absolute;
  left: 0;
  top: clamp(110px, 17.1vh, 146px);
  width: 100%;
  min-height: clamp(560px, 84.6vh, 721px);
  background: linear-gradient(to top, #dbd5c5, rgba(204, 204, 204, 0));
  opacity: 0.6;
  pointer-events: none;
  z-index: 2;
}

/* z3 底部装饰 @ (0,633) 390×218，填充不透明度 0.3 */
.footer-deco {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: clamp(176px, 25.6vh, 218px);
  object-fit: cover;
  opacity: 0.3;
  pointer-events: none;
  z-index: 3;
}

/* z4 二进制文本 @ (25,97) 382×722，文源宋体 18px 白 15% 字距 15 */
.binary-text {
  position: absolute;
  left: clamp(14px, 6.4vw, 25px);
  right: clamp(8px, 2.5vw, 14px);
  top: clamp(72px, 11.4vh, 97px);
  bottom: clamp(32px, 4.5vh, 48px);
  margin: 0;
  overflow: hidden;
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(14px, 4.6vw, 18px);
  line-height: 1.448;
  letter-spacing: clamp(8px, 3.8vw, 15px);
  color: rgba(255, 255, 255, 0.15);
  pointer-events: none;
  z-index: 4;
}

/* 主内容区：移动端流式布局，首屏可见拍立得主体 */
.photo-body {
  position: relative;
  z-index: 8;
  padding-top: clamp(56px, 8vh, 72px);
  padding-bottom: max(clamp(24px, 4vh, 36px), env(safe-area-inset-bottom, 0px));
}

/* z6 标题区 @ (32,160) */
.title {
  position: relative;
  margin: clamp(24px, 4vh, 36px) 0 0 clamp(18px, 8.1vw, 32px);
  width: fit-content;
  max-width: calc(100% - clamp(100px, 28vw, 120px));
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(26px, 8.1vw, 32px);
  line-height: 1.22;
  color: #fff;
  z-index: 6;
}

.subtitle {
  position: relative;
  margin: clamp(8px, 1.2vh, 12px) 0 0 clamp(20px, 9.2vw, 36px);
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(12px, 3.6vw, 14px);
  line-height: 21px;
  letter-spacing: 2px;
  color: #fff;
  white-space: nowrap;
  z-index: 6;
}

.photo-badge {
  position: absolute;
  right: clamp(18px, 4.6vw, 24px);
  top: clamp(48px, 6.5vh, 62px);
  width: clamp(72px, 21.9vw, 86px);
  height: clamp(70px, 21.1vw, 83px);
  object-fit: contain;
  pointer-events: none;
  z-index: 6;
}

/*
 * 拍立得 + 卡片：外层固定 416×546 宽高比，内部沿用 779×550 坐标系百分比定位，
 * 宽度随视口居中缩放，蒙版与白窗对齐关系不变。
 */
.polaroid-stage {
  position: relative;
  width: min(calc(100% - clamp(24px, 7%, 32px)), 416px);
  aspect-ratio: 416 / 546;
  margin: clamp(6px, 1.2vh, 10px) auto 0;
  z-index: 11;
}

/* z10 卡片 @ (36,301) 317×332 r15 — 相对 polaroid-stage 换算百分比 */
.card {
  position: absolute;
  left: calc(44 / 416 * 100%);
  top: calc(55 / 546 * 100%);
  width: calc(317 / 416 * 100%);
  height: calc(332 / 546 * 100%);
  border-radius: 15px;
  background: linear-gradient(
    to bottom,
    #a4cddb 0%,
    rgba(255, 255, 255, 0.69) 45.15%,
    #4283d4 100%
  );
  pointer-events: none;
  z-index: 10;
}

.polaroid-scaler {
  position: absolute;
  inset: 0;
  z-index: 11;
}

/* z11 拍立得 @ (-8,246) 416×546 */
.polaroid {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.polaroid-art {
  position: absolute;
  left: calc(-194 / 416 * 100%);
  top: calc(-27 / 546 * 100%);
  width: calc(779 / 416 * 100%);
  height: calc(550 / 546 * 100%);
}

.polaroid-photo {
  position: absolute;
  left: calc(1095 / 3508 * 100%);
  top: calc(383 / 2480 * 100%);
  width: calc(1375 / 3508 * 100%);
  height: calc(1369 / 2480 * 100%);
  overflow: hidden;
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
  touch-action: none;
  user-select: none;
  z-index: 1;
}

.polaroid-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  transform: translate(var(--photo-x, 0), var(--photo-y, 0)) scale(var(--photo-scale, 1));
  transform-origin: center;
  user-select: none;
}

.polaroid-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
  z-index: 2;
}

.crop-panel {
  position: absolute;
  left: 35px;
  right: 35px;
  top: 652px;
  margin: 0;
  z-index: 21;
  pointer-events: auto;
}

.crop-hint {
  margin: 0 0 4px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.86);
}

.crop-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.crop-btn,
.change-photo-btn {
  flex-shrink: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-family: var(--font-mono);
  cursor: pointer;
  pointer-events: auto;
}

.crop-btn {
  width: 26px;
  height: 26px;
  font-size: 18px;
  line-height: 26px;
}

.change-photo-btn {
  height: 26px;
  padding: 0 10px;
  font-size: 11px;
  line-height: 26px;
  white-space: nowrap;
}

.crop-controls-placeholder {
  justify-content: center;
}

.change-photo-btn--solo {
  min-width: 88px;
}

.crop-range {
  min-width: 0;
  flex: 1;
  accent-color: #fff3d4;
}

/* 底部按钮组 */
.action-bar {
  position: absolute;
  left: 35px;
  right: 35px;
  top: 720px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  margin: 0;
  z-index: 22;
  pointer-events: auto;
}

.btn-download,
.btn-share {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  background: transparent;
  text-align: center;
  font-family: var(--font-title);
  font-weight: 400;
  color: #fff;
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
  flex-shrink: 0;
}

.btn-download {
  width: 147px;
  height: 36px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 36px;
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

.btn-share {
  width: 147px;
  height: 35px;
  margin-top: 2px;
  border-radius: 17.5px;
  font-size: 13px;
  line-height: 35px;
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

.btn-download,
.btn-share {
  position: relative;
}

.btn-download:disabled,
.btn-share:disabled {
  cursor: not-allowed;
}

.btn-download:disabled::before,
.btn-share:disabled::before {
  opacity: 0.5;
}

.btn-download:active:not(:disabled)::before,
.btn-share:active:not(:disabled)::before {
  opacity: 0.65;
}

/* 提示信息 */
.toast {
  position: absolute;
  left: 35px;
  right: 35px;
  top: 690px;
  margin: 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.9);
  z-index: 23;
  pointer-events: none;
}

.toast-with-photo {
  top: 698px;
}

@media (max-height: 720px) {
  .photo-body {
    padding-top: 52px;
    padding-bottom: max(14px, env(safe-area-inset-bottom, 0px));
  }

  .title {
    margin-top: 20px;
    font-size: clamp(24px, 7.5vw, 28px);
  }

  .subtitle {
    margin-top: 6px;
  }

  .photo-badge {
    top: 40px;
    width: clamp(64px, 19vw, 76px);
    height: clamp(62px, 18.5vw, 74px);
  }

  .polaroid-stage {
    margin-top: 4px;
    width: min(calc(100% - 72px), 320px);
  }

  .crop-panel {
    top: calc(100dvh - 188px);
  }

  .action-bar {
    top: calc(100dvh - 120px);
  }

  .toast {
    top: calc(100dvh - 148px);
  }

  .toast-with-photo {
    top: calc(100dvh - 130px);
  }
}

</style>
