<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { FACE_VERIFY_PLACEHOLDER_SRC } from "@/composables/useCanvasMerge";
import { useStudentStore } from "@/stores/student";
import { assetUrl } from "@/utils/asset";

type Phase = "preparing" | "align" | "scanning" | "success";

/** 环形进度条几何（与 SVG viewBox 一致） */
const RING_SIZE = 272;
const RING_STROKE = 3;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const router = useRouter();
const store = useStudentStore();

const placeholderPhoto = FACE_VERIFY_PLACEHOLDER_SRC;
const phase = ref<Phase>("preparing");
const scanProgress = ref(0);
const faceDetected = ref(false);

const statusText = computed(() => {
  if (phase.value === "success") return "验证成功";
  return "识别中";
});

const hintText = computed(() => {
  switch (phase.value) {
    case "preparing":
      return "识别准备中…";
    case "align":
      return "当前未识别到人脸";
    case "scanning":
      return faceDetected.value ? "正在核验身份信息…" : "当前未识别到人脸";
    case "success":
      return "身份核验已通过";
  }
});

const ringProgress = computed(() => {
  if (phase.value === "success") return 100;
  if (phase.value === "scanning") return scanProgress.value;
  if (phase.value === "align") return 12;
  return 0;
});

const ringDashOffset = computed(
  () => RING_CIRCUMFERENCE * (1 - ringProgress.value / 100),
);

const ringArcColor = computed(() =>
  phase.value === "success" ? "#52c41a" : "#1890ff",
);

let timers: number[] = [];
let progressTimer: number | undefined;

function schedule(ms: number, fn: () => void) {
  timers.push(window.setTimeout(fn, ms));
}

function clearTimers() {
  timers.forEach((t) => window.clearTimeout(t));
  timers = [];
  if (progressTimer !== undefined) {
    window.clearInterval(progressTimer);
    progressTimer = undefined;
  }
}

function finishVerify() {
  store.markVerified();
  router.replace({ name: "notice" });
}

onMounted(() => {
  schedule(600, () => {
    phase.value = "align";
  });

  schedule(1400, () => {
    phase.value = "scanning";
    scanProgress.value = 0;
    const startAt = Date.now();
    progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startAt;
      scanProgress.value = Math.min(100, Math.round((elapsed / 2200) * 100));
    }, 40);
  });

  schedule(2200, () => {
    faceDetected.value = true;
  });

  schedule(3600, () => {
    phase.value = "success";
    scanProgress.value = 100;
    if (progressTimer !== undefined) {
      window.clearInterval(progressTimer);
      progressTimer = undefined;
    }
  });

  schedule(4400, finishVerify);
});

onUnmounted(() => {
  clearTimers();
});
</script>

<template>
  <div class="face-page">
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

    <main class="face-content" aria-label="人脸识别">
      <section class="scan-stage">
        <div
          class="scan-ring-wrap"
          :class="{ 'scan-ring-wrap--success': phase === 'success' }"
        >
          <svg
            class="progress-ring"
            :viewBox="`0 0 ${RING_SIZE} ${RING_SIZE}`"
            aria-hidden="true"
          >
            <circle
              class="progress-track"
              :cx="RING_SIZE / 2"
              :cy="RING_SIZE / 2"
              :r="RING_RADIUS"
              fill="none"
              :stroke-width="RING_STROKE"
            />
            <circle
              class="progress-arc"
              :cx="RING_SIZE / 2"
              :cy="RING_SIZE / 2"
              :r="RING_RADIUS"
              fill="none"
              :stroke-width="RING_STROKE"
              stroke-linecap="round"
              :stroke="ringArcColor"
              :stroke-dasharray="RING_CIRCUMFERENCE"
              :stroke-dashoffset="ringDashOffset"
            />
          </svg>

          <div class="face-circle">
            <img
              class="face-photo"
              :src="placeholderPhoto"
              width="1024"
              height="1024"
              alt=""
              aria-hidden="true"
            />

            <div class="face-scan-frame" aria-hidden="true">
              <span class="corner corner-tl" />
              <span class="corner corner-tr" />
              <span class="corner corner-bl" />
              <span class="corner corner-br" />
            </div>

            <div v-if="phase === 'success'" class="success-overlay" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="rgba(82, 196, 26, 0.92)" />
                <path
                  d="M14 24.5l7 7 13-14"
                  stroke="#fff"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <h2 class="scan-title" :class="{ 'scan-title--success': phase === 'success' }">
          {{ statusText }}
        </h2>
        <p class="scan-subtitle">{{ hintText }}</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.face-page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 640px;
  overflow: hidden;
  background: var(--color-brand);
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

.face-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100% - clamp(72px, 12vh, 100px));
  margin-top: clamp(-20px, -3.5vh, -12px);
  padding: 0 24px;
  z-index: 5;
  box-sizing: border-box;
  transform: translateY(clamp(-16px, -3vh, -24px));
}

.scan-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* 正圆取景 + 外圈环形进度（参照设计稿） */
.scan-ring-wrap {
  position: relative;
  width: min(272px, 72vw);
  height: min(272px, 72vw);
  margin-bottom: clamp(28px, 5vh, 36px);
}

.progress-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  pointer-events: none;
}

.progress-track {
  stroke: rgba(255, 255, 255, 0.22);
}

.progress-arc {
  transition: stroke-dashoffset 0.08s linear, stroke 0.3s ease;
}

.face-circle {
  position: absolute;
  inset: 7px;
  border-radius: 50%;
  overflow: hidden;
  background: rgba(0, 40, 100, 0.35);
}

.face-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}

/* 圆内白色 L 形四角取景框 */
.face-scan-frame {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 56%;
  height: 56%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
}

.corner {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid #fff;
}
.corner-tl {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
}
.corner-tr {
  top: 0;
  right: 0;
  border-left: 0;
  border-bottom: 0;
}
.corner-bl {
  bottom: 0;
  left: 0;
  border-right: 0;
  border-top: 0;
}
.corner-br {
  bottom: 0;
  right: 0;
  border-left: 0;
  border-top: 0;
}

.success-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.28);
  z-index: 3;
}

.success-overlay svg {
  width: 56px;
  height: 56px;
  animation: success-pop 0.4s ease-out;
}

@keyframes success-pop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 圆下方状态文案 */
.scan-title {
  margin: 0 0 10px;
  font-family: var(--font-title);
  font-weight: 600;
  font-size: clamp(22px, 6.4vw, 26px);
  line-height: 1.3;
  color: #1890ff;
  text-align: center;
}

.scan-title--success {
  color: #52c41a;
}

.scan-subtitle {
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: clamp(14px, 3.7vw, 15px);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
}

@media (max-height: 720px) {
  .face-content {
    min-height: calc(100% - 88px);
    margin-top: -8px;
    transform: translateY(-12px);
  }

  .scan-ring-wrap {
    width: min(236px, 64vw);
    height: min(236px, 64vw);
    margin-bottom: 24px;
  }

  .scan-title {
    font-size: 22px;
  }
}
</style>
