<script setup lang="ts">
import { ref } from "vue";
import { useStudentStore } from "@/stores/student";
import { useStepper } from "@/composables/useStepper";

const store = useStudentStore();
const { next } = useStepper();

const name = ref("");
const idCard = ref("");

function onVerify() {
  // TODO: 调用后端实名核验 /api/verify（见蓝本 §8）
  store.setProfile({ name: name.value || "新同学", idCard: idCard.value });
  store.markVerified();
  next("verify");
}
</script>

<template>
  <!-- 设计稿基准画板 393×852，所有元素按设计稿坐标 1:1 绝对定位 -->
  <div class="verify-stage">
    <!-- z1 全屏蓝底 #0050B5 -->
    <div class="bg-fill" />

    <!-- z2 二进制装饰文本 @(19,88) 382×722 -->
    <p class="binary-text" aria-hidden="true">
      01101010 10011100 00110111 11000101 10100011 000111010 10 1 010 01 10 1010 0 001100 1010 11100100
      01011001 10001110 01110001 11010100 00101110 10110101 01001011 11110011 00111000 10010110 01100111 000
      001 1010 001100 0 100 001 001100 11001001 00001101 10111010 01010010 11101100
    </p>

    <!-- z3 暖色渐变遮罩 @(0,120) 393×721，填充不透明度 0.6 -->
    <div class="warm-overlay" />

    <!-- z4 头部：白 logo 占位 + 渐隐圆 -->
    <span class="brand-logo" aria-hidden="true" />
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

    <!-- z6 标题 @(132,210) -->
    <h1 class="page-title">身份核验</h1>

    <!-- z7 表单卡片 @(21,280) 352×217 -->
    <div class="form-card">
      <label class="field-label field-label-name" for="verify-name">学生姓名</label>
      <label class="field-label field-label-id" for="verify-id">身份证号</label>
      <input
        id="verify-name"
        v-model="name"
        class="field-input field-input-name"
        type="text"
        placeholder="请输入..."
        autocomplete="name"
      />
      <input
        id="verify-id"
        v-model="idCard"
        class="field-input field-input-id"
        type="text"
        placeholder="请输入..."
        maxlength="18"
        autocomplete="off"
      />
    </div>

    <!-- z8 去认证按钮 @(118,544) 158×34 -->
    <button class="submit-btn" type="button" @click="onVerify">去认证</button>

    <!-- z9 底部装饰图 @(-53,660) 446×192 -->
    <img class="verify-deco" src="/assets/img/verify-deco.png" alt="" />

    <!-- z10 Hello new student @(166,593) -->
    <p class="hello-text">Hello<br />new student</p>
  </div>
</template>

<style scoped>
/* 画板：393×852，蓝底铺满 */
.verify-stage {
  position: relative;
  width: var(--design-width);
  height: var(--design-height);
  margin: 0 auto;
  overflow: hidden;
  background: #0050b5;
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

/* z2 二进制装饰文本：文源宋体 Light 18px，颜色 alpha 0.15，字距 15px */
.binary-text {
  position: absolute;
  left: 19px;
  top: 88px;
  width: 382px;
  height: 722px;
  margin: 0;
  overflow: hidden;
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: 18px;
  line-height: 1.448;
  letter-spacing: 15px;
  color: rgba(255, 255, 255, 0.15);
  z-index: 2;
}

/* z3 暖色渐变遮罩：from 底 #DBD5C5 → to 顶透明，填充不透明度 0.6 */
.warm-overlay {
  position: absolute;
  left: 0;
  top: 120px;
  width: 393px;
  height: 721px;
  z-index: 3;
}
.warm-overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  /* from{0.54198,0.96417}->to{0.54198,0.03028} = 底→顶 */
  background: linear-gradient(to top, #dbd5c5, rgba(204, 204, 204, 0));
  opacity: 0.6;
}

/* z4 头部白色 logo 占位 @(11,41) 213×46 */
.brand-logo {
  position: absolute;
  left: 11px;
  top: 41px;
  width: 213px;
  height: 46px;
  z-index: 4;
}

/* 顶部右侧两个水平渐隐圆 22×22 @ (311,53)(340,53) */
.deco-circle {
  position: absolute;
  top: 53px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(to left, #fff3d4, rgba(255, 243, 212, 0));
  z-index: 4;
}
.deco-circle-1 {
  left: 311px;
}
.deco-circle-2 {
  left: 340px;
}

/* z5 状态栏 */
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

/* z6 标题：数黑体 32px 白 */
.page-title {
  position: absolute;
  left: 132px;
  top: 210px;
  width: 128px;
  height: 39px;
  margin: 0;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 32px;
  line-height: 39px;
  color: #fff;
  z-index: 6;
}

/* z7 表单卡片 @(21,280) 352×217，圆角 23，渐变 + 1px 白描边 */
.form-card {
  position: absolute;
  left: 21px;
  top: 280px;
  width: 352px;
  height: 217px;
  border: 1px solid #fff;
  border-radius: 23px;
  /* 设计稿渐变轴 from{y=1.51306}(#FFFFFA) -> to{y=0}(透明)，#FFFFFA 停止点在卡片底边之外。
     映射到 CSS「to top」：底边=0%、顶边=100%，#FFFFFA 落在 -51.3%，
     使卡片底边实际只有约 66% 不透明度（而非纯白），与设计稿一致。 */
  background: linear-gradient(to top, #fffffa -51.3%, rgba(204, 204, 204, 0) 100%);
  z-index: 7;
}

.field-label {
  position: absolute;
  left: 24px;
  width: 56px;
  height: 17px;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #fff;
}
.field-label-name {
  top: 24px;
}
.field-label-id {
  top: 116px;
}

.field-input {
  position: absolute;
  left: 21px;
  width: 306px;
  height: 43px;
  padding: 0 15px;
  border: 0;
  border-radius: 11px;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  /* 设计稿占位文字为思源宋体 Light；输入值为任意字符，统一用系统宋体保证全覆盖 */
  font-family: "Source Han Serif SC", "Songti SC", "STSong", serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: #1a1a1a;
  outline: none;
  z-index: 1;
}
.field-input::placeholder {
  color: #7a7a7a;
}
.field-input-name {
  top: 53px;
}
.field-input-id {
  top: 142px;
}

/* z8 去认证按钮 @(118,544) 158×34 */
.submit-btn {
  position: absolute;
  left: 118px;
  top: 544px;
  width: 158px;
  height: 34px;
  padding: 0;
  border: 0;
  /* 设计稿按钮为胶囊形（路径左右端为半圆，半径=高度一半=17px） */
  border-radius: 17px;
  background: #0a4ea1;
  text-align: center;
  font-family: var(--font-button);
  font-weight: 500;
  font-size: 16px;
  line-height: 34px;
  letter-spacing: 2px;
  text-indent: 2px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  z-index: 8;
}
.submit-btn:active {
  opacity: 0.85;
}

/* z9 底部装饰图 @(-53,660) 446×192 */
.verify-deco {
  position: absolute;
  left: -53px;
  top: 660px;
  width: 446px;
  height: 192px;
  object-fit: cover;
  z-index: 9;
}

/* z10 Hello new student：数黑体 33px，颜色 alpha 0.7，字距 2px，设计稿为右对齐、行高 40 */
.hello-text {
  position: absolute;
  left: 166px;
  top: 593px;
  width: 220px;
  height: 80px;
  margin: 0;
  text-align: right;
  font-family: var(--font-title);
  font-weight: 400;
  font-size: 33px;
  line-height: 40px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
  z-index: 10;
}
</style>
