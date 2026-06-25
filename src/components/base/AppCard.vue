<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: "white" | "paper";
    shadow?: boolean;
  }>(),
  {
    tone: "white",
    shadow: true,
  },
);
</script>

<template>
  <div
    class="rounded-[var(--radius-card)] p-4"
    :class="[
      tone === 'paper' ? 'bg-paper' : 'bg-white',
      shadow ? 'shadow-[var(--shadow-card)]' : '',
    ]"
  >
    <slot />
  </div>
</template>
