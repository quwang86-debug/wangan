import { loadImage, downloadDataUrl } from "@/utils/image";
import { assetUrl } from "@/utils/asset";

/**
 * 通知书姓名套打层（相对证书图的百分比），与 NoticeView 预览保持一致。
 * 可对照设计稿精调。
 */
export const NOTICE_NAME_POS = {
  top: 0.398,
  left: 0.225,
  fontRatio: 0.042, // 字号相对证书图宽度
};

const PAPER_SRC = assetUrl("assets/img/notice-paper.jpg");

/**
 * 通知书保存：把姓名合成进证书图，导出可下载/长按保存的 PNG。
 * 详见 docs/落地蓝本.md §6.3。
 */
export function usePdfSave() {
  /** 返回证书原图 dataURL（暂不套打姓名） */
  async function compose(_name?: string): Promise<string> {
    const paper = await loadImage(PAPER_SRC);
    const canvas = document.createElement("canvas");
    canvas.width = paper.naturalWidth;
    canvas.height = paper.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas 2d context 不可用");

    ctx.drawImage(paper, 0, 0);
    return canvas.toDataURL("image/png");
  }

  async function save(name: string) {
    const dataUrl = await compose(name);
    downloadDataUrl(dataUrl, `录取通知书-${name}.png`);
  }

  return { compose, save };
}
