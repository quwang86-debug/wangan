import { useRouter } from "vue-router";

/** 流程跳转辅助（按蓝本 §6 的页面顺序） */
const ORDER = ["welcome", "verify", "notice", "photo-loading", "photo", "register"] as const;
type StepName = (typeof ORDER)[number];

export function useStepper() {
  const router = useRouter();

  function goto(name: StepName) {
    router.push({ name });
  }

  function next(current: StepName) {
    const i = ORDER.indexOf(current);
    if (i >= 0 && i < ORDER.length - 1) {
      router.push({ name: ORDER[i + 1] });
    }
  }

  return { goto, next };
}
