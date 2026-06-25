<script setup lang="ts">
import { computed } from "vue";
import StatusBar from "@/components/base/StatusBar.vue";
import { assetUrl } from "@/utils/asset";

const props = withDefaults(
  defineProps<{
    tone?: "white" | "dark";
  }>(),
  {
    tone: "white",
  },
);

// 蓝底用白色 logo，白底用蓝色 logo
const logoSrc = computed(() =>
  props.tone === "white"
    ? assetUrl("assets/img/logo-white.png")
    : assetUrl("assets/img/notice-logo.png"),
);
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
