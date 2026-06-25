<script setup lang="ts">
withDefaults(
  defineProps<{
    time?: string;
    /** 文字与图标颜色，蓝底用 white，白底用 dark */
    tone?: "white" | "dark";
  }>(),
  {
    time: "9:41",
    tone: "white",
  },
);
</script>

<template>
  <div
    class="flex items-center justify-between h-11 px-5 text-[15px] font-mono"
    :class="tone === 'white' ? 'text-white' : 'text-[var(--color-text)]'"
  >
    <span class="font-semibold tracking-wide">{{ time }}</span>
    <!-- 信号 / Wifi / 电量 占位，落地替换为图标 -->
    <span class="flex items-center gap-1 text-[12px] opacity-90">
      <span>●●●●</span>
      <span>Wifi</span>
      <span>▮</span>
    </span>
  </div>
</template>
