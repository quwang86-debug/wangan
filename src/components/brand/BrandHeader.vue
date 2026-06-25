<script setup lang="ts">
import StatusBar from "@/components/base/StatusBar.vue";

const props = withDefaults(
  defineProps<{
    tone?: "white" | "dark";
  }>(),
  {
    tone: "white",
  },
);

// 蓝底用白色 logo，白底用蓝色 logo
const logoSrc =
  props.tone === "white" ? "/assets/img/logo-white.png" : "/assets/img/notice-logo.png";
</script>

<template>
  <header class="relative z-10">
    <StatusBar :tone="tone" />
    <div class="flex items-center justify-between px-5 h-12">
      <img :src="logoSrc" alt="网络空间安全学院" class="h-7 w-auto" />
      <div class="flex gap-2">
        <span
          class="w-[18px] h-[18px] rounded-full"
          :class="tone === 'white' ? 'bg-white/30' : 'bg-brand/15'"
        />
        <span
          class="w-[18px] h-[18px] rounded-full"
          :class="tone === 'white' ? 'bg-white/30' : 'bg-brand/15'"
        />
      </div>
    </div>
  </header>
</template>
