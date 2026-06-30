<script setup lang="ts">
import { ref } from "vue";
import { onPhotoFileChange } from "@/composables/usePhotoPicker";

const props = withDefaults(
  defineProps<{
    /** 为 false 时仅触发 picked，不写入 store（通知书首次选图进合影页仍显示占位图） */
    applyToStore?: boolean;
  }>(),
  { applyToStore: true },
);

const emit = defineEmits<{
  picked: [];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

function openPhotoPicker() {
  fileInput.value?.click();
}

async function onChange(e: Event) {
  if (await onPhotoFileChange(e, { applyToStore: props.applyToStore })) emit("picked");
}

defineExpose({ openPhotoPicker });
</script>

<template>
  <input
    ref="fileInput"
    type="file"
    accept="image/*"
    hidden
    aria-hidden="true"
    @change="onChange"
  />
</template>
