<script setup lang="ts">
import { useStepper } from "@/composables/useStepper";
import { assetUrl } from "@/utils/asset";

const { goto } = useStepper();

const noticeImg = assetUrl("assets/img/notice-paper.jpg");
const noticeBg = assetUrl("assets/img/notice-bg.png");
const noticeLogo = assetUrl("assets/img/notice-logo.png");
</script>

<template>
  <!-- 设计稿基准画板 393×852，所有元素按设计稿坐标 1:1 绝对定位 -->
  <div class="notice-stage">
    <!-- z1 全屏蓝底 #0050B5 -->
    <div class="bg-fill" />

    <!-- z2 整屏背景图 @(-476,0) 1386×852 -->
    <img class="notice-bg" :src="noticeBg" alt="" />

    <!-- z3 z4 顶部右侧渐隐圆（本页渐变方向与欢迎页相反） -->
    <span class="deco-circle deco-circle-1" />
    <span class="deco-circle deco-circle-2" />

    <!-- z5 状态栏 -->
    <span class="status-time">9:41</span>
    <span class="status-icons">
      <svg class="ico-cellular" viewBox="0 0 17 11" fill="#fff" aria-hidden="true">
        <rect x="0" y="7" width="3" height="4" rx="0.5" />
        <rect x="4.5" y="4" width="3" height="7" rx="0.5" />
        <rect x="9" y="2" width="3" height="9" rx="0.5" />
        <rect x="14" y="0" width="3" height="11" rx="0.5" />
      </svg>
      <svg class="ico-wifi" viewBox="0 0 15 11" fill="#fff" aria-hidden="true">
        <path
          d="M7.5 0C11 0 13.9 1.2 15 2.3l-1.5 1.6C12.6 3 10.2 2.1 7.5 2.1S2.4 3 1.5 3.9L0 2.3C1.1 1.2 4 0 7.5 0Z"
        />
        <path
          d="M7.5 4.2c2.1 0 4 .8 4.8 1.6L10.8 7.4C10.2 6.8 9 6.3 7.5 6.3S4.8 6.8 4.2 7.4L2.7 5.8C3.5 5 5.4 4.2 7.5 4.2Z"
        />
        <path d="M7.5 8.2c.9 0 1.7.4 2.1.9L7.5 11 5.4 9.1c.4-.5 1.2-.9 2.1-.9Z" />
      </svg>
      <svg class="ico-battery" viewBox="0 0 24 11" aria-hidden="true">
        <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" fill="none" stroke="#fff" opacity="0.35" />
        <rect x="2" y="2" width="18" height="7" rx="1.5" fill="#fff" />
        <rect x="23" y="4" width="1" height="4" rx="0.5" fill="#fff" opacity="0.4" />
      </svg>
    </span>

    <!-- z6 通知书蓝 logo @(18,47) 199×40 -->
    <img class="notice-logo" :src="noticeLogo" alt="网络空间安全学院" />

    <!-- z7 通知书内页 @(18,139) 357×502，蒙版裁切 -->
    <div class="notice-paper-wrap">
      <img :src="noticeImg" alt="录取通知书" class="notice-paper" />
    </div>

    <!-- z8 生成合影按钮 @(18,707) 158×34 -->
    <button class="btn-photo" type="button" @click="goto('photo-loading')">生成合影</button>

    <!-- z9 长按保存提示 @(273,624) 102×21 -->
    <p class="save-tip">*长按保存通知书</p>

    <!-- z10 查看报道说明按钮 @(221,709) 154.1×30 -->
    <button class="btn-register" type="button" @click="goto('register')">查看报道说明</button>
  </div>
</template>

<style scoped>
/* 画板：393×852，蓝底铺满（对应设计稿 矩形4 #0050B5） */
.notice-stage {
  position: relative;
  width: var(--design-width);
  height: var(--design-height);
  margin: 0 auto;
  background: #0050b5;
  overflow: hidden;
}

/* z1 全屏蓝底 */
.bg-fill {
  position: absolute;
  left: 0;
  top: 0;
  width: 393px;
  height: 852px;
  background: #0050b5;
  z-index: 1;
}

