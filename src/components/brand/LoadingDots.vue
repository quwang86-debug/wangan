<script setup lang="ts"></script>

<template>
  <div class="flex items-center justify-center gap-2" aria-label="加载中">
    <span class="dot" />
    <span class="dot" style="animation-delay: 0.16s" />
    <span class="dot" style="animation-delay: 0.32s" />
  </div>
</template>

<style scoped>
.dot {
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: var(--color-brand);
  display: inline-block;
  animation: bounce 1s infinite ease-in-out;
}
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
