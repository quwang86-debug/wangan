import { assetUrl } from "@/utils/asset";

/** 运行时注入 @font-face，确保 GitHub Pages 子路径下字体 URL 正确 */
export function injectFonts(): void {
  const id = "app-font-faces";
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
@font-face {
  font-family: "AlimamaShuHeiTi";
  src: url("${assetUrl("assets/fonts/AlimamaShuHeiTi.woff2")}") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "WenYuanSerifSC";
  src: url("${assetUrl("assets/fonts/WenYuanSerifSC-Medium.subset.woff2")}") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "LXGWWenKai";
  src: url("${assetUrl("assets/fonts/LXGWWenKai-Regular.subset.woff2")}") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "AlibabaPuHuiTi";
  src: url("${assetUrl("assets/fonts/AlibabaPuHuiTi-Medium.subset.woff2")}") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "AlibabaPuHuiTi";
  src: url("${assetUrl("assets/fonts/AlibabaPuHuiTi-Regular.subset.woff2")}") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;
  document.head.appendChild(style);
}
