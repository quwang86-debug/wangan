<script setup lang="ts">
import { ref } from "vue";
import { onPhotoFileChange } from "@/composables/usePhotoPicker";

const emit = defineEmits<{
  picked: [];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

function openPhotoPicker() {
  fileInput.value?.click();
}

async function onChange(e: Event) {
  if (await onPhotoFileChange(e)) emit("picked");
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
