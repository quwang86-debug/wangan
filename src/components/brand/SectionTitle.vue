<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
  <div class="text-center">
    <h2 class="font-title text-[var(--fs-h2)] text-brand leading-tight">{{ title }}</h2>
    <p v-if="subtitle" class="mt-1 text-[var(--fs-sm)] text-ink/60">
      {{ subtitle }}
    </p>
  </div>
</template>
