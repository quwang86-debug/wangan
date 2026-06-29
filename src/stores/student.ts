import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 学生信息与流程状态
 * 真实数据来源见 docs/落地蓝本.md §8（GET /api/student）
 */
export const useStudentStore = defineStore("student", () => {
  const name = ref("新同学");
  const idCard = ref("");
  /** 学号（演示默认与通知书一致，真实数据见 GET /api/student） */
  const studentNo = ref("202601001");
  const verified = ref(false);

  /** 用户选择/拍摄的原始照片 dataURL（用于相框预览与合成） */
  const photoSource = ref<string | null>(null);

  function setProfile(payload: { name?: string; idCard?: string; studentNo?: string }) {
    if (payload.name) name.value = payload.name;
    if (payload.idCard) idCard.value = payload.idCard;
    if (payload.studentNo) studentNo.value = payload.studentNo;
  }

  function markVerified() {
    verified.value = true;
  }

  function reset() {
    name.value = "新同学";
    idCard.value = "";
    studentNo.value = "202601001";
    verified.value = false;
    photoSource.value = null;
  }

  return { name, idCard, studentNo, verified, photoSource, setProfile, markVerified, reset };
});
