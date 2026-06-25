/** public/ 下静态资源路径，自动带上 Vite base（GitHub Pages 为 /wangan/） */
export function assetUrl(path: string): string {
  const normalized = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
