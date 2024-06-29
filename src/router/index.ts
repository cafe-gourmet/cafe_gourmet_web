import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/login/LoginView.vue';
import RegisterView from '@/views/register/RegisterView.vue';
import HomeClientView from '@/views/client/home/HomeView.vue';
import HomeAdminView from '@/views/admin/home/HomeView.vue';
import ProductsView from '@/views/client/products/ProductsView.vue';
import ProductsAdminView from '@/views/admin/Products/ProductsView.vue';
import CategoryView from '@/views/admin/Category/CategoryView.vue';
import PlansAdminView from '@/views/admin/Plans/PlansView.vue';
import PlansView from '@/views/client/plans/PlansView.vue';
import MainStore from '@/config/MainStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/client',
      name: 'client',
      beforeEnter: (to, from, next) => {
        if (!MainStore.getters.isClient) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
      children: [
        {
          path: '',
          name: 'client.home',
          component: HomeClientView
        },
        {
          path: 'products',
          name: 'client.products',
          component: ProductsView
        },
        {
          path: 'plans',
          name: 'client.plans',
          component: PlansView
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: (to, from, next) => {
        if (!MainStore.getters.isAdmin) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
      children: [
        {
          path: '',
          name: 'admin.home',
          component: HomeAdminView
        },
        {
          path: 'products',
          name: 'admin.products',
          component: ProductsAdminView
        },
        {
          path: 'plans',
          name: 'admin.plans',
          component: PlansAdminView
        },
        {
          path: 'categories',
          name: 'admin.categories',
          component: CategoryView
        }
      ]
    }
  ]
});

export default router;
