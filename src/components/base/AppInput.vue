<script setup lang="ts">
defineProps<{
  label?: string;
  placeholder?: string;
  maxlength?: number;
}>();

const model = defineModel<string>({ default: "" });
</script>

<template>
  <label class="block">
    <span v-if="label" class="block text-[14px] font-title text-ink mb-2">
      {{ label }}
    </span>
    <input
      v-model="model"
      class="w-full h-11 px-3 text-[14px] rounded-[var(--radius-input)] border border-line bg-white"
      :placeholder="placeholder"
      :maxlength="maxlength"
    />
  </label>
</template>
