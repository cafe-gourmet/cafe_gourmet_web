import type { AuthUser } from '@/entity/AuthUser';
import type { Plan } from '@/entity/Plan';
import router from '@/router';
import type { ProductResponseDTO } from '@/types/responses/admin/ProductResponseDTO';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export interface cartStore {
  products: ProductResponseDTO[];
  plan: Plan | undefined;
  quantity: number;
}

export interface MainState {
  authUser: AuthUser | undefined;
  userRoles: string[];
  tokenJwt: string;
  cart: cartStore;
}

const MainStore = createStore<MainState>({
  state(): MainState {
    return {
      authUser: undefined,
      userRoles: [] as string[],
      tokenJwt: '',
      cart: {
        products: [] as ProductResponseDTO[],
        plan: {} as Plan,
        quantity: 0
      }
    };
  },
  mutations: {
    setAuthUser(state: MainState, authUser: AuthUser) {
      state.authUser = authUser;
    },
    setUserRoles(state: MainState, roles: string[]) {
      state.userRoles = roles;
    },
    setTokenJwt(state: MainState, tokenJwt: string) {
      state.tokenJwt = tokenJwt;
    },
    addProductToCart(state: MainState, product: ProductResponseDTO) {
      state.cart.products.push(product);
      state.cart.quantity = state.cart.quantity++;
    },
    addPlanToCart(state: MainState, plan: Plan) {
      if (!state.cart.plan) state.cart.quantity = state.cart.quantity++;
      state.cart.plan = plan;
    },
    removeProductInCart(state: MainState, productId: number) {
      state.cart.quantity = state.cart.quantity--;
      state.cart.products = state.cart.products.filter((product) => product.id !== productId);
    },
    removePlanInCart(state: MainState) {
      state.cart.quantity = state.cart.quantity--;
      state.cart.plan = undefined;
    },
    logout(state) {
      state.authUser = undefined;
      state.userRoles = [];
      state.tokenJwt = '';
    }
  },
  getters: {
    getAuthUser(state: MainState) {
      return state.authUser;
    },
    getUserRoles(state: MainState) {
      return state.userRoles;
    },
    getTokenJwt(state: MainState) {
      return state.tokenJwt;
    },
    getCart(state: MainState) {
      return state.cart;
    },
    getCartQuantity(state: MainState) {
      return state.cart.quantity;
    }
  },
  actions: {
    logout({ commit }) {
      commit('logout');
      router.push('/');
    }
  },
  plugins: [
    createPersistedState({
      key: 'MainStore',
      paths: ['user', 'userRoles', 'tokenJwt', 'authUser', 'cart'],
      storage: window.localStorage
    })
  ]
});

export default MainStore;
