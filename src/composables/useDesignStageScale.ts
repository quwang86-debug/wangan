import { onMounted, onUnmounted, ref } from "vue";

/** 设计稿画板尺寸（与 tokens.css 一致） */
const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

/** 与 App.vue 手机壳断点一致：以下为真机全屏模式 */
const MOBILE_MEDIA = "(max-width: 479px)";

/**
 * 移动端按 cover 策略缩放设计稿舞台，铺满视口（宽/高取较大缩放比）。
 * 桌面预览保持 scale=1，由 App 手机壳居中展示。
 */
export function useDesignStageScale() {
  const scale = ref(1);

  function update() {
    if (!window.matchMedia(MOBILE_MEDIA).matches) {
      scale.value = 1;
      return;
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    scale.value = Math.max(w / DESIGN_WIDTH, h / DESIGN_HEIGHT);
  }

  onMounted(() => {
    update();
    window.addEventListener("resize", update, { passive: true });
    window.visualViewport?.addEventListener("resize", update);
    window.matchMedia(MOBILE_MEDIA).addEventListener("change", update);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", update);
    window.visualViewport?.removeEventListener("resize", update);
    window.matchMedia(MOBILE_MEDIA).removeEventListener("change", update);
  });

  return { scale };
}
