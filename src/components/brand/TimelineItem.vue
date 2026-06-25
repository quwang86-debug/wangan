<script setup lang="ts">
defineProps<{
  title: string;
  content: string;
}>();
</script>

<template>
  <div class="flex gap-3">
    <span class="mt-1 w-[7px] shrink-0 rounded-full bg-brand" />
    <div>
      <h3 class="font-title text-[var(--fs-h3)] text-brand">{{ title }}</h3>
      <p class="mt-2 font-title text-[var(--fs-md)] text-ink whitespace-pre-line">
        {{ content }}
      </p>
    </div>
  </div>
</template>
