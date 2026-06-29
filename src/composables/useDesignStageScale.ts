import { onMounted, onUnmounted, ref, type MaybeRefOrGetter, toValue } from "vue";

/** 设计稿画板尺寸（与 tokens.css 一致） */
const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

/** 与 App.vue 手机壳断点一致：以下为真机全屏模式 */
const MOBILE_MEDIA = "(max-width: 479px)";

export type DesignStageScaleMode = "contain" | "cover" | "width";

/**
 * 移动端缩放设计稿舞台。
 * - contain：完整显示画板（min 比例），底部装饰不被裁切
 * - cover：铺满视口（max 比例），可能裁切
 * - width：按屏幕宽度贴满，移动端左右无留白
 * 桌面预览保持 scale=1。
 */
export function useDesignStageScale(mode: MaybeRefOrGetter<DesignStageScaleMode> = "contain") {
  const scale = ref(1);

  function update() {
    if (!window.matchMedia(MOBILE_MEDIA).matches) {
      scale.value = 1;
      return;
    }
    const vv = window.visualViewport;
    const w = vv?.width ?? window.innerWidth;
    const h = vv?.height ?? window.innerHeight;
    const widthRatio = w / DESIGN_WIDTH;
    const heightRatio = h / DESIGN_HEIGHT;
    const currentMode = toValue(mode);
    if (currentMode === "width") {
      scale.value = widthRatio;
      return;
    }
    scale.value = currentMode === "cover" ? Math.max(widthRatio, heightRatio) : Math.min(widthRatio, heightRatio);
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
