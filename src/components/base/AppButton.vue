<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "primary" | "secondary" | "light";
    block?: boolean;
    disabled?: boolean;
  }>(),
  {
    variant: "primary",
    block: false,
    disabled: false,
  },
);

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  light: "btn-light",
} as const;
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      variantClass[variant],
      block ? 'w-full' : '',
      disabled ? 'opacity-50 pointer-events-none' : '',
    ]"
  >
    <slot />
  </button>
</template>
