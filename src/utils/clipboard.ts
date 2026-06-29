/**
 * 复制文本到剪贴板。
 * 移动端 / 微信内置浏览器 / 局域网 HTTP 调试时 Clipboard API 常不可用，
 * 因此在用户手势内优先同步 execCommand，再回退 async Clipboard API。
 */
function copyWithExecCommand(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.cssText =
    "position:fixed;top:0;left:0;width:2em;height:2em;padding:0;border:none;outline:none;box-shadow:none;background:transparent;opacity:0;font-size:16px;";

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();

  // iOS Safari 需 setSelectionRange 才能选中
  try {
    textarea.setSelectionRange(0, text.length);
  } catch {
    // 部分环境不支持，忽略
  }

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }

  document.body.removeChild(textarea);
  return ok;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  const value = text.trim();
  if (!value) return false;

  // 保持在 click 同步栈内，兼容微信 / HTTP 调试
  if (copyWithExecCommand(value)) return true;

  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      return false;
    }
  }

  return false;
}
