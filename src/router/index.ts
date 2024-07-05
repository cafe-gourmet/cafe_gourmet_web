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
import ShoppingAdminView from '@/views/admin/Shopping/ShoppingView.vue';
import AboutUsView from '@/views/admin/AboutUs/AboutUsView.vue';
import ContactAdminView from '@/views/admin/Contact/ContactView.vue';
import ContactView from '@/views/client/contact/ContactView.vue';
import { useToast } from 'vue-toastification';
import { AuthUser, AuthUserPermission, AuthUserRole, AuthUserRolePermission } from '@/entity/AuthUser';

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
        if (VerificaPermissoes(to.fullPath)) {
          next();
        } else {
          useToast().error('Você não possui acesso a essa funcionalidade!');
        }
      },
      children: [
        {
          path: '',
          name: 'client.home',
          component: HomeClientView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'products',
          name: 'client.products',
          component: ProductsView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'plans',
          name: 'client.plans',
          component: PlansView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'about-us',
          name: 'client.about-us',
          component: AboutUsComponent,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'shopping',
          name: 'client.shopping',
          component: ShoppingView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'contact',
          name: 'client.contact',
          component: ContactView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      beforeEnter: (to, from, next) => {
        // Verifica se o usuário tem permissão para a rota específica
        if (VerificaPermissoes(to.fullPath)) {
          next();
        } else {
          useToast().error('Você não possui acesso a essa funcionalidade!');
        }
      },
      children: [
        {
          path: '',
          name: 'admin.home',
          component: HomeAdminView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'products',
          name: 'admin.products',
          component: ProductsAdminView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'users',
          name: 'admin.users',
          component: UsersView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'plans',
          name: 'admin.plans',
          component: PlansAdminView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'categories',
          name: 'admin.categories',
          component: CategoryView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next(); 
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'reports',
          name: 'admin.reports',
          component: ReportsView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'shoppings',
          name: 'admin.shoppings',
          component: ShoppingAdminView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'about-us',
          name: 'admin.about-us',
          component: AboutUsView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        },
        {
          path: 'contact',
          name: 'admin.contact',
          component: ContactAdminView,
          beforeEnter: (to, from, next) => {
            if (VerificaPermissoes(to.fullPath)) {
              next();
            } else {
              useToast().error('Você não possui acesso a essa funcionalidade!');
            }
          },
        }
      ]
    }
  ]
});
export function VerificaPermissoes(fullPath: string):boolean{
  const userPermissions: AuthUserRolePermission[] = MainStore.getters.getAuthUser.cargo.permissoes;
  const urls: string[] = []

  userPermissions.forEach((permissao) => {
    urls.push(permissao.permissao.descricao);
  });
  //console.log(urls, fullPath);
  // Verifica se o usuário tem permissão para a rota específica
  if (urls.includes(fullPath))
    return true;
  
  return false;
}

export default router;