/* z2 背景装饰图 @(-476,0) 1386×852 */
.notice-bg {
  position: absolute;
  left: -476px;
  top: 0;
  width: 1386px;
  height: 852px;
  object-fit: cover;
  z-index: 2;
}

/* z3 z4 顶部渐隐圆 22×22 @ (311,53)(340,53)
   圆形1: from{0,0.5}->to{1,0.5} 左透→右 #0050B5
   圆形2: from{1,0.5}->to{0,0.5} 右 #0050B5→左透 */
.deco-circle {
  position: absolute;
  top: 53px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
}
.deco-circle-1 {
  left: 311px;
  background: linear-gradient(to right, rgba(255, 243, 212, 0), #0050b5);
  z-index: 3;
}
.deco-circle-2 {
  left: 340px;
  background: linear-gradient(to left, #0050b5, rgba(255, 243, 212, 0));
  z-index: 4;
}

/* z5 状态栏（编组4 @(9,0)，时间/图标绝对坐标与欢迎页一致） */
.status-time {
  position: absolute;
  left: 18px;
  top: 12px;
  width: 54px;
  text-align: center;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #fff;
  z-index: 5;
}
.status-icons {
  position: absolute;
  right: 24px;
  top: 17px;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 5;
}
.ico-cellular {
  width: 17px;
  height: 11px;
}
.ico-wifi {
  width: 15px;
  height: 11px;
}
.ico-battery {
  width: 24px;
  height: 11px;
}

/* z6 通知书蓝 logo @(18,47) 199×40 */
.notice-logo {
  position: absolute;
  left: 18px;
  top: 47px;
  width: 199px;
  height: 40px;
  object-fit: contain;
  z-index: 6;
}

/* z7 通知书内页 @(18,139) 357×502，蒙版裁切；内图 @(0.8,0) 355.6×503 */
.notice-paper-wrap {
  position: absolute;
  left: 18px;
  top: 139px;
  width: 357px;
  height: 502px;
  overflow: hidden;
  z-index: 7;
}
.notice-paper {
  position: absolute;
  left: 0.8px;
  top: 0;
  width: 355.6px;
  height: 503px;
  object-fit: cover;
  -webkit-touch-callout: default;
  user-select: none;
}

/* z8 生成合影 @(18,707) 158×34，文字 @(49,713) 96×17 */
.btn-photo {
  position: absolute;
  left: 18px;
  top: 707px;
  width: 158px;
  height: 34px;
  margin: 0;
  padding: 0;
  border: 0;
  /* 设计稿按钮为胶囊形（路径左右端半圆，半径=高度一半=17px） */
  border-radius: 17px;
  box-sizing: border-box;
  background: #0a4ea1;
  font-family: var(--font-button);
  font-weight: 500;
  font-size: 16px;
  line-height: 34px;
  letter-spacing: 2px;
  text-indent: 2px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  user-select: none;
  z-index: 8;
}
.btn-photo:active {
  opacity: 0.85;
}

/* z9 长按保存提示 @(273,624) 102×21 */
.save-tip {
  position: absolute;
  left: 273px;
  top: 624px;
  width: 102px;
  height: 21px;
  margin: 0;
  font-family: var(--font-mono);
  font-weight: 400;
  font-size: 9px;
  line-height: 21px;
  letter-spacing: 0;
  color: #fff;
  z-index: 9;
}

/* z10 查看报道说明 @(221,709) 154.1×30，文字 @(246.1,714.3) 110×15 */
.btn-register {
  position: absolute;
  left: 221px;
  top: 709px;
  width: 154.1px;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 0;
  /* 设计稿按钮为胶囊形（半径=高度一半=15px） */
  border-radius: 15px;
  box-sizing: border-box;
  background: #0a4ea1;
  font-family: var(--font-button);
  font-weight: 500;
  font-size: 16px;
  line-height: 30px;
  letter-spacing: 2px;
  text-indent: 2px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  user-select: none;
  z-index: 10;
}
.btn-register:active {
  opacity: 0.85;
}
</style>
