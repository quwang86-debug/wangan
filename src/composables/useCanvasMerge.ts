import { loadImage, drawCover } from "@/utils/image";

/**
 * 拍立得相框照片白窗（相对相框图的百分比）。
 * PolaroidFrame 预览与合成共用同一组坐标，确保所见即所得。
 * 可对照设计稿精调。
 */
export const POLAROID_WINDOW = {
  top: 0.17,
  left: 0.29,
  width: 0.44,
  height: 0.53,
};

const FRAME_SRC = "/assets/img/polaroid.png";

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
