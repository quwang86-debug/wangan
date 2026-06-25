import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 学生信息与流程状态
 * 真实数据来源见 docs/落地蓝本.md §8（GET /api/student）
 */
export const useStudentStore = defineStore("student", () => {
  const name = ref("新同学");
  const idCard = ref("");
  const verified = ref(false);

  /** 用户选择/拍摄的原始照片 dataURL（用于相框预览与合成） */
  const photoSource = ref<string | null>(null);

  function setProfile(payload: { name?: string; idCard?: string }) {
    if (payload.name) name.value = payload.name;
    if (payload.idCard) idCard.value = payload.idCard;
  }

  function markVerified() {
    verified.value = true;
  }

  function reset() {
    name.value = "新同学";
    idCard.value = "";
    verified.value = false;
    photoSource.value = null;
  }

  return { name, idCard, verified, photoSource, setProfile, markVerified, reset };
});
