<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useStudentStore } from "@/stores/student";
import { useCanvasMerge, preparePhotoForPolaroidWindow, POLAROID_PLACEHOLDER_SRC } from "@/composables/useCanvasMerge";
import { downloadDataUrl, shareImage } from "@/utils/image";
import { assetUrl } from "@/utils/asset";

const store = useStudentStore();
const { name } = storeToRefs(store);
const { compose } = useCanvasMerge();

const displayPhoto = ref<string>(POLAROID_PLACEHOLDER_SRC);
const busy = ref(false);

onMounted(() => {
  void preparePhotoForPolaroidWindow(POLAROID_PLACEHOLDER_SRC)
    .then((dataUrl) => {
      displayPhoto.value = dataUrl;
    })
    .catch(() => {
      displayPhoto.value = POLAROID_PLACEHOLDER_SRC;
    });
});

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

async function withComposite(fn: (dataUrl: string) => Promise<void> | void) {
  busy.value = true;
  try {
    const dataUrl = await compose(displayPhoto.value, { scale: 1, x: 0, y: 0 });
    await fn(dataUrl);
  } finally {
    busy.value = false;
  }
}

function onDownload() {
  void withComposite((dataUrl) => downloadDataUrl(dataUrl, `网安合影-${verifiedStudentName.value}.png`));
}

function onShare() {
  void withComposite(async (dataUrl) => {
    await shareImage(dataUrl, `网安合影-${verifiedStudentName.value}.png`, "我在网安等你");
  });
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
      <div class="photo-headline-row">
        <div class="photo-headline">
          <h1 class="title">我在网安等你</h1>
          <p class="subtitle">{{ subtitleLabel }}</p>
        </div>
        <img class="photo-badge" :src="assetUrl('assets/img/photo-badge.png')" alt="" />
      </div>

      <div class="polaroid-stage">
        <div class="card" aria-hidden="true" />

        <div class="polaroid-scaler">
          <div class="polaroid">
            <div class="polaroid-art">
              <div class="polaroid-photo" aria-label="合影照片">
                <img :src="displayPhoto" alt="入学合影" />
              </div>
              <img class="polaroid-frame" :src="assetUrl('assets/img/polaroid.png')" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div class="action-bar">
        <button class="btn-download" type="button" :disabled="busy" @click="onDownload">
          下载合影图片
        </button>
        <button class="btn-share" type="button" :disabled="busy" @click="onShare">
          分享到朋友圈/小红书
        </button>
      </div>
    </div>
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

/* 标题 + 副标题 + 右侧 logo：同行 flex，logo 与文字块垂直居中对齐 */
.photo-headline-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: clamp(6px, 1.8vw, 10px);
  margin: clamp(24px, 4vh, 36px) clamp(18px, 4.6vw, 24px) 0 clamp(18px, 8.1vw, 32px);
  z-index: 6;
}

.photo-headline {
  flex: 1;
  min-width: 0;
}

/* z6 标题区 @ (32,160) */
.title {
  position: relative;
  margin: 0;
  width: fit-content;
  max-width: 100%;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(26px, 8.1vw, 32px);
  line-height: 1.22;
  color: #fff;
}

.subtitle {
  position: relative;
  margin: clamp(8px, 1.2vh, 12px) 0 0 clamp(2px, 0.5vw, 4px);
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: clamp(12px, 3.6vw, 14px);
  line-height: 21px;
  letter-spacing: 2px;
  color: #fff;
  white-space: nowrap;
}

/* logo圆 @ (264.7,132) 121×118 — 与左侧标题区垂直居中 */
.photo-badge {
  position: relative;
  flex-shrink: 0;
  width: clamp(72px, 21.9vw, 86px);
  height: clamp(70px, 21.1vw, 83px);
  object-fit: contain;
  pointer-events: none;
}

/*
 * 拍立得 + 卡片：设计稿 @(-8,226) 416×546
 * 393 标准宽左偏 -8；更宽屏（如 Pro Max）自动水平居中，避免右侧大留白
 */
.polaroid-stage {
  position: relative;
  --polaroid-w: min(416px, calc(100% + 23px));
  width: var(--polaroid-w);
  max-width: 416px;
  aspect-ratio: 416 / 546;
  margin-top: 22px;
  margin-left: max(-8px, calc(50% - var(--polaroid-w) / 2));
  margin-right: auto;
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
  pointer-events: none;
  user-select: none;
  z-index: 1;
}

.polaroid-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
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

@media (max-height: 720px) {
  .photo-body {
    padding-top: 52px;
    padding-bottom: max(14px, env(safe-area-inset-bottom, 0px));
  }

  .photo-headline-row {
    margin-top: 20px;
  }

  .title {
    font-size: clamp(24px, 7.5vw, 28px);
  }

  .subtitle {
    margin-top: 6px;
  }

  .photo-badge {
    width: clamp(64px, 19vw, 76px);
    height: clamp(62px, 18.5vw, 74px);
  }

  .polaroid-stage {
    --polaroid-w: min(320px, calc(100% + 16px));
    width: var(--polaroid-w);
    max-width: 320px;
    margin-top: 16px;
    margin-left: max(-6px, calc(50% - var(--polaroid-w) / 2));
  }

  .action-bar {
    top: calc(100dvh - 120px);
  }
}

</style>
