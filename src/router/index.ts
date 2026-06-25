import { createRouter, createWebHashHistory } from "vue-router";
import WelcomeView from "@/views/WelcomeView.vue";
import VerifyView from "@/views/VerifyView.vue";
import NoticeView from "@/views/NoticeView.vue";
import PhotoLoadingView from "@/views/PhotoLoadingView.vue";
import PhotoView from "@/views/PhotoView.vue";
import RegisterView from "@/views/RegisterView.vue";

/**
 * 流程式路由（移动端 6 步）：
 * 欢迎 → 核验 → 通知书 → 合影加载 → 合影 → 注册
 *
 * 注意：此处使用「静态导入」而非懒加载 `() => import()`。
 * App.vue 用 <transition mode="out-in"> 包裹路由组件，
 * 若组件为异步（懒加载），切换时会渲染成空注释占位 <!----> 导致空白页。
 * 同步组件可正常参与过渡。本应用仅 6 页，全量打包无性能负担。
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", redirect: "/welcome" },
    {
      path: "/welcome",
      name: "welcome",
      component: WelcomeView,
      meta: { step: 1, title: "欢迎" },
    },
    {
      path: "/verify",
      name: "verify",
      component: VerifyView,
      meta: { step: 2, title: "身份核验" },
    },
    {
      path: "/notice",
      name: "notice",
      component: NoticeView,
      meta: { step: 3, title: "录取通知书" },
    },
    {
      path: "/photo-loading",
      name: "photo-loading",
      component: PhotoLoadingView,
      meta: { step: 4, title: "合影加载" },
    },
    {
      path: "/photo",
      name: "photo",
      component: PhotoView,
      meta: { step: 5, title: "入学合影" },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { step: 6, title: "线上注册" },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
