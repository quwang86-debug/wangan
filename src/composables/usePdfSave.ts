import { loadImage } from "@/utils/image";
import { assetUrl } from "@/utils/asset";

/** 套打字段相对通知书原图 (2480×3508) 的位置，与 NoticeView 预览一致 */
export const NOTICE_PAPER_FIELDS = {
  studentNo: {
    left: 0.6863,
    top: 0.383,
    fontRatio: 0.02521,
    fontFamily: '"SourceHanSansCN", "Source Han Sans SC", sans-serif',
    align: "left" as CanvasTextAlign,
  },
  studentName: {
    left: 0.2369,
    top: 0.4099,
    fontRatio: 0.033613,
    fontFamily: '"STKaiti", "Kaiti SC", "KaiTi", "LXGWWenKai", serif',
    align: "center" as CanvasTextAlign,
  },
  college: {
    left: 0.6363,
    top: 0.4812,
    fontRatio: 0.033613,
    fontFamily: '"STKaiti", "Kaiti SC", "KaiTi", "LXGWWenKai", serif',
    align: "center" as CanvasTextAlign,
  },
  major: {
    left: 0.4722,
    top: 0.5149,
    fontRatio: 0.033613,
    fontFamily: '"STKaiti", "Kaiti SC", "KaiTi", "LXGWWenKai", serif',
    align: "center" as CanvasTextAlign,
  },
} as const;

export type NoticePaperOverlay = {
  studentNo: string;
  studentName: string;
  college: string;
  major: string;
};

const PAPER_SRC = assetUrl("assets/img/notice-paper.jpg");

function drawPaperField(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  text: string,
  field: (typeof NOTICE_PAPER_FIELDS)[keyof typeof NOTICE_PAPER_FIELDS],
) {
  if (!text) return;
  const fontSize = width * field.fontRatio;
  ctx.font = `400 ${fontSize}px ${field.fontFamily}`;
  ctx.fillStyle = "#000";
  ctx.textAlign = field.align;
  ctx.textBaseline = "top";
  ctx.fillText(text, field.left * width, field.top * height);
}

/**
 * 通知书保存：背景图 + 套打字段合成 PNG，供展示与长按保存。
 */
export function usePdfSave() {
  async function compose(overlay: NoticePaperOverlay): Promise<string> {
    // 主动加载套打用 webfont（非苹果设备无系统楷体时的回退），确保 canvas 绘制前就绪
    if (document.fonts?.load) {
      try {
        await Promise.all([
          document.fonts.load('400 32px "LXGWWenKai"'),
          document.fonts.load('400 32px "SourceHanSansCN"'),
        ]);
      } catch {
        /* 忽略字体加载失败，使用回退字体 */
      }
    }
    if (document.fonts?.ready) await document.fonts.ready;

    const paper = await loadImage(PAPER_SRC);
    const canvas = document.createElement("canvas");
    canvas.width = paper.naturalWidth;
    canvas.height = paper.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas 2d context 不可用");

    ctx.drawImage(paper, 0, 0);
    drawPaperField(ctx, canvas.width, canvas.height, overlay.studentNo, NOTICE_PAPER_FIELDS.studentNo);
    drawPaperField(
      ctx,
      canvas.width,
      canvas.height,
      overlay.studentName,
      NOTICE_PAPER_FIELDS.studentName,
    );
    drawPaperField(ctx, canvas.width, canvas.height, overlay.college, NOTICE_PAPER_FIELDS.college);
    drawPaperField(ctx, canvas.width, canvas.height, overlay.major, NOTICE_PAPER_FIELDS.major);

    return canvas.toDataURL("image/jpeg", 0.92);
  }

  return { compose };
}
