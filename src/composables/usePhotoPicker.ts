import { storeToRefs } from "pinia";
import { useStudentStore } from "@/stores/student";
import { fileToDataUrl } from "@/utils/image";

/**
 * 将选中的图片写入 store，供合影页拍立得展示。
 * 选图 UI 由 PhotoPickerInput 调起（移动端：照片图库 / 拍照 / 选取文件）。
 */
export async function onPhotoFileChange(e: Event): Promise<boolean> {
  const { photoSource } = storeToRefs(useStudentStore());
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return false;
  photoSource.value = await fileToDataUrl(file);
  input.value = "";
  return true;
}
