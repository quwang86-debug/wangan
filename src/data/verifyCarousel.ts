/** 身份核验页轮播背景（393×852 裁切，源：大美校园/网安基地） */
export const VERIFY_CAROUSEL_SLIDES = [
  "06-circular-portrait",
  "05-circular-aerial",
  "03-campus-mid",
  "04-campus-topdown",
  "01-aerial-panorama",
  "02-sunset-panorama",
] as const;

export const VERIFY_CAROUSEL_BASE = "assets/img/verify-carousel";

export function verifyCarouselSrc(name: (typeof VERIFY_CAROUSEL_SLIDES)[number]): string {
  return `${VERIFY_CAROUSEL_BASE}/${name}.jpg`;
}

export function verifyCarouselSrcSet(name: (typeof VERIFY_CAROUSEL_SLIDES)[number]): string {
  const oneX = `${VERIFY_CAROUSEL_BASE}/${name}.jpg`;
  const twoX = `${VERIFY_CAROUSEL_BASE}/@2x/${name}.jpg`;
  return `${oneX} 1x, ${twoX} 2x`;
}
