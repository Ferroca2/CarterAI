import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/login-layout.vue'),
        children: [
            {
                path: '',
                component: () => import('pages/index.vue'),
                alias: 'login',
            },

            {
                path: 'register',
                component: () => import('pages/register.vue'),
            },
        ],
    },


    {
        path: '/getting-started',
        component: () => import('layouts/login-layout.vue'),
        children: [
            {
                path: '',
                component: () => import('pages/getting-started/name-and-age.vue'),
            },
            {
                path: 'height-and-weight',
                component: () => import('pages/getting-started/height-and-weight.vue'),
            },
            {
                path: 'goals',
                component: () => import('pages/getting-started/goals.vue'),
            },
        ],
        meta: {
            access: 'auth-only',
        },
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
