import { loadImage, drawCover } from "@/utils/image";
import { assetUrl } from "@/utils/asset";

/**
 * 合成用白窗：相对 polaroid.png 自然像素（3508×2480）的百分比。
 */
export const POLAROID_WINDOW = {
  left: 939 / 3508,
  top: 166 / 2480,
  width: 1694 / 3508,
  height: 2088 / 2480,
} as const;

const FRAME_SRC = assetUrl("assets/img/polaroid.png");

/**
 * 合影合成：将用户照片以 cover 方式绘入相框白窗，再叠加相框。
 * 详见 docs/落地蓝本.md §6.5。
 */
export function useCanvasMerge() {
  async function compose(userPhoto: string): Promise<string> {
    const [photo, frame] = await Promise.all([loadImage(userPhoto), loadImage(FRAME_SRC)]);

    const canvas = document.createElement("canvas");
    canvas.width = frame.naturalWidth;
    canvas.height = frame.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas 2d context 不可用");

    const rx = POLAROID_WINDOW.left * canvas.width;
    const ry = POLAROID_WINDOW.top * canvas.height;
    const rw = POLAROID_WINDOW.width * canvas.width;
    const rh = POLAROID_WINDOW.height * canvas.height;

    drawCover(ctx, photo, rx, ry, rw, rh);
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/png");
  }

  return { compose };
}
