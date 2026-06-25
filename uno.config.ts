import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  presets: [presetWind3()],
  theme: {
    colors: {
      brand: {
        DEFAULT: "#0050B5",
        deep: "#0A4EA1",
        light: "#4379BB",
      },
      paper: {
        DEFAULT: "#FFF3D4",
        deep: "#FFECC4",
      },
      line: "#CCCCCC",
      ink: "#1A1A1A",
    },
    fontFamily: {
      title: "var(--font-title)",
      button: "var(--font-button)",
      serif: "var(--font-serif)",
      mono: "var(--font-mono)",
    },
  },
  shortcuts: {
    // 主按钮（胶囊形蓝底白字，用于白底表面）
    "btn-primary":
      "inline-flex items-center justify-center h-11 px-6 rounded-[22px] bg-brand text-white font-button text-[16px] border-0 cursor-pointer select-none active:opacity-80",
    // 次按钮（白底蓝字描边）
    "btn-secondary":
      "inline-flex items-center justify-center h-11 px-5 rounded-[22px] bg-white text-brand font-button text-[14px] border border-brand cursor-pointer select-none active:opacity-80",
    // 浅色主按钮（白底蓝字实心，用于蓝色背景表面）
    "btn-light":
      "inline-flex items-center justify-center h-11 px-6 rounded-[22px] bg-white text-brand font-button text-[16px] border-0 cursor-pointer select-none active:opacity-80",
    // 页面容器
    "page-shell":
      "relative w-full min-h-full mx-auto overflow-hidden bg-white",
  },
});
