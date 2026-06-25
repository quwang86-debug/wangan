<script setup lang="ts">
/**
 * 二进制数字流装饰底纹（贯穿全站）。
 * 半透明铺在背景层，z 轴在内容之下。
 */
const lines = Array.from({ length: 24 }, () =>
  Array.from({ length: 40 }, () => (Math.random() > 0.5 ? "1" : "0")).join(" "),
);
</script>

<template>
  <div
    aria-hidden="true"
    class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
  >
    <p
      v-for="(line, i) in lines"
      :key="i"
      class="font-serif text-[18px] leading-[2] whitespace-nowrap text-white/10"
    >
      {{ line }}
    </p>
  </div>
</template>
