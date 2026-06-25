import { onUnmounted, ref } from "vue";

/**
 * 摄像头拍照能力（前置优先）。
 * 仅在 HTTPS / localhost 下可调起摄像头。
 */
export function useCamera() {
  const stream = ref<MediaStream | null>(null);
  const active = ref(false);
  const error = ref<string | null>(null);

  async function start(video: HTMLVideoElement) {
    error.value = null;
    try {
      stream.value = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      video.srcObject = stream.value;
      await video.play();
      active.value = true;
    } catch (e) {
      error.value = "无法访问摄像头，请检查权限或改用上传照片。";
      throw e;
    }
  }

  function capture(video: HTMLVideoElement): string {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas 2d context 不可用");
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.92);
  }

  function stop() {
    stream.value?.getTracks().forEach((t) => t.stop());
    stream.value = null;
    active.value = false;
  }

  onUnmounted(stop);

  return { active, error, start, capture, stop };
}
