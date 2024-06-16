import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/login/LoginView.vue';
import RegisterView from '@/views/register/RegisterView.vue';
import HomeClientView from '@/views/client/home/HomeView.vue';
import HomeAdminView from '@/views/admin/home/HomeView.vue';
import ProductsView from '@/views/client/products/ProductsView.vue';

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
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      children: [
        {
          path: '',
          name: 'admin.home',
          component: HomeAdminView
        },
        {
          path: 'users',
          name: 'admin.users',
          component: ProductsView
        }
      ]
    }
  ]
});

export default router;
