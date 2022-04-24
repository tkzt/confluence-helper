import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/AllTools.vue'),
  },
  {
    path: '/md-to-html',
    component: () => import('../views/MarkdownToHtml.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
