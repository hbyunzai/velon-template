import type { RouteRecordRaw } from 'vue-router';

export const LayoutRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    children: [
      { path: '/dashboard', meta: { name: 'dashboard' }, component: () => import('./dashboard/Dashboard.vue') },
      { path: '/auth/element', meta: { name: 'element' }, component: () => import('./auth/Element.vue') },
      { path: '/auth/role', meta: { name: 'role' }, component: () => import('./auth/Role.vue') },
      { path: '/auth/route', meta: { name: 'route' }, component: () => import('./auth/Route.vue') }
    ]
  }
];

export const BlankRoutes: Readonly<RouteRecordRaw[]> = [
  { path: '/register', component: () => import('./register/index.vue') }
];
