<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-stage">
    <main class="phone-shell">
      <RouterView v-slot="{ Component, route }">
        <transition name="fade">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.app-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background: #e9edf3;
}

/* 纯移动端：以设计稿 393×852 为基准，居中呈现 */
.phone-shell {
  position: relative;
  width: 100%;
  max-width: var(--design-width);
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0 auto;
  background: var(--color-bg);
  overflow: hidden;
}

@media (min-width: 480px) {
  .phone-shell {
    min-height: var(--design-height);
    height: var(--design-height);
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(10, 78, 161, 0.18);
    overflow-y: auto;
  }
}
</style>

<!--
  过渡类写在非 scoped 样式里：Vue 把 fade-* 类加到「被路由子组件的根元素」上，
  该元素 scope id 与 App.vue 不同，写进 <style scoped> 会匹配不到。
  采用默认（同时进出）crossfade 而非 mode="out-in"：
  out-in 需等离场元素 transitionend 才挂载新组件，某些情况下该事件不触发会卡成空白页；
  默认模式新组件立即挂载，最稳。离场元素设为 absolute 避免两页同时占位造成高度跳动。
-->
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
