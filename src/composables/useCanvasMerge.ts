import { drawCover, loadImage } from "@/utils/image";
import { assetUrl } from "@/utils/asset";

/**
 * 合成用照片窗：按 polaroid.png 中间透明方框的真实像素换算。
 */
export const POLAROID_WINDOW = {
  left: 1095 / 3508,
  top: 383 / 2480,
  width: 1375 / 3508,
  height: 1369 / 2480,
} as const;

const FRAME_SRC = assetUrl("assets/img/polaroid.png");
export const POLAROID_PLACEHOLDER_SRC = assetUrl("assets/img/polaroid-placeholder.jpg");

export type PolaroidWindowSize = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/** 根据相框原图尺寸计算透明方框像素大小（默认 3508×2480 → 1375×1369） */
export function getPolaroidWindowSize(frameWidth: number, frameHeight: number): PolaroidWindowSize {
  return {
    left: POLAROID_WINDOW.left * frameWidth,
    top: POLAROID_WINDOW.top * frameHeight,
    width: POLAROID_WINDOW.width * frameWidth,
    height: POLAROID_WINDOW.height * frameHeight,
  };
}

/** 将照片 cover 裁剪到拍立得方框尺寸，供预览占位与合成使用 */
export async function preparePhotoForPolaroidWindow(photoSrc: string): Promise<string> {
  const [photo, frame] = await Promise.all([loadImage(photoSrc), loadImage(FRAME_SRC)]);
  const win = getPolaroidWindowSize(frame.naturalWidth, frame.naturalHeight);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(win.width);
  canvas.height = Math.round(win.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d context 不可用");
  drawCover(ctx, photo, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.92);
}

export type PhotoCropTransform = {
  scale: number;
  x: number;
  y: number;
};

function drawCoverWithTransform(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  transform: PhotoCropTransform,
) {
  const windowRatio = dw / dh;
  const imageRatio = img.naturalWidth / img.naturalHeight;
  const baseWidth = imageRatio > windowRatio ? dh * imageRatio : dw;
  const baseHeight = imageRatio > windowRatio ? dh : dw / imageRatio;
  const drawWidth = baseWidth * transform.scale;
  const drawHeight = baseHeight * transform.scale;
  const drawX = dx + (dw - drawWidth) / 2 + transform.x * dw;
  const drawY = dy + (dh - drawHeight) / 2 + transform.y * dh;

  ctx.save();
  ctx.beginPath();
  ctx.rect(dx, dy, dw, dh);
  ctx.clip();
  ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  ctx.restore();
}

/**
 * 合影合成：将用户照片按预览中的裁剪参数绘入相框白窗，再叠加相框。
 * 详见 docs/落地蓝本.md §6.5。
 */
export function useCanvasMerge() {
  async function compose(
    userPhoto: string,
    transform: PhotoCropTransform = { scale: 1, x: 0, y: 0 },
  ): Promise<string> {
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

    drawCoverWithTransform(ctx, photo, rx, ry, rw, rh, transform);
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/png");
  }

  return { compose };
}
