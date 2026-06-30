import { useRouter } from "vue-router";

/** 主流程步骤（不含过渡页 photo-loading） */
const ORDER = ["welcome", "verify", "notice", "photo", "register"] as const;
type FlowStep = (typeof ORDER)[number];
/** 含合影加载过渡页（仅通知书选图后进入，不参与 next 链） */
type StepName = FlowStep | "photo-loading";

export function useStepper() {
  const router = useRouter();

  function goto(name: StepName) {
    router.push({ name });
  }

  function next(current: FlowStep) {
    const i = ORDER.indexOf(current);
    if (i >= 0 && i < ORDER.length - 1) {
      router.push({ name: ORDER[i + 1] });
    }
  }

  return { goto, next };
}
