import { storeToRefs } from "pinia";
import { useStudentStore } from "@/stores/student";
import { fileToDataUrl } from "@/utils/image";

/**
 * 读取选中的图片；默认写入 store.photoSource（合影页「更换照片」）。
 * 通知书首次选图请传 applyToStore: false，仅触发流程不替换占位图。
 */
export async function onPhotoFileChange(
  e: Event,
  options: { applyToStore?: boolean } = {},
): Promise<boolean> {
  const applyToStore = options.applyToStore ?? true;
  const { photoSource } = storeToRefs(useStudentStore());
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return false;
  const dataUrl = await fileToDataUrl(file);
  input.value = "";
  if (applyToStore) {
    photoSource.value = dataUrl;
  }
  return true;
}
