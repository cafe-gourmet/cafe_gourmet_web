import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/login/LoginView.vue';
import RegisterView from '@/views/register/RegisterView.vue';
import HomeClientView from '@/views/client/home/HomeView.vue';
import HomeAdminView from '@/views/admin/home/HomeView.vue';
import ProductsView from '@/views/client/products/ProductsView.vue';
import CategoryView from '@/views/admin/Category/CategoryView.vue';
import ReportsView from '@/views/admin/Reports/ReportsView.vue';
import PlansAdminView from '@/views/admin/Plans/PlansView.vue';
import PlansView from '@/views/client/plans/PlansView.vue';
import AboutUsComponent from '@/views/client/home/components/AboutUsComponent.vue';
import MainStore from '@/config/MainStore';
import ProductsAdminView from '@/views/admin/Products/ProductsView.vue';
import UsersView from '@/views/admin/Users/UsersView.vue';
import ShoppingView from '@/views/client/shopping/ShoppingView.vue';

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
        },
        {
          path: 'about-us',
          name: 'client.about-us',
          component: AboutUsComponent
        },
        {
          path: 'shopping',
          name: 'client.shopping',
          component: ShoppingView
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
          path: 'users',
          name: 'admin.users',
          component: UsersView
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
        },
        {
          path: 'reports',
          name: 'admin.reports',
          component: ReportsView
        }
      ]
    }
  ]
});

export default router;
